import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

const isDeveloperRoute = (path: string) => path.includes('/developers/')

const applyThemeForRoute = (path: string) => {
  if (typeof document === 'undefined') return
  const html = document.documentElement
  if (isDeveloperRoute(path)) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    // Initial load - meteen toepassen
    applyThemeForRoute(window.location.pathname)

    // Bij navigatie
    router.onBeforeRouteChange = (to) => {
      applyThemeForRoute(to)
    }
  }
} satisfies Theme
