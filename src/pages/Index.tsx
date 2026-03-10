import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Research", href: "#research" },
  { label: "Safety", href: "#safety" },
  { label: "Company", href: "#company" },
];

const RESEARCH_AREAS = [
  {
    title: "Scalable AI Systems",
    description:
      "Building foundation models that scale reliably across domains while maintaining predictable, controllable behavior at every level of capability.",
  },
  {
    title: "Interpretability",
    description:
      "Developing tools and techniques to understand the internal representations and decision processes of large neural networks.",
  },
  {
    title: "Alignment Research",
    description:
      "Ensuring AI systems act in accordance with human values and intentions, even as they become more capable and autonomous.",
  },
  {
    title: "Robustness & Generalization",
    description:
      "Creating models that perform reliably in novel environments and degrade gracefully when encountering out-of-distribution inputs.",
  },
];

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const EASE = [0.25, 0.4, 0.25, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const Index = () => {
  const scrolled = useScrolled();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 20 });

  // Parallax for hero text
  const heroY = useTransform(smoothScrollY, [0, 600], [0, 80]);
  const heroOpacity = useTransform(smoothScrollY, [0, 400], [1, 0]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  }, []);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["research", "safety", "company"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Subtle background texture */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Navigation — liquid glass */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className={`mx-4 md:mx-8 mt-3 rounded-xl transition-all duration-500 ease-out ${
          scrolled
            ? "glass-panel-strong shadow-lg"
            : "bg-transparent"
        }`}>
          <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-14">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="text-base font-medium tracking-tight text-foreground hover:opacity-70 transition-opacity duration-300"
            >
              Complexia
            </a>
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-xs tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-foreground bg-foreground/[0.06]"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 max-w-5xl mx-auto pt-20 relative">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={childFade}
              className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8"
            >
              AI Research & Safety
            </motion.p>
            <motion.h1
              variants={childFade}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.15] tracking-tight max-w-3xl"
            >
              Building reliable,{" "}
              <br className="hidden sm:block" />
              interpretable AI systems.
            </motion.h1>
            <motion.p
              variants={childFade}
              className="mt-8 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-normal"
            >
              Complexia is an AI research company focused on developing safe, 
              scalable models that humans can understand, trust, and direct.
            </motion.p>
            <motion.div variants={childFade} className="mt-10">
              <a
                href="#research"
                onClick={(e) => handleNavClick(e, "#research")}
                className="group inline-flex items-center gap-2.5 bg-foreground text-background px-5 py-2.5 text-xs font-medium tracking-wide rounded-lg hover:opacity-85 transition-all duration-300"
              >
                Our Research
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Research */}
      <section id="research" className="scroll-mt-24 relative">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="border-t border-border" />
        </div>
        <div className="py-24 md:py-32 px-6 md:px-10 max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={childFade} className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-5">
              Research
            </motion.p>
            <motion.h2 variants={childFade} className="text-2xl md:text-3xl font-medium tracking-tight max-w-2xl">
              Advancing the frontier of AI, responsibly.
            </motion.h2>
            <motion.p variants={childFade} className="mt-5 text-sm text-muted-foreground max-w-lg leading-relaxed">
              Our work spans the core challenges of modern AI — from scaling laws and
              mechanistic interpretability to the alignment problem itself.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-px bg-border sm:grid-cols-2 rounded-lg overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {RESEARCH_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                variants={childFade}
                className="bg-background p-7 md:p-9 group cursor-pointer hover:bg-card transition-all duration-500 h-full"
              >
                <span className="text-[10px] text-muted-foreground tracking-wider">0{i + 1}</span>
                <h3 className="mt-4 text-base font-medium tracking-tight">
                  {area.title}
                </h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
                <div className="mt-5 flex items-center gap-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Read more <ArrowUpRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="bg-card scroll-mt-24 relative">
        <div className="py-24 md:py-32 px-6 md:px-10 max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={childFade} className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-5">
              Safety & Responsibility
            </motion.p>
            <motion.h2 variants={childFade} className="text-2xl md:text-3xl font-medium tracking-tight max-w-2xl">
              Safety is not a feature.{" "}
              <br className="hidden md:block" />
              It is the foundation.
            </motion.h2>
          </motion.div>

          <div className="mt-14 grid md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe that as AI systems grow in capability, the imperative for safety grows
                proportionally. Every model we build is evaluated not just for performance, but
                for failure modes, biases, and potential for misuse.
              </p>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                Our safety team operates independently, with the authority to delay or halt any
                deployment that does not meet our rigorous internal standards.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <div className="border-l border-border pl-7">
                <blockquote className="text-lg md:text-xl font-medium leading-snug tracking-tight">
                  "The measure of an AI lab is not the power of its models, but the care with which
                  it deploys them."
                </blockquote>
                <p className="mt-5 text-[11px] text-muted-foreground tracking-wide">— Complexia Safety Charter</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company */}
      <section id="company" className="py-24 md:py-32 px-6 md:px-10 max-w-5xl mx-auto scroll-mt-24 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p variants={childFade} className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-5">
            Company
          </motion.p>
          <motion.h2 variants={childFade} className="text-2xl md:text-3xl font-medium tracking-tight max-w-2xl">
            A team committed to getting AI right.
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-14 grid md:grid-cols-3 gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { label: "Mission", text: "To develop AI systems that are safe, beneficial, and understandable — advancing the science of intelligence while keeping humans in control." },
            { label: "Culture", text: "We foster intellectual honesty, long-term thinking, and deep technical rigor. We hire people who care as much about consequences as novelty." },
            { label: "Approach", text: "We publish our research, share safety evaluations, and engage openly with the broader AI community. Transparency is how trust is built." },
          ].map((item) => (
            <motion.div key={item.label} variants={childFade}>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">{item.label}</h3>
              <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border relative">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-sm font-medium tracking-tight">Complexia</span>
            <p className="text-[10px] text-muted-foreground mt-1 tracking-wide">
              © {new Date().getFullYear()} Complexia. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              Careers
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
