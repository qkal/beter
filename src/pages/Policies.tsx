import { motion } from "framer-motion";
import PageShell, { fade } from "@/components/PageShell";

const POLICIES = [
  {
    heading: "Privacy Policy",
    items: [
      "We collect only the minimum data necessary to provide and improve our Services.",
      "Personal data is encrypted in transit and at rest using industry-standard protocols.",
      "We do not sell, rent, or trade your personal information to third parties.",
      "You may request deletion of your data at any time by contacting privacy@complexia.ai.",
      "We retain usage data for up to 24 months for service improvement purposes.",
    ],
  },
  {
    heading: "Acceptable Use Policy",
    items: [
      "Do not use our models to generate content that is harmful, misleading, or illegal.",
      "Do not attempt to reverse-engineer, extract weights from, or circumvent safety measures in our models.",
      "Do not use the Services to develop competing AI safety benchmarks without written permission.",
      "Automated access must comply with our published rate limits and API guidelines.",
      "We reserve the right to restrict access for users who violate these policies.",
    ],
  },
  {
    heading: "Data Processing",
    items: [
      "API inputs may be temporarily processed for response generation but are not stored for training.",
      "Aggregated, anonymized usage statistics may be used to improve model performance.",
      "We comply with GDPR, CCPA, and other applicable data protection regulations.",
      "Data Processing Agreements are available for enterprise customers upon request.",
    ],
  },
  {
    heading: "Cookie Policy",
    items: [
      "We use essential cookies to maintain session state and security.",
      "Analytics cookies are used only with explicit consent.",
      "You can manage cookie preferences through your browser settings or our cookie banner.",
    ],
  },
  {
    heading: "Responsible Disclosure",
    items: [
      "If you discover a security vulnerability, please report it to security@complexia.ai.",
      "We commit to acknowledging reports within 48 hours and providing updates within 7 days.",
      "We will not pursue legal action against researchers who follow our disclosure guidelines.",
    ],
  },
];

export default function Policies() {
  return (
    <PageShell title="Policies" subtitle="Governance">
      <div className="space-y-14">
        <motion.p variants={fade} className="text-sm text-muted-foreground leading-relaxed">
          Last updated: March 2026
        </motion.p>
        {POLICIES.map((section) => (
          <motion.div key={section.heading} variants={fade}>
            <h2 className="text-base font-medium tracking-tight mb-5">{section.heading}</h2>
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-border mt-1.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <motion.div variants={fade} className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Questions? Reach us at{" "}
            <span className="text-foreground">privacy@complexia.ai</span>
          </p>
        </motion.div>
      </div>
    </PageShell>
  );
}
