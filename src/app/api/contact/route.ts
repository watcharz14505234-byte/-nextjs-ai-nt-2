import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "ข้อมูลที่ส่งมาไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        error: "กรุณาตรวจสอบข้อมูลในแบบฟอร์ม",
        fields: fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = result.data;

  // Honeypot field was filled: silently pretend success, never send an email.
  if (website) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact form: missing Resend configuration");
    return NextResponse.json(
      { error: "ระบบขัดข้อง โปรดลองใหม่อีกครั้งในภายหลัง" },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `ชื่อ: ${name}\nอีเมล: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Contact form: Resend error", error);
      return NextResponse.json(
        { error: "ไม่สามารถส่งข้อความได้ โปรดลองใหม่อีกครั้งในภายหลัง" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json(
      { error: "ไม่สามารถส่งข้อความได้ โปรดลองใหม่อีกครั้งในภายหลัง" },
      { status: 500 }
    );
  }
}