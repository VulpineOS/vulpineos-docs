import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { headers } from 'next/headers'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'VulpineOS',
  description: 'The first browser engine with AI agent security built into the C++ core.',
}

const vulpineLogo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.1rem' }}>
    <span>🦊</span>
    <span>VulpineOS</span>
  </span>
)

const foxbridgeLogo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.1rem' }}>
    <span>🌉</span>
    <span>foxbridge</span>
  </span>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const isFoxbridge = headersList.get('x-foxbridge') === '1'

  const logo = isFoxbridge ? foxbridgeLogo : vulpineLogo
  const projectLink = isFoxbridge
    ? 'https://github.com/PopcornDev1/foxbridge'
    : 'https://github.com/PopcornDev1/VulpineOS'
  const docsBase = isFoxbridge
    ? 'https://github.com/PopcornDev1/vulpineos-docs/tree/main/content/foxbridge'
    : 'https://github.com/PopcornDev1/vulpineos-docs/tree/main/content'

  // Only show foxbridge pages on subdomain, full site on main domain
  const pageMap = isFoxbridge
    ? await getPageMap('/foxbridge')
    : await getPageMap()

  const navbar = (
    <Navbar
      logo={logo}
      projectLink={projectLink}
    />
  )

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#7C3AED" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦊</text></svg>" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase={docsBase}
          footer={<></>}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
