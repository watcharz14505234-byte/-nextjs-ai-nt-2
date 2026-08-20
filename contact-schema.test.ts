import { describe, it, expect } from 'vitest';
import { contactSchema } from './src/lib/contact-schema';

const validPayload = {
  name: 'สมชาย ใจดี',
  email: 'somchai@example.com',
  subject: 'สอบถามสินค้า',
  message: 'สวัสดีครับ อยากสอบถามข้อมูลสินค้าเพิ่มเติมครับ',
};

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects a name shorter than 2 characters', () => {
    const result = contactSchema.safeParse({ ...validPayload, name: 'ก' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({ ...validPayload, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects a subject shorter than 3 characters', () => {
    const result = contactSchema.safeParse({ ...validPayload, subject: 'ab' });
    expect(result.success).toBe(false);
  });

  it('rejects a message shorter than 10 characters', () => {
    const result = contactSchema.safeParse({ ...validPayload, message: 'สั้นไป' });
    expect(result.success).toBe(false);
  });

  it('trims whitespace-only fields and rejects them', () => {
    const result = contactSchema.safeParse({ ...validPayload, name: '   ' });
    expect(result.success).toBe(false);
  });

  it('accepts an optional website (honeypot) field', () => {
    const result = contactSchema.safeParse({ ...validPayload, website: '' });
    expect(result.success).toBe(true);
  });
});