"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

type SubmitStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(
          typeof result.error === "string"
            ? result.error
            : "ไม่สามารถส่งข้อความได้ โปรดลองใหม่อีกครั้งในภายหลัง"
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("ไม่สามารถส่งข้อความได้ โปรดลองใหม่อีกครั้งในภายหลัง");
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-name">ชื่อ</FieldLabel>
                <Input
                  {...field}
                  id="contact-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="name"
                  placeholder="ชื่อของคุณ"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-email">อีเมล</FieldLabel>
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-subject">หัวข้อ</FieldLabel>
                <Input
                  {...field}
                  id="contact-subject"
                  aria-invalid={fieldState.invalid}
                  placeholder="หัวข้อที่ต้องการติดต่อ"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-message">ข้อความ</FieldLabel>
                <Textarea
                  {...field}
                  id="contact-message"
                  aria-invalid={fieldState.invalid}
                  placeholder="รายละเอียดข้อความของคุณ"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="website"
            control={form.control}
            render={({ field }) => (
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">อย่ากรอกช่องนี้</label>
                <Input
                  {...field}
                  id="contact-website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            )}
          />
        </FieldGroup>

        <div aria-live="polite">
          {status === "success" && (
            <div
              role="status"
              className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-400"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              <span>ส่งข้อความสำเร็จ ทีมงานจะติดต่อกลับโดยเร็วที่สุด</span>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="mt-6 w-full sm:w-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Spinner />}
          {form.formState.isSubmitting ? "กำลังส่ง..." : "ส่งข้อความ"}
        </Button>
      </form>
    </div>
  );
}