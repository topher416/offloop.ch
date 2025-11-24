import './globals.css'

export const metadata = {
  title: 'offloop.ch - Chicago Storefront Theatre Tracker',
  description: 'The most complete tracker of Chicago storefront and DIY theatre',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
