// app/api/openai/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { experiences } = await request.json();
  
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    console.log("EXPERIENCES", experiences[0]);
    const prompt = `Based on the following work experiences, return a list of 2 position titles that each experience could be used for. Only return job titles as a list separated by a comma:\n\n` +
    experiences.map((exp, index) => `Experience ${index + 1}: ${exp}`).join("\n");

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',  // Specify the method as POST
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching OpenAI API:", error);
    return NextResponse.json({ error: 'Failed to fetch OpenAI API' }, { status: 500 });
  }
}
