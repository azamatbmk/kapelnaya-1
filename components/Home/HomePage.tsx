"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import BrandIcons, { Icon } from "@/components/Icons/BrandIcons";
import { submitContact } from "@/lib/submitContact";

const serviceContent: Record<string, [string, string]> = {
  consultation: [
    "Консультация нарколога",
    "Обсудите со специалистом вашу ситуацию, вопросы о приёме и возможных вариантах медицинской помощи. Состав услуг и стоимость необходимо уточнить у клиники.",
  ],
  care: [
    "Вывод из запоя",
    "Возможность оказания помощи и её формат определяет врач после оценки состояния. Условия приёма и стоимость необходимо уточнить у клиники.",
  ],
  infusions: [
    "Капельницы",
    "Обсудите назначения с врачом. Состав процедур, показания и ограничения определяются на консультации. Условия приёма и стоимость необходимо уточнить у клиники.",
  ],
};

const infoContent: Record<string, [string, string]> = {
  documents: [
    "Документы клиники",
    "Документы и сведения о лицензии будут размещены после предоставления клиникой.",
  ],
  privacy: [
    "Политика конфиденциальности",
    "Перед запуском онлайн-записи клиника должна предоставить реквизиты оператора и политику обработки персональных данных. Черновик политики: страница «Политика конфиденциальности».",
  ],
};

const photos: [string, string][] = [
  ["/images/reception-full.webp", "Ресепшен клиники"],
  ["/images/treatment-full.webp", "Кабинет для процедур"],
  ["/images/sign-full.webp", "Капельная №1"],
  ["/images/exterior-full.webp", "Здание клиники"],
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoCopy, setInfoCopy] = useState("");
  const [infoShowCta, setInfoShowCta] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const infoRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const info = infoRef.current;
    const gallery = galleryRef.current;
    if (infoOpen) info?.showModal();
    else info?.close();
    if (galleryOpen) gallery?.showModal();
    else gallery?.close();
  }, [infoOpen, galleryOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (!galleryOpen) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setPhotoIndex((i) => (i + 1) % photos.length);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [galleryOpen]);

  const openService = (key: string) => {
    const content = serviceContent[key];
    if (!content) return;
    setInfoTitle(content[0]);
    setInfoCopy(content[1]);
    setInfoShowCta(true);
    setInfoOpen(true);
  };

  const openInfo = (key: string) => {
    const content = infoContent[key];
    if (!content) return;
    setInfoTitle(content[0]);
    setInfoCopy(content[1]);
    setInfoShowCta(false);
    setInfoOpen(true);
  };

  const openGallery = (index: number) => {
    setPhotoIndex(index);
    setGalleryOpen(true);
  };

  const onBackdropClick = useCallback(
    (
      e: React.MouseEvent<HTMLDialogElement>,
      close: () => void,
    ) => {
      if (e.target !== e.currentTarget) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        close();
      }
    },
    [],
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const digits = phone.replace(/\D/g, "");
    if (!(digits.length === 11 && /^[78]/.test(digits))) {
      setFormStatus("Введите номер из 11 цифр, начиная с +7 или 8.");
      return;
    }
    if (!data.get("consent")) {
      setFormStatus("Нужно согласие на обработку персональных данных.");
      return;
    }
    setSubmitting(true);
    try {
      if (honeypot.trim()) {
        setFormStatus("Заявка принята. Мы свяжемся с вами.");
        form.reset();
        return;
      }
      const result = await submitContact({ name, phone, website: honeypot });
      if (!result.ok) {
        setFormStatus(result.error);
        return;
      }
      setFormStatus("Заявка отправлена. Мы свяжемся с вами.");
      form.reset();
    } catch {
      setFormStatus("Нет соединения. Проверьте интернет или позвоните.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <BrandIcons />
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>

      <div className="site-shell" id="top">
        <header className="site-header">
          <div className="header-inner">
            <a className="brand" href="#top" aria-label="Капельная №1 — на главную">
              <Icon id="brand-drop" className="brand-icon" />
              <span className="brand-copy">
                <strong>КАПЕЛЬНАЯ №1</strong>
                <span>Медицинская клиника</span>
              </span>
            </a>
            <span className="location header-location">
              <Icon id="icon-pin" />
              Владикавказ
            </span>
            <nav className="desktop-nav" aria-label="Основная навигация">
              <a href="#services">Услуги</a>
              <a href="#clinic">О клинике</a>
              <Link href="/vrachi/bekoev/">О враче</Link>
              <a href="#contacts">Контакты</a>
            </nav>
            <a className="button header-cta" href="#appointment">
              Записаться
            </a>
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
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Услуги
            </a>
            <a href="#clinic" onClick={() => setMenuOpen(false)}>
              О клинике
            </a>
            <Link href="/vrachi/bekoev/" onClick={() => setMenuOpen(false)}>
              О враче
            </Link>
            <a href="#contacts" onClick={() => setMenuOpen(false)}>
              Контакты
            </a>
            <a href="#appointment" onClick={() => setMenuOpen(false)}>
              Записаться на консультацию
            </a>
          </nav>
        </header>

        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-image"
              src="/images/reception.webp"
              width={576}
              height={396}
              alt="Ресепшен Капельной №1: стойка с тёплой подсветкой и светлый диван"
              fetchPriority="high"
            />
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow">
                КАПЕЛЬНАЯ №1 • ВЛАДИКАВКАЗ
                <span />
              </p>
              <h1 id="hero-title">
                Помощь
                <br />
                начинается
                <br />с заботы о вас
              </h1>
              <p className="hero-description">
                Медицинская помощь в спокойной обстановке.
                <br /> Начните с консультации специалиста.
              </p>
              <div className="hero-actions">
                <a className="button" href="#appointment">
                  Записаться на консультацию
                </a>
                <a className="text-link hero-link" href="#clinic">
                  Посмотреть клинику <Icon id="icon-arrow" />
                </a>
              </div>
            </div>
          </section>

          <div className="benefits" aria-label="Подход клиники">
            <div className="benefit">
              <Icon id="icon-person" />
              <span>Индивидуальный подход</span>
            </div>
            <div className="benefit">
              <Icon id="icon-leaf" />
              <span>Внимание к деталям</span>
            </div>
            <div className="benefit">
              <Icon id="icon-chair" />
              <span>Спокойная атмосфера</span>
            </div>
          </div>

          <section
            className="services"
            id="services"
            aria-labelledby="services-title"
          >
            <div className="section-heading">
              <p className="eyebrow">
                НАПРАВЛЕНИЯ ПОМОЩИ
                <span />
              </p>
              <h2 id="services-title">С чего начать</h2>
            </div>
            <div className="service-grid">
              <article className="service-card">
                <span className="service-number" aria-hidden="true">
                  01
                </span>
                <div className="service-main">
                  <Icon id="icon-stethoscope" className="service-icon" />
                  <div>
                    <h3>
                      Консультация
                      <br />
                      нарколога
                    </h3>
                    <p>
                      Обсудить ситуацию
                      <br />
                      со специалистом
                    </p>
                  </div>
                </div>
                <button
                  className="service-link"
                  type="button"
                  onClick={() => openService("consultation")}
                >
                  Подробнее <Icon id="icon-arrow" />
                </button>
              </article>
              <article className="service-card">
                <span className="service-number" aria-hidden="true">
                  02
                </span>
                <div className="service-main">
                  <Icon id="icon-iv" className="service-icon" />
                  <div>
                    <h3>Вывод из запоя</h3>
                    <p>
                      Узнать о медицинской
                      <br />
                      помощи
                    </p>
                  </div>
                </div>
                <button
                  className="service-link"
                  type="button"
                  onClick={() => openService("care")}
                >
                  Подробнее <Icon id="icon-arrow" />
                </button>
              </article>
              <article className="service-card">
                <span className="service-number" aria-hidden="true">
                  03
                </span>
                <div className="service-main">
                  <Icon id="icon-drop" className="service-icon" />
                  <div>
                    <h3>Капельницы</h3>
                    <p>
                      Обсудить назначения
                      <br />с врачом
                    </p>
                  </div>
                </div>
                <button
                  className="service-link"
                  type="button"
                  onClick={() => openService("infusions")}
                >
                  Подробнее <Icon id="icon-arrow" />
                </button>
              </article>
            </div>
          </section>

          <section className="clinic" id="clinic" aria-labelledby="clinic-title">
            <div className="clinic-copy">
              <p className="eyebrow">
                ПРОСТРАНСТВО КЛИНИКИ
                <span />
              </p>
              <h2 id="clinic-title">
                Здесь можно
                <br />
                почувствовать
                <br />
                себя спокойнее
              </h2>
              <p className="clinic-description">
                Светлые кабинеты, удобные кресла
                <br className="desktop-break" /> и продуманное пространство
                <br className="desktop-break" /> для вашего визита.
              </p>
              <button
                className="text-link gallery-trigger"
                type="button"
                onClick={() => openGallery(0)}
              >
                Больше фотографий <Icon id="icon-arrow" />
              </button>
            </div>
            <div className="clinic-gallery">
              <button
                className="gallery-photo gallery-main"
                type="button"
                aria-label="Посмотреть фотографию кабинета"
                onClick={() => openGallery(1)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/treatment-room.webp"
                  width={374}
                  height={309}
                  alt="Кабинет с удобными креслами для процедур"
                  loading="lazy"
                />
              </button>
              <button
                className="gallery-photo"
                type="button"
                aria-label="Посмотреть вывеску клиники"
                onClick={() => openGallery(2)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/clinic-sign.webp"
                  width={258}
                  height={144}
                  alt="Вывеска Капельная №1 с мягкой подсветкой"
                  loading="lazy"
                />
              </button>
              <button
                className="gallery-photo"
                type="button"
                aria-label="Посмотреть здание клиники"
                onClick={() => openGallery(3)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/clinic-exterior.webp"
                  width={257}
                  height={151}
                  alt="Фасад здания клиники Капельная №1"
                  loading="lazy"
                />
              </button>
            </div>
          </section>

          <section
            className="appointment"
            id="appointment"
            aria-labelledby="appointment-title"
          >
            <div className="appointment-copy">
              <h2 id="appointment-title">
                Сделайте
                <br />
                первый шаг
              </h2>
              <span className="short-rule" aria-hidden="true" />
              <p>
                Оставьте номер — мы свяжемся с вами
                <br /> и ответим на вопросы о приёме.
              </p>
            </div>
            <form
              className="appointment-form"
              id="callback-form"
              onSubmit={onSubmit}
            >
              <div
                className="honeypot"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="website">Сайт</label>
                <input
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="form-field">
                <label htmlFor="client-name">Ваше имя</label>
                <input
                  id="client-name"
                  name="name"
                  type="text"
                  placeholder="Как к вам обращаться"
                  autoComplete="given-name"
                  minLength={2}
                  maxLength={80}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="client-phone">Телефон</label>
                <input
                  id="client-phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  aria-describedby="form-status"
                />
              </div>
              <button
                className="button button-light"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Отправка…" : "Заказать звонок"}
              </button>
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  Согласие на обработку персональных данных и{" "}
                  <Link href="/politika-konfidencialnosti/">политику</Link>
                </span>
              </label>
              {formStatus ? (
                <p className="form-status" id="form-status" role="status">
                  {formStatus}
                </p>
              ) : null}
            </form>
          </section>
        </main>

        <footer className="site-footer" id="contacts">
          <div className="footer-main">
            <a
              className="brand footer-brand"
              href="#top"
              aria-label="Капельная №1 — наверх"
            >
              <Icon id="brand-drop" className="brand-icon" />
              <span className="brand-copy">
                <strong>КАПЕЛЬНАЯ №1</strong>
                <span>Медицинская клиника</span>
              </span>
            </a>
            <span className="location footer-location">
              <Icon id="icon-pin" />
              Владикавказ
            </span>
            <nav
              className="footer-links"
              aria-label="Дополнительная информация"
            >
              <a href="#appointment">Контакты</a>
              <Link href="/vrachi/bekoev/">О враче</Link>
              <button type="button" onClick={() => openInfo("documents")}>
                Документы
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
      </div>

      <dialog
        className="info-dialog"
        ref={infoRef}
        aria-labelledby="dialog-title"
        onClick={(e) => onBackdropClick(e, () => setInfoOpen(false))}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Закрыть окно"
          onClick={() => setInfoOpen(false)}
        >
          ×
        </button>
        <p className="eyebrow">КАПЕЛЬНАЯ №1</p>
        <h2 id="dialog-title">{infoTitle}</h2>
        <p>{infoCopy}</p>
        {infoShowCta ? (
          <a
            className="button"
            href="#appointment"
            onClick={() => setInfoOpen(false)}
          >
            Перейти к записи
          </a>
        ) : null}
      </dialog>

      <dialog
        className="gallery-dialog"
        ref={galleryRef}
        aria-label="Фотографии клиники"
        onClick={(e) => onBackdropClick(e, () => setGalleryOpen(false))}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Закрыть галерею"
          onClick={() => setGalleryOpen(false)}
        >
          ×
        </button>
        <button
          className="gallery-prev"
          type="button"
          aria-label="Предыдущее фото"
          onClick={() =>
            setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)
          }
        >
          ‹
        </button>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="gallery-image"
            src={photos[photoIndex][0]}
            alt={photos[photoIndex][1]}
          />
          <figcaption>
            {photos[photoIndex][1]} · {photoIndex + 1} / {photos.length}
          </figcaption>
        </figure>
        <button
          className="gallery-next"
          type="button"
          aria-label="Следующее фото"
          onClick={() => setPhotoIndex((i) => (i + 1) % photos.length)}
        >
          ›
        </button>
      </dialog>
    </>
  );
}
