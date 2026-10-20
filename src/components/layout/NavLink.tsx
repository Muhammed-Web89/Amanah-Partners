'use client';

import type { ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';

export function NavLink({ href, children, className }: { href: StaticPathname; children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className={cn('no-underline', className)}>
      {children}
    </Link>
  );
}
