import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/Site/SiteFooter";
import SiteHeader from "@/components/Site/SiteHeader";
import { CLINIC } from "@/lib/clinic";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Политика конфиденциальности | ${SITE_NAME}` },
  description: `Политика обработки персональных данных клиники «${CLINIC.brand}».`,
  alternates: { canonical: "/politika-konfidencialnosti/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="doctor-page" id="main">
        <nav className="doctor-crumb" aria-label="Навигация">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <span>Политика</span>
        </nav>
        <p className="eyebrow doctor-eyebrow">
          ДОКУМЕНТЫ
          <span />
        </p>
        <h1>Политика конфиденциальности</h1>
        <p className="doctor-lead">
          Политика обработки персональных данных клиники «{CLINIC.brand}».
          Оператор — {CLINIC.legal.executor}.
        </p>
        <div className="doctor-col doctor-policy">
          <section className="doctor-card">
            <h2>Оператор</h2>
            <p>
              {CLINIC.legal.form} {CLINIC.legal.name}. {CLINIC.address}.
            </p>
            <p>
              Контакт:{" "}
              <a href={`tel:${CLINIC.phoneE164}`}>{CLINIC.phoneDisplay}</a>,{" "}
              <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
            </p>
          </section>
          <section className="doctor-card">
            <h2>Какие данные обрабатываем</h2>
            <p>
              Имя, телефон и сведения, которые вы добровольно указываете в
              форме записи или сообщаете при звонке — для связи и записи на
              приём.
            </p>
          </section>
          <section className="doctor-card">
            <h2>Передача третьим лицам</h2>
            <p>
              Для доставки заявок могут использоваться сервисы форм и хостинг.
              Медицинскую тайну соблюдаем в рамках закона.
            </p>
          </section>
        </div>
        <p className="doctor-actions">
          <Link className="button" href="/#appointment">
            Запись
          </Link>
          <Link className="text-link" href="/">
            На главную
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
