import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

// Lazy initialization to avoid build-time errors
let anthropic: Anthropic | null = null

function getAnthropic() {
  if (!anthropic) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
  }
  return anthropic
}

const SYSTEM_PROMPT = `You are the NY Post headline writer - the best in the business at punchy, witty, irreverent headlines.

Your headlines should be:
- SHORT (2-6 words ideal)
- ALL CAPS
- Punny, clever, groan-worthy
- Use pop culture references (movies, songs, TV shows)
- Use name puns when applicable
- Use rhymes and alliteration
- Double meanings are gold
- Nothing is too serious for wordplay

Techniques to use:
- Name puns (e.g., "WEINER'S RISE AND FALL")
- Movie/song title twists (e.g., "APOCALYPSE COW")
- Rhymes & alliteration (e.g., "DOPES ON ROPES")
- One-word devastation (e.g., "BUSTED", "DOOMED")
- Classic phrases twisted

Return exactly 5 headlines in this JSON format:
{
  "headlines": [
    {"headline": "YOUR BEST HEADLINE", "technique": "Brief explanation of what makes it work"},
    {"headline": "SECOND OPTION", "technique": "Explanation"},
    {"headline": "THIRD OPTION", "technique": "Explanation"},
    {"headline": "FOURTH OPTION", "technique": "Explanation"},
    {"headline": "FIFTH OPTION", "technique": "Explanation"}
  ]
}

The first headline should be your absolute best pick. Make readers groan AND laugh. Return ONLY the JSON, no other text.`

export async function POST(request: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      )
    }

    const { story } = await request.json()

    if (!story || typeof story !== 'string') {
      return NextResponse.json(
        { error: 'Story is required' },
        { status: 400 }
      )
    }

    const message = await getAnthropic().messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        { 
          role: 'user', 
          content: `Generate NY Post style headlines for this story:\n\n${story}` 
        }
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    // Parse the JSON from Claude's response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    
    const result = JSON.parse(jsonMatch[0])
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error generating headlines:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate headlines',
        details: error?.message || 'Unknown error',
        type: error?.constructor?.name || 'Unknown'
      },
      { status: 500 }
    )
  }
}
