import type { Metadata } from "next";
import Link from "next/link";
import { CLINIC } from "@/lib/clinic";
import { SITE_NAME } from "@/lib/site";
import styles from "../vrachi/bekoev/page.module.css";

export const metadata: Metadata = {
  title: { absolute: `Политика конфиденциальности | ${SITE_NAME}` },
  description: `Политика обработки персональных данных клиники «${CLINIC.brand}».`,
  alternates: { canonical: "/politika-konfidencialnosti/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Навигация">
          <Link href="/">Главная</Link>
          <span aria-hidden>/</span>
          <span>Политика</span>
        </nav>
        <h1 className={styles.title}>Политика конфиденциальности</h1>
        <p className={styles.lead}>
          Черновик для сайта клиники «{CLINIC.brand}». После получения
          реквизитов оператора ПДн текст будет уточнён юристом клиники.
        </p>
        <section className={styles.block}>
          <h2>Оператор</h2>
          <p>{CLINIC.legal.executor}</p>
          <p>
            Контакт:{" "}
            <a href={`tel:${CLINIC.phoneE164}`}>{CLINIC.phoneDisplay}</a>,{" "}
            <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
          </p>
        </section>
        <section className={styles.block}>
          <h2>Какие данные обрабатываем</h2>
          <p>
            Имя, телефон и сведения, которые вы добровольно указываете в форме
            записи или сообщаете при звонке — для связи и записи на приём.
          </p>
        </section>
        <section className={styles.block}>
          <h2>Передача третьим лицам</h2>
          <p>
            Для доставки заявок могут использоваться сервисы форм и хостинг.
            Медицинскую тайну соблюдаем в рамках закона.
          </p>
        </section>
        <p className={styles.links}>
          <Link href="/">На главную</Link>
          <Link href="/#appointment">Запись</Link>
        </p>
      </div>
    </main>
  );
}
