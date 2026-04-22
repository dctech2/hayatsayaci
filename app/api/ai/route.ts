import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { hours, days, money, age } = await req.json();

  const prompt = `
Kullanıcı verileri:
- Günlük boşa harcanan saat: ${hours}
- Yıllık kayıp gün: ${days}
- Yıllık para kaybı: ${money} TL
- Yaş: ${age}

Görev:
Kullanıcıya kısa, sert ve etkileyici bir analiz yaz.
- Maksimum 2-3 cümle
- Motivasyonel değil, gerçekçi olsun
- Alternatif olarak ne yapabileceğini söyle
- Türkçe yaz
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({
    text: completion.choices[0].message.content,
  });
}