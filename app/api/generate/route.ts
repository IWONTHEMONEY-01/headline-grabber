import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Lazy initialization to avoid build-time errors
let openai: OpenAI | null = null

function getOpenAI() {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    })
  }
  return openai
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

The first headline should be your absolute best pick. Make readers groan AND laugh.`

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
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

    const completion = await getOpenAI().chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Generate NY Post style headlines for this story:\n\n${story}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.9,
      max_tokens: 1000,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    const result = JSON.parse(content)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating headlines:', error)
    return NextResponse.json(
      { error: 'Failed to generate headlines' },
      { status: 500 }
    )
  }
}
