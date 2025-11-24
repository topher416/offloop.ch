import { NextResponse } from 'next/server'

// This is a backend API route - it runs on the server, not in the browser
// You can safely use API keys here, access databases, etc.

export async function GET(request) {
  // Simulate some backend processing
  const currentTime = new Date().toLocaleString()

  // This could be where you:
  // - Call Claude API to scrape theatre data
  // - Query your database
  // - Send emails
  // - Do anything that requires server-side code

  return NextResponse.json({
    message: `Hello from the backend! Server time: ${currentTime}`,
    note: 'This response was generated on the server, not in your browser.',
    example: 'In the future, this is where you would call Claude API, query Supabase, etc.'
  })
}

// You can also handle POST requests for form submissions, etc.
export async function POST(request) {
  const body = await request.json()

  return NextResponse.json({
    message: 'POST request received!',
    received: body
  })
}
