import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { geminiKey } from './gemini.key';
import { Product } from '../../src/products/product';

export class GeminiModel {
  private apiKey: string;
  private genAI: GoogleGenerativeAI;
  private model;
  private generationConfig;

  constructor() {
    this.apiKey = geminiKey;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: 'Sua única função é você recebe um json com 2 campos title e description que podem ou não estar preenchidos, e você retorna um json completando ou criando os dois campos a partir da imagem, lembre-se esse descrição é para a venda do produto da imagem.',
    });

    this.generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    };
  }

  private async fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  async generateDescriptions(file: File, title: string, description: string) : Promise<Product> {
    const chatSession = this.model.startChat({
      generationConfig: this.generationConfig,
    });
  
    const prompt = { title, description};
    const img = await this.fileToGenerativePart(file) as Part;

    const result = (await chatSession.sendMessage([JSON.stringify(prompt), img])).response.text();
    const resultJson = JSON.parse(result);
    return new Product(resultJson.title, resultJson.description, img.inlineData.data);
  }

  async generateNewDescriptions(file: string, title: string, description: string) : Promise<Product> {
    const chatSession = this.model.startChat({
      generationConfig: this.generationConfig,
    });
  
    const prompt = { title, description};
    const img = { inlineData: { data: file, mimeType: 'image/png' } };

    console.log('Prompt', prompt);

    const result = (await chatSession.sendMessage([JSON.stringify(prompt), img])).response.text();
    const resultJson = JSON.parse(result);
    return new Product(resultJson.title, resultJson.description, img.inlineData.data);   
  }
  
}
