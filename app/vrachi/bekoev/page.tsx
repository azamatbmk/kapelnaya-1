import type { Metadata } from "next";
import Link from "next/link";
import { DOCTOR } from "@/lib/doctor";
import { CLINIC } from "@/lib/clinic";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: `${DOCTOR.fullName} — ${DOCTOR.specialty} | ${SITE_NAME}`,
  },
  description: `${DOCTOR.fullName}, ${DOCTOR.specialty}. Приём в клинике «${CLINIC.brand}» во ${DOCTOR.cityLocative}. ${DOCTOR.experienceNote}`,
  alternates: { canonical: "/vrachi/bekoev/" },
  openGraph: {
    title: `${DOCTOR.shortName} — врач клиники ${SITE_NAME}`,
    description: DOCTOR.experienceNote,
    url: `${SITE_URL}/vrachi/bekoev/`,
    type: "profile",
    locale: "ru_RU",
  },
};

export default function DoctorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": `${SITE_URL}/#physician` },
    url: `${SITE_URL}/vrachi/bekoev/`,
    name: DOCTOR.fullName,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Врачи",
          item: `${SITE_URL}/vrachi/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: DOCTOR.shortName,
          item: `${SITE_URL}/vrachi/bekoev/`,
        },
      ],
    },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Навигация">
          <Link href="/">Главная</Link>
          <span aria-hidden>/</span>
          <Link href="/vrachi/">Врачи</Link>
          <span aria-hidden>/</span>
          <span>{DOCTOR.shortName}</span>
        </nav>

        <p className={styles.clinic}>Клиника «{CLINIC.brand}»</p>
        <h1 className={styles.title}>{DOCTOR.fullName}</h1>
        <p className={styles.lead}>
          {DOCTOR.specialty}. {DOCTOR.role} — приём во {DOCTOR.cityLocative}.
        </p>

        <section className={styles.block}>
          <h2>Опыт и подход</h2>
          <p>{DOCTOR.experienceNote}</p>
        </section>

        <section className={styles.block}>
          <h2>Образование</h2>
          <ul>
            {DOCTOR.education.map((item) => (
              <li key={item.place}>
                <strong>{item.place}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h2>Контакты</h2>
          <p>
            Телефон:{" "}
            <a href={`tel:${DOCTOR.contacts.phoneE164}`}>
              {DOCTOR.contacts.phoneDisplay}
            </a>
          </p>
          <p>
            Email:{" "}
            <a href={`mailto:${DOCTOR.contacts.email}`}>
              {DOCTOR.contacts.email}
            </a>
          </p>
          <p>
            <a
              href={DOCTOR.profiles.prodoctorov}
              target="_blank"
              rel="noopener noreferrer"
            >
              Профиль на ПроДокторов
            </a>
          </p>
        </section>

        <p className={styles.links}>
          <Link href="/#appointment">Записаться в клинику</Link>
          <Link href="/politika-konfidencialnosti/">
            Политика конфиденциальности
          </Link>
        </p>
      </div>
    </main>
  );
}
