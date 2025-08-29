import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "hero": {
            "badge": "UX/UI Designer & Researcher",
            "name": "Fer Soliz",
            "description": "I specialize in creating intuitive and engaging digital experiences that solve real-world problems.",
            "contact": "Contact Me",
            "download": "Download CV"
          },
          "projects": {
            "title": "My Work",
            "description": "A selection of my UX/UI design projects.",
            "caseStudy": "Case Study",
            "figmaFile": "Figma File",
            "project1": {
              "title": "Mobile Banking App Redesign",
              "description": "A complete redesign of a mobile banking app, focusing on improving user flow and accessibility.",
              "tags": ["UX Design", "UI Design", "Figma", "Accessibility"]
            },
            "project2": {
              "title": "E-commerce Platform UX Research",
              "description": "Conducted user research to identify pain points and opportunities for improvement in an e-commerce platform.",
              "tags": ["UX Research", "User Interviews", "Usability Testing"]
            },
            "project3": {
              "title": "SaaS Dashboard Design System",
              "description": "Developed a comprehensive design system for a SaaS dashboard to ensure consistency and scalability.",
              "tags": ["Design System", "UI Components", "Figma"]
            }
          },
          "skills": {
            "title": "My UX/UI Expertise",
            "description": "Specializing in creating intuitive and user-centered digital experiences.",
            "userResearch": "User Research",
            "usabilityTesting": "Usability Testing",
            "infoArchitecture": "Information Architecture",
            "wireframing": "Wireframing",
            "prototyping": "Prototyping",
            "uiDesign": "UI Design",
            "designSystems": "Design Systems",
            "figma": "Figma",
            "categories": {
              "uxResearch": "UX Research",
              "uxDesign": "UX Design",
              "uiDesign": "UI Design",
              "tools": "Tools"
            }
          },
          "contact": {
            "title": "Get in Touch",
            "description": "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
            "email": "Email",
            "phone": "Phone",
            "location": "Location",
            "formTitle": "Send me a message",
            "formDescription": "I'll get back to you as soon as possible.",
            "namePlaceholder": "Your Name",
            "emailPlaceholder": "Your Email",
            "messagePlaceholder": "Your Message",
            "sendMessage": "Send Message"
          },
          "header": {
            "name": "Fer Soliz",
            "skills": "Skills",
            "work": "Work",
            "contact": "Contact",
            "aiAssistant": "AI Assistant"
          },
          "footer": {
            "copyright": "All rights reserved."
          }
        }
      },
      es: {
        translation: {
          "hero": {
            "badge": "Diseñadora e Investigadora UX/UI",
            "name": "Fer Soliz",
            "description": "Me especializo en crear experiencias digitales intuitivas y atractivas que resuelven problemas del mundo real.",
            "contact": "Contáctame",
            "download": "Descargar CV"
          },
          "projects": {
            "title": "Mi Trabajo",
            "description": "Una selección de mis proyectos de diseño UX/UI.",
            "caseStudy": "Caso de Estudio",
            "figmaFile": "Archivo de Figma",
            "project1": {
              "title": "Rediseño de Aplicación de Banca Móvil",
              "description": "Un rediseño completo de una aplicación de banca móvil, centrado en mejorar el flujo de usuario y la accesibilidad.",
              "tags": ["Diseño UX", "Diseño UI", "Figma", "Accesibilidad"]
            },
            "project2": {
              "title": "Investigación UX de Plataforma de E-commerce",
              "description": "Realicé una investigación de usuarios para identificar puntos débiles y oportunidades de mejora en una plataforma de e-commerce.",
              "tags": ["Investigación UX", "Entrevistas a Usuarios", "Pruebas de Usabilidad"]
            },
            "project3": {
              "title": "Sistema de Diseño de Dashboard SaaS",
              "description": "Desarrollé un sistema de diseño completo para un dashboard SaaS para garantizar la consistencia y escalabilidad.",
              "tags": ["Sistema de Diseño", "Componentes de UI", "Figma"]
            }
          },
          "skills": {
            "title": "Mi Experiencia en UX/UI",
            "description": "Especializada en crear experiencias digitales intuitivas y centradas en el usuario.",
            "userResearch": "Investigación de Usuarios",
            "usabilityTesting": "Pruebas de Usabilidad",
            "infoArchitecture": "Arquitectura de la Información",
            "wireframing": "Wireframing",
            "prototyping": "Prototipado",
            "uiDesign": "Diseño de UI",
            "designSystems": "Sistemas de Diseño",
            "figma": "Figma",
            "categories": {
              "uxResearch": "Investigación UX",
              "uxDesign": "Diseño UX",
              "uiDesign": "Diseño UI",
              "tools": "Herramientas"
            }
          },
          "contact": {
            "title": "Ponte en Contacto",
            "description": "Siempre estoy abierta a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tus visiones.",
            "email": "Correo Electrónico",
            "phone": "Teléfono",
            "location": "Ubicación",
            "formTitle": "Envíame un mensaje",
            "formDescription": "Te responderé lo antes posible.",
            "namePlaceholder": "Tu Nombre",
            "emailPlaceholder": "Tu Correo Electrónico",
            "messagePlaceholder": "Tu Mensaje",
            "sendMessage": "Enviar Mensaje"
          },
          "header": {
            "name": "Fer Soliz",
            "skills": "Habilidades",
            "work": "Trabajo",
            "contact": "Contacto",
            "aiAssistant": "Asistente IA"
          },
          "footer": {
            "copyright": "Todos los derechos reservados."
          }
        }
      }
    }
  });

export default i18n;
