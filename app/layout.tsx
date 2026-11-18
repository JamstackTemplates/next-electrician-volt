import '@fontsource/saira-stencil-one/400.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/400-italic.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;
const title = `${business.name}: ${business.tagline}`;

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website', siteName: business.name, title, description, locale: 'en_AU',
    images: [{ url: asset('/og.png'), width: 1200, height: 630, alt: `${business.name}, ${business.tagline.toLowerCase()} in Melbourne` }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [asset('/og.png')] },
};

export const viewport: Viewport = { themeColor: '#23272c' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-AU" suppressHydrationWarning>
    <head>
      <meta name="color-scheme" content="light dark" />
      <ThemeScript />
    </head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
