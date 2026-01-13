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
Bachelor of Engineering student in Computer Engineering with a strong foundation in Full-Stack Development and Machine Learning research. Experienced in leading research teams and developing complex web applications. 

WORK EXPERIENCE:
1. Research Team Leader & ELC Intern — Thapar Institute (Aug 2023 – Present)
   - Led a 4-member interdisciplinary team through a 6-week intensive research program.
   - Co-authored and submitted the research paper "Comparative Evaluation of Machine Learning and Deep Learning Techniques for EEG-based ADHD Detection".
   - Presented findings to a college-wide audience, demonstrating superior model accuracy (95.83%) compared to existing literature.

TECHNICAL SKILLS:
Programming Languages:
- C++, Python, JavaScript, SQL, HTML, CSS
Frameworks & Libraries:
- React, Node.js, Express.js, Spring, Hibernate
- NumPy, Pandas, Scikit-learn
Databases:
- MongoDB, MySQL, PostgreSQL, Oracle
Cloud & Tools:
- AWS, GitHub, VS Code, Jupyter Notebook

PROJECT PORTFOLIO:
1. Full-Stack Stock Trading Platform
   - Tech: React, Node.js, Express.js, MongoDB, Bootstrap
   - Built a responsive trading platform with real-time market watchlists and portfolio views.
   - Engineered RESTful API backend with secure authentication (bcryptjs).
   - Implemented CRUD operations and Portfolio analytics using Chart.js.
2. EEG Signal Classification Pipeline (ADHD Detection)
   - Tech: Python, NumPy, Pandas, Scikit-learn
   - Developed an ML pipeline using EEG signals from 121 children.
   - Extracted 760 features across 19 EEG channels (time/frequency-domain).
   - Achieved 95.83% accuracy using GPC, Random Forest, SVM, and MLP models.

ACHIEVEMENTS & SCHOLARSHIPS:
- Reliance Foundation Undergraduate Scholar (Ranked top 100,000+ applicants).
- Merit-Based Scholarship recipient (Top 50 in Computer Engineering branch).
- LeetCode: 300+ Problems Solved (Rank ~389,000, Rating 1392).
- GeeksforGeeks: 180+ Problems Solved.
- 100 Days Badge 2025 (LeetCode).

ADDITIONAL INFORMATION:
Soft Skills: Problem-solving, Team Leadership, Research, Analytical Thinking.
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
  "work style": "I am a research-oriented developer who values precision and collaboration. My experience leading a research team at Thapar Institute taught me how to manage timelines and interdisciplinary responsibilities effectively.",
  "experience": "I currently serve as a Research Team Leader & ELC Intern at Thapar Institute, where I led a team to publish research on EEG-based ADHD detection, achieving 95.83% model accuracy.",
  "skills": "I specialize in Full-Stack Development (MERN Stack, Spring/Hibernate) and Machine Learning (Python, Scikit-learn). I'm also proficient in C++ and SQL, with strong CS fundamentals.",
  "education": "I am pursuing a Bachelor of Engineering in Computer Engineering at Thapar Institute of Engineering and Technology with a current CGPA of 8.88/10.0.",
  "projects": "My key projects include a Full-Stack Stock Trading Platform (React/Node.js) featuring real-time analytics, and a high-accuracy EEG Signal Classification Pipeline for ADHD detection.",
  "contact": "You can reach me via email at chiragbansal192005@gmail.com or connect with me on LinkedIn at linkedin.com/in/aspiring-chirag-bansal-.",
  "achievements": "I am a Reliance Foundation Scholar and a Merit Scholarship recipient (Top 50 in branch). I've solved 300+ problems on LeetCode and earned the 100 Days Badge 2025.",
  "leadership": "As a Research Team Leader, I guided a 4-member team through a 6-week intensive research program, culminating in a research paper submission and college-wide presentation.",
  "availability": "I am currently open to internship opportunities in Full Stack Development and Machine Learning roles.",
  "text": "You can connect with me on LinkedIn (linkedin.com/in/aspiring-chirag-bansal-) or check out my code on GitHub (github.com/cb-786).",
  "contact information": "Feel free to email me at chiragbansal192005@gmail.com or find me on LinkedIn.",
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
      return `I apologize, but I'm having trouble processing your query at the moment. Please try again or rephrase your question.`;
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
    "linkedin"
  ];

  const lowerQuery = query.toLowerCase().trim();
  
  // Check if query starts with or matches any hardcoded keyword (prefix matching)
  return hardcodedKeywords.some((keyword) =>
    keyword.startsWith(lowerQuery) || lowerQuery.startsWith(keyword)
  );
}