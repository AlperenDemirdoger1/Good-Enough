
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PersonaType, MagicPayload } from "../types";

const SYSTEM_PROMPT_TEMPLATE = `
**ROLE:**
You are "Orbit," a highly advanced, empathetic AI parenting coach specializing in Neurodivergence (ADHD, Autism, Dyslexia, SPD). You are NOT a doctor; you are a supportive co-pilot for overwhelmed mothers.

**YOUR PHILOSOPHY:**
"Good Enough Parenting" (Donald Winnicott). You believe that perfection is impossible and damaging. Your goal is to help the parent accept their child's unique wiring and their own imperfections. Repair > Perfection.

**TONE SETTING:**
The user has selected the following persona style: {{TONE_STYLE}}

*   *Style A (Friendly):* Warm, uses emojis, informal ("Sen" language in Turkish). Friendly, like a best friend.
*   *Style B (Logical):* Data-driven, concise, formal ("Siz" language in Turkish). Scientific, clear, no fluff.
*   *Style C (Coach):* Motivational, action-oriented, direct questions.

**CONTEXT:**
You have already onboarded the user. You know the child's name and their struggle.
Your job now is to provide coaching, support, and scientific insights based on the user's questions.

**RULES:**
* **Active Listening:** Always validate the parent's feeling first.
* **Reframing:** Reframe the child's behavior.
* **Language:** Turkish (Natural, fluent).
`;

class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;
  private modelName = "gemini-2.5-flash";

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key is missing!");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
  }

  public startChat(persona: PersonaType) {
    let toneDescription = "";
    switch (persona) {
      case PersonaType.FRIENDLY:
        toneDescription = "Style A (Friendly): Warm, uses emojis, informal 'Sen'.";
        break;
      case PersonaType.LOGICAL:
        toneDescription = "Style B (Logical): Data-driven, concise, formal 'Siz'.";
        break;
      case PersonaType.COACH:
        toneDescription = "Style C (Coach): Motivational, action-oriented.";
        break;
    }

    const finalSystemInstruction = SYSTEM_PROMPT_TEMPLATE.replace("{{TONE_STYLE}}", toneDescription);

    try {
      this.chat = this.ai.chats.create({
        model: this.modelName,
        config: {
          systemInstruction: finalSystemInstruction,
        },
      });
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  }

  public async sendMessage(text: string): Promise<string> {
    if (!this.chat) {
      this.startChat(PersonaType.FRIENDLY);
    }
    try {
      const response: GenerateContentResponse = await this.chat!.sendMessage({ message: text });
      return response.text || "";
    } catch (error) {
      console.error("Error sending message:", error);
      return "Şu an seni çok iyi anlıyorum. Bu konuda yalnız değilsin. Hadi bunu biraz daha derinleştirelim, tam olarak ne hissettin?";
    }
  }
  
  // Returns structured data for the Magic Card
  public async generateInsight(parentName: string, childName: string, trigger: string, strength: string, feeling: string): Promise<MagicPayload> {
     try {
        // MOCKING THE LOGIC for best Demo Experience (Simulating a smart AI analysis)
        // Philosophy: "Good Enough Parenting" -> Reframe the struggle as a trait, and validate the feeling.
        
        let neuroType = "Potansiyel Kaşif";
        let insightText = "";
        
        if (strength.includes("Yaratıcılık")) {
             neuroType = "Yaratıcı Vizyoner Zihin";
             insightText = `${parentName}, ${childName} sınırları zorluyor çünkü dünyayı değiştirecek bir hayal gücü var. ${trigger.toLowerCase()} bir 'yaramazlık' değil, beyninin taşma anı. Senin ${feeling.toLowerCase()} hissin ise hata yaptığını değil, sadece çok önemsediğini gösterir. Mükemmel olmana gerek yok, yanında olman yeterli.`;
        } else if (strength.includes("Hafıza") || strength.includes("Odak")) {
             neuroType = "Derin İşlemci (Deep Processor)";
             insightText = `${parentName}, ${childName} her detayı bir sünger gibi emiyor. Yaşadığınız ${trigger.toLowerCase()} krizi, sisteminin 'mola' isteme şekli. ${feeling.toLowerCase()} hissetmen çok normal, çünkü derin hisseden bir çocuğu büyütmek yoğun bir iştir. Hata yapabilirsin, önemli olan onarmaktır.`;
        } else if (strength.includes("Enerji") || strength.includes("Adalet")) {
             neuroType = "Adalet Savaşçısı";
             insightText = `${childName} sana karşı gelmiyor, mantıksız bulduğu düzene başkaldırıyor. ${trigger.toLowerCase()} onun liderlik provası. ${parentName}, hissettiğin ${feeling.toLowerCase()} duygusu yetersizlik değil, bir liderle yaşamanın getirdiği doğal yorgunluktur.`;
        } else {
             // Fallback generic but warm
             neuroType = "Hassas Algılayıcı";
             insightText = `${childName}'in ${strength.toLowerCase()} özelliği bir hediye, ${trigger.toLowerCase()} ise bu hediyenin bazen ağır gelen paketi. Senin ${feeling.toLowerCase()} hissin, bu yolculukta ne kadar özverili olduğunun kanıtı. Kendine yüklenme ${parentName}, 'yeterince iyi' bir annesin.`;
        }

        return {
            insight: insightText,
            neuroType: neuroType,
            socialProof: `Şu an dünyada 45.000'den fazla anne tam olarak bu ${feeling.toLowerCase()} hissini yaşıyor ve çocuklarıyla büyüme sancısı çekiyor. Yalnız değilsin, biz bir köyüz.`
        };

     } catch (e) {
         return {
            insight: `${childName} zor bir çocuk değil, sadece dünyayı farklı frekanstan duyan bir çocuk. Senin yorgunluğun ise yetersizlikten değil, tercümanlık yapmaktan. Derin bir nefes al, her şey yolunda.`,
            neuroType: "Dinamik Algılayıcı",
            socialProof: "Bu yolculukta yalnız değilsin. Hata yapmak ebeveynliğin en doğal parçası."
         };
     }
  }
}

export const geminiService = new GeminiService();
