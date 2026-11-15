"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons/BrandIcons";
import SiteFooter from "@/components/Site/SiteFooter";
import SiteHeader from "@/components/Site/SiteHeader";
import { FAQ } from "@/lib/faq";
import { CLINIC } from "@/lib/clinic";
import { submitContact } from "@/lib/submitContact";

const photos: [string, string][] = [
  ["/images/reception-full.webp", "Ресепшен клиники"],
  ["/images/treatment-full.webp", "Кабинет для процедур"],
  ["/images/sign-full.webp", "Капельная №1"],
  ["/images/exterior-full.webp", "Здание клиники"],
];

export default function HomePage() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [faqOpen, setFaqOpen] = useState(0);
  const galleryRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (galleryOpen) gallery?.showModal();
    else gallery?.close();
  }, [galleryOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
      <div className="site-shell" id="top">
        <SiteHeader />

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
                УСЛУГИ И СТОИМОСТЬ
                <span />
              </p>
              <h2 id="services-title">С чего начать</h2>
            </div>
            <div className="price-grid">
              {CLINIC.services.map((service) => (
                <article className="price-card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.price}</p>
                </article>
              ))}
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

          <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="section-heading">
              <p className="eyebrow">
                ВОПРОСЫ И ОТВЕТЫ
                <span />
              </p>
              <h2 id="faq-title">
                Частые вопросы о наркологе
                <br />и психиатре
              </h2>
              <p className="faq-intro">
                Нарколог на дом, вывод из запоя, капельница, кодирование и
                лечение алкоголизма во Владикавказе.
              </p>
            </div>
            <div className="faq-list">
              {FAQ.map((item, index) => {
                const open = faqOpen === index;
                const panelId = `faq-panel-${index}`;
                return (
                  <div
                    className={open ? "faq-item is-open" : "faq-item"}
                    key={item.q}
                  >
                    <button
                      className="faq-question"
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setFaqOpen(open ? -1 : index)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-toggle" aria-hidden="true" />
                    </button>
                    <div className="faq-answer" id={panelId} hidden={!open}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                );
              })}
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

        <SiteFooter />
      </div>

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
