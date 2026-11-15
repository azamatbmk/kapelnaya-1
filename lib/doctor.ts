import { CLINIC } from "@/lib/clinic";
import { CONTACT_EMAIL } from "@/lib/site";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/phone";

/** Врач клиники — страница /vrachi/bekoev/ */
export const DOCTOR = {
  fullName: "Бекоев Олег Альбертович",
  shortName: "Олег Бекоев",
  specialty: "врач-психиатр, нарколог, психотерапевт",
  role: "Врач клиники",
  worksAt: CLINIC.brand,
  cityLocative: CLINIC.cityLocative,
  experienceNote:
    "Опыт работы в психиатрии и наркологии, в том числе в службе скорой помощи и реанимации. Приём в клинике «Капельная №1» и консультации по записи.",
  education: [
    {
      place:
        "Северо-Осетинская государственная медицинская академия, г. Владикавказ",
      detail: "Высшее медицинское образование (с отличием)",
    },
    {
      place:
        "ФГБУ «НМИЦ психиатрии и наркологии им. В. П. Сербского», г. Москва",
      detail: "Ординатура на кафедре психиатрии и наркологии",
    },
  ],
  contacts: {
    phoneDisplay: PHONE_DISPLAY,
    phoneE164: PHONE_E164,
    email: CONTACT_EMAIL,
  },
  profiles: {
    prodoctorov: "https://prodoctorov.ru/beslan/vrach/1221681-bekoev/",
  },
} as const;
