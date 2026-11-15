export type ContactPayload = {
  name: string;
  phone: string;
  website?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

const FORM_EMAIL = "Bekoev_2003@mail.ru";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

function sanitize(value: string, max: number) {
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

export async function submitContact(
  payload: ContactPayload,
): Promise<SubmitResult> {
  if (payload.website?.trim()) {
    return { ok: true };
  }

  const name = sanitize(payload.name, 80);
  const phone = sanitize(payload.phone, 32);
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) {
    return { ok: false, error: "Укажите имя." };
  }
  if (digits.length < 10) {
    return { ok: false, error: "Укажите корректный телефон." };
  }

  if (WEB3FORMS_KEY) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Заявка Капельная №1: ${name}`,
        from_name: "Сайт — Капельная №1",
        name,
        phone,
        botcheck: "",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };
    if (res.ok && data.success) return { ok: true };
    return {
      ok: false,
      error:
        data.message ??
        "Не удалось отправить заявку. Позвоните в клинику.",
    };
  }

  const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      phone,
      _subject: `Заявка Капельная №1: ${name}`,
      _honey: "",
      _captcha: "false",
    }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };
  const success = data.success === true || data.success === "true";
  if (res.ok && success) return { ok: true };
  return {
    ok: false,
    error:
      data.message?.trim() ||
      `Не удалось отправить. Позвоните или напишите на ${FORM_EMAIL}.`,
  };
}
