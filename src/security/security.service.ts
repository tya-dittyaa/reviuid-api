import { GoogleGenerativeAI } from '@google/generative-ai';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
  constructor() {}

  geminiModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    const apiKey2 = process.env.GEMINI_API_KEY_2;
    const apiKey3 = process.env.GEMINI_API_KEY_3;
    const random = Math.floor(Math.random() * 3) + 1;

    let apiKeyToUse = apiKey;
    switch (random) {
      case 1:
        apiKeyToUse = apiKey;
        break;
      case 2:
        apiKeyToUse = apiKey2;
        break;
      case 3:
        apiKeyToUse = apiKey3;
    }

    const genAI = new GoogleGenerativeAI(apiKeyToUse);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return model;
  }

  async checkText(text: string) {
    // Gemini model
    const model = this.geminiModel();
    let answer: boolean = false;

    // Check if text is empty
    if (!text) {
      throw new BadRequestException('Text is required');
    }

    // Create prompt
    const prompt = `Mohon berikan saya jawaban dalam 1 angka jika benar adalah '1' dan salah adalah '0' jika kalimat dibawah ini menggunakan kata-kata yang mengandung unsur kasar, unsur jorok, unsur SARA, ujaran kebencian, kata-kata yang merendahkan, promosi, iklan, spam, atau hal-hal yang tidak pantas lainnya, dan mohon di cek perhurufnya juga karena bisa saja dituliskan secara sambung tanpa spasi ataupun diubah menggunakan angka, kalimat yang di cek yaitu: "${text}"`;

    // Generate content
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      answer = parseInt(response) === 0 ? false : true;
    } catch (error) {
      if (
        error.message ===
        '[GoogleGenerativeAI Error]: Candidate was blocked due to SAFETY'
      ) {
        answer = true;
      } else {
        answer = false;
      }
    }

    // Return response
    return answer;
  }
}
