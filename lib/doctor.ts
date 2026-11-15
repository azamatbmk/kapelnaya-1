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
  lead: `Приём в клинике «${CLINIC.brand}»: ${CLINIC.street}, ${CLINIC.city}. Выездная помощь — по городу и РСО-Алании.`,
  experienceNote:
    "5 лет опыта работы с наркологическими пациентами. Приём в клинике «Капельная №1» и консультации по записи.",
  about: [
    "5 лет опыта работы с наркологическими пациентами. Также есть опыт в психиатрии и наркологии, в том числе в службе скорой помощи и реанимации.",
    "Работает с зависимостями, тревожными и депрессивными состояниями, оказывает наркологическую помощь на дому и составляет дальнейший план лечения.",
  ],
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
  educationNote:
    "Диплом и аккредитация подтверждаются Минздравом России. Копии документов предоставляются по запросу на консультации.",
  schedule: [
    "Выезд на дом — круглосуточно, включая выходные и праздники",
    "Плановый приём и консультации — по предварительной записи (телефон или форма на сайте)",
    "Зона: Владикавказ и населённые пункты РСО-Алании (выезд по согласованию)",
  ],
  credentials: [
    `${CLINIC.legal.form} ${CLINIC.legal.name}.`,
    `Юридический и фактический адрес: ${CLINIC.address}.`,
    `ИНН ${CLINIC.legal.inn}. ОГРНИП ${CLINIC.legal.ogrnip}.`,
    `Р/с ${CLINIC.legal.account}. БИК ${CLINIC.legal.bik}. К/с ${CLINIC.legal.corr}.`,
  ],
  credentialsNote: CLINIC.legal.license,
  contacts: {
    phoneDisplay: PHONE_DISPLAY,
    phoneE164: PHONE_E164,
    email: CONTACT_EMAIL,
  },
  profiles: {
    prodoctorov: "https://prodoctorov.ru/beslan/vrach/1221681-bekoev/",
    instagram: "https://www.instagram.com/dr.oleg_bekoevv/",
    instagramLabel: "@dr.oleg_bekoevv",
  },
} as const;
