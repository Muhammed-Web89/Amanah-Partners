import { Fragment, type ReactNode } from 'react';

// Satır sonunda bölünmemesi gereken terimler (Aşama 2 bulgusu: "A-" / "Level").
// U+2011 (bölünmez tire) seçilen fontların alt kümelerinde yok; bu yüzden <span class="nobr">.
const TERMS =
  /(International A-Level|A-Level|IGCSE va A-Level|IGCSE и A-Level|IGCSE and A-Level|UCAT\/IMAT|IELTS\/TOEFL|IELTS \/ TOEFL|AP \/ IB|SAT\/ACT|Safe \/ Target \/ Reach)/g;

export function fmt(text: ReactNode): ReactNode {
  if (typeof text !== 'string') return text;
  const parts = text.split(TERMS);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="nobr">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
