import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageShell, { fade } from "@/components/PageShell";

const DEPARTMENTS = [
  {
    name: "Research",
    roles: [
      { title: "Research Scientist — Alignment", location: "San Francisco", type: "Full-time" },
      { title: "Research Engineer — Interpretability", location: "Remote", type: "Full-time" },
      { title: "Research Intern — Scalable Oversight", location: "San Francisco", type: "Internship" },
    ],
  },
  {
    name: "Engineering",
    roles: [
      { title: "Senior Infrastructure Engineer", location: "San Francisco", type: "Full-time" },
      { title: "ML Platform Engineer", location: "Remote", type: "Full-time" },
      { title: "Full-Stack Engineer — Research Tools", location: "San Francisco", type: "Full-time" },
    ],
  },
  {
    name: "Policy & Safety",
    roles: [
      { title: "AI Safety Policy Lead", location: "Washington, D.C.", type: "Full-time" },
      { title: "Trust & Safety Analyst", location: "Remote", type: "Full-time" },
    ],
  },
  {
    name: "Operations",
    roles: [
      { title: "People Operations Manager", location: "San Francisco", type: "Full-time" },
    ],
  },
];

export default function Careers() {
  return (
    <PageShell title="Careers" subtitle="Join Us">
      <div className="space-y-6">
        <motion.p variants={fade} className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          We're looking for people who want to work on one of the most important challenges of our
          time — building AI that is safe, understandable, and beneficial. We value depth over breadth,
          intellectual honesty, and long-term thinking.
        </motion.p>

        <motion.div variants={fade} className="grid sm:grid-cols-3 gap-6 py-8 border-y border-border">
          {[
            { label: "Open roles", value: DEPARTMENTS.reduce((a, d) => a + d.roles.length, 0).toString() },
            { label: "Locations", value: "SF, DC, Remote" },
            { label: "Team size", value: "~60 people" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-medium tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="space-y-12 pt-4">
          {DEPARTMENTS.map((dept) => (
            <motion.div key={dept.name} variants={fade}>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{dept.name}</h2>
              <div className="divide-y divide-border">
                {dept.roles.map((role) => (
                  <a
                    key={role.title}
                    href="#"
                    className="group flex items-center justify-between py-4 hover:bg-card/50 -mx-4 px-4 rounded-lg transition-colors duration-300"
                  >
                    <div>
                      <p className="text-sm font-medium tracking-tight group-hover:text-foreground transition-colors">
                        {role.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {role.location} · {role.type}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fade} className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Don't see a role that fits? Send us a note at{" "}
            <span className="text-foreground">careers@complexia.ai</span>
          </p>
        </motion.div>
      </div>
    </PageShell>
  );
}
