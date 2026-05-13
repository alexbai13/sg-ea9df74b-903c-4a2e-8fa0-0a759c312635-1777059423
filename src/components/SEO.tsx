import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

// SEO elements that can be used in _document.tsx (returns JSX without Head wrapper)
export function SEOElements({
  title = "ALDALU | Brokers de Creditaria en Querétaro - Crédito Hipotecario, Automotriz Kavak y IMSS",
  description = "Brokers de Creditaria en Querétaro. Comparamos más de 15 bancos para encontrarte la mejor tasa en crédito hipotecario, crédito automotriz asociados a Kavak y préstamos personales para pensionados del IMSS. Asesoría 100% gratuita con expertos certificados.",
  image = "/og-image-new.png",
  url,
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon-new.png" />
      <link rel="apple-touch-icon" href="/favicon-new.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}

// SEO component for use in pages/_app.tsx or individual pages (uses next/head)
// Note: Flattened structure (no fragment) for better Next.js Head compatibility during hot reload
export function SEO({
  title = "ALDALU | Brokers de Creditaria en Querétaro - Crédito Hipotecario, Automotriz Kavak y IMSS",
  description = "Brokers de Creditaria en Querétaro. Comparamos más de 15 bancos para encontrarte la mejor tasa en crédito hipotecario, crédito automotriz asociados a Kavak y préstamos personales para pensionados del IMSS. Asesoría 100% gratuita con expertos certificados.",
  image = "/og-image-new.png",
  url,
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon-new.png" />
      <link rel="apple-touch-icon" href="/favicon-new.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}
