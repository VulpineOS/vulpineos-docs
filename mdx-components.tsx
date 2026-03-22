import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

const themeComponents = getThemeComponents()

export function useMDXComponents(components?: Record<string, React.ComponentType>) {
  return {
    ...themeComponents,
    ...components,
    h1: (props: any) => {
      const ThemeH1 = themeComponents.h1 as any
      return (
        <ThemeH1 {...props}>
          <img
            src="/VulpineOSLogo.png"
            alt=""
            width={28}
            height={28}
            style={{ verticalAlign: 'middle', marginRight: '10px', display: 'inline-block' }}
          />
          {props.children}
        </ThemeH1>
      )
    },
  }
}
