'use client'

import { useState } from 'react'

export default function Home() {
  const [apiMessage, setApiMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const callBackendAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/hello')
      const data = await response.json()
      setApiMessage(data.message)
    } catch (error) {
      setApiMessage('Error calling API: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section - Frontend Example */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Chicago Storefront Theatre Tracker
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              The most complete tracker of Chicago storefront and DIY theatre
            </p>
            <div className="inline-block bg-green-500/20 text-green-300 px-6 py-3 rounded-lg border border-green-500/50">
              ✓ Next.js + React + Tailwind CSS configured!
            </div>
          </div>

          {/* Frontend/Backend Demo Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Frontend + Backend Demo
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-200 mb-2">
                  🎨 Frontend (This Page)
                </h3>
                <p className="text-blue-100 text-sm">
                  This is a React component with Tailwind CSS styling.
                  It runs in your browser and displays the user interface.
                </p>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-purple-200 mb-2">
                  ⚙️ Backend (API Route)
                </h3>
                <p className="text-purple-100 text-sm mb-4">
                  Click the button below to call a backend API route.
                  This code runs on the server, not in your browser.
                </p>

                <button
                  onClick={callBackendAPI}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 w-full"
                >
                  {loading ? 'Calling Backend...' : 'Call Backend API'}
                </button>

                {apiMessage && (
                  <div className="mt-4 bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                    <p className="text-green-200 font-medium">
                      Response from backend:
                    </p>
                    <p className="text-white mt-2">{apiMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tech Stack Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">⚛️</div>
              <h3 className="text-lg font-semibold text-white mb-2">React</h3>
              <p className="text-blue-200 text-sm">
                Component-based UI library you already know
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-semibold text-white mb-2">Tailwind</h3>
              <p className="text-blue-200 text-sm">
                Utility-first CSS for rapid styling
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-2">Next.js</h3>
              <p className="text-blue-200 text-sm">
                React framework with backend superpowers
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-yellow-200 mb-3">
              📋 Next Steps
            </h3>
            <ul className="text-yellow-100 space-y-2 text-sm">
              <li>• Deploy to Vercel (automatic from GitHub)</li>
              <li>• Configure DNS at Gandi.net to point to Vercel</li>
              <li>• Start building the theatre tracker features</li>
              <li>• Add Supabase for database</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
