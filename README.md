# 📰 Headline Grabber

Generate punchy, witty newspaper headlines in the iconic **NY Post** style.

![NY Post Style](https://img.shields.io/badge/Style-NY%20Post-red)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## Features

- 🗞️ Generate 5 headline options for any news story
- 🎯 Best headline highlighted
- 📝 Technique explanations for each headline
- ⚡ Fast generation with GPT-4

## Headline Techniques

The generator uses classic NY Post techniques:

| Technique | Example |
|-----------|---------|
| **Name Puns** | WEINER'S RISE AND FALL |
| **Movie Twists** | APOCALYPSE COW |
| **Rhymes** | DOPES ON ROPES |
| **Alliteration** | BEZOS BRINGS BACON |
| **One-Word** | BUSTED, DOOMED, GOTCHA |
| **Pop Culture** | GAME OF PHONES |

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/headline-grabber.git
   cd headline-grabber
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/headline-grabber)

1. Click the button above or go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy!

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key |
| `OPENAI_MODEL` | No | Model to use (default: gpt-4-turbo-preview) |

## Usage

1. Enter a news story in the text area
2. Click "GENERATE HEADLINES"
3. Get 5 NY Post-style headlines
4. The ⭐ headline is the top pick

## Examples

**Input:** "Luis Robert Jr. was traded from the White Sox to the Mets for Luisangel Acuña"

**Output:**
1. ⭐ BEARLY LEGAL (Luis Ro-BEAR pun + robbery angle)
2. CHI-CONNED (Chicago + conned)
3. SOX SWINDLED (Alliteration)
4. BEAR MARKET IN CHICAGO (Double meaning)
5. BRO-KEN UP (Acuña brothers split)

## License

MIT

## Acknowledgments

- Inspired by the legendary NY Post headline writers
- "The worse the pun makes you groan, the better the headline" 🗞️
