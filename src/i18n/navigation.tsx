import type { ComponentProps } from 'react';
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

const nav = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = nav;

/**
 * Önceden yükleme (prefetch) varsayılan olarak kapalı: ziyaretçilerin çoğu ücretli mobil veriyle geliyor
 * ve görünür her bağlantının arka planda indirilmesi istenmiyor. Gerekirse prefetch={true} verilir.
 */
export function Link({ prefetch = false, ...props }: ComponentProps<typeof nav.Link>) {
  return <nav.Link prefetch={prefetch} {...props} />;
}
