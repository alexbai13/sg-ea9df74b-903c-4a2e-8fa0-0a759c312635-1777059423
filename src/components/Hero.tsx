import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Easing,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Shield, ChevronDown } from "lucide-react";

const EASE: Easing = [0.25, 0.46, 0.45, 0.94];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const num = parseInt(target.replace(/\D/g, ""), 10);
  const isNumeric = !isNaN(num) && num > 0;
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isNumeric) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isNumeric, started]);

  useEffect(() => {
    if (!started || !isNumeric) return;
    const duration = 1600;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, num, isNumeric]);

  if (!isNumeric) return <>{target}</>;
  return (
    <span ref={ref}>
      {suffix === "+" ? "+" : ""}
      {count}
      {suffix !== "+" ? suffix : ""}
    </span>
  );
}

function FloatingShape({
  className,
  delay,
  duration,
  x,
  y,
}: {
  className: string;
  delay: number;
  duration: number;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x, y, opacity: 0, scale: 0.6 }}
      animate={{
        x: [x, x + 20, x - 15, x + 10, x],
        y: [y, y - 25, y + 15, y - 10, y],
        opacity: [0, 0.7, 0.5, 0.7, 0],
        scale: [0.6, 1, 0.85, 1.05, 0.6],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

const headlineWords = ["Los", "mejores", "brokers", "hipotecarios,", "a", "tu", "lado"];

const stats = [
  { value: "100", suffix: "%", label: "Gratis para ti" },
  { value: "15", suffix: "+", label: "Bancos comparados" },
  { value: "Qro", suffix: "", label: "Querétaro exclusivo" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const springBgY = useSpring(bgY, { stiffness: 80, damping: 20 });
  const springContentY = useSpring(contentY, { stiffness: 80, damping: 20 });
  const springImageY = useSpring(imageY, { stiffness: 60, damping: 25 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx * 15);
      mouseY.set((e.clientY - cy) / cy * 15);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-8"
    >
      <motion.div className="absolute inset-0 -z-20" style={{ y: springBgY, scale: bgScale }}>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[100px] translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-secondary/25 blur-[100px] -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-muted/30 blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <FloatingShape
          className="w-4 h-4 rounded-full bg-primary/20"
          delay={0}
          duration={18}
          x={100}
          y={150}
        />
        <FloatingShape
          className="w-3 h-3 rounded-sm bg-accent/25 rotate-45"
          delay={2}
          duration={22}
          x={300}
          y={80}
        />
        <FloatingShape
          className="w-5 h-5 rounded-full border-2 border-primary/15"
          delay={4}
          duration={20}
          x={700}
          y={200}
        />
        <FloatingShape
          className="w-3 h-3 bg-secondary/30 rotate-12"
          delay={1}
          duration={16}
          x={900}
          y={100}
        />
        <FloatingShape
          className="w-6 h-6 rounded-full border border-accent/10"
          delay={3}
          duration={24}
          x={500}
          y={350}
        />
        <FloatingShape
          className="w-2 h-2 rounded-full bg-primary/30"
          delay={5}
          duration={19}
          x={200}
          y={400}
        />
        <FloatingShape
          className="w-4 h-4 rounded-sm bg-muted-foreground/10 rotate-45"
          delay={2.5}
          duration={21}
          x={800}
          y={350}
        />
      </div>

      <motion.div className="absolute inset-0 -z-10 pointer-events-none" style={{ x: springMouseX, y: springMouseY }} aria-hidden="true">
        <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-primary/[0.04] blur-xl" />
        <div className="absolute bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-accent/[0.04] blur-xl" />
      </motion.div>

      <div 
        className="absolute inset-0 -z-10 opacity-[0.015] pointer-events-none mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          <motion.div
            className="max-w-2xl"
            style={{ y: springContentY, opacity: contentOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 bg-muted px-5 py-2.5 rounded-full mb-8 border border-primary/10"
            >
              <Shield size={18} className="text-primary" />
              <span className="text-base font-medium text-muted-foreground">
                Brokers Hipotecarios de Creditaria
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.05] tracking-tight mb-8">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.08,
                    ease: EASE,
                  }}
                  className={`inline-block mr-[0.3em] ${
                    word === "hipotecarios," || word === "lado"
                      ? "relative"
                      : ""
                  }`}
                >
                  {word}
                  {word === "hipotecarios," && (
                    <motion.span
                      className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-10 rounded"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
                      style={{ originX: 0 }}
                    />
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              Comparamos entre múltiples bancos para asegurarte la mejor opción de <strong>crédito hipotecario</strong>. También somos expertos en crédito <strong>automotriz</strong> y <strong>préstamos IMSS</strong> —{" "}
              <strong className="text-foreground">totalmente sin costo para ti.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.button
                onClick={() => scrollTo("#contacto")}
                className="group relative bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-accent/25 flex items-center justify-center gap-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Solicitar asesoría financiera gratuita"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Solicita tu asesoría gratis
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </span>
              </motion.button>
              <motion.button
                onClick={() => scrollTo("#servicios")}
                className="group bg-background border-2 border-primary/20 text-foreground px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  borderColor: "hsl(174 72% 56% / 0.4)",
                  backgroundColor: "hsl(174 72% 56% / 0.05)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Conocer servicios financieros disponibles"
              >
                Conoce nuestros servicios
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
              className="flex flex-wrap items-center gap-8 pt-8 border-t border-border"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 + i * 0.15, ease: EASE }}
                >
                  <p className="text-3xl md:text-4xl font-heading font-bold text-primary tabular-nums">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    {stat.suffix === "%" ? "%" : ""}
                  </p>
                  <p className="text-base text-muted-foreground mt-1.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: springImageY, rotate: imageRotate }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
              className="relative"
            >
              <div className="relative overflow-visible">
                <motion.div
                  className="w-full h-[350px] sm:h-[450px] lg:h-[500px] overflow-hidden bg-primary/5 relative rounded-3xl shadow-2xl shadow-primary/10 border border-border/40"
                >
                  <Image
                    src="/17.png"
                    alt="Pareja feliz recibiendo llaves de su nuevo hogar - Crédito hipotecario ALDALU"
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
                    className="object-contain object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay pointer-events-none" aria-hidden="true" />
                </motion.div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
                    className="bg-background/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src="/AD_Imagotipo_color.png"
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-foreground">
                          Tu guía financiero personal
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Nosotros lo hacemos por ti — sin complicaciones
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center backdrop-blur-sm"
                style={{ y: decorY1 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <span className="text-accent font-heading font-bold text-xl">$0</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted border border-primary/10"
                style={{ y: decorY2 }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />

              <motion.div
                className="absolute top-1/2 -right-8 w-3 h-3 rounded-full bg-primary/40 hidden lg:block"
                animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollTo("#servicios")}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:text-primary focus:ring-2 focus:ring-primary rounded-lg p-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          aria-label="Desplazarse a la sección de servicios"
        >
          <span className="text-sm font-medium">Descubre más</span>
          <ChevronDown size={22} className="animate-bounce" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </section>
  );
}