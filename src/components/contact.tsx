import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useToast } from "@/components/ui/use-toast";

export function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    if (form.current) {
      emailjs.sendForm('service_gmp5tx2', 'template_gjpugf9', form.current, 'UN9L4rz3vc2mZfQaX')
        .then((result) => {
            console.log(result.text);
            toast({
              title: t('toast.contactSuccess.title'),
              description: t('toast.contactSuccess.description'),
            });
            if (form.current) form.current.reset();
        }, (error) => {
            console.log(error.text);
            toast({
              title: t('toast.contactError.title'),
              description: t('toast.contactError.description'),
              variant: "destructive",
            });
        }).finally(() => {
          setIsSending(false);
        });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('contact.title')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('contact.description')}</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-8">
            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center">
                <FaEnvelope className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.emailTitle')}</h3>
                <a href={`mailto:${t('contact.email')}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('contact.email')}
                </a>
              </div>
            </motion.div>
            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center">
                <FaPhone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.phoneTitle')}</h3>
                <p className="text-muted-foreground">{t('contact.phone')}</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center">
                <FaMapMarkerAlt className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.locationTitle')}</h3>
                <p className="text-muted-foreground">{t('contact.location')}</p>
              </div>
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.formTitle')}</CardTitle>
                <CardDescription>{t('contact.formDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <Input name="from_name" placeholder={t('contact.namePlaceholder')} required />
                  <Input type="email" name="from_email" placeholder={t('contact.emailPlaceholder')} required />
                  <Textarea name="message" placeholder={t('contact.messagePlaceholder')} rows={5} required />
                  <Button type="submit" size="lg" className="w-full md:w-auto transition-transform duration-300 hover:scale-105" disabled={isSending}>
                    <FaPaperPlane className="mr-2 h-4 w-4" /> {isSending ? t('contact.sendingMessage') : t('contact.sendMessage')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
