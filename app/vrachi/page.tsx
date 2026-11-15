import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/Site/SiteFooter";
import SiteHeader from "@/components/Site/SiteHeader";
import { CLINIC } from "@/lib/clinic";
import { DOCTOR } from "@/lib/doctor";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Врачи клиники | ${SITE_NAME}` },
  description: `Врачи клиники «${CLINIC.brand}» во ${CLINIC.cityLocative}.`,
  alternates: { canonical: "/vrachi/" },
};

export default function DoctorsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="doctor-page" id="main">
        <nav className="doctor-crumb" aria-label="Навигация">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <span>Врачи</span>
        </nav>
        <p className="eyebrow doctor-eyebrow">
          КЛИНИКА
          <span />
        </p>
        <h1>Врачи клиники</h1>
        <p className="doctor-lead">
          Специалисты «{CLINIC.brand}» во {CLINIC.cityLocative}.
        </p>
        <article className="doctor-card doctor-card-solo">
          <h2>
            <Link href="/vrachi/bekoev/">{DOCTOR.fullName}</Link>
          </h2>
          <p>
            {DOCTOR.specialty}. {DOCTOR.role}.
          </p>
          <p>
            <Link className="text-link" href="/vrachi/bekoev/">
              Подробнее о враче
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
