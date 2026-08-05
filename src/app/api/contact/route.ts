import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Subject is required." },
        { status: 400 }
      );
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 10
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Message must be at least 10 characters long.",
        },
        { status: 400 }
      );
    }

    // Check if Resend or Formspree API keys are set in environment
    const resendApiKey = process.env.RESEND_API_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["tekamek25@gmail.com"],
          reply_to: email,
          subject: `Portfolio Contact: ${subject} (from ${name})`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Resend API Error:", errorData);
        return NextResponse.json(
          { success: false, error: "Failed to send email via provider." },
          { status: 500 }
        );
      }
    } else if (formspreeEndpoint) {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        return NextResponse.json(
          { success: false, error: "Failed to send via Formspree." },
          { status: 500 }
        );
      }
    } else {
      // In development / demo mode (when no API key is configured yet)
      console.log("--- New Contact Form Submission ---");
      console.log(`From: ${name} (${email})`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log("----------------------------------");
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  } catch (error) {
    console.error("Contact API Exception:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
