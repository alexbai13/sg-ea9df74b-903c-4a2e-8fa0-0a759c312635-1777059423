import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, BookOpen, Mail, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { articles } from "@/lib/blog-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { BlogArticle } from "@/lib/blog-data";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface ArticlePageProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map((a) => ({ params: { slug: a.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const article = articles.find((a) => a.slug === params?.slug);
  if (!article) return { notFound: true };
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);
  return { props: { article, relatedArticles } };
};

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 justify-center py-4"
      >
        <CheckCircle size={20} className="text-primary" />
        <p className="text-foreground font-medium">¡Listo! Te enviaremos contenido financiero útil.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm shadow-md shadow-accent/20 hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        Suscribirme
      </motion.button>
    </form>
  );
}

export default function ArticlePage({ article, relatedArticles }: ArticlePageProps) {
  const router = useRouter();

  if (router.isFallback || !article) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  const categoryColors: Record<string, string> = {
    Hipotecario: "bg-primary/10 text-primary",
    Automotriz: "bg-secondary text-secondary-foreground",
    IMSS: "bg-accent/10 text-accent",
  };

  const scrollToContact = () => {
    window.location.href = "/#contacto";
  };

  const fullUrl = `https://aldalu.com/blog/${article.slug}`;

  return (
    <>
      <SEO
        title={`${article.title} | Blog ALDALU`}
        description={article.excerpt}
        image={article.image}
        url={fullUrl}
      />
      <Navigation />
      <main className="pt-24 pb-20">
        <article className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Volver al blog
            </Link>

            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColors[article.category] || "bg-muted text-muted-foreground"}`}>
              {article.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {article.readTime} de lectura
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="rounded-2xl overflow-hidden mb-10"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          >
            {article.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-foreground/85 text-base md:text-lg leading-relaxed mb-5"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            className="mt-14 bg-muted/50 border border-border rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              ¿Necesitas asesoría personalizada?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Nuestros asesores certificados en Querétaro pueden ayudarte a tomar la mejor decisión financiera — sin costo.
            </p>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
            >
              Solicita tu asesoría gratis
              <ArrowRight size={16} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            className="mt-10 border border-primary/15 bg-primary/[0.03] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Newsletter ALDALU</h3>
                <p className="text-xs text-muted-foreground">Tips financieros directo a tu inbox — sin spam</p>
              </div>
            </div>
            <NewsletterForm />
          </motion.div>

          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="mt-14"
            >
              <h3 className="text-lg font-heading font-bold text-foreground mb-6">Artículos relacionados</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block border border-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <img src={related.image} alt={related.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-4">
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 ${categoryColors[related.category] || "bg-muted text-muted-foreground"}`}>
                        {related.category}
                      </span>
                      <h4 className="text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{related.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}