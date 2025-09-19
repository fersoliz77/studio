// src/app/chat/page.tsx
'use client';

import { ChatAssistant } from '@/components/chat-assistant';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks/use-locale';
import { Header } from '@/components/header'; // Import Header
import { motion } from 'framer-motion'; // Import motion for animations

export default function ChatPage() {
  const { t } = useTranslation();
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header /> {/* Render the Header here */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-24"> {/* Adjusted padding-top */}
        <motion.div
          className="w-full max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-primary font-headline"
              variants={itemVariants}
            >
              {t('header.aiAssistant')}
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mt-2"
              variants={itemVariants}
            >
              {t('chat.description')}
            </motion.p>
          </div>
          <motion.div variants={itemVariants}>
            <ChatAssistant lang={locale} />
          </motion.div>
        </motion.div>
      </main>
      <footer className="py-6 text-center text-muted-foreground"> {/* Add footer */}
        <p>&copy; {new Date().getFullYear()} Fer Soliz. {t('footer.copyright')}</p>
      </footer>
    </div>
  );
}
