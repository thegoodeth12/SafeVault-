import './globals.css'
import { SafeProvider } from '@safe-global/safe-apps-provider'

export const metadata = {
  title: 'SafeVault 🔐',
  description: 'Your secure Gnosis Safe dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SafeProvider>
          {children}
        </SafeProvider>
      </body>
    </html>
  )
}
