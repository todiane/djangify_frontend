// src/components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
  contact_reason: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    contact_reason: 'other'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          contact_reason: formData.contact_reason || 'other'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 p-4 text-[#0C8C9D] bg-[#0C8C9D]/10 rounded-md">
        <AlertCircle className="h-5 w-5" />
        <p>Thanks for your message! I will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C8C9D] focus:border-[#0C8C9D]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C8C9D] focus:border-[#0C8C9D]"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact_reason" className="block text-sm font-medium text-gray-700">
            Reason for Contact
          </label>
          <select
            id="contact_reason"
            value={formData.contact_reason}
            onChange={(e) => setFormData(prev => ({ ...prev, contact_reason: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C8C9D] focus:border-[#0C8C9D]"
          >
            <option value="other">Other</option>
            <option value="buy_project">Buy a project that is for sale</option>
            <option value="ecommerce">Bespoke eCommerce store</option>
            <option value="lms">Bespoke Learning Management System</option>
            <option value="speaking">Speaking/Training Opportunity</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C8C9D] focus:border-[#0C8C9D] min-h-[120px]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#0C8C9D] hover:bg-[#0C8C9D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C8C9D] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
