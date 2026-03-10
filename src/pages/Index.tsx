import { useState, useEffect, useCallback, useRef } from "react";
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

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useIntersection(setVisible);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

function useIntersection(onVisible: (v: boolean) => void) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, onVisible]);
  return setRef;
}

function FloatingGrid({ scrollY }: { scrollY: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
      {/* Horizontal lines that shift with scroll */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-foreground"
          style={{
            top: `${(i * 9) + (scrollY * 0.02 * (i % 3 === 0 ? 1 : -0.5)) % 4}%`,
            opacity: 0.5 + (Math.sin(scrollY * 0.003 + i) * 0.5),
          }}
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-foreground"
          style={{
            left: `${(i * 14) + 2}%`,
            opacity: 0.3 + (Math.sin(scrollY * 0.004 + i * 1.5) * 0.3),
          }}
        />
      ))}
      {/* Floating dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`d-${i}`}
          className="absolute w-1 h-1 rounded-full bg-foreground"
          style={{
            left: `${10 + (i * 17) % 80}%`,
            top: `${5 + (i * 23) % 90}%`,
            transform: `translate(${Math.sin(scrollY * 0.005 + i) * 15}px, ${Math.cos(scrollY * 0.003 + i * 0.7) * 15}px)`,
            opacity: 0.4 + Math.sin(scrollY * 0.006 + i * 2) * 0.4,
          }}
        />
      ))}
    </div>
  );
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

const Index = () => {
  const scrolled = useScrolled();
  const scrollY = useScrollY();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background pattern */}
      <FloatingGrid scrollY={scrollY} />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="font-serif text-xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Complexia
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-10 max-w-6xl mx-auto pt-16 relative">
        <FadeInSection>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">AI Research & Safety</p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight max-w-4xl"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Building reliable, <br className="hidden sm:block" />
            interpretable AI systems.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Complexia is an AI research company focused on developing safe, scalable models
            that humans can understand, trust, and direct.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="#research"
              onClick={(e) => handleNavClick(e, "#research")}
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium rounded-sm hover:opacity-90 transition-opacity"
            >
              Our Research <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
        <div className="border-t border-border" />
      </div>

      {/* Research */}
      <section id="research" className="py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto scroll-mt-20 relative">
        <FadeInSection>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Research</p>
          <h2
            className="text-3xl md:text-4xl font-light tracking-tight max-w-2xl"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Advancing the frontier of AI, responsibly.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl leading-relaxed">
            Our work spans the core challenges of modern AI—from scaling laws and mechanistic
            interpretability to the alignment problem itself.
          </p>
        </FadeInSection>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2">
          {RESEARCH_AREAS.map((area, i) => (
            <FadeInSection key={area.title}>
              <div className="bg-background p-8 md:p-10 group cursor-pointer hover:bg-card transition-colors h-full">
                <span className="text-xs text-muted-foreground font-mono">0{i + 1}</span>
                <h3
                  className="mt-4 text-xl font-normal tracking-tight"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {area.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
                <div className="mt-6 flex items-center gap-1 text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="bg-card scroll-mt-20 relative">
        <div className="py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto">
          <FadeInSection>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Safety & Responsibility</p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-tight max-w-2xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Safety is not a feature. <br className="hidden md:block" />
              It is the foundation.
            </h2>
          </FadeInSection>
          <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-20">
            <FadeInSection>
              <p className="text-muted-foreground leading-relaxed">
                We believe that as AI systems grow in capability, the imperative for safety grows
                proportionally. Every model we build is evaluated not just for its performance, but
                for its failure modes, biases, and potential for misuse.
              </p>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Our safety team operates independently, with the authority to delay or halt any
                deployment that does not meet our rigorous internal standards.
              </p>
            </FadeInSection>
            <FadeInSection>
              <div className="border-l border-border pl-8">
                <blockquote
                  className="text-xl md:text-2xl font-light leading-snug tracking-tight"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  "The measure of an AI lab is not the power of its models, but the care with which
                  it deploys them."
                </blockquote>
                <p className="mt-6 text-sm text-muted-foreground">— Complexia Safety Charter</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Company */}
      <section id="company" className="py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto scroll-mt-20 relative">
        <FadeInSection>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Company</p>
          <h2
            className="text-3xl md:text-4xl font-light tracking-tight max-w-2xl"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            A team committed to getting AI right.
          </h2>
        </FadeInSection>
        <div className="mt-12 grid md:grid-cols-3 gap-12">
          <FadeInSection>
            <h3 className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3">Mission</h3>
            <p className="text-foreground leading-relaxed">
              To develop AI systems that are safe, beneficial, and understandable—advancing
              the science of intelligence while keeping humans in control.
            </p>
          </FadeInSection>
          <FadeInSection>
            <h3 className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3">Culture</h3>
            <p className="text-foreground leading-relaxed">
              We foster intellectual honesty, long-term thinking, and deep technical rigor. We
              hire researchers and engineers who care as much about the consequences of their work
              as its novelty.
            </p>
          </FadeInSection>
          <FadeInSection>
            <h3 className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3">Approach</h3>
            <p className="text-foreground leading-relaxed">
              We publish our research, share our safety evaluations, and engage openly with the
              broader AI community. Transparency is not optional—it is how trust is built.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border relative">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Complexia
            </span>
            <p className="text-xs text-muted-foreground mt-1">© {new Date().getFullYear()} Complexia. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Careers
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
