import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email) {
    return NextResponse.json(
      { success: false, message: 'Invalid verification link' },
      { status: 400 }
    );
  }

  try {
    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (!subscription) {
      return NextResponse.json(
        { success: false, message: 'Subscription not found' },
        { status: 404 }
      );
    }

    if (subscription.verified) {
      return NextResponse.json(
        { success: false, message: 'Email already verified' },
        { status: 400 }
      );
    }

    // Update subscription to verified
    await prisma.newsletterSubscription.update({
      where: { email },
      data: { verified: true }
    });

    // Redirect to success page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/newsletter/success`
    );
  } catch (error) {
    console.error('Newsletter verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 