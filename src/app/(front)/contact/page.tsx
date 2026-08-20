import { MapPin, Phone, Mail, Clock, Globe, Send, MessageCircle } from "lucide-react";

import { ContactForm } from "../components/contact-form";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const contactInfo = [
  {
    icon: MapPin,
    title: "ที่อยู่",
    lines: ["123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก", "กรุงเทพมหานคร 10500"],
  },
  {
    icon: Phone,
    title: "เบอร์โทร",
    lines: ["02-123-4567", "08X-XXX-XXXX (มือถือ)"],
  },
  {
    icon: Mail,
    title: "อีเมล",
    lines: ["contact@cosci.com"],
  },
  {
    icon: Clock,
    title: "เวลาทำการ",
    lines: ["จันทร์ - ศุกร์ 09:00 - 18:00 น.", "เสาร์ 09:00 - 12:00 น."],
  },
];

const faqs = [
  {
    question: "ร้านอยู่ที่ไหน?",
    answer:
      "ร้านตั้งอยู่ที่ 123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
  },
  {
    question: "ติดต่อทางโทรศัพท์ได้เวลาไหน?",
    answer:
      "เราพร้อมให้บริการทางโทรศัพท์ทุกวันจันทร์ - ศุกร์ ตั้งแต่เวลา 09:00 - 18:00 น.",
  },
  {
    question: "ตอบกลับข้อความใช้เวลานานแค่ไหน?",
    answer:
      "ทีมงานจะตอบกลับภายใน 1 - 2 วันทำการหลังจากได้รับข้อความของคุณ",
  },
  {
    question: "สามารถติดตามข่าวสารโปรโมชันได้ที่ไหน?",
    answer:
      "ติดตามข่าวสารและโปรโมชันใหม่ ๆ ได้ทาง Facebook, Instagram และ X (Twitter) ของร้าน",
  },
];

const socialLinks = [
  { icon: Globe, label: "เว็บไซต์", href: "https://example.com" },
  { icon: Send, label: "Line", href: "https://line.me" },
  { icon: MessageCircle, label: "Facebook", href: "https://facebook.com" },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-(--breakpoint-xl) px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
          ติดต่อเรา
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground tracking-[-0.01em] sm:text-xl">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน เรายินดีให้ความช่วยเหลือ
        </p>
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
        <section aria-labelledby="contact-info-heading" className="flex flex-col gap-8">
          <h2 id="contact-info-heading" className="text-2xl font-medium tracking-[-0.02em]">
            ข้อมูลติดต่อ
          </h2>

          <ul className="grid gap-6 sm:grid-cols-2">
            {contactInfo.map(({ icon: Icon, title, lines }) => (
              <li
                key={title}
                className="flex gap-3 rounded-2xl border bg-card p-4"
              >
                <Icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-medium">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className="mt-1 text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="font-medium">ติดตามเรา</h3>
            <ul className="mt-3 flex gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-2xl border bg-card text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <h3 className="font-medium">คำถามที่พบบ่อย</h3>
            <dl className="mt-3 divide-y">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {question}
                    <span
                      aria-hidden="true"
                      className="text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{answer}</p>
                </details>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="contact-form-heading" className="rounded-3xl border bg-card p-6 sm:p-8">
          <h2 id="contact-form-heading" className="text-2xl font-medium tracking-[-0.02em]">
            ส่งข้อความถึงเรา
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            กรอกแบบฟอร์มด้านล่าง ทีมงานจะติดต่อกลับโดยเร็วที่สุด
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  );
}