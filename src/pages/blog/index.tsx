import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { articles } from "@/lib/blog-data";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const categoryColors: Record<string, string> = {
  Hipotecario: "bg-primary/10 text-primary",
  Automotriz: "bg-secondary text-secondary-foreground",
  IMSS: "bg-accent/10 text-accent",
};

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Blog Financiero | ALDALU — Educación sobre hipotecas, autos y créditos IMSS"
        description="Artículos sobre educación financiera, hipotecas en Querétaro, crédito automotriz y préstamos IMSS. Guías prácticas de los asesores certificados de ALDALU."
      />
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-2xl mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <BookOpen size={14} />
              Educación financiera
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Blog ALDALU
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              Guías prácticas y artículos para tomar decisiones financieras informadas en Querétaro.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] || "bg-muted text-muted-foreground"}`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                      Leer artículo <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}