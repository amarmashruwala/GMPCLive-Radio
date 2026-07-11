{/* BENSON & NUBIAN BIOGRAPHICAL / TEAM DETAIL SECTION */}
      <SectionReveal className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24 md:mt-32 select-none">
        
        {/* Title & Description row */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-8 border-b pb-8 mb-12 transition-colors",
          theme === "dark" ? "border-zinc-800" : "border-[#e5e7eb]"
        )}>
          <div className="md:col-span-6 space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-[#ff6c2f] font-bold uppercase block">
              GMPC ARCHITECTS
            </span>
            <h2 className={cn(
              "font-sans font-bold text-[36px] sm:text-[48px] uppercase tracking-[-0.03em] leading-none transition-colors",
              theme === "dark" ? "text-white" : "text-[#1a1c1f]"
            )}>
              <AuroraText className="block">STUDIO DRIVERS</AuroraText>
            </h2>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end">
            <p className={cn(
              "font-sans text-[15px] leading-[1.45] max-w-md transition-colors",
              theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
            )}>
              The co-founders of GMPC Live. Merging hardware broadcast engineering with{" "}
              <AuroraText className="font-semibold">uncompromised creative oversight</AuroraText>.
            </p>
          </div>
        </div>

        {/* Three Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Driver 1: Benson */}
          <div className="relative bg-[#191919] text-white rounded-[32px] overflow-hidden p-6 md:p-8 border border-white/5 flex flex-col xl:flex-row items-center gap-8 group">
            <BorderBeam className="rounded-[32px]" duration={7} delay={0} />
            <div className="relative w-48 h-48 md:w-52 md:h-52 rounded-full xl:rounded-2xl overflow-hidden shrink-0 border border-white/10 ring-2 ring-white/10 shadow-xl">
              <Image
                src={bensonPic}
                alt="Benson GMPC Co-founder"
                fill
                priority
                className="object-cover grayscale filter transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 text-center xl:text-left flex-1">
              <div>
                <span className="text-[#ff6c2f] font-mono text-[9px] uppercase tracking-widest font-bold">CO-FOUNDER / CREATIVE LEAD</span>
                <h3 className="font-sans font-bold text-2xl uppercase tracking-tight text-white mt-0.5">
                  <AuroraText className="inline-block">BENSON</AuroraText>
                </h3>
              </div>
              <p className="font-sans text-[#e5e7eb] text-sm leading-relaxed opacity-90 max-w-md">
                Co-Founder & Technical Lead. The brilliant audio engineer and architect behind the uncompromised custom-built GMPC Studio acoustics, audio rack design, and multi-camera stream automation console.
              </p>

            </div>
          </div>

          {/* Driver 2: Nubian */}
          <div className="relative bg-[#191919] text-white rounded-[32px] overflow-hidden p-6 md:p-8 border border-white/5 flex flex-col xl:flex-row items-center gap-8 group">
            <BorderBeam className="rounded-[32px]" duration={7.5} delay={0.35} />
            <div className="relative w-48 h-48 md:w-52 md:h-52 rounded-full xl:rounded-2xl overflow-hidden shrink-0 border border-white/10 ring-2 ring-white/10 shadow-xl">
              <Image
                src={nubianPic}
                alt="Nubian GMPC Co-founder"
                fill
                priority
                className="object-cover grayscale filter transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 text-center xl:text-left flex-1">
              <div>
                <span className="text-[#ff6c2f] font-mono text-[9px] uppercase tracking-widest font-bold">CO-FOUNDER / MARKETING DIRECTOR</span>
                <h3 className="font-sans font-bold text-2xl uppercase tracking-tight text-white mt-0.5">
                  <AuroraText className="inline-block">NUBIAN</AuroraText>
                </h3>
              </div>
              <p className="font-sans text-[#e5e7eb] text-sm leading-relaxed opacity-90 max-w-md">
                Co-Founder & Creative Director. Curating GMPC&apos;s rich cultural voice, global resident DJ lists, visual brand guidelines, and community outreach programs focused on authentic underground preservation.
              </p>

            </div>
          </div>

          {/* Driver 3: Mergelab */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-full md:w-[calc(50%-1rem)] bg-[#191919] text-white rounded-[32px] overflow-hidden p-6 md:p-8 border border-white/5 flex flex-col xl:flex-row items-center gap-8 group">
              <BorderBeam className="rounded-[32px]" duration={8} delay={0.7} />
              <div className="relative w-48 h-48 md:w-52 md:h-52 rounded-full xl:rounded-2xl overflow-hidden shrink-0 border border-white/10 ring-2 ring-white/10 shadow-xl">
                <Image
                  src={mergelabPic}
                  alt="Mergelab GMPC Co-founder"
                  fill
                  priority
                  className="object-cover grayscale filter transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 text-center xl:text-left flex-1">
                <div>
                  <span className="text-[#ff6c2f] font-mono text-[9px] uppercase tracking-widest font-bold">CO-FOUNDER / TECHNICAL LEAD</span>
                  <h3 className="font-sans font-bold text-2xl uppercase tracking-tight text-white mt-0.5">
                    <AuroraText className="inline-block">MERGELAB</AuroraText>
                  </h3>
                </div>
                <p className="font-sans text-[#e5e7eb] text-sm leading-relaxed opacity-90 max-w-md">
                  Co-Founder & Technical Lead. Driving the digital infrastructure, custom-built tools, and technical integrations that keep GMPC Live Radio on the cutting edge of underground broadcasting.
                </p>

              </div>
            </div>
          </div>

        </div>
      </SectionReveal>