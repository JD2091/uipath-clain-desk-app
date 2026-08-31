import { useEffect, useState } from 'react'
import { UiPath, telemetryClient, trackEvent } from '@uipath/uipath-typescript/core'
import UploadScreen from './screens/UploadScreen'
import ReviewScreen from './screens/ReviewScreen'

// ponytail: multi-file-upload@1.0.0 was built against uipath-typescript@1.1.x,
// where telemetryClient exposed .track(); 1.6.x moved that to trackEvent(), so
// the widget throws "telemetryClient.track is not a function" on upload. Alias
// it back. Drop this once the widget ships a build for uipath-typescript >=1.4.
;(telemetryClient as unknown as { track?: typeof trackEvent }).track ??= trackEvent

// Widgets read the body theme class ('light' | 'dark') at runtime.
const THEME: 'light' | 'dark' = 'light'

const sdk = new UiPath()

// Call initialize() exactly once. The OAuth code is single-use, so React
// StrictMode's double-invoked effect (or HMR) would exchange it twice and the
// second attempt fails with invalid_grant.
let initOnce: Promise<void> | null = null
const initSdk = () =>
  (initOnce ??= sdk.isInitialized() ? Promise.resolve() : sdk.initialize())

type Screen = 'upload' | 'review'

function App() {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [screen, setScreen] = useState<Screen>('upload')

  useEffect(() => {
    document.body.classList.add(THEME)
    initSdk()
      .then(() => setReady(true))
      .catch((e) => setError(e instanceof Error ? e.message : 'SDK init failed'))
  }, [])

  if (error) return <main><p role="alert">Sign-in failed: {error}</p></main>
  if (!ready) return <main><p role="status">Signing in…</p></main>

  return (
    <main>
      <h1>ClaimDesk</h1>
      <nav>
        <button type="button" onClick={() => setScreen('upload')} disabled={screen === 'upload'}>Upload</button>
        <button type="button" onClick={() => setScreen('review')} disabled={screen === 'review'}>Review</button>
      </nav>
      {screen === 'upload' ? (
        <UploadScreen sdk={sdk} onUploaded={() => setScreen('review')} />
      ) : (
        <ReviewScreen sdk={sdk} />
      )}
    </main>
  )
}

export default App
