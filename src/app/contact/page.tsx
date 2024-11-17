// app/contact/page.tsx
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Djangify',
  description: 'Get in touch with me for collaboration, questions, or project inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
              <p className="text-[#403F3F] mt-2">
                Have a question you need answered? Drop me a message.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#0C8C9D]" />
                  <span>djangify@djangify.com</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#0C8C9D]" />
                  <span>+1 (44) 7745 858483</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-[#0C8C9D]" />
                  <span>Shropshire, West Midlands, UK</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>

  );
}
