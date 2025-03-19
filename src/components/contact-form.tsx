"use client";

import { useState } from 'react';
import * as motion from "motion/react-client";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        honeypot: '', // Hidden field for bots
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
    const SUBMISSION_COOLDOWN = 60000; // 1 minute cooldown between submissions

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check cooldown period
        const now = Date.now();
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
            setSubmitStatus('error');
            return;
        }

        // Check honeypot
        if (formData.honeypot) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({ 
                name: '', 
                email: '', 
                message: '', 
                honeypot: ''
            });
            setLastSubmissionTime(now);
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl mx-auto px-6 pb-6 mb-24 -mt-12 backdrop-blur-sm"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from real users */}
                <div className="hidden">
                    <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-white/50"
                        placeholder="Your name"
                    />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-white/50"
                        placeholder="your.email@example.com"
                    />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <label htmlFor="message" className="block text-sm font-medium text-white">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-white/50 resize-none"
                        placeholder="Your message..."
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-400 text-center"
                    >
                        Message sent successfully!
                    </motion.div>
                )}

                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-center"
                    >
                        {Date.now() - lastSubmissionTime < SUBMISSION_COOLDOWN 
                            ? 'Please wait a minute before submitting again.'
                            : 'Failed to send message. Please try again.'}
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
} 