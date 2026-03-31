import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'VulpineOS'
  const description =
    searchParams.get('description') || 'AI Browser Agent Operating System'

  const logoUrl = new URL('/VulpineOSCircleLogo.png', req.url).toString()

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: 'linear-gradient(145deg, #0f0a1a 0%, #1e1235 40%, #2a1548 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: logo + brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src={logoUrl}
            width={52}
            height={52}
            style={{ borderRadius: '50%' }}
          />
          <span
            style={{
              fontSize: '26px',
              color: '#a78bfa',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            VulpineOS
          </span>
        </div>

        {/* Center: title + description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: title.length > 40 ? '44px' : '54px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: '950px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#c4b5fd',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '20px', color: '#6d5b8a' }}>
            vulpineos.com
          </span>
          <span style={{ fontSize: '16px', color: '#4c3d66' }}>
            AI Browser Agent Operating System
          </span>
        </div>

        {/* Decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-50px',
            width: '500px',
            height: '500px',
            background:
              'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '200px',
            width: '400px',
            height: '400px',
            background:
              'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '4px',
            background:
              'linear-gradient(90deg, #7C3AED 0%, #a78bfa 50%, #7C3AED 100%)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
