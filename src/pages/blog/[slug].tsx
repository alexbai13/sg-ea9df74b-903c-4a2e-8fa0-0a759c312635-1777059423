import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Mail, 
  CheckCircle, 
  Share2, 
  Facebook, 
  Linkedin, 
  MessageCircle,
  Twitter
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { articles } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
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
        <p className="text-foreground font-medium text-sm">¡Listo! Te enviaremos contenido financiero útil.</p>
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
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (router.isFallback || !article) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  const categoryColors: Record<string, string> = {
    Hipotecario: "bg-primary/10 text-primary",
    Automotriz: "bg-secondary text-secondary-foreground",
    IMSS: "bg-accent/10 text-accent",
  };

  const fullUrl = mounted ? window.location.href : `https://aldalu.com/blog/${article.slug}`;

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366]",
      href: `https://wa.me/?text=${encodeURIComponent(article.title + " " + fullUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0A66C2]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "X",
      icon: Twitter,
      color: "bg-[#000000]",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(fullUrl)}`,
    },
  ];

  return (
    <>
      <SEO
        title={`${article.title} | Blog ALDALU`}
        description={article.excerpt}
        image={article.image}
        url={fullUrl}
      />
      <Navigation />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <main className="pt-24 pb-20">
        <article className="container max-w-4xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Desktop - Social Share */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex flex-col gap-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest vertical-text mb-2">Compartir</span>
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shadow-sm",
                      option.color
                    )}
                    title={`Compartir en ${option.name}`}
                  >
                    <option.icon size={18} />
                  </a>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-11 xl:col-span-10 xl:col-offset-1 max-w-3xl">
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

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] || "bg-muted text-muted-foreground"}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.readTime} de lectura
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-8">
                  {article.title}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="rounded-2xl overflow-hidden mb-12 aspect-[16/9] shadow-2xl shadow-primary/5"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Mobile Social Share */}
              <div className="lg:hidden flex items-center gap-3 mb-10 pb-6 border-b border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Compartir:</span>
                <div className="flex gap-2">
                  {shareOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shadow-sm",
                        option.color
                      )}
                    >
                      <option.icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                {article.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* CTAs & Widgets */}
              <div className="space-y-8 mt-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="bg-muted/50 border border-border rounded-2xl p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    ¿Necesitas asesoría personalizada?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                    Nuestros asesores certificados en Querétaro pueden ayudarte a tomar la mejor decisión financiera — sin costo.
                  </p>
                  <Link
                    href="/#contacto"
                    className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
                  >
                    Solicita tu asesoría gratis
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="border border-primary/15 bg-primary/[0.03] rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-5">
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
              </div>

              {/* Related Articles Section */}
              {relatedArticles.length > 0 && (
                <div className="mt-20 pt-10 border-t border-border">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-heading font-bold text-foreground">Artículos relacionados</h3>
                    <Link href="/blog" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                      Ver todo el blog <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="group flex flex-col h-full bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img 
                            src={related.image} 
                            alt={related.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-3 self-start ${categoryColors[related.category] || "bg-muted text-muted-foreground"}`}>
                            {related.category}
                          </span>
                          <h4 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {related.title}
                          </h4>
                          <p className="mt-3 text-sm text-muted-foreground line-clamp-2 flex-1">
                            {related.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-1 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                            Leer más <ArrowRight size={14} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
      
      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </>
  );
}