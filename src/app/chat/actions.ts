// src/app/chat/actions.ts
'use server';

import { portfolioChatAssistantFlow, ChatAssistantInput, ChatAssistantOutput } from '@/ai/flows/portfolio-chat-assistant';
import fs from 'fs/promises';
import path from 'path';

// Helper to read and format portfolio context
async function getPortfolioContext(lang: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'translation.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);

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
    Ideal Clients: ${data.about.idealClientsList.join(', ')}
    Services Offered: ${data.about.servicesList.join(', ')}
    `;
    }

    // Skills
    if (data.skills && data.skills.categories) {
      context += `
    Skills:
    `;
      for (const categoryKey in data.skills.categories) {
        const category = data.skills.categories[categoryKey];
        context += `  ${category.title}: ${category.items.map((item: { name: any; }) => item.name).join(', ')}\n`;
      }
      if (data.skills.softSkills && data.skills.softSkills.items) {
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
    Technologies: ${data.projects.project1.technologies.join(', ')}
    Status: ${data.projects.project1.status}
    Demo: ${data.projects.project1.demoUrl}

    Project 2: ${data.projects.project2.title}
    What it is: ${data.projects.project2.what}
    Goal: ${data.projects.project2.goal}
    Role: ${data.projects.project2.role}
    Technologies: ${data.projects.project2.technologies.join(', ')}
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
    console.error(`Failed to load portfolio context for lang ${lang}:`, error);
    return `No portfolio information available for language ${lang}.`;
  }
}

export async function chatWithPortfolioAssistant(
  message: string,
  history: Array<{ role: 'user' | 'model'; content: string }>,
  lang: string
): Promise<ChatAssistantOutput> {
  const portfolioContext = await getPortfolioContext(lang);

  const input: ChatAssistantInput = {
    message,
    history,
    portfolioContext,
  };

  return portfolioChatAssistantFlow(input);
}
