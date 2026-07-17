<Image src={dj.imageUrl} alt={dj.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className={cn(
                        "object-cover opacity-90 transition-transform duration-500 group-hover/card:scale-105",
                        dj.name === "DJ MARK" && "object-[center_20%]"
                      )} referrerPolicy="no-referrer" />