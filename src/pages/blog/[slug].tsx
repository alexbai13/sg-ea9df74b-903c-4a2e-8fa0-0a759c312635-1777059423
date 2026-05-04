import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, BookOpen } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { articles } from "@/lib/blog-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { BlogArticle } from "@/lib/blog-data";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface ArticlePageProps {
  article: BlogArticle;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map((a) => ({ params: { slug: a.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const article = articles.find((a) => a.slug === params?.slug);
  if (!article) return { notFound: true };
  return { props: { article } };
};

export default function ArticlePage({ article }: ArticlePageProps) {
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

  return (
    <>
      <SEO title={`${article.title} | Blog ALDALU`} description={article.excerpt} image={article.image} />
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
            className="prose-aldalu"
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
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
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
        </article>
      </main>
      <Footer />
    </>
  );
}