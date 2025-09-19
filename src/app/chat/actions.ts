// src/app/chat/actions.ts
'use server';

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

// Direct import of translation files, the idiomatic Next.js way.
// This ensures they are bundled with the server code and always available.
import translationEN from '@/../public/locales/en/translation.json';
import translationES from '@/../public/locales/es/translation.json';

// Helper to get portfolio context from the already imported JSON module.
function getPortfolioContext(lang: string): string {
  try {
    const data = lang === 'es' ? translationES : translationEN;

    if (!data) {
      throw new Error(`Translation data for lang '${lang}' not found.`);
    }

    let context = `
    --- Portfolio Information (${lang}) ---
    `;

    // General Info (Hero & About)
    if (data.hero) {
      context += `
    About the Developer:
    Name: ${data.hero.name}
    Role: ${data.hero.badge}
    Description: ${data.hero.description} ${data.hero.secondaryDescription}
    Tagline: ${data.hero.tagline}
    `;
    }

    if (data.about) {
      context += `
    More About Fer Soliz:
    ${data.about.description}
    How I Work: ${data.about.howIWorkDescription}
    Ideal Clients: ${Array.isArray(data.about.idealClientsList) ? data.about.idealClientsList.join(', ') : ''}
    Services Offered: ${Array.isArray(data.about.servicesList) ? data.about.servicesList.join(', ') : ''}
    `;
    }

    // Skills
    if (data.skills && data.skills.categories) {
      context += `
    Skills:
    `;
      for (const categoryKey in data.skills.categories) {
        const category = data.skills.categories[categoryKey as keyof typeof data.skills.categories];
        if (category && Array.isArray(category.items)) {
           context += `  ${category.title}: ${category.items.map((item: { name: any; }) => item.name).join(', ')}\n`;
        }
      }
      if (data.skills.softSkills && Array.isArray(data.skills.softSkills.items)) {
        context += `  Soft Skills: ${data.skills.softSkills.items.map((item: { name: any; }) => item.name).join(', ')}\n`;
      }
    }

    // Projects
    if (data.projects && data.projects.project1 && data.projects.project2) {
      context += `
    Projects:
    Project 1: ${data.projects.project1.title}
    What it is: ${data.projects.project1.what}
    Problem: ${data.projects.project1.problem}
    Solution: ${data.projects.project1.solution}
    Role: ${data.projects.project1.role}
    Technologies: ${Array.isArray(data.projects.project1.technologies) ? data.projects.project1.technologies.join(', ') : ''}
    Status: ${data.projects.project1.status}
    Demo: ${data.projects.project1.demoUrl}

    Project 2: ${data.projects.project2.title}
    What it is: ${data.projects.project2.what}
    Goal: ${data.projects.project2.goal}
    Role: ${data.projects.project2.role}
    Technologies: ${Array.isArray(data.projects.project2.technologies) ? data.projects.project2.technologies.join(', ') : ''}
    Status: ${data.projects.project2.status}
    Demo: ${data.projects.project2.demoUrl}
    `;
    }

    // Contact Info
    if (data.contact) {
      context += `
    Contact Information:
    Email: ${data.contact.email}
    Phone/WhatsApp: ${data.contact.phone}
    Location: ${data.contact.location}
    `;
    }

    context += `
    --- End Portfolio Information ---
    `;

    return context;
  } catch (error) {
    console.error(`Failed to generate portfolio context for lang ${lang}:`, error);
    return `Error: Could not generate portfolio information for language '${lang}'.`;
  }
}

// Define the output structure for the chat action
interface ChatOutput {
  response: string;
}

export async function chatWithPortfolioAssistant(
  message: string,
  history: Array<{ role: 'user' | 'model'; content: string }>,
  lang: string
): Promise<ChatOutput> {
  const portfolioContext = getPortfolioContext(lang);

  // Check if the context failed to load and return a helpful message
  if (portfolioContext.startsWith('Error:')) {
    return {
      response: `I'm sorry, but I encountered an internal error and couldn't access the portfolio information right now. Please try again later.`
    };
  }

  const systemInstruction = `You are a helpful and friendly AI assistant for a developer's online portfolio named Fer Soliz.
    Your goal is to answer questions about Fer Soliz's projects, skills, experience, and general information based ONLY on the provided context.
    Be concise, professional, and engaging.
    If you don't know the answer based on the provided context, politely state that you don't have that information.

    Here is the portfolio information you should use:
    ${portfolioContext}
    `;

  const result = await generateText({
    model: google('gemini-1.5-flash'),
    system: systemInstruction,
    messages: [...history.map(m => ({ role: m.role === 'model' ? 'assistant' : m.role, content: m.content})), { role: 'user', content: message }],
  });

  return {
    response: result.text
  };
}
