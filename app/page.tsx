"use client";

import Image from "next/image";
import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Radio, Waves } from "lucide-react";
import { AuroraBackground } from "@/src/components/magic/aurora-background";
import { AuroraText } from "@/src/components/magic/aurora-text";
import { BorderBeam } from "@/src/components/magic/border-beam";
import { SectionReveal } from "@/src/components/magic/section-reveal";
import { ShimmerButton } from "@/src/components/magic/shimmer-button";
import { SpotlightCard } from "@/src/components/magic/spotlight-card";
import { cn } from "@/lib/utils";
import bensonPic from "@/src/assets/images/benson_portrait_1781851083845.jpg";
import nubianPic from "@/src/assets/images/nubian_portrait_1781851100791.jpg";
import mergelabPic from "@/src/assets/images/mergelab_portrait_1782571495460.jpg";

const studioDrivers = [
  {
    name: "Benson",
    role: "Co-Founder / Technical Lead",
    description:
      "Architecting the custom studio flow, audio signal chain, and live broadcast systems that keep every session sharp and seamless.",
    image: bensonPic,
    accent: "from-[#ff6c2f] via-white/20 to-cyan-300/30",
  },
  {
    name: "Nubian",
    role: "Co-Founder / Creative Director",
    description:
      "Shaping the cultural voice, guest energy, and global perspective that gives GMPC its soul and rhythm.",
    image: nubianPic,
    accent: "from-white/20 via-[#ff6c2f]/30 to-fuchsia-300/20",
  },
  {
    name: "Mergelab",
    role: "Technical Director",
    description:
      "Driving the technical stack, visual systems, and studio integrations that keep the experience modern and alive.",
    image: mergelabPic,
    accent: "from-cyan-300/20 via-white/20 to-[#ff6c2f]/25",
  },
];

export default function Page() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0.2]);
  const heroY = useTransform(scrollY, [0, 420], [0, 70]);

  return (
    <main className="min-h-screen bg-[#e5e7eb] text-[#191c1f]">
      <section className="relative isolate overflow-hidden bg-[#191919] text-white">
        <AuroraBackground />

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col justify-center px-4 py-16 md:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.35em] text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Radio className="h-3.5 w-3.5 text-[#ff6c2f]" />
              Live Broadcast Studio
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Waves className="h-3.5 w-3.5 text-cyan-300" />
              Global Soul Frequencies
            </span>
          </div>

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1 className="text-[72px] font-bold leading-[0.84] tracking-[-0.05em] uppercase sm:text-[92px] md:text-[118px]">
                <AuroraText className="block">GMPC LIVE</AuroraText>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-[1.45] text-white/82 sm:text-xl">
                Watch, listen, and interact with our DJs live — music for the mind, body, and soul.
                <span className="mt-2 block">
                  Broadcasting independent <AuroraText className="font-semibold">global frequencies</AuroraText> from our custom-built analog studio.
                </span>
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <ShimmerButton className="shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_40px_rgba(255,108,47,0.22)]">
                  Join the Session
                  <ArrowRight className="h-4 w-4" />
                </ShimmerButton>

                <button className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/85 transition-colors hover:bg-white/10">
                  View Broadcast Schedule
                </button>
              </div>
            </motion.div>

            <SpotlightCard className="group rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,108,47,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(125,211,252,0.12),transparent_42%)]" />
                <div className="relative grid gap-4 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
                      Studio Status
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                      Live
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10">
                      <Image
                        src={bensonPic}
                        alt="Benson in the studio"
                        className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
                        priority
                      />
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff6c2f]">
                          Now tuned in
                        </p>
                        <h2 className="mt-2 text-3xl font-bold uppercase tracking-[-0.04em] text-white">
                          <AuroraText className="inline-block">Warm grooves</AuroraText>
                        </h2>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                          A clean blend of radio-ready energy, underground rhythm, and thoughtful curation from the GMPC control room.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          ["BPM", "Deep"],
                          ["Mood", "Soulful"],
                          ["Signal", "Strong"],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                            <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/45">{label}</div>
                            <div className="mt-2 text-sm font-bold text-white">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <BorderBeam duration={7} />
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <SectionReveal className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="mb-10 grid gap-6 border-b border-[#d5d7db] pb-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff6c2f]">
              GMPC Architects
            </p>
            <h2 className="mt-2 text-[36px] font-bold uppercase leading-none tracking-[-0.04em] sm:text-[48px]">
              <AuroraText>Studio Drivers</AuroraText>
            </h2>
          </div>
          <div className="md:col-span-6 md:flex md:items-end md:justify-end">
            <p className="max-w-xl text-sm leading-6 text-[#5b5b5b] sm:text-base">
              The co-founders and technical lead behind the station — blending hardware precision with creative direction to keep the broadcast consistent everywhere.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {studioDrivers.map((driver, index) => (
            <motion.article
              key={driver.name}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#191919] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] md:p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${driver.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <BorderBeam duration={6.5 + index * 0.6} delay={index * 0.35} />

              <div className="relative flex flex-col gap-5">
                <div className="relative aspect-[4/4.5] overflow-hidden rounded-[24px] border border-white/10">
                  <Image
                    src={driver.image}
                    alt={`${driver.name} portrait`}
                    className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff6c2f]">
                      {driver.role}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold uppercase tracking-[-0.04em] text-white">
                      <AuroraText className="inline-block">{driver.name}</AuroraText>
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-white/75">{driver.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="rounded-[30px] border border-[#d7d7db] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] md:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff6c2f]">
              Studio Notes
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-[-0.04em] text-[#191c1f] sm:text-4xl">
              Built for the long mix.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#5e5e5e] sm:text-base">
              GMPC is designed to feel warm, technical, and alive — with the same energy across the hero, the team section, and every broadcast touchpoint.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Global", "Culture-forward programming"],
              ["Analog", "Studio-first signal design"],
              ["Live", "Direct host interaction"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[26px] border border-[#d7d7db] bg-[#f8f8f9] p-5 shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#ff6c2f]">
                  {title}
                </div>
                <p className="mt-3 text-sm leading-6 text-[#5b5b5b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}