import { motion } from "framer-motion";
import PageShell, { fade } from "@/components/PageShell";

const SECTIONS = [
  {
    heading: "1. Acceptance of Terms",
    content:
      "By accessing or using Complexia's services, website, APIs, or any associated products (collectively, the \"Services\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our Services.",
  },
  {
    heading: "2. Description of Services",
    content:
      "Complexia provides AI research tools, model APIs, and related services. We reserve the right to modify, suspend, or discontinue any part of the Services at any time with reasonable notice.",
  },
  {
    heading: "3. User Responsibilities",
    content:
      "You agree to use the Services in compliance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree not to use the Services for any unlawful, harmful, or abusive purpose.",
  },
  {
    heading: "4. Intellectual Property",
    content:
      "All content, trademarks, and intellectual property associated with the Services are owned by Complexia or its licensors. You retain ownership of any content you submit through the Services, but grant Complexia a limited license to process and use such content as necessary to provide the Services.",
  },
  {
    heading: "5. Data & Privacy",
    content:
      "Your use of the Services is also governed by our Privacy Policy. We are committed to handling your data with the highest standards of security and transparency. We do not sell personal data to third parties.",
  },
  {
    heading: "6. Limitation of Liability",
    content:
      "To the maximum extent permitted by law, Complexia shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.",
  },
  {
    heading: "7. Termination",
    content:
      "We may suspend or terminate your access to the Services at any time for violation of these terms. Upon termination, your right to use the Services will immediately cease, and we may delete your account data after a reasonable retention period.",
  },
  {
    heading: "8. Changes to Terms",
    content:
      "We may update these Terms from time to time. We will notify you of material changes through the Services or via email. Continued use of the Services after changes constitutes acceptance of the updated terms.",
  },
];

export default function Terms() {
  return (
    <PageShell title="Terms of Service" subtitle="Legal">
      <div className="space-y-10">
        <motion.p variants={fade} className="text-sm text-muted-foreground leading-relaxed">
          Last updated: March 2026
        </motion.p>
        {SECTIONS.map((s) => (
          <motion.div key={s.heading} variants={fade}>
            <h2 className="text-sm font-medium tracking-tight mb-3">{s.heading}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
          </motion.div>
        ))}
        <motion.div variants={fade} className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            If you have questions about these terms, contact us at{" "}
            <span className="text-foreground">legal@complexia.ai</span>
          </p>
        </motion.div>
      </div>
    </PageShell>
  );
}
