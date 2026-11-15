import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/Site/SiteFooter";
import SiteHeader from "@/components/Site/SiteHeader";
import { DOCTOR } from "@/lib/doctor";
import { CLINIC } from "@/lib/clinic";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main className="doctor-page" id="main">
        <nav className="doctor-crumb" aria-label="Навигация">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/vrachi/">Врачи</Link>
          <span aria-hidden="true">/</span>
          <span>{DOCTOR.shortName}</span>
        </nav>

        <div className="doctor-intro">
          <div className="doctor-intro-copy">
            <p className="eyebrow doctor-eyebrow">
              ВРАЧ КЛИНИКИ
              <span />
            </p>
            <h1>{DOCTOR.fullName}</h1>
            <p className="doctor-specialty">{DOCTOR.specialty}</p>
            <p className="doctor-lead">{DOCTOR.lead}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="doctor-photo"
            src="/images/doctor.webp"
            width={1920}
            height={1513}
            alt={`${DOCTOR.fullName} — ${DOCTOR.specialty}`}
          />
        </div>

        <div className="doctor-layout">
          <div className="doctor-col">
            <section className="doctor-card" aria-labelledby="doctor-about">
              <h2 id="doctor-about">Опыт и подход</h2>
              {DOCTOR.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section className="doctor-card" aria-labelledby="doctor-edu">
              <h2 id="doctor-edu">Образование</h2>
              <ul className="doctor-edu">
                {DOCTOR.education.map((item) => (
                  <li key={item.place}>
                    <strong>{item.place}</strong>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="doctor-note">{DOCTOR.educationNote}</p>
            </section>
          </div>

          <div className="doctor-col">
            <section className="doctor-card" aria-labelledby="doctor-schedule">
              <h2 id="doctor-schedule">График и зона помощи</h2>
              <ul className="doctor-points">
                {DOCTOR.schedule.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="doctor-card" aria-labelledby="doctor-license">
              <h2 id="doctor-license">Исполнитель услуг и лицензия</h2>
              {DOCTOR.credentials.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="doctor-note">{DOCTOR.credentialsNote}</p>
            </section>

            <section className="doctor-card" aria-labelledby="doctor-contacts">
              <h2 id="doctor-contacts">Профили и контакты</h2>
              <ul className="doctor-points">
                <li>
                  Телефон:{" "}
                  <a href={`tel:${DOCTOR.contacts.phoneE164}`}>
                    {DOCTOR.contacts.phoneDisplay}
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a href={`mailto:${DOCTOR.contacts.email}`}>
                    {DOCTOR.contacts.email}
                  </a>
                </li>
                <li>
                  <a
                    href={DOCTOR.profiles.prodoctorov}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Профиль на ПроДокторов
                  </a>
                </li>
                <li>
                  <a
                    href={DOCTOR.profiles.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {DOCTOR.profiles.instagramLabel}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <p className="doctor-actions">
          <Link className="button" href="/#appointment">
            Записаться в клинику
          </Link>
          <Link className="text-link" href="/politika-konfidencialnosti/">
            Политика конфиденциальности
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
