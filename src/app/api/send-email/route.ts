import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Email recipient
const TO_EMAIL = 'info@nizarrahme.com';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2d5a27 0%, #3d7a35 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">📬 New Contact Message</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; width: 30%;"><strong>👤 Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>📧 Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #2d5a27;">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>📱 Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(phone)}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>📋 Subject:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(subject)}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px;">
              <h3 style="color: #2d5a27; margin-bottom: 10px;">💬 Message:</h3>
              <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; white-space: pre-wrap;">${escapeHtml(message)}</div>
            </div>
          </div>
          
          <div style="background: #2d5a27; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #fff; margin: 0; font-size: 14px;">
              This message was sent from the contact form on your website.
            </p>
          </div>
        </body>
        </html>
      `,
      // Also send a plain text version
      text: `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form on your website.
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
