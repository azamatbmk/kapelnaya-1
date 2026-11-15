import type { Metadata } from "next";
import Link from "next/link";
import { DOCTOR } from "@/lib/doctor";
import { CLINIC } from "@/lib/clinic";
import { SITE_NAME } from "@/lib/site";
import styles from "./bekoev/page.module.css";

export const metadata: Metadata = {
  title: { absolute: `Врачи клиники | ${SITE_NAME}` },
  description: `Врачи клиники «${CLINIC.brand}» во ${CLINIC.cityLocative}.`,
  alternates: { canonical: "/vrachi/" },
};

export default function DoctorsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Навигация">
          <Link href="/">Главная</Link>
          <span aria-hidden>/</span>
          <span>Врачи</span>
        </nav>
        <h1 className={styles.title}>Врачи клиники</h1>
        <p className={styles.lead}>
          Специалисты «{CLINIC.brand}» во {CLINIC.cityLocative}.
        </p>
        <section className={styles.block}>
          <h2>
            <Link href="/vrachi/bekoev/">{DOCTOR.fullName}</Link>
          </h2>
          <p>
            {DOCTOR.specialty}. {DOCTOR.role}.
          </p>
          <p>
            <Link href="/vrachi/bekoev/">Подробнее о враче →</Link>
          </p>
        </section>
        <p className={styles.links}>
          <Link href="/#appointment">Записаться</Link>
          <Link href="/">На главную</Link>
        </p>
      </div>
    </main>
  );
}
