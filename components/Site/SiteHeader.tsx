"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandIcons, { Icon } from "@/components/Icons/BrandIcons";

export default function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const to = (hash: string) => (onHome ? `#${hash}` : `/#${hash}`);
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <BrandIcons />
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href={onHome ? "#top" : "/"} aria-label="Капельная №1 — на главную">
            <Icon id="brand-drop" className="brand-icon" />
            <span className="brand-copy">
              <strong>КАПЕЛЬНАЯ №1</strong>
              <span>Медицинская клиника</span>
            </span>
          </Link>
          <span className="location header-location">
            <Icon id="icon-pin" />
            Владикавказ
          </span>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <Link href={to("services")}>Услуги</Link>
            <Link href={to("clinic")}>О клинике</Link>
            <Link href="/vrachi/bekoev/">О враче</Link>
            <Link href={to("contacts")}>Контакты</Link>
          </nav>
          <Link className="button header-cta" href={to("appointment")}>
            Записаться
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Мобильная навигация"
          hidden={!menuOpen}
        >
          <Link href={to("services")} onClick={close}>
            Услуги
          </Link>
          <Link href={to("clinic")} onClick={close}>
            О клинике
          </Link>
          <Link href="/vrachi/bekoev/" onClick={close}>
            О враче
          </Link>
          <Link href={to("contacts")} onClick={close}>
            Контакты
          </Link>
          <Link href={to("appointment")} onClick={close}>
            Записаться на консультацию
          </Link>
        </nav>
      </header>
    </>
  );
}
