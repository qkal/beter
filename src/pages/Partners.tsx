import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageShell, { fade } from "@/components/PageShell";

const PARTNER_TIERS = [
  {
    category: "Research Collaborators",
    description: "Academic and industry partners advancing the frontier of AI safety and interpretability.",
    partners: [
      { name: "Stanford HAI", desc: "Human-centered AI research collaboration" },
      { name: "MIT CSAIL", desc: "Joint work on mechanistic interpretability" },
      { name: "Oxford FHI", desc: "Long-term AI safety strategy" },
      { name: "MIRI", desc: "Alignment theory and formal verification" },
    ],
  },
  {
    category: "Industry Partners",
    description: "Organizations integrating Complexia's models and safety frameworks into production.",
    partners: [
      { name: "Meridian Health", desc: "AI-assisted diagnostics with safety guarantees" },
      { name: "Arcadia Finance", desc: "Risk modeling with interpretable AI" },
      { name: "Novus Legal", desc: "Document analysis with audit trails" },
    ],
  },
  {
    category: "Policy & Governance",
    description: "Collaborating on responsible AI policy and global standards.",
    partners: [
      { name: "Partnership on AI", desc: "Multi-stakeholder AI governance" },
      { name: "OECD AI Policy Observatory", desc: "International AI standards" },
      { name: "AI Safety Institute", desc: "Model evaluation and red-teaming" },
    ],
  },
];

export default function Partners() {
  return (
    <PageShell title="Partners" subtitle="Ecosystem">
      <div className="space-y-6">
        <motion.p variants={fade} className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          We believe safe AI cannot be built in isolation. We collaborate with leading research
          institutions, industry partners, and policy organizations to ensure our work benefits
          from diverse perspectives and rigorous external scrutiny.
        </motion.p>

        <div className="space-y-16 pt-6">
          {PARTNER_TIERS.map((tier) => (
            <motion.div key={tier.category} variants={fade}>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {tier.category}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tier.description}</p>
              <div className="grid sm:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
                {tier.partners.map((partner) => (
                  <a
                    key={partner.name}
                    href="#"
                    className="group bg-background p-6 hover:bg-card transition-colors duration-300 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium tracking-tight">{partner.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-1.5">{partner.desc}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fade} className="pt-8 border-t border-border">
          <h3 className="text-sm font-medium tracking-tight mb-3">Become a partner</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Interested in collaborating with Complexia? We're always open to partnerships
            that advance AI safety and responsible deployment. Reach out at{" "}
            <span className="text-foreground">partnerships@complexia.ai</span>
          </p>
        </motion.div>
      </div>
    </PageShell>
  );
}
