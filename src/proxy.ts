import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16'da middleware.ts → proxy.ts. Dil algılama ve /uz /ru /en yönlendirmesi.
export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
