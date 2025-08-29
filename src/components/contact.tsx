import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('contact.title')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('contact.description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.email')}</h3>
                <a href="mailto:jane.doe@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                  jane.doe@example.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.phone')}</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.location')}</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.formTitle')}</CardTitle>
              <CardDescription>{t('contact.formDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder={t('contact.namePlaceholder')} />
                <Input type="email" placeholder={t('contact.emailPlaceholder')} />
                <Textarea placeholder={t('contact.messagePlaceholder')} rows={5} />
                <Button type="submit" size="lg" className="w-full md:w-auto transition-transform duration-300 hover:scale-105">
                  <Send className="mr-2 h-4 w-4" /> {t('contact.sendMessage')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
