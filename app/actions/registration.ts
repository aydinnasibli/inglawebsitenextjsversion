'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const RegistrationSchema = z.object({
    name: z.string().min(2, { message: 'Name is required' }),
    surname: z.string().min(2, { message: 'Surname is required' }),
    phone: z.string().min(10, { message: 'Valid phone number is required' }),
    email: z.string().email({ message: 'Valid email is required' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
    serviceTitle: z.string().min(1, { message: 'Service title is required' }),
});

interface RegistrationSubmissionResult {
    success: boolean;
    message?: string;
    error?: string;
}

interface RegistrationFormData {
    name: string;
    surname: string;
    phone: string;
    email: string;
    message: string;
    serviceTitle: string;
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const createTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials are not defined in environment variables');
    }
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

export async function submitRegistration(formData: RegistrationFormData): Promise<RegistrationSubmissionResult> {
    'use server';

    const validated = RegistrationSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, error: 'Form validation failed. Please check your inputs.' };
    }

    const { name, surname, phone, email, message, serviceTitle } = validated.data;

    const safe = {
        name: escapeHtml(name),
        surname: escapeHtml(surname),
        phone: escapeHtml(phone),
        email: escapeHtml(email),
        message: escapeHtml(message).replace(/\n/g, '<br>'),
        serviceTitle: escapeHtml(serviceTitle),
    };

    try {
        const transporter = createTransporter();
        const emailTo = process.env.EMAIL_TO || 'info@inglaschool.com';

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailTo,
            subject: `New Registration: ${safe.serviceTitle}`,
            html: `
                <h2>New Service Registration</h2>
                <div style="background-color:#f5f5f5;padding:20px;border-radius:8px;font-family:Arial,sans-serif;">
                    <h3 style="color:#333;margin-bottom:20px;">Service: ${safe.serviceTitle}</h3>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr>
                            <td style="padding:8px 0;font-weight:bold;color:#555;">Full Name:</td>
                            <td style="padding:8px 0;color:#333;">${safe.name} ${safe.surname}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;font-weight:bold;color:#555;">Email:</td>
                            <td style="padding:8px 0;color:#333;">${safe.email}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;font-weight:bold;color:#555;">Phone:</td>
                            <td style="padding:8px 0;color:#333;">${safe.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;font-weight:bold;color:#555;vertical-align:top;">Message:</td>
                            <td style="padding:8px 0;color:#333;">${safe.message}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;font-weight:bold;color:#555;">Time:</td>
                            <td style="padding:8px 0;color:#333;">${new Date().toLocaleString()}</td>
                        </tr>
                    </table>
                </div>
                <p style="margin-top:20px;color:#666;font-size:12px;">Submitted via website contact form.</p>
            `,
        });

        return { success: true, message: 'Registration submitted successfully' };
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error('Registration email error:', msg);
        return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
}