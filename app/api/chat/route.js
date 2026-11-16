import { NextResponse } from 'next/server';
import { GEMINI_SYSTEM_PROMPT } from '@/lib/agent-knowledge';
import { getAgentReply, extractKva, generateQuotationCard, generateWorkOrderCard } from '@/lib/agent-engine';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history = [], apiKey: clientApiKey, hasImage = false, fileData = null } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmedMsg = message.trim();
    const lower = trimmedMsg.toLowerCase();
    const apiKey = (clientApiKey && clientApiKey.trim()) || process.env.GEMINI_API_KEY;

    // Check for work order intent first
    const isWoIntent = lower.includes('work order') || lower.includes('workorder') || lower.includes('purchase order') || lower.includes('order place');
    if (isWoIntent) {
      const kva = extractKva(lower) || '1000 kVA';
      const woCard = generateWorkOrderCard({ kva });
      return NextResponse.json({
        reply: `<strong>Autonomous Official Work Order Generated!</strong> 📝<br>Our automated procurement system has processed your requirements end-to-end:<br><br>${woCard}`,
        source: 'agent-engine',
        model: 'BPEL Autonomous Procurement Engine'
      });
    }

    // If Gemini API Key is available, invoke Google Gemini Generative Language API
    if (apiKey) {
      try {
        const docContext = fileData
          ? `\n[User uploaded attached technical file: "${fileData.name}" (${fileData.size || ''}, ${fileData.type || ''})${fileData.textContent ? `\nContent Excerpt:\n${fileData.textContent.slice(0, 1500)}` : ''}]`
          : '';

        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: `${GEMINI_SYSTEM_PROMPT}${docContext}\n\nUser Question${hasImage ? ' (User uploaded equipment photo)' : ''}: ${trimmedMsg}`
              }
            ]
          }
        ];

        // Include recent history if present
        if (Array.isArray(history) && history.length > 0) {
          const formattedHistory = history.slice(-6).map(h => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text || h.html || '' }]
          }));
          contents.unshift(...formattedHistory);
        }

        // Call Google Gemini API (gemini-1.5-flash)
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1000
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            let htmlReply = candidateText
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n\n/g, '<br><br>')
              .replace(/\n/g, '<br>');

            const detectedKva = extractKva(trimmedMsg);
            const isQuoteIntent = /quote|quotation|price|cost|daam|rate|pricing/i.test(trimmedMsg);
            if (detectedKva && isQuoteIntent) {
              const card = generateQuotationCard(detectedKva);
              htmlReply += `<br><br>${card}`;
            }

            return NextResponse.json({
              reply: htmlReply,
              source: 'gemini',
              model: 'BPEL Technical Sales Agent'
            });
          }
        } else {
          console.warn('Gemini API call returned non-200, falling back to agent engine', res.status);
        }
      } catch (geminiErr) {
        console.warn('Gemini API request failed, falling back to agent engine:', geminiErr.message);
      }
    }

    // High-fidelity fallback to BPEL Autonomous Agent Engine
    const localReply = getAgentReply(trimmedMsg, { history, hasImage, fileData });
    return NextResponse.json({
      reply: localReply,
      source: 'agent-engine',
      model: 'BPEL Autonomous Engineering Agent'
    });
  } catch (err) {
    console.error('Chat API route error:', err);
    return NextResponse.json(
      {
        reply: `Thank you for reaching out. Our engineering server is processing your request. Please contact our 24/7 hotline at <a href="tel:+88029885601">+880 2 988 5601</a> or <a href="https://wa.me/8801713000001" class="chat-action-btn chat-action-btn--wa" target="_blank">Chat on WhatsApp 💬</a>`,
        source: 'fallback'
      },
      { status: 200 }
    );
  }
}
