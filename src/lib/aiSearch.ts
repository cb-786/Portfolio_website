// Resume context for AI assistant
const RESUME_CONTEXT = `PERSONAL INFORMATION & CONTACT:
Name: Chirag Bansal
Role: Computer Engineering Student
Education: Bachelor of Engineering, Thapar Institute of Engineering and Technology (CGPA: 8.88 / 10.0)
Email: chiragbansal192005@gmail.com
LinkedIn: linkedin.com/in/aspiring-chirag-bansal-
GitHub: github.com/cb-786
LeetCode: leetcode.com/u/Chirag_bansal192005/
GeeksforGeeks: geeksforgeeks.org/profile/chiragbansv1qd

PROFESSIONAL SUMMARY:
Bachelor of Engineering student in Computer Engineering specializing in Full-Stack Development, Advanced AI Architectures (GraphRAG), and Machine Learning research. Experienced in team leadership and building scalable, data-driven pipelines.

WORK EXPERIENCE:
1. Research Team Leader & ELC Intern — Thapar Institute (Jun 2025 – Jul 2025)
   - Led a 4-member interdisciplinary team through a 6-week intensive research program focused on EEG-based ADHD detection.
   - Co-authored and submitted a peer-reviewed research paper comparing ML and DL models, surpassing existing literature accuracy benchmarks.
   - Handled project timelines and technical synchronization across cross-functional research domains.

TECHNICAL SKILLS:
Programming Languages:
- C++, Python, JavaScript, SQL, MATLAB
Web Technologies:
- HTML, CSS, React, Node.js, Express.js
Frameworks & Libraries:
- GraphRAG, Spring, Hibernate, NumPy, Pandas, Scikit-learn
Databases:
- MongoDB, MySQL, PostgreSQL, Oracle
AI Tools & Developer Utilities:
- Cursor, Claude Code, GitHub Copilot, Ollama, Google AI Studio
Tools, Platforms & Concepts:
- Linux (Arch), Git, GitHub, VS Code, Jupyter Notebook
- Data Structures & Algorithms (DSA), OOP, DBMS, Operating Systems, Full-Stack Development

PROJECT PORTFOLIO:
1. GovIntel.AI - Enterprise Semantic Search Engine
   - Tech: Python, GraphRAG, Ollama, Local LLMs, Vector Databases
   - Architected a highly scalable AI search engine deploying GraphRAG memory retrieval for instant data synthesis.
   - Engineered a multimodal ingestion pipeline mapping unstructured speech and text directly to National Industrial Classification (NIC) codes with near-zero latency.
2. Full-Stack Stock Trading Platform
   - Tech: React, Node.js, Express.js, MongoDB, Bootstrap, Chart.js
   - Built an institutional-grade stock trading ecosystem with real-time watchlists and comprehensive portfolio analytics.
   - Engineered a robust backend API infrastructure featuring secure token-based authentication (JWT + bcryptjs).
3. EEG Signal Classification Pipeline (ADHD Detection)
   - Tech: Python, NumPy, Pandas, Scikit-learn, SciPy
   - Single-handedly developed a machine learning pipeline analyzing multi-channel EEG signals from 121 pediatric subjects.
   - Extracted 760 spatial-domain and morphological features across 19 channels, achieving a benchmark-shattering 99.23% validation accuracy.

ACHIEVEMENTS & SCHOLARSHIPS:
- Reliance Foundation Undergraduate Scholar (Selected among 100,000+ national applicants).
- Merit-Based Scholarship recipient (Ranked in the top 50 of the Computer Engineering branch at Thapar).
- LeetCode: Solved 300+ DSA problems (Peak Contest Rating: 1607).
- Codeforces: Active competitive programmer holding the Pupil title (Peak Rating: 1306).
- CodeChef: Rated contest participant (Rating: 1259).
- GeeksforGeeks: Solved 200+ fundamental coding problems.
`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

// Fallback responses for common queries when AI fails
const fallbackResponses: Record<string, string> = {
  "work style": "I am an AI-driven, research-oriented engineer combining deep algorithmic foundation with modern tools like Cursor and Claude Code to deliver high-performance solutions.",
  "experience": "I served as a Research Team Leader at Thapar Institute, steering a 4-member team to build a high-accuracy EEG-based ADHD detection system and co-authoring a research paper.",
  "skills": "I specialize in Full-Stack development (MERN, Spring), AI engineering (GraphRAG, Local LLMs via Ollama), and Advanced Machine Learning pipelines using Python, Linux (Arch), and C++.",
  "education": "I am pursuing a Bachelor of Engineering in Computer Engineering at Thapar Institute of Engineering and Technology, maintaining an excellent CGPA of 8.88/10.0.",
  "projects": "My flagship work includes GovIntel.AI (a multimodal GraphRAG search engine mapping text/speech to NIC codes) and an institutional-grade Full-Stack Stock Trading Platform.",
  "contact": "You can absolutely reach me via email at chiragbansal192005@gmail.com or securely connect via my professional LinkedIn at linkedin.com/in/aspiring-chirag-bansal-.",
  "achievements": "I'm a national Reliance Foundation Scholar, rank in the top 50 of my engineering branch, and compete actively in CP with a 1607 LeetCode and 1306 Codeforces Pupil rating.",
  "leadership": "As a Research Team Leader at Thapar, I guided a 4-member cross-functional group through complex dataset management, paper submission, and technical presentation milestones.",
  "availability": "I am actively looking for software engineering and AI/ML internship opportunities for the upcoming placement drive starting after June.",
  "text": "Feel free to review my complete open-source code repositories directly on my GitHub profile (github.com/cb-786) or view my professional portfolio layout.",
  "contact information": "Please drop an email directly to chiragbansal192005@gmail.com or hit me up on LinkedIn for any opportunities or technical discussion.",
  "govintel": "GovIntel.AI is an enterprise semantic search engine I built using GraphRAG and local LLMs to seamlessly parse unstructured text or speech and classify it into standard NIC codes.",
  "graphrag": "I implement GraphRAG configurations locally using Ollama and structural knowledge graphs to deliver deep context-aware synthesis that traditional vector search systems cannot achieve.",
  "linux": "I manage my entire development environment on an Arch Linux distribution using advanced terminal workflows and highly-optimized system tiling for optimal resource usage."
};

function getFallbackResponse(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check for exact matches first
  if (fallbackResponses[normalizedQuery]) {
    return fallbackResponses[normalizedQuery];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(fallbackResponses)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      return value;
    }
  }
  
  return null;
}

export async function queryAI(query: string): Promise<string> {
  try {
    // Support multiple Gemini keys. The environment can provide:
    // - VITE_GEMINI_API_KEYS (comma-separated list)
    // - VITE_GEMINI_API_KEY1 ... VITE_GEMINI_API_KEY5
    // - fallback VITE_GEMINI_API_KEY (single key)
    const env = (import.meta as any).env || {};

    function getGeminiKeys(): string[] {
      const keys: string[] = [];
      if (env.VITE_GEMINI_API_KEYS) {
        keys.push(...String(env.VITE_GEMINI_API_KEYS).split(',').map((k: string) => k.trim()).filter(Boolean));
      }
      for (let i = 1; i <= 5; i++) {
        const k = env[`VITE_GEMINI_API_KEY${i}`];
        if (k) keys.push(String(k));
      }
      if (env.VITE_GEMINI_API_KEY) {
        keys.push(String(env.VITE_GEMINI_API_KEY));
      }
      // de-duplicate while preserving order
      return Array.from(new Set(keys));
    }

    // Persistent rotation index: pick a random initial key per user, then rotate
    function consumeStartIndex(n: number): number {
      if (n <= 0) return 0;
      try {
        const stored = localStorage.getItem('gemini_key_index');

        // If we have a stored next-index, use it. Otherwise, pick a random start
        if (stored) {
          let idx = parseInt(stored, 10);
          const start = idx % n;
          idx = (idx + 1) % n;
          localStorage.setItem('gemini_key_index', String(idx));
          return start;
        } else {
          const randomStart = Math.floor(Math.random() * n);
          const next = (randomStart + 1) % n;
          localStorage.setItem('gemini_key_index', String(next));
          return randomStart;
        }
      } catch (e) {
        // Non-browser or localStorage error: use a global fallback with random init
        const g = globalThis as any;
        if (typeof g.__GEMINI_ROTATION_INDEX !== 'number') {
          const randomStart = Math.floor(Math.random() * n);
          g.__GEMINI_ROTATION_INDEX = (randomStart + 1) % n;
          return randomStart;
        }
        const start = g.__GEMINI_ROTATION_INDEX % n;
        g.__GEMINI_ROTATION_INDEX = (g.__GEMINI_ROTATION_INDEX + 1) % n;
        return start;
      }
    }

    const keys = getGeminiKeys();
    if (!keys || keys.length === 0) {
      console.error("Gemini API key(s) not configured");
      return "AI feature not configured. Please check the environment variables.";
    }

    // Enhanced prompt with better context and instructions
    const prompt = `You are an AI assistant for Chirag Bansal's portfolio website. You have access to Chirag's complete professional profile and should provide helpful, accurate responses to visitors' questions. Consider the following detailed information:
${RESUME_CONTEXT}

Question: ${query}
Instructions for providing responses:
1. Voice and Tone:
   - Answer in Chirag's voice (first person)
   - Be confident but humble
2. Content Guidelines:
   - Provide specific, data-backed information when available
   - Highlight achievements and metrics that support your answer
3. Response Structure:
  - Prefer concise answers, but always finish sentences and include proper punctuation. Do not truncate important details. And DON'T Exceed 2 lines in response.
  - Keep the response as condensed as possible while ensuring clarity and completeness.
  - Start with the most relevant information
5. Always:
   - Stay within the scope of the provided information
   - Maintain consistency with the portfolio website
Remember: You are representing a professional developer's portfolio. Your responses should reflect technical expertise while remaining accessible to all visitors.`;

    // Try each configured key in round-robin order. We consume a start index so
    // each call prefers a different primary key and will retry with others.
    const start = consumeStartIndex(keys.length);
    let lastErrorText: string | null = null;
    let data: GeminiResponse | null = null;
    let ok = false;

    for (let attempt = 0; attempt < keys.length; attempt++) {
      const key = keys[(start + attempt) % keys.length];
      try {
        const resp = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.3,
                topP: 0.6,
                topK: 30,
              },
            }),
          }
        );

        if (!resp.ok) {
          const txt = await resp.text();
          lastErrorText = `status=${resp.status} body=${txt}`;
          // try the next key
          continue;
        }

        data = await resp.json();
        ok = true;
        break;
      } catch (err: any) {
        lastErrorText = String(err?.message || err);
        // try next key
        continue;
      }
    }

    if (!ok || !data) {
      console.error("All Gemini keys failed", lastErrorText);
      const fallback = getFallbackResponse(query);
      if (fallback) return fallback;
      return `I apologize, but I'm having trouble processing your query at the moment. Please try again or rephrase your question Simon.`;
    }

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // Validate and clean up the response
    if (!text || text.length < 10) {
      console.warn("Empty or very short response from API");
      const fallback = getFallbackResponse(query);
      if (fallback) {
        return fallback;
      }
      return "I'm sorry, but I couldn't generate a meaningful response. Please try rephrasing your question.";
    }

    return text;
  } catch (error) {
    console.error("Error in queryAI:", error);
    
    // Try to get a fallback response
    const fallback = getFallbackResponse(query);
    if (fallback) {
      return fallback;
    }
    
    return "I apologize, but I'm having trouble processing your request. Please try again in a moment.";
  }
}

export function isHardcodedQuery(query: string): boolean {
  const hardcodedKeywords = [
    // Navigation
    "projects",
    "contact",
    "resume",
    "theme",
    "cv",
    "github",
    "linkedin",
    "govintel",
    "graphrag"
  ];

  const lowerQuery = query.toLowerCase().trim();
  
  // Check if query starts with or matches any hardcoded keyword (prefix matching)
  return hardcodedKeywords.some((keyword) =>
    keyword.startsWith(lowerQuery) || lowerQuery.startsWith(keyword)
  );
}