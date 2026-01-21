'use client'

import { useState } from 'react'

interface Headline {
  headline: string
  technique: string
}

export default function Home() {
  const [story, setStory] = useState('')
  const [headlines, setHeadlines] = useState<Headline[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateHeadlines = async () => {
    if (!story.trim()) {
      setError('Please enter a news story')
      return
    }

    setLoading(true)
    setError('')
    setHeadlines([])

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate headlines')
      }

      const data = await response.json()
      setHeadlines(data.headlines)
    } catch (err) {
      setError('Failed to generate headlines. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-nypost-red headline-text mb-2">
          HEADLINE GRABBER
        </h1>
        <p className="text-gray-600 text-lg">
          Generate punchy, witty headlines in the iconic NY Post style
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <label htmlFor="story" className="block text-lg font-semibold mb-2">
          📰 Enter your news story:
        </label>
        <textarea
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="e.g., Luis Robert Jr. was traded from the White Sox to the Mets for Luisangel Acuña..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-nypost-red focus:border-transparent"
        />
        
        <button
          onClick={generateHeadlines}
          disabled={loading}
          className="mt-4 w-full bg-nypost-red hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors headline-text text-xl"
        >
          {loading ? 'GENERATING...' : 'GENERATE HEADLINES'}
        </button>

        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}
      </div>

      {/* Results Section */}
      {headlines.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-nypost-red headline-text">
            📰 YOUR HEADLINES:
          </h2>
          
          <div className="space-y-4">
            {headlines.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  index === 0 
                    ? 'bg-nypost-red text-white' 
                    : 'bg-gray-100 border-l-4 border-nypost-red'
                }`}
              >
                <p className={`headline-text text-2xl ${
                  index === 0 ? 'text-white' : 'text-nypost-black'
                }`}>
                  {item.headline}
                  {index === 0 && <span className="ml-2">⭐</span>}
                </p>
                <p className={`mt-2 text-sm ${
                  index === 0 ? 'text-red-100' : 'text-gray-600'
                }`}>
                  Technique: {item.technique}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Inspired by the legendary NY Post headlines</p>
        <p className="mt-1">The worse the pun makes you groan, the better the headline 🗞️</p>
      </footer>
    </main>
  )
}
