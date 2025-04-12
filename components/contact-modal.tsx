'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useTheme } from './theme-provider';
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from './ui/animated-modal';
import { Button } from './ui/button';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

// Simple toast implementation
function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg 
      ${type === 'success' ? 'bg-[color:var(--color-claude-salmon)] text-white' : 'bg-red-500 text-white'}`}>
      <div className="flex items-center">
        <span>{message}</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white hover:text-gray-200 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6L18 18"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

interface ContactModalProps {
  children?: ReactNode;
  triggerClassName?: string;
}

export default function ContactModal({ children, triggerClassName }: ContactModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store a reference to the form
    const form = e.currentTarget;
    
    const formData = new FormData(form);

    const message = {
      content: "New Contact Form Submission",
      embeds: [{
        title: "New Contact Request",
        color: 0x58B9FF,
        fields: [
          { name: "First Name", value: formData.get('firstName') || "Not provided", inline: true },
          { name: "Last Name", value: formData.get('lastName') || "Not provided", inline: true },
          { name: "Email", value: formData.get('email') || "Not provided", inline: false },
          { name: "Subject", value: formData.get('subject') || "No subject", inline: false },
          { name: "Message", value: formData.get('message') || "No message provided" }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setToast({
        show: true,
        message: "Message sent successfully! I'll get back to you soon.",
        type: 'success'
      });
      
      // Use stored form reference
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      setToast({
        show: true,
        message: "Error sending message. Please try again later.",
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  // Default trigger class if not overridden
  const defaultTriggerClass = "px-6 py-3 border-2 border-[color:var(--color-claude-salmon)] rounded-full font-medium text-foreground hover:bg-[color:var(--color-claude-salmon)] hover:text-white transition-colors duration-300 z-50 cursor-pointer";

  return (
    <>
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
      
      <Modal>
        <ModalTrigger className={triggerClassName || defaultTriggerClass}>
          {children || "Contact Me"}
        </ModalTrigger>
        
        <ModalBody className={`
          ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-claude-beige-hovered'} 
          text-foreground border-[color:var(--color-claude-salmon)] border-opacity-20
          max-w-3xl md:max-w-2xl z-50
        `}>
          <ModalContent>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[color:var(--color-claude-salmon)]">Get in Touch</h2>
              <p className="mt-2 text-foreground opacity-80">I'd love to hear about your project. Send me a message and let's create something amazing together.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    className={`w-full p-3 rounded-md border border-[color:var(--color-claude-salmon)] border-opacity-20 
                      ${isDark ? 'bg-[color:var(--color-claude-dark-background)] text-foreground' : 'bg-white bg-opacity-50 text-[#3D3929]'} 
                      focus:outline-none focus:border-[color:var(--color-claude-salmon)]`} 
                    required 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    className={`w-full p-3 rounded-md border border-[color:var(--color-claude-salmon)] border-opacity-20 
                      ${isDark ? 'bg-[color:var(--color-claude-dark-background)] text-foreground' : 'bg-white bg-opacity-50 text-[#3D3929]'} 
                      focus:outline-none focus:border-[color:var(--color-claude-salmon)]`} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email (optional)" 
                    className={`w-full p-3 rounded-md border border-[color:var(--color-claude-salmon)] border-opacity-20 
                      ${isDark ? 'bg-[color:var(--color-claude-dark-background)] text-foreground' : 'bg-white bg-opacity-50 text-[#3D3929]'} 
                      focus:outline-none focus:border-[color:var(--color-claude-salmon)]`} 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    className={`w-full p-3 rounded-md border border-[color:var(--color-claude-salmon)] border-opacity-20 
                      ${isDark ? 'bg-[color:var(--color-claude-dark-background)] text-foreground' : 'bg-white bg-opacity-50 text-[#3D3929]'} 
                      focus:outline-none focus:border-[color:var(--color-claude-salmon)]`} 
                  />
                </div>
              </div>
              
              <div>
                <textarea 
                  name="message" 
                  rows={5} 
                  placeholder="Your message..." 
                  className={`w-full p-3 rounded-md border border-[color:var(--color-claude-salmon)] border-opacity-20 
                    ${isDark ? 'bg-[color:var(--color-claude-dark-background)] text-foreground' : 'bg-white bg-opacity-50 text-[#3D3929]'} 
                    focus:outline-none focus:border-[color:var(--color-claude-salmon)]`} 
                  required
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded-full font-medium transition-colors duration-300
                  bg-[color:var(--color-claude-salmon)] hover:bg-[color:var(--color-claude-salmon)]/90 text-white`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-[color:var(--color-claude-salmon)] border-opacity-20">
              <div className="flex flex-wrap gap-6 justify-center">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-claude-salmon)] hover:opacity-75 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-claude-salmon)] hover:opacity-75 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-claude-salmon)] hover:opacity-75 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
} 