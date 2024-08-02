import { NextResponse } from 'next/server';
import axios from 'axios';

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    const prompt = `Generate a recipe using the following pantry items: ${items.join(', ')}`;
    const response = await axios.post('https://api.gemini.com/v1/recipe-suggestions', {
      prompt,
      apiKey: geminiApiKey,
    });

    return NextResponse.json({ recipes: response.data.recipes });
  } catch (error) {
    console.error('Error fetching recipe suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe suggestions.' }, { status: 500 });
  }
}
