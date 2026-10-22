import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Languages,
  Library,
  Palette,
  PenLine,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

// docs/11: program sayfalarının simgesi — kartlardaki ve sayfa başlığındaki 3D cam karoda aynı simge.
export const programIcons: Record<string, LucideIcon> = {
  'a-level': GraduationCap,
  'igcse-a-level': BookOpen,
  sat: PenLine,
  'ielts-toefl': Languages,
  'medicine-ucat-imat': Stethoscope,
  'ap-ib': Library,
  portfolio: Palette,
  btec: Briefcase,
};
