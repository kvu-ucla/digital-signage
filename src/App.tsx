import { Component, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LOCATIONS } from './config/locations'
import { useMenu } from './hooks/useMenu'
import { SCREENS, type ScreenType } from './screens'
import { HorizontalScreen } from './screens/HorizontalScreen'
import { VerticalScreen } from './screens/VerticalScreen'
import { EntranceScreen } from './screens/EntranceScreen'

const queryClient = new QueryClient()

const loadStylesheet = (stylesheet: string): void => {
  const existing = document.getElementById('location-theme')
  if (existing) existing.remove()
  const link = document.createElement('link')
  link.id = 'location-theme'
  link.rel = 'stylesheet'
  link.href = `./themes/${stylesheet}`
  document.head.appendChild(link)
}

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          background: 'var(--color-bg, #000)',
          color: 'var(--color-text-primary, #fff)',
          fontFamily: 'var(--font-display, sans-serif)',
          fontSize: '1.5rem',
        }}>
          Display unavailable — please contact your administrator.
        </div>
      )
    }
    return this.props.children
  }
}

const isValidScreen = (s: string): s is ScreenType => s in SCREENS

type ScreenLoaderProps = {
  location: string
  screenType: ScreenType
  station: string | null
  menuType: string | null
}

const ScreenLoader = ({ location, screenType, station, menuType }: ScreenLoaderProps) => {
  const { data, sheetData, isLoading, error } = useMenu({
    location,
    menuType: menuType ?? undefined,
  })

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: 'var(--color-bg, #000)',
        color: 'var(--color-text-primary, #fff)',
      }}>
        Loading menu…
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: 'var(--color-bg, #000)',
        color: 'var(--color-text-primary, #fff)',
      }}>
        Menu data unavailable.
      </div>
    )
  }

  if (screenType === 'entrance') {
    return <EntranceScreen data={data} sheetData={sheetData} />
  }
  if (screenType === 'horizontal') {
    return <HorizontalScreen data={data} station={station ?? ''} />
  }
  return <VerticalScreen data={data} station={station ?? ''} />
}

export const App = () => {
  const params = new URLSearchParams(window.location.search)
  const location = params.get('location') ?? ''
  const screen = params.get('screen') ?? ''
  const station = params.get('station')
  const menuType = params.get('menu')

  const config = LOCATIONS[location]

  if (!config) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: '#000',
        color: '#fff',
      }}>
        Unknown location: <code style={{ marginLeft: '0.5rem' }}>{location || '(none)'}</code>
      </div>
    )
  }

  if (!isValidScreen(screen)) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: '#000',
        color: '#fff',
      }}>
        Unknown screen: <code style={{ marginLeft: '0.5rem' }}>{screen || '(none)'}</code>
      </div>
    )
  }

  if (config.stylesheet) loadStylesheet(config.stylesheet)

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ScreenLoader
          location={location}
          screenType={screen}
          station={station}
          menuType={menuType}
        />
      </ErrorBoundary>
    </QueryClientProvider>
  )
}
