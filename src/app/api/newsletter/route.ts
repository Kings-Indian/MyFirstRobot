import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

const prisma = new PrismaClient();

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (existingSubscription) {
      if (existingSubscription.verified) {
        return NextResponse.json(
          { success: false, message: 'Email already subscribed' },
          { status: 400 }
        );
      }
      // If not verified, send verification email again
      await sendVerificationEmail(email);
      return NextResponse.json({
        success: true,
        message: 'Verification email sent'
      });
    }

    // Create new subscription
    await prisma.newsletterSubscription.create({
      data: { email }
    });

    // Send verification email
    await sendVerificationEmail(email);

    return NextResponse.json({
      success: true,
      message: 'Please check your email to confirm your subscription'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

async function sendVerificationEmail(email: string) {
  const verificationToken = generateVerificationToken();
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'your@email.com',
    subject: 'Verify your newsletter subscription',
    html: `
      <div>
        <h1>Verify your email</h1>
        <p>Click the button below to verify your email address and complete your newsletter subscription.</p>
        <a href="${verificationUrl}" style="background-color: rgb(0,62,65); color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
          Verify Email
        </a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
} 
 