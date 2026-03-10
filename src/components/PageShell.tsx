import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Dot texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top nav */}
      <nav className="sticky top-0 z-50 glass-panel-strong">
        <div className="max-w-3xl mx-auto px-6 md:px-10 flex items-center justify-between h-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>
          <span className="text-xs text-muted-foreground tracking-wide">{title}</span>
        </div>
      </nav>

      {/* Content */}
      <motion.div
        className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28 relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fade} className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-5">
          {subtitle || title}
        </motion.p>
        <motion.h1 variants={fade} className="text-2xl md:text-3xl font-medium tracking-tight mb-12">
          {title}
        </motion.h1>
        {children}
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-border relative z-10">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Complexia. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/policies" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">Policies</Link>
            <Link to="/careers" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
            <Link to="/partners" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">Partners</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { fade, stagger };
