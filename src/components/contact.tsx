import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mt-2">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Contact Me</CardTitle>
            <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
              </div>
              <Textarea placeholder="Your Message" rows={5} />
              <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
