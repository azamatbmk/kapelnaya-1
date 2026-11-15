import { CLINIC } from "@/lib/clinic";
import { DOCTOR } from "@/lib/doctor";
import { SITE_URL } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${SITE_URL}/#clinic`,
        name: CLINIC.brand,
        url: SITE_URL,
        telephone: CLINIC.phoneE164,
        email: CLINIC.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: CLINIC.city,
          addressRegion: CLINIC.region,
          addressCountry: "RU",
        },
        medicalSpecialty: ["Psychiatric", "AddictionMedicine"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: CLINIC.brand,
        publisher: { "@id": `${SITE_URL}/#clinic` },
      },
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        name: DOCTOR.fullName,
        url: `${SITE_URL}/vrachi/bekoev/`,
        telephone: DOCTOR.contacts.phoneE164,
        worksFor: { "@id": `${SITE_URL}/#clinic` },
        medicalSpecialty: ["Psychiatric"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
