"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons/BrandIcons";
import { CLINIC } from "@/lib/clinic";

export default function SiteFooter() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const to = (hash: string) => (onHome ? `#${hash}` : `/#${hash}`);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (documentsOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) dialog.close();
  }, [documentsOpen]);

  return (
    <>
      <footer className="site-footer" id="contacts">
        <div className="footer-main">
          <Link
            className="brand footer-brand"
            href={onHome ? "#top" : "/"}
            aria-label="Капельная №1 — на главную"
          >
            <Icon id="brand-drop" className="brand-icon" />
            <span className="brand-copy">
              <strong>КАПЕЛЬНАЯ №1</strong>
              <span>Медицинская клиника</span>
            </span>
          </Link>
          <span className="location footer-location">
            <Icon id="icon-pin" />
            Владикавказ
          </span>
          <nav className="footer-links" aria-label="Дополнительная информация">
            <Link href={to("appointment")}>Контакты</Link>
            <Link href="/vrachi/bekoev/">О враче</Link>
            <button type="button" onClick={() => setDocumentsOpen(true)}>
              Реквизиты
            </button>
            <Link href="/politika-konfidencialnosti/">
              Политика конфиденциальности
            </Link>
          </nav>
        </div>
        <p className="medical-note">
          Имеются противопоказания. Необходима консультация специалиста.
        </p>
      </footer>

      <dialog
        className="info-dialog"
        ref={dialogRef}
        aria-labelledby="documents-title"
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const outside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;
          if (outside) setDocumentsOpen(false);
        }}
        onClose={() => setDocumentsOpen(false)}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Закрыть окно"
          onClick={() => setDocumentsOpen(false)}
        >
          ×
        </button>
        <p className="eyebrow">КАПЕЛЬНАЯ №1</p>
        <h2 id="documents-title">Реквизиты</h2>
        <dl className="requisites">
          <div>
            <dt>Исполнитель</dt>
            <dd>
              {CLINIC.legal.form} {CLINIC.legal.name}
            </dd>
          </div>
          <div>
            <dt>Адрес</dt>
            <dd>{CLINIC.address}</dd>
          </div>
          <div>
            <dt>ИНН</dt>
            <dd>{CLINIC.legal.inn}</dd>
          </div>
          <div>
            <dt>ОГРНИП</dt>
            <dd>{CLINIC.legal.ogrnip}</dd>
          </div>
          <div>
            <dt>Р/с</dt>
            <dd>{CLINIC.legal.account}</dd>
          </div>
          <div>
            <dt>БИК</dt>
            <dd>{CLINIC.legal.bik}</dd>
          </div>
          <div>
            <dt>К/с</dt>
            <dd>{CLINIC.legal.corr}</dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>
              <a href={`tel:${CLINIC.phoneE164}`}>{CLINIC.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt>Почта</dt>
            <dd>
              <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
            </dd>
          </div>
        </dl>
        <p>{CLINIC.legal.license}</p>
      </dialog>
    </>
  );
}
