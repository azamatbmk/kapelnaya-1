/** SVG-спрайт иконок с макета */
export default function BrandIcons() {
  return (
    <svg
      className="svg-definitions"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <symbol id="icon-pin" viewBox="0 0 24 24">
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </symbol>
      <symbol id="icon-arrow" viewBox="0 0 24 16">
        <path d="M1 8h21m-6-6 6 6-6 6" />
      </symbol>
      <symbol id="icon-person" viewBox="0 0 32 34">
        <circle cx="16" cy="9" r="6" />
        <path d="M5 30v-3c0-6 4-10 11-10s11 4 11 10v3H5Z" />
      </symbol>
      <symbol id="icon-leaf" viewBox="0 0 36 34">
        <path d="M18 31c-1-12 3-19 12-26M17 23C8 24 3 20 3 11c10 0 15 5 14 12ZM19 22C17 10 23 4 33 3c1 10-3 18-14 19Z" />
      </symbol>
      <symbol id="icon-chair" viewBox="0 0 38 35">
        <path d="M9 14V9c0-5 3-7 10-7s10 2 10 7v5M6 27V15c-4-4-5 0-5 2 0 4 2 6 5 6m26 4V15c4-4 5 0 5 2 0 4-2 6-5 6M6 27h26M9 27v6m20-6v6M7 20h24" />
      </symbol>
      <symbol id="brand-drop" viewBox="0 0 40 52">
        <path
          d="M20 3C15 13 4 23 4 34a16 16 0 0 0 32 0C36 23 25 13 20 3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.6"
        />
        <path
          d="m17 20 7-5v21c0 7-8 10-12 5l-1-5c4 5 8 4 8-1V23l-5 3Z"
          fill="currentColor"
        />
      </symbol>
    </svg>
  );
}

export function Icon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}
