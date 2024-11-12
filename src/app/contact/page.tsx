// app/contact/page.tsx
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import Layout from '@/components/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me | Your Name',
  description: 'Get in touch with me for collaboration, questions, or project inquiries.',
  openGraph: {
    title: 'Contact Me | Your Name',
    description: 'Get in touch with me for collaboration, questions, or project inquiries.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
                <p className="text-gray-600 mt-2">
                  Have a question or want to work together? Drop me a message.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>contact@example.com</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>123 Web Dev Street, Digital City, 12345</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}