import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { headers } from 'next/headers';

// In-memory store for rate limiting
// In production, you should use Redis or a similar service
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS = 5; // Max submissions per hour

async function getClientId(): Promise<string> {
    // Try to get a unique identifier for the client
    // In production, you might want to use a more sophisticated method
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for') || '';
    const userAgent = headersList.get('user-agent') || '';
    return `${forwardedFor}-${userAgent}`;
}

function isRateLimited(clientId: string): boolean {
    const now = Date.now();
    const timestamps = submissions.get(clientId) || [];
    
    // Remove old timestamps
    const recentTimestamps = timestamps.filter(
        timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );
    
    // Check if rate limit is exceeded
    if (recentTimestamps.length >= MAX_SUBMISSIONS) {
        return true;
    }
    
    // Add new timestamp
    recentTimestamps.push(now);
    submissions.set(clientId, recentTimestamps);
    
    return false;
}

export async function POST(request: Request) {
    try {
        const clientId = await getClientId();

        // Check rate limit
        if (isRateLimited(clientId)) {
            return NextResponse.json(
                { error: 'Too many submissions. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, message } = body;
        console.log('Contact form submission:', { name, email, message });

        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: 'Missing RESEND_API_KEY' },
                { status: 500 }
            );
        }
        if (!process.env.RECEIVER_EMAIL) {
            return NextResponse.json(
                { error: 'Missing RECEIVER_EMAIL' },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Validate the input
        if (!name || !email || !message) {
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


        const response =await resend.emails.send({
            from: 'no-reply@mail.digitulp.co',
            to: process.env.RECEIVER_EMAIL,
            subject: `DIGITULP message from ${name}`,
            html: `
            <p>${message}</p>
            <p>From: ${name} (${email})</p>
            `
        });

        console.log(response);
        if (response.error) {
            return NextResponse.json(
                { error: response.error },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
} 