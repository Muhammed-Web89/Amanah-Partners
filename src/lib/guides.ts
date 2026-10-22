import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import type { AppLocale } from '@/i18n/routing';

// Rehber yazıları: content/guides/<id>/<dil>.md
// Yeni yazı = yeni klasör; kod değişikliği gerekmez.
const root = path.join(process.cwd(), 'content', 'guides');

export type Guide = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  summary: string[];
  sources: Array<{ title: string; url: string }>;
  /** İlgili site sayfaları: "Etiket | /programs/a-level" (dil öneki yok; Link yerelleştirir) */
  related: Array<{ label: string; href: string }>;
  /** Kodla çizilen kapak/üst illüstrasyon sahnesi (ArticleArt) */
  art?: string;
  /** İçindekiler: gövdedeki her ## başlığı (id ile) */
  toc: Array<{ id: string; text: string }>;
  html: string;
};

function parse(id: string, raw: string): Guide {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Frontmatter eksik: ${id}`);
  const meta: Record<string, string> = {};
  const summary: string[] = [];
  const sources: Guide['sources'] = [];
  const related: Guide['related'] = [];
  let list: 'summary' | 'sources' | 'related' | null = null;

  for (const line of match[1].split('\n')) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && list === 'summary') summary.push(item[1].trim());
    else if (item && list === 'sources') {
      const [title, url] = item[1].split(' | ');
      sources.push({ title: title.trim(), url: url.trim() });
    } else if (item && list === 'related') {
      const [label, href] = item[1].split(' | ');
      related.push({ label: label.trim(), href: href.trim() });
    } else {
      const pair = line.match(/^(\w+):\s*(.*)$/);
      if (!pair) continue;
      list = pair[1] === 'summary' || pair[1] === 'sources' || pair[1] === 'related' ? pair[1] : null;
      if (!list) meta[pair[1]] = pair[2].trim();
    }
  }

  // ## başlıklarına sabit id (içindekiler ve bağlantı için): bolim-1, bolim-2…
  const toc: Guide['toc'] = [];
  const html = (marked.parse(match[2], { async: false }) as string).replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const tocId = `bolim-${toc.length + 1}`;
    const text = inner
      .replace(/<[^>]+>/g, '')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
    toc.push({ id: tocId, text });
    return `<h2 id="${tocId}">${inner}</h2>`;
  });

  return {
    id,
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    published: meta.published,
    updated: meta.updated ?? meta.published,
    summary,
    sources,
    related,
    art: meta.art,
    toc,
    html,
  };
}

export async function getGuides(locale: AppLocale): Promise<Guide[]> {
  let ids: string[] = [];
  try {
    ids = (await readdir(root, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return [];
  }
  const guides = await Promise.all(
    ids.map(async (id) => {
      try {
        return parse(id, await readFile(path.join(root, id, `${locale}.md`), 'utf8'));
      } catch {
        return null; // bu dilde henüz yok
      }
    }),
  );
  return guides.filter((g): g is Guide => g !== null).sort((a, b) => b.published.localeCompare(a.published));
}

/** Slug herhangi bir dildeki slug olabilir (dil değiştirince); doğru dildeki yazıyı ve kanonik slug'ı döndürür. */
export async function findGuide(locale: AppLocale, slug: string) {
  for (const l of ['uz', 'ru', 'en'] as const) {
    const match = (await getGuides(l)).find((g) => g.slug === slug);
    if (match) return (await getGuides(locale)).find((g) => g.id === match.id) ?? null;
  }
  return null;
}

export async function guideSlugs(id: string) {
  const entries = await Promise.all(
    (['uz', 'ru', 'en'] as const).map(async (l) => [l, (await getGuides(l)).find((g) => g.id === id)?.slug] as const),
  );
  return Object.fromEntries(entries.filter(([, s]) => s)) as Partial<Record<AppLocale, string>>;
}
