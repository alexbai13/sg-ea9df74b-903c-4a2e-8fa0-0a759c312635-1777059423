import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { articles } from "@/lib/blog-data";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const categoryColors: Record<string, string> = {
  Hipotecario: "bg-primary/10 text-primary",
  Automotriz: "bg-secondary text-secondary-foreground",
  IMSS: "bg-accent/10 text-accent",
};

const featured = articles.slice(0, 3);

export function BlogPreview() {
  return (
    <section id="blog" className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-3xl -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-secondary/15 blur-3xl translate-x-1/4" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <BookOpen size={14} />
              Educación financiera
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Artículos recientes
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Tips y guías prácticas para tomar mejores decisiones financieras en Querétaro.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all shrink-0"
          >
            Ver todos los artículos
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: EASE }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
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
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
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
    </section>
  );
}