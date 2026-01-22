'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { headers } from 'next/headers';

// In-memory rate limiter (Note: This is per-instance, but effective enough for basic protection)
// Format: IP -> { count: number, resetTime: number }
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

// Form validation schema with Zod
const RegistrationSchema = z.object({
    name: z.string().min(2, { message: 'Name is required' }),
    surname: z.string().min(2, { message: 'Surname is required' }),
    phone: z.string().min(10, { message: 'Valid phone number is required' }),
    email: z.string().email({ message: 'Valid email is required' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
    serviceTitle: z.string().min(1, { message: 'Service title is required' }),
    _gotcha: z.string().optional(), // Honeypot field
});

// Define return type for the registration submission
interface RegistrationSubmissionResult {
    success: boolean;
    message?: string;
    error?: string;
}

// Registration form data interface
interface RegistrationFormData {
    name: string;
    surname: string;
    phone: string;
    email: string;
    message: string;
    serviceTitle: string;
    _gotcha?: string; // Optional honeypot
}

// Nodemailer setup with Gmail
const createTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials are not defined in environment variables');
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

export async function submitRegistration(formData: RegistrationFormData): Promise<RegistrationSubmissionResult> {
    'use server';
    console.log("📩 Received registration data:", { ...formData, _gotcha: formData._gotcha ? '[REDACTED]' : undefined });

    // 1. Honeypot Check
    if (formData._gotcha) {
        console.warn("⚠️ Bot detected via honeypot.");
        // Return success to confuse the bot, but do nothing
        return { success: true, message: "Registration submitted successfully" };
    }

    try {
        // 2. Rate Limiting Check
        const headersList = await headers();
        // Try to get IP from various headers
        const ip = headersList.get('x-forwarded-for')?.split(',')[0] ||
                   headersList.get('x-real-ip') ||
                   'unknown';

        const now = Date.now();

        if (ip !== 'unknown') {
            const userRate = rateLimitMap.get(ip);

            if (userRate) {
                if (now > userRate.resetTime) {
                    // Reset window
                    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
                } else {
                    // Inside window
                    if (userRate.count >= MAX_REQUESTS_PER_WINDOW) {
                        console.warn(`⚠️ Rate limit exceeded for IP: ${ip}`);
                        return {
                            success: false,
                            error: "Çox sayda müraciət göndərdiniz. Zəhmət olmasa bir az gözləyin."
                        };
                    }
                    userRate.count++;
                }
            } else {
                // New IP
                rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
            }

            // Cleanup old entries periodically (simple random check to avoid memory leaks)
            if (rateLimitMap.size > 1000 && Math.random() < 0.01) {
                 for (const [key, value] of rateLimitMap.entries()) {
                     if (now > value.resetTime) rateLimitMap.delete(key);
                 }
            }
        }


        const { name, surname, phone, email, message, serviceTitle } = formData;

        // Validate inputs manually
        if (!name) return { success: false, error: "Name is required" };
        if (!surname) return { success: false, error: "Surname is required" };
        if (!phone) return { success: false, error: "Phone number is required" };
        if (!email) return { success: false, error: "Email is required" };
        if (!message) return { success: false, error: "Message is required" };
        if (!serviceTitle) return { success: false, error: "Service title is required" };

        // Use Zod for comprehensive validation
        const validatedFields = RegistrationSchema.safeParse({
            name,
            surname,
            phone,
            email,
            message,
            serviceTitle,
            _gotcha: formData._gotcha
        });

        if (!validatedFields.success) {
            console.log("❌ Validation failed:", validatedFields.error);
            return {
                success: false,
                error: 'Form validation failed. Please check your inputs.'
            };
        }

        console.log("✅ Validation Passed. Attempting to send email...");

        // Create transporter
        const transporter = createTransporter();

        // Email recipient fallback
        const emailTo = process.env.EMAIL_TO || 'aydinnasibli7@gmail.com';

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailTo,
            subject: `New Registration: ${serviceTitle}`,
            html: `
                <h2>New Service Registration</h2>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif;">
                    <h3 style="color: #333; margin-bottom: 20px;">Service: ${serviceTitle}</h3>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Full Name:</td>
                            <td style="padding: 8px 0; color: #333;">${name} ${surname}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                            <td style="padding: 8px 0; color: #333;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                            <td style="padding: 8px 0; color: #333;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Message:</td>
                            <td style="padding: 8px 0; color: #333;">${message.replace(/\n/g, '<br>')}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Registration Time:</td>
                            <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString()}</td>
                        </tr>
                    </table>
                </div>
                
                <p style="margin-top: 20px; color: #666; font-size: 12px;">
                    This registration was submitted through your website contact form.
                </p>
            `,
        };

        console.log("📩 Sending registration email...");
        await transporter.sendMail(mailOptions);
        console.log("✅ Registration Email Sent!");

        return {
            success: true,
            message: "Registration submitted successfully"
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("❌ Error submitting registration:", errorMessage);
        return {
            success: false,
            error: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin."
        };
    }
}
