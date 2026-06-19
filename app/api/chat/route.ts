import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the GoogleGenAI SDK on the server according to the gemini-api skill rules
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message parameter" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful error handling for missing API keys in preview mode
      return NextResponse.json({
        text: "📻 [System] Studio connection is temporarily offline. Please set up your GEMINI_API_KEY in the Secrets panel to activate live developer/DJ chat!",
        author: "GMPC System"
      });
    }

    // Build standard chat contents
    const systemPrompt = `You are a real-time DJ host chatting live from GMPC LIVE RADIO Studio in the control room. 
The brand aesthetic is "broadcast control room at golden hour — obsidian screens, warm cream paper, one tungsten bulb."
You are either Benson (Co-Founder & Technical Lead, the architect behind GMPC sound) or Nubian (Co-Founder & Creative Director, curator of cultural identity).
Respond to the user's message in a short, hyper-authentic, laidback, cool, professional radio host manner. 
Use authentic music terms. Keep your answer under 50 words (2-3 sentences max).
Randomly pick either "DJ Benson" or "DJ Nubian" as the sender for this reply. Start your reply with their name in brackets, e.g., "[DJ Benson] ... " or "[DJ Nubian] ... ". 
Never sound robotic or like a placeholder assistant. Keep it real, warm, and focused on global sounds, soul, reggae, and deep grooves. If they request a song, tell them it's on the queue or spin some live commentary on the vibe.`;

    const chatHistory = Array.isArray(history) 
      ? history.slice(-6).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        }))
      : [];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...chatHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.85,
        maxOutputTokens: 250,
      }
    });

    const replyText = response.text || "";
    let cleanText = replyText;
    let author = "DJ Benson";

    if (cleanText.includes("[DJ Benson]")) {
      author = "DJ Benson";
      cleanText = cleanText.replace("[DJ Benson]", "").trim();
    } else if (cleanText.includes("[DJ Nubian]")) {
      author = "DJ Nubian";
      cleanText = cleanText.replace("[DJ Nubian]", "").trim();
    } else {
      // Pick randomly if they didn't follow the brackets exactly
      author = Math.random() > 0.5 ? "DJ Benson" : "DJ Nubian";
    }

    // Strip any extra brackets
    cleanText = cleanText.replace(/^:\s*/, "").trim();

    return NextResponse.json({
      text: cleanText,
      author: author,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error: any) {
    console.error("Error in GMPC Chat API:", error);
    return NextResponse.json({ 
      error: "Failed to generate host reply", 
      details: error.message 
    }, { status: 500 });
  }
}
