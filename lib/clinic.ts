import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import {
  CLINIC_PHONE_DISPLAY,
  CLINIC_PHONE_E164,
  PHONE_DISPLAY,
  PHONE_E164,
} from "@/lib/phone";

/** Данные клиники. Индекс 362008 — для ул. Карла Маркса, д. 11 (в исходной записи было 3620008). */
export const CLINIC = {
  brand: SITE_NAME,
  legalName: "Капельная №1",
  tagline: "Медицинская клиника",
  city: "Владикавказ",
  cityLocative: "Владикавказе",
  region: "РСО-Алания",
  postalCode: "362008",
  street: "ул. Карла Маркса, д. 11",
  phoneDisplay: CLINIC_PHONE_DISPLAY,
  phoneE164: CLINIC_PHONE_E164,
  doctorPhoneDisplay: PHONE_DISPLAY,
  doctorPhoneE164: PHONE_E164,
  arrival: "от 15 минут",
  email: CONTACT_EMAIL,
  address:
    "362008, Республика Северная Осетия — Алания, г. Владикавказ, ул. Карла Маркса, д. 11",
  legalAddress:
    "Республика Северная Осетия — Алания, г. Беслан, ул. Надтеречная, д. 2А",
  schedule: "Приём по предварительной записи. Уточняйте график по телефону.",
  legal: {
    form: "Индивидуальный предприниматель",
    name: "Бекоев Олег Альбертович",
    inn: "151109239918",
    ogrnip: "326150000026447",
    account: "40802810618300000136",
    bik: "044525593",
    corr: "30101810200000000593",
    executor: "ИП Бекоев Олег Альбертович",
    license:
      "Номер лицензии на медицинскую деятельность уточняйте по телефону.",
    sanitary: {
      title: "Санитарно-эпидемиологическое заключение",
      number: "15.01.09.000.М.000278.08.26",
      issued: "01.08.2026",
      issuer:
        "Управление Роспотребнадзора по Республике Северная Осетия — Алания",
      place: "г. Владикавказ, ул. Карла Маркса, д. 11",
      image: "/documents/sanitary-conclusion-flat.jpg",
      appendix: "/documents/sanitary-appendix-flat.jpg",
    },
  },
  services: [
    { title: "Вывод из запоя", price: "от 4 500 ₽" },
    { title: "Вывод из запоя на дому", price: "от 4 500 ₽" },
    { title: "Снятие алкогольной интоксикации", price: "от 4 500 ₽" },
    { title: "Консультация нарколога на дому", price: "бесплатно" },
    { title: "Купирование длительного запоя", price: "от 7 дней" },
    { title: "Дневной стационар", price: "по записи" },
    { title: "Кодирование на 1, 2 и 3 года", price: "от 8 000 ₽" },
    { title: "Реабилитационная помощь", price: "от 1 месяца" },
  ],
} as const;
