// src/components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add your form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md" >
      <div className="p-6" >
        <h3 className="text-2xl font-semibold mb-4" > Send a Message </h3>
      </div>
      < div className="p-6 pt-0" >
        <form onSubmit={handleSubmit} className="space-y-4" >
          <div className="space-y-2" >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700" > Name </label>
            < input
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          < div className="space-y-2" >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700" > Email </label>
            < input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          < div className="space-y-2" >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700" > Message </label>
            < textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
            />
          </div>

          {
            submitted ? (
              <div className="flex items-center gap-2 p-4 text-blue-800 bg-blue-50 rounded-md" >
                <AlertCircle className="h-4 w-4" />
                <p>Thanks for your message! I will get back to you soon.</p>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {
                  isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )
                }
              </button>
            )
          }
        </form>
      </div>
    </div>
  );
}
