'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import resumeData from '@/data/resume.json';
import type { Resume } from '@/lib/types';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimit = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT_COUNT = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

export async function sendEmail(formData: unknown) {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: 'Invalid form data.', issues: parsed.error.issues };
  }

  const { name, email, subject, message } = parsed.data;

  const now = Date.now();
  const userRateLimit = rateLimit.get(email);

  if (userRateLimit && (now - userRateLimit.timestamp) < RATE_LIMIT_WINDOW) {
    if (userRateLimit.count >= RATE_LIMIT_COUNT) {
      return { success: false, error: 'You have reached the submission limit. Please try again later.' };
    }
    rateLimit.set(email, { count: userRateLimit.count + 1, timestamp: userRateLimit.timestamp });
  } else {
    rateLimit.set(email, { count: 1, timestamp: now });
  }

  const resume: Resume = resumeData;
  const toEmail = resume.basics.email;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', 
      to: [toEmail],
      subject: `Message from ${name}: ${subject}`,
      reply_to: email,
      html: `
        <p>Subject: ${subject}</p>
        <hr />
        <p>${message}</p>
        <hr />
        <p>${name}</p>
        <p>${email}</p>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: 'Failed to send email. Please try again.' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
