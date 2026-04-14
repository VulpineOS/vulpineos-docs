import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'VulpineOS — AI Browser Agent Operating System',
    template: '%s | VulpineOS',
  },
  description: 'VulpineOS is the operating system for AI browser agents. Manage hundreds of OpenClaw agents on Camoufox with unique fingerprints, injection protection, and zero detection.',
  metadataBase: new URL('https://docs.vulpineos.com'),
  openGraph: {
    title: 'VulpineOS — AI Browser Agent Operating System',
    description: 'Operate stealth and secure OpenClaw agents at scale. Built on Camoufox with injection filtering, action lock, and per-agent fingerprints.',
    url: 'https://docs.vulpineos.com',
    siteName: 'VulpineOS Docs',
    images: [
      {
        url: '/VulpineOSBanner.png',
        width: 1200,
        height: 630,
        alt: 'VulpineOS — AI Browser Agent Operating System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VulpineOS — AI Browser Agent Operating System',
    description: 'Operate stealth and secure OpenClaw agents at scale on Camoufox.',
    images: ['/VulpineOSBanner.png'],
  },
  alternates: {
    canonical: 'https://docs.vulpineos.com',
  },
  keywords: ['VulpineOS', 'AI browser agent', 'OpenClaw', 'Camoufox', 'browser automation', 'prompt injection', 'anti-detect browser', 'browser fingerprint', 'action lock', 'CDP proxy', 'foxbridge', 'AI agent security', 'stealth browser', 'browser agent operating system'],
}

const logo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.1rem' }}>
    <img src="/VulpineOSCircleLogo.png" alt="VulpineOS" width={28} height={28} style={{ borderRadius: '50%' }} />
    <span>VulpineOS</span>
  </span>
)

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/VulpineOS/VulpineOS"
  />
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#7C3AED" />
        <link rel="icon" href="/VulpineOSCircleLogo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'VulpineOS',
              description: 'The operating system for AI browser agents — manage hundreds of OpenClaw agents on Camoufox with unique fingerprints, injection protection, and zero detection',
              url: 'https://docs.vulpineos.com',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'macOS, Linux',
              programmingLanguage: ['Go', 'C++', 'JavaScript'],
              codeRepository: 'https://github.com/VulpineOS/VulpineOS',
              author: {
                '@type': 'Person',
                name: 'Elliot',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'VulpineOS Documentation',
              url: 'https://docs.vulpineos.com',
              description: 'Documentation for VulpineOS AI browser agent operating system',
              publisher: {
                '@type': 'Person',
                name: 'Elliot',
              },
            }),
          }}
        />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/VulpineOS/vulpineos-docs/tree/main/content"
          footer={<></>}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
