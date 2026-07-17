"use client"; // Client component since we have state, effects, canvas, and audio elements

import * as React from "react";
import Image from "next/image";
import { 
  Play, Pause, Volume2, VolumeX, MessageSquare, Send, Globe, Radio, 
  ChevronLeft, ChevronRight, X, Sparkles, Check, Info, Users, ExternalLink, RefreshCw, 
  Disc, Sliders, Headphones, Layers, HelpCircle, Flame, Calendar, Sun, Moon, ArrowUp, Mic,
  Phone, Mail, Facebook, Youtube, Music, Instagram
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/src/components/magic/aurora-background";
import { BorderBeam } from "@/src/components/magic/border-beam";
import { SectionReveal } from "@/src/components/magic/section-reveal";
import { SpotlightCard } from "@/src/components/magic/spotlight-card";

// Static imports of our generated images using the paths confirmed on disk
import gmpcStudioHero from "@/src/assets/images/gmpc_multi_hero_1782565826345.jpg";
import bensonPic from "@/src/assets/images/benson_portrait_1781851083845.jpg";
import nubianPic from "@/src/assets/images/nubian_portrait_1781851100791.jpg";
import mergelabPic from "@/src/assets/images/mergelab_portrait_1782571495460.jpg";
import djMarkPic from "@/src/assets/images/dj_mark_portrait_2024_08_01.jpg";

// Defined categories for filtering residents
type GenreCategory = "AMAPIANO" | "SOUL" | "REGGAE" | "DANCEHALL" | "AFROBEATS" | "OLD SCHOOL" | "GOSPEL" | "DEEP HOUSE";

interface ResidentDJ {
  id: string;
  name: string;
  role: string;
  genre: GenreCategory;
  imageUrl: string;
  bio: string;
  mixTitle: string;
  mixUrl: string;
}

interface ScheduleDay {
  day: string;
  djName: string;
  showTitle: string;
  timeSlot: string;
  description: string;
  isActive?: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  isHost: boolean;
}

// Simulated tracks for Channels
interface AudioChannel {
  id: string;
  name: string;
  genre: string;
  url: string;
  trackTitle: string;
  artist: string;
  energyLvl: string;
}

const CHANNELS: AudioChannel[] = [
  {
    id: "chrome",
    name: "GOLDEN HOUR CHROME",
    genre: "Soul & Deep House",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    trackTitle: "Synthesized Equator (GMPC Custom Cut)",
    artist: "Benson & Nubian Project",
    energyLvl: "82%"
  },
  {
    id: "riddim",
    name: "RIDDIM MATRIX",
    genre: "Dub & Roots Reggae",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    trackTitle: "Echo Chamber Transmissions",
    artist: "The Kingston Overdubs",
    energyLvl: "65%"
  },
  {
    id: "signal",
    name: "UNDERGROUND SIGNAL",
    genre: "Amapiano & Afrobeat",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    trackTitle: "Log Drum Telepathy",
    artist: "Pretoria Deep Waves",
    energyLvl: "94%"
  }
];

const SCHEDULE: ScheduleDay[] = [
  {
    day: "MONDAY",
    djName: "DJ Jackie",
    showTitle: "GLOBAL SOUL & GROOVES",
    timeSlot: "8:00 PM - 10:00 PM",
    description: "An elegant, trans-continental musical voyage crossing jazz fusion, bossa nova, and vintage soul. Crated for cosmic decompression."
  },
  {
    day: "TUESDAY",
    djName: "DJ Ibrahim",
    showTitle: "ROOTS & HERITAGE",
    timeSlot: "7:00 PM - 10:00 PM",
    description: "Heavy bassweights, rare rocksteady, and early dub. Sourced from deep in the London & Kingston archival crates."
  },
  {
    day: "WEDNESDAY",
    djName: "DJ Mark",
    showTitle: "MIDWEEK ENERGY",
    timeSlot: "9:00 PM - 11:30 PM",
    description: "Uptempo electronic gems, deep warehouse acid house, and hypnotic loops to navigate the midweek horizon."
  },
  {
    day: "THURSDAY",
    djName: "DJ Roosta",
    showTitle: "DANCEHALL SELECTS",
    timeSlot: "8:00 PM - 10:30 PM",
    description: "High-octane soundclash vibes, digital dancehall selectors, and new-wave Caribbean sub-bass records."
  },
  {
    day: "FRIDAY 12AM",
    djName: "Benson Live Music Show",
    showTitle: "THE FLAGSHIP WEEKEND LAUNCH",
    timeSlot: "12:00 AM - 3:00 AM",
    description: "Benson takes absolute control of GMPC Studio. Pure analog synthesis, unreleased white labels, and real-time electronic engineering live on mic.",
    isActive: true
  },
  {
    day: "SATURDAY",
    djName: "DJ General & Fada Mango",
    showTitle: "REGGAE REVIVAL",
    timeSlot: "4:00 PM - 7:00 PM",
    description: "Golden-era vinyl selections focusing on conscious lyrics, rocksteady harmonies, and sunshine stepper beats."
  },
  {
    day: "SUNDAY",
    djName: "General Gospel / Chill & Spill",
    showTitle: "SPIRIT & REFLECTION",
    timeSlot: "11:00 AM - 2:00 PM",
    description: "Soothe your Sunday. Deep gospel choirs, organic ambient textures, high-fidelity acoustics, and meditative audio storytelling."
  }
];

const RESIDENTS: ResidentDJ[] = [
  { id: "1", name: "DJ JACKIE", role: "Resident Host", genre: "SOUL", imageUrl: "https://picsum.photos/seed/jackie/400/520", bio: "Am a lover of music I started to play as youngster stopped for a couple of year's, joined the Jamaica defense force I migrated to the U.S.A found the love of music again about 5 years now. I never stop listening and playing music. Some lovers rock reggae, 80s,90s reggae is one of my specialties. I also have a passion for soul. I have to show my wife my tender side playing love songs to soften moods so I play the kind of music that will take you out of a bad mood and change  the mood with some good vibes! The power of MUSIC", mixTitle: "Global Soul Vol. 14", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "2", name: "DJ IBRAHIM", role: "Resident Host", genre: "REGGAE", imageUrl: "https://picsum.photos/seed/ibrahim/400/520", bio: "A master selector who has spent three decades in music exploration. Ibrahim's Tuesday show gathers the finest in dub plates and roots rhythms straight from the GMPC sound library.", mixTitle: "Kingston Heritage Session", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "3", name: "DJ MARK", role: "Resident Host", genre: "DEEP HOUSE", imageUrl: djMarkPic, bio: "Born and raised in Trelawny, Jamaica, 48-year-old Lebert Linton's musical journey began in the 80s, inspired by Stone Love Sound System's organization and talent. He soon discovered other notable sound systems like Killer Man Jaro, Bass Odyssey, and more, learning about the art of clashing. Lebert's skills earned him a victory in a Clash at a Dance in Christiana, Manchester, where he met Panther. This led to an opportunity to play with Panther on Black Kat, marking the start of his music career in 1995.He later worked with G T Taylor from 1999 to 2000, took a brief break, and then linked with Bounty Killer in 2006.", mixTitle: "Control Room Ambient Set", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: "4", name: "DJ ROOSTA", role: "Resident Host", genre: "DANCEHALL", imageUrl: "https://picsum.photos/seed/roosta/400/520", bio: "My musical journey started at a young age in Boston, influenced by my sister’s boyfriend, a top DJ in the late ’70s, who introduced me to turntables and mixing. Growing up during the rise of hip-hop and block party culture, I developed my skills early and became a DJ for local acts through my brother, a prominent promoter. As my sound evolved, I shifted toward reggae and dancehall, eventually moving to Atlanta where I was mentored by Ras Irate and gained experience on the Lion of Judah sound system. After working with Black Kat in Philadelphia, I returned to Atlanta and co-founded Infrared Sound with my partner Bigga. Since then, we’ve built a strong reputation, earning the Welcome to Sound Clash Season 4 championship and performing across the U.S., driven by a deep passion for dubplates and sound system culture.", mixTitle: "Dread-Control Selections", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { id: "5", name: "KABO DRUM", role: "Amapiano Oracle", genre: "AMAPIANO", imageUrl: "https://picsum.photos/seed/drum/400/520", bio: "Directly connected to the Johannesburg underground. Kabo specializes in the dynamic log drum basslines, wooden percussion, and vocal chants that define Amapiano globally.", mixTitle: "Pretoria Sunset Live Cuts", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { id: "6", name: "SISTA SOUL", role: "Classic Selectress", genre: "OLD SCHOOL", imageUrl: "https://picsum.photos/seed/sista/400/520", bio: "Bringing back the 80s and 90s warehouse tape-pack feeling. Sista Soul plays classic records that represent the foundation of modern club and radio culture.", mixTitle: "Tape Pack Remaster Series", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { id: "7", name: "BROTHER ELI", role: "Gospel Director", genre: "GOSPEL", imageUrl: "https://picsum.photos/seed/brothereli/400/520", bio: "Eli guides Sunday mornings with powerful, soulful gospel vocals. Blending vintage field recordings with premium contemporary organic soundsets.", mixTitle: "Deliverance Session 09", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { id: "8", name: "DJ FADA Mango", role: "Afro-Beat Master", genre: "AFROBEATS", imageUrl: "https://picsum.photos/seed/fada/400/520", bio: "He developed a passion for music growing up in Effortville, May Pen, Clarendon, where he was inspired by musicians like Glen Washington and Joseph Hill of Culture. Fascinated by drumming, he played in a school band that performed across Clarendon. After school, he explored technical work, sold records, and later spent seventeen years in the army before moving to Canada. There, exposure to large sound systems reignited his passion, leading him to build his own setup piece by piece. Today, he runs Startec Sound System, a compact but powerful setup that reflects his lifelong love for music.", mixTitle: "Lagos to London Transit", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { id: "16", name: "DJ GENERAL", role: "Resident Host", genre: "REGGAE", imageUrl: "https://picsum.photos/seed/general/400/520", bio: "He developed a love for music at 16, inspired by his brother who was a DJ, but initially pursued soccer, achieving success and winning titles in Jamaica and Canada. At 22, while still playing, he began attending parties and was drawn back to his passion for music, traveling to see top sound systems like Bodyguard and Stone Love, even in England. After retiring from soccer, he fully embraced DJing, driven by the joy of connecting with crowds. His name, DJ General, reflects his time serving in the army.", mixTitle: "General's Sunday Forward", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
  { id: "9", name: "LARA K", role: "Lounge Resident", genre: "SOUL", imageUrl: "https://picsum.photos/seed/lara/400/520", bio: "Lara specializes in late-night organic lofi jazz, warm brass rhythms, and rare soul. Perfect background frequencies for creative nightshifts.", mixTitle: "Golden Hour Decompression", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
  { id: "10", name: "REBEL SOUND", role: "Soundclash Host", genre: "DANCEHALL", imageUrl: "https://picsum.photos/seed/rebel/400/520", bio: "Strict sound system culture. Clashing vintage riddims with fresh unreleased dubplates, Rebel sound maintains GMPC's raw, authentic music edge.", mixTitle: "Soundclash Fire Mix", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
  { id: "11", name: "ROOTS EMILY", role: "Ska & Rocksteady", genre: "REGGAE", imageUrl: "https://picsum.photos/seed/emily/400/520", bio: "Emily is dedicated to early Jamaican music, specializing in 1960s vinyl, standard rocksteady melodies, and traditional vocal trios.", mixTitle: "Ska Foundation Vinyl set", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
  { id: "12", name: "CHRIS CHROME", role: "Electronic Resident", genre: "DEEP HOUSE", imageUrl: "https://picsum.photos/seed/chris/400/520", bio: "An audiophile producer with extreme technical precision. Chris mixes modular synthesizer channels with deep house baselines for a space-age soundscape.", mixTitle: "Modular Spectrum Broadcast", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
  { id: "13", name: "AMARA B", role: "Ancestral House", genre: "AFROBEATS", imageUrl: "https://picsum.photos/seed/amara/400/520", bio: "Amara explores the tribal patterns of afro-house, featuring deep percussion grooves and vocal chants recorded live across Johannesburg and Nairobi.", mixTitle: "Ancestral Horizon Mix", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "14", name: "PASTOR T", role: "Vocal Uplifter", genre: "GOSPEL", imageUrl: "https://picsum.photos/seed/pastort/400/520", bio: "Pastor T curates high-fidelity organic gospel and vocal rhythm sets, designed to deliver peak mental energy and spiritual restoration.", mixTitle: "Sunday Morning Sanctity", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "15", name: "THE GMPC COLLECTIVE", role: "Studio Curators", genre: "OLD SCHOOL", imageUrl: "https://picsum.photos/seed/gmpccol/400/520", bio: "A collaborative project by our founders, Benson & Nubian. Deep sound experiments, field recordings, and rare tape grooves selected from the studio's vault.", mixTitle: "Vault Dubs & Master Recordings", mixUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
];

export default function GMPCLiveRadio() {
  // Master Audio & Playback States
  const [currentChannel, setCurrentChannel] = React.useState<AudioChannel>(CHANNELS[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.75);
  const [isMuted, setIsMuted] = React.useState(false);
  
  // Custom Track Playing vs Live Stream State
  const [isLiveStream, setIsLiveStream] = React.useState(true);
  const [nowPlayingLabel, setNowPlayingLabel] = React.useState("LIVE BROADCAST: Benson Live");
  const [isEmbedOpen, setIsEmbedOpen] = React.useState(false);
  const [showLiveStream, setShowLiveStream] = React.useState(false);

  // Multi-Camera Studio Feeds State
  type CamFeed = "cam1" | "cam2";
  const [activeCam, setActiveCam] = React.useState<CamFeed>("cam1");
  const [currentTimeStr, setCurrentTimeStr] = React.useState("23:36:04 UTC");

  // Residents Filter & Detail States
  const [selectedCategory, setSelectedCategory] = React.useState<GenreCategory | "ALL">("ALL");
  const [selectedDJForModal, setSelectedDJForModal] = React.useState<ResidentDJ | null>(null);
  const [audioFeedback, setAudioFeedback] = React.useState<string | null>(null);

  // Live Chat Room Simulated Data & Input States
  const [chatLog, setChatLog] = React.useState<ChatMessage[]>([
    { id: "c1", text: "Yo GMPC! Welcome to the Golden Hour broadcast! 📻💎", author: "Benson_Fan8", timestamp: "11:24 PM", isHost: false },
    { id: "c2", text: "Nubian, that transition was celestial. Deep vibes.", author: "AmapianoSelector", timestamp: "11:28 PM", isHost: false },
    { id: "c3", text: "[HOST NOTICE] Welcome listeners. Drop your location & vocal track requests. Benson's at the knobs.", author: "DJ Benson", timestamp: "11:30 PM", isHost: true },
    { id: "c4", text: "Locking in from Bristol! Respect GMPC crew. Great sound system output.", author: "BassHeadUK", timestamp: "11:32 PM", isHost: false },
    { id: "c5", text: "Are we getting some sweet roots rocksteady on Tuesday?", author: "VintageVinyl", timestamp: "11:34 PM", isHost: false },
  ]);
  const [chatInput, setChatInput] = React.useState("");
  const [isSendingMessage, setIsSendingMessage] = React.useState(false);

  // Newsletter Email signup states
  const [emailInput, setEmailInput] = React.useState("");
  const [emailSubscribed, setEmailSubscribed] = React.useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = React.useState(false);

  // Contact form state
  const [contactName, setContactName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [contactMessage, setContactMessage] = React.useState("");
  const [isSubmittingContact, setIsSubmittingContact] = React.useState(false);
  const [contactSuccess, setContactSuccess] = React.useState(false);

  // Interactive DJ schedule details modal/drawer state
  const [selectedScheduleDay, setSelectedScheduleDay] = React.useState<ScheduleDay | null>(null);

  // Theme Switching State - Default is Light, supports complete Dark transition initialized lazily
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  // Scroll Position state for dynamic text opacity fade on scroll
  const [scrollY, setScrollY] = React.useState(0);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {

    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Read saved theme on client mount after hydration to prevent SSR mismatch
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("gmpc-theme") as "light" | "dark" | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setTimeout(() => {
          setTheme(savedTheme);
        }, 0);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("gmpc-theme", nextTheme);
    }
  };

  // HTML5 audio reference
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  // HTML5 canvas drawing reference for visualizer
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = React.useRef<number | null>(null);

  // Carousel slider reference for the Residents Section
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isHoveredRef = React.useRef(false);
  const modalOpenRef = React.useRef(false);
  const pauseAutoScrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    modalOpenRef.current = !!selectedDJForModal;
  }, [selectedDJForModal]);

  const pauseAutoScroll = () => {
    isHoveredRef.current = true;
    if (pauseAutoScrollTimeoutRef.current) {
      clearTimeout(pauseAutoScrollTimeoutRef.current);
    }
    pauseAutoScrollTimeoutRef.current = setTimeout(() => {
      isHoveredRef.current = false;
    }, 4000); // Pause auto-scrolling for 4 seconds on manual action
  };

  const checkScrollLimits = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);

      // Determine active index based on item scroll position
      const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
      const cardWidth = isSmall ? 245 : 280;
      const actualCardWidth = cardWidth + 24; // item width + gap-6 (24px)
      const index = Math.round(scrollLeft / actualCardWidth);
      setActiveIndex(index);
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    pauseAutoScroll();
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    const targetScroll = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });
  };

  React.useEffect(() => {
    const timer = setTimeout(checkScrollLimits, 300);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "instant" as any });
    }
    const timer = setTimeout(checkScrollLimits, 150);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Set up constant motion scrolling loop
  React.useEffect(() => {
    let animationId: number;
    let accumulatedScroll = 0;

    const scrollLoop = () => {
      if (carouselRef.current && !isHoveredRef.current && !modalOpenRef.current) {
        const container = carouselRef.current;
        const speed = 0.45; // smooth subpixel custom speed multiplier
        
        accumulatedScroll += speed;
        if (accumulatedScroll >= 1) {
          const pixelsToScroll = Math.floor(accumulatedScroll);
          accumulatedScroll -= pixelsToScroll;

          const { scrollLeft, scrollWidth, clientWidth } = container;
          
          if (scrollLeft + clientWidth >= scrollWidth - 2) {
            container.scrollLeft = 0; // Wrap back to the beginning seamlessly
          } else {
            container.scrollLeft += pixelsToScroll;
          }
          checkScrollLimits();
        }
      }
      animationId = requestAnimationFrame(scrollLoop);
    };

    animationId = requestAnimationFrame(scrollLoop);
    return () => {
      cancelAnimationFrame(animationId);
      if (pauseAutoScrollTimeoutRef.current) {
        clearTimeout(pauseAutoScrollTimeoutRef.current);
      }
    };
  }, []);

  // Web Audio Nodes (instantiated lazily upon user action to bypass browser policies)
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const sourceNodeRef = React.useRef<MediaElementAudioSourceNode | null>(null);

  // lazy initializer for real Web Audio analyzer context
  const initWebAudioApi = () => {
    if (!audioRef.current) return;
    if (audioContextRef.current) return; // Already initialized

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      const actx = new AudioCtxClass();
      const analyser = actx.createAnalyser();
      analyser.fftSize = 256;
      
      const source = actx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(actx.destination);

      audioContextRef.current = actx;
      analyserRef.current = analyser;
      sourceNodeRef.current = source;
    } catch (err) {
      console.log("Web audio initiation ignored due to routing requirements (possibly already bound or strict CORS):", err);
    }
  };

  // Update client-side clock
  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit", 
        hour12: false, 
        timeZone: "UTC" 
      }) + " UTC");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync volume and muted state with physical Audio element
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle changing sources without resetting on simple play/pause state toggling
  React.useEffect(() => {
    if (audioRef.current) {
      if (audioRef.current.src !== currentChannel.url) {
        audioRef.current.src = currentChannel.url;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play()
            .then(() => {
              initWebAudioApi();
            })
            .catch(e => {
              console.log("Audio play postponed:", e);
            });
        }
      }
    }
  }, [currentChannel, isPlaying]);

  // Handle play/pause action independently to sustain current time position
  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
          .then(() => {
            initWebAudioApi();
          })
          .catch(e => {
            console.log("Audio play postponed:", e);
            setIsPlaying(false);
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Background chatter injection to make the room alive!
  React.useEffect(() => {
    const chatNames = ["DubSelector", "RootsAura", "SydSoul", "Pretoria_Pulse", "LokiGrooves", "CrateDigger_X", "MeditationBeat"];
    const chatComments = [
      "Log drums sound incredible right now! 🥁💎",
      "GMPC is the absolute voice of the underground right now.",
      "Vibe in the studio is immaculate. Golden hour warmth indeed.",
      "Just locked in! Pure luxury broadcast.",
      "Heavy sub bass. Loving this channel selection.",
      "Shoutout to Benson and Nubian in the control room!",
      "Spin that white label track again! Absolute selector select."
    ];

    const chatterTrigger = setInterval(() => {
      // Pick random chatter
      const name = chatNames[Math.floor(Math.random() * chatNames.length)];
      const text = chatComments[Math.floor(Math.random() * chatComments.length)];
      
      const newMsg: ChatMessage = {
        id: `auto-${Date.now()}`,
        text: text,
        author: name,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
        isHost: false
      };
      
      setChatLog(prev => [...prev.slice(-30), newMsg]);
    }, 24000);

    return () => clearInterval(chatterTrigger);
  }, []);

  // Canvas drawing loop (handles both real and beautiful simulated audio harmonics)
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas safely
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 160;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Frame drawing counter
    let phase = 0;

    const draw = () => {
      animationFrameId.current = requestAnimationFrame(draw);
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Paint background matching soft-mist or carbon outline
      ctx.fillStyle = "#191c1f"; 
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines in background
      ctx.strokeStyle = "rgba(255, 108, 47, 0.05)";
      ctx.lineWidth = 1;
      const colWidth = width / 20;
      for (let i = 0; i < width; i += colWidth) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 30) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Read audio analysis buffer
      const bufferLength = analyserRef.current?.frequencyBinCount || 128;
      const dataArray = new Uint8Array(bufferLength);
      
      let gotRealData = false;
      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
        // Check if data is populated (sometimes CORS returns all zeros)
        const sum = dataArray.reduce((acc, v) => acc + v, 0);
        if (sum > 0) gotRealData = true;
      }

      phase += 0.08;

      if (isPlaying) {
        if (gotRealData) {
          // Render actual frequencies
          const barWidth = (width / bufferLength) * 1.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * height * 0.9;

            // Gradient between orange #ff6c2f and bone/gold highlight
            const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
            grad.addColorStop(0, "#ff6c2f");
            grad.addColorStop(1, "#ffa17a");

            ctx.fillStyle = grad;
            // Draw rounded-corner look bars
            ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);

            x += barWidth;
          }
        } else {
          // Render beautiful procedural golden hour equalizer waves
          ctx.lineWidth = 2.5;

          // Multi-layer simulated waves
          const waveCount = 4;
          const colors = [
            "rgba(255, 108, 47, 0.95)", // Core orange #ff6c2f
            "rgba(215, 205, 184, 0.65)", // Warm Bone #d7cdb8
            "rgba(255, 108, 47, 0.45)",
            "rgba(255, 255, 255, 0.2)"
          ];

          for (let w = 0; w < waveCount; w++) {
            ctx.beginPath();
            ctx.strokeStyle = colors[w];
            const frequencyMult = 0.005 + w * 0.003;
            const amp = (height * 0.35) - (w * 8);

            for (let x = 0; x < width; x += 3) {
              const normalSine = Math.sin(x * frequencyMult + phase + w);
              const secondaryHarmonic = Math.sin(x * 0.02 - phase * 0.5);
              
              // Bouncing power depending on simulated music beat
              const pulse = 0.8 + 0.2 * Math.sin(phase * 1.2);
              const y = (height / 2) + (normalSine * secondaryHarmonic * amp * pulse);

              if (x === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
          }

          // Render simulated bar lights at the bottom edges
          const count = Math.floor(width / 16);
          for (let b = 0; b < count; b++) {
            const noise = Math.sin(b * 0.5 + phase * 2) * Math.cos(b * 0.2 - phase);
            const relativeHeight = Math.max(8, (Math.abs(noise) * height * 0.7));
            
            ctx.fillStyle = "rgba(255, 108, 47, 0.85)";
            ctx.fillRect(b * 16 + 4, height - relativeHeight, 8, relativeHeight);
            
            // Peak dot at top
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(b * 16 + 4, height - relativeHeight - 4, 8, 2);
          }
        }
      } else {
        // Flat, cool static line when paused
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 108, 47, 0.4)";
        ctx.lineWidth = 2;
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(163, 163, 163, 0.5)";
        ctx.font = "11px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText("[GMPC SIGNAL WAITING • PRESS PLAY]", width / 2, height / 2 - 12);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying]);

  // Handle master Play/Pause
  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Trigger Web Audio on user-gesture
      const actx = audioContextRef.current;
      if (actx && actx.state === "suspended") {
        actx.resume();
      }

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          initWebAudioApi();
        })
        .catch(err => {
          console.error("Audio block:", err);
          // Fallback - show visual animation trigger anyway so experience functions
          setIsPlaying(true);
        });
    }
  };

  // Mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Direct channel listener trigger
  const selectChannel = (channel: AudioChannel, live: boolean) => {
    setIsLiveStream(live);
    setCurrentChannel(channel);
    
    // Explicitly update label on user-action
    if (live) {
      setNowPlayingLabel(`LIVE GMPC STREAM • Channel: ${channel.name}`);
    } else {
      setNowPlayingLabel(`ARCHIVED SET • ${channel.trackTitle} by ${channel.artist}`);
    }
    
    // Auto-play the set
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            initWebAudioApi();
          })
          .catch(e => {
            console.log("Delayed play block:", e);
            setIsPlaying(true); // simulated visual fallback
          });
      }
    }, 100);

    // Dynamic toast notification
    setAudioFeedback(`CONNECTED TO ${channel.name}`);
    setTimeout(() => setAudioFeedback(null), 3000);
  };

  // Interactive DJ list and custom Set Loader
  const loadResidentShowToPlayer = (dj: ResidentDJ) => {
    const customChan: AudioChannel = {
      id: `mix-${dj.id}`,
      name: `ARCHIVE: ${dj.name}`,
      genre: dj.genre,
      url: dj.mixUrl,
      trackTitle: dj.mixTitle,
      artist: dj.name,
      energyLvl: "78%"
    };
    selectChannel(customChan, false);
    setSelectedDJForModal(null); // Close layout modal

    // Scroll back to visual player smoothly so they see visualizer
    const playerTarget = document.getElementById("gmpc-stream-player");
    if (playerTarget) {
      playerTarget.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Send message to live Gemini AI route or local fallback
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsgText = chatInput.trim();
    const messageId = `user-${Date.now()}`;
    const userTimestamp = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    const userMessage: ChatMessage = {
      id: messageId,
      text: userMsgText,
      author: "Me",
      timestamp: userTimestamp,
      isHost: false
    };

    setChatLog(prev => [...prev, userMessage]);
    setChatInput("");
    setIsSendingMessage(true);

    try {
      // Pass the current 5 last chats for context
      const miniHistory = chatLog.slice(-5).map(m => ({
        role: m.author === "Me" ? "user" : "model",
        text: `${m.author}: ${m.text}`
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          history: miniHistory
        })
      });

      const data = await res.json();

      if (res.ok && data.text) {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          text: data.text,
          author: data.author || "DJ Benson",
          timestamp: data.timestamp || userTimestamp,
          isHost: true
        };
        setChatLog(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || "Failed stream response");
      }
    } catch (err) {
      console.error("Gemini response fallback activated:", err);
      // Fallback local response if server key is offline or errors
      setTimeout(() => {
        const fallbacks = [
          "[DJ Benson] Studio signal check! Appreciate the love on the track dials. Setting down another unreleased cut for you.",
          "[DJ Nubian] Beautiful vibrations! GMPC family is worldwide. Love to hear that frequency hitting perfectly.",
          "[DJ Benson] That tracks! We keep the log drum heavy and the horns in high fidelity. Stay tuned.",
          "[DJ Nubian] Respect! The GMPC stream is running 24/7. Keep the interaction flow locked in."
        ];
        const selected = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        const cleanStr = selected.replace(/^\[(DJ Benson|DJ Nubian)\]\s*/, "");
        const hostName = selected.match(/^\[([^\]]+)\]/) ? (selected.match(/^\[([^\]]+)\]/)![1]) : "DJ Benson";

        setChatLog(prev => [...prev, {
          id: `ai-fallback-${Date.now()}`,
          text: cleanStr,
          author: hostName,
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
          isHost: true
        }]);
      }, 1000);
    } finally {
      setIsSendingMessage(false);
      // Scroll chat window down automatically
      setTimeout(() => {
        const chatWindow = document.getElementById("gmpc-chat-window");
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 200);
    }
  };

  // Email newsletter submit
  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes("@")) return;

    setIsSubmittingEmail(true);
    setTimeout(() => {
      // Save locally & update State
      localStorage.setItem("gmpc_newsletter_subscriber", emailInput);
      setIsSubmittingEmail(false);
      setEmailSubscribed(true);
      setEmailInput("");
      
      const newSystemLog: ChatMessage = {
        id: `system-${Date.now()}`,
        text: `📢 Welcome subscriber to GMPC Golden Circle. Premium mailing lists connected successfully!`,
        author: "GMPC Transmitter",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
        isHost: true
      };
      setChatLog(prev => [...prev, newSystemLog]);
    }, 1500);
  };

  // Filtered residents list
  const filteredResidents = selectedCategory === "ALL"
    ? RESIDENTS
    : RESIDENTS.filter(r => r.genre === selectedCategory);

  return (
    <div className={cn(
      "min-h-screen flex flex-col selection:bg-[#ff6c2f] selection:text-white pb-24 relative overflow-x-hidden transition-colors duration-300",
      theme === "dark" ? "bg-[#111214] text-[#e5e7eb]" : "bg-[#e5e7eb] text-[#191c1f]"
    )}>
      
      {/* Hidden Master Audio Control */}
      <audio
        ref={audioRef}
        src={currentChannel.url}
        preload="auto"
        className="hidden"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating Pill Banner Feedback (Toast alerts) */}
      <AnimatePresence>
        {audioFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#ff6c2f] text-white font-mono text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
            onClick={() => setAudioFeedback(null)}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="tracking-wide uppercase font-semibold">{audioFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING PILL NAVIGATION */}
      <header className="absolute top-4 left-0 right-0 z-40 max-w-7xl mx-auto px-4 flex flex-col gap-2">
        <div className="bg-[#191919] text-white rounded-[64px] h-[72px] px-8 flex items-center justify-between border border-[#e5e7eb]/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#ff6c2f] animate-pulse" />
            <span className="font-sans font-bold tracking-[-1px] text-lg lg:text-xl flex items-center gap-1">
              GMPCLIVE<span className="text-[#ff6c2f]">RADIO</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] text-[#a3a3a3] font-medium">
            <button 
              onClick={() => {
                setShowLiveStream(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-[#ff6c2f] transition-colors duration-200 cursor-pointer uppercase font-mono text-[11px] tracking-[0.15em] font-medium"
            >
              LIVE
            </button>
            <a href="#weekly-schedule" className="hover:text-[#ff6c2f] transition-colors duration-200">PROGRAMS</a>
            <a href="#residents-grid" className="hover:text-[#ff6c2f] transition-colors duration-200">RESIDENTS</a>
            <a href="#about-section" className="hover:text-[#ff6c2f] transition-colors duration-200 font-sans tracking-tight">ABOUT GMPC</a>
            <a href="#public-file" className="hover:text-[#ff6c2f] transition-colors duration-200">ARCHIVE</a>
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-4">

            {/* Dark & Light theme options controller */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#ff6c2f] text-white hover:text-[#ff6c2f] transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-[#ff6c2f]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#a3a3a3]" />
              )}
            </button>
            
            {/* Primary CTA Orange Pill */}
            <button 
              id="gmpc-header-listen-btn"
              onClick={() => {
                setIsEmbedOpen(!isEmbedOpen);
                if (!isEmbedOpen) {
                  // If we open, we can optionally halt the default audio segment so it doesn't cross play
                  if (audioRef.current && isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                  setAudioFeedback("OPENING LIVE STATION FEED...");
                } else {
                  setAudioFeedback("FEED CLOSED");
                }
                setTimeout(() => setAudioFeedback(null), 3000);
              }}
              className={cn(
                "hover:scale-105 active:scale-95 text-white rounded-full px-6 py-2.5 font-mono text-[11px] uppercase tracking-wider font-bold transition-all duration-200",
                isEmbedOpen ? "bg-[#191c1f] border border-[#ff6c2f] text-[#ff6c2f]" : "bg-[#ff6c2f] hover:bg-[#ff6c2f]/90"
              )}
            >
              {isEmbedOpen ? "CLOSE PLAYER" : "LISTEN LIVE"}
            </button>
          </div>
        </div>

        {/* Dropping Down Player Panel */}
        <AnimatePresence>
          {isEmbedOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#191919] text-white rounded-[24px] border border-[#e5e7eb]/10 shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-md overflow-hidden z-50 pointer-events-auto"
            >
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6c2f] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6c2f]"></span>
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white font-semibold">
                      GMPC Golden Hour Streaming Client
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[#a3a3a3] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                      Theme: Dark
                    </span>
                    <button
                      onClick={() => setIsEmbedOpen(false)}
                      className="text-[#a3a3a3] hover:text-[#ff6c2f] transition-colors"
                      title="Close Player"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Embedded Player Iframe */}
                <div className="w-full h-[155px] relative rounded-xl overflow-hidden bg-black border border-white/5">
                  <iframe
                    src="https://gmpclive.com/public/gmpclive/embed?theme=dark&autoplay=1"
                    className="w-full h-full border-none"
                    allow="autoplay"
                    title="GMPC Live Player"
                  />
                </div>

                {/* Radio Chat below the radio player */}
                <div className="mt-1 border-t border-white/10 pt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#ff6c2f]" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                      RADIO CHAT
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6c2f] animate-pulse" />
                  </div>
                  <div className="w-full h-[300px] relative rounded-xl overflow-hidden bg-black border border-white/5">
                    <iframe 
                      src={`https://chat.gmpclive.com/channel/Radio-Chat?layout=embedded${theme === "dark" ? "&theme=dark" : ""}`}
                      className="w-full h-full border-none block"
                      title="GMPC Live Radio Chat"
                      allow="autoplay; camera; microphone"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION / ATMOSPHERIC FULL VIEWPORT COVER */}
      <section className="relative w-full min-h-[95vh] md:min-h-screen bg-black flex flex-col justify-end overflow-hidden pt-28">
        <AuroraBackground />
        {/* Full-bleed high-quality sunset photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src={gmpcStudioHero}
            alt="GMPC Studio Broadcast room"
            fill
            priority
            className="object-cover opacity-78 scale-105 select-none"
            referrerPolicy="no-referrer"
          />
          {/* Subtle warm sunset overlay filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24 flex flex-col items-start gap-8">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#ff6c2f] animate-gentle-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">Live broadcast in motion</span>
            </div>

            {/* Display Specimen Title matching Suisse Intl -0.03em tracking */}
            <motion.h1
              style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.75, ease: "easeOut" }}
              className="text-white text-[72px] sm:text-[90px] md:text-[110px] leading-[0.82] tracking-[-0.04em] font-bold select-none uppercase transition-opacity duration-75"
            >
              GMPC LIVE
            </motion.h1>

            {/* Subheading text */}
            <motion.p
              style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.75, ease: "easeOut" }}
              className="text-[#e5e7eb] font-sans text-lg md:text-xl font-normal leading-[1.35] tracking-tight max-w-2xl pt-2 transition-opacity duration-75"
            >
              Watch, listen, and interact with our DJs live — music for the mind, body, and soul.
              Broadcasting independent global frequencies from our custom-built analog GMPC Studio.
            </motion.p>
          </motion.div>

          {/* Studio Cam and Radio Chat (Toggled in the Hero section above the buttons) */}
          <AnimatePresence>
            {showLiveStream && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.98 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full overflow-hidden"
              >
                <div className="relative mb-4 rounded-[28px] border border-white/10 bg-black/25 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                  <BorderBeam className="rounded-[28px]" duration={8} delay={0.5} />
                  {/* Main 2-Column Grid (65% Studio Cam / 35% Live Chat) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
                    
                    {/* Column 1: STUDIO CAM (8 / 12) */}
                    <div className={cn(
                      "lg:col-span-8 h-fit lg:self-start rounded-[24px] overflow-hidden border flex flex-col justify-start transition-all duration-300",
                      theme === "dark" ? "bg-[#18191c] border-zinc-800" : "bg-white border-[#e5e7eb]"
                    )}>
                      
                      {/* Header Area */}
                      <div className={cn(
                        "p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors",
                        theme === "dark" ? "border-zinc-800" : "border-[#e5e7eb]"
                      )}>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 bg-[#ff6c2f] rounded-full animate-ping" />
                          <span className={cn(
                            "font-sans font-bold text-xs uppercase tracking-wider transition-colors",
                            theme === "dark" ? "text-white" : "text-[#191c1f]"
                          )}>
                            STUDIO CAM
                          </span>
                          <span className={cn(
                            "font-mono text-[11px] px-2 border-l transition-colors",
                            theme === "dark" ? "text-[#a3a3a3] border-zinc-800" : "text-[#a3a3a3] border-[#e5e7eb]"
                          )}>
                            4K STREAM FEED
                          </span>
                        </div>

                        {/* Multi-Camera Control Switcher */}
                        <div className="flex items-center gap-2">
                          <div className="flex flex-wrap items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/10 dark:border-white/10 select-none">
                            {(["cam1", "cam2"] as CamFeed[]).map((feed) => (
                              <button
                                key={feed}
                                onClick={() => setActiveCam(feed)}
                                className={cn(
                                  "px-3 py-1 rounded-full font-mono text-[9px] uppercase select-none font-bold transition-all cursor-pointer",
                                  activeCam === feed
                                    ? "bg-[#ff6c2f] text-white shadow-sm"
                                    : theme === "dark"
                                      ? "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                      : "text-zinc-600 hover:text-[#191c1f] hover:bg-black/5"
                                )}
                              >
                                {feed === "cam1" && "CAM 01"}
                                {feed === "cam2" && "CAM 02"}
                              </button>
                            ))}
                          </div>

                          {/* Live Status indicator */}
                          <div className={cn(
                            "hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-[9px] uppercase select-none font-bold transition-all",
                            theme === "dark"
                              ? "bg-zinc-800/60 border-zinc-700 text-zinc-300"
                              : "bg-[#e5e7eb]/60 border-[#e5e7eb] text-[#191c1f]/80"
                          )}>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            {activeCam === "cam1" ? "CAM 01 ACTIVE" : "CAM 02 ACTIVE"}
                          </div>
                        </div>
                      </div>

                      {/* Video / Interactive Feed Display */}
                      <div className="relative aspect-video w-full bg-[#191c1f] overflow-hidden group flex items-center justify-center">
                        {/* Camera Angle 1: Studio Space Live Stream CAM 01 */}
                        {activeCam === "cam1" && (
                          <div className="absolute inset-0 z-0">
                            <iframe
                              src="https://live.gmpclive.com/embed/video"
                              className="w-full h-full border-none absolute inset-0 z-0"
                              allow="autoplay; camera; microphone; picture-in-picture"
                              title="GMPC Live Studio Cam 01"
                            />
                          </div>
                        )}

                        {/* Camera Angle 1b: Studio Space Live Stream CAM 02 */}
                        {activeCam === "cam2" && (
                          <div className="absolute inset-0 z-0">
                            <iframe
                              src="https://vdo.ninja/?view=vBRUKDQ&label=GMPC_DJ_Cam&noaudio&cleanviewer"
                              className="w-full h-full border-none absolute inset-0 z-0"
                              allow="autoplay; camera; microphone; picture-in-picture"
                              title="GMPC Live Studio Cam 02"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Column 2: RADIO CHAT (4 / 12) */}
                    <div className={cn(
                      "lg:col-span-4 rounded-[24px] overflow-hidden border flex flex-col justify-between h-[450px] lg:h-auto transition-all duration-300",
                      theme === "dark" ? "bg-[#18191c] border-zinc-800" : "bg-white border-[#e5e7eb]"
                    )}>
                      
                      {/* Chat Header */}
                      <div className={cn(
                        "p-6 border-b flex items-center justify-between transition-colors",
                        theme === "dark" ? "bg-[#18191c] border-zinc-800" : "bg-white border-[#e5e7eb]"
                      )}>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#ff6c2f]" />
                          <span className={cn(
                            "font-sans font-bold text-xs uppercase tracking-wider transition-colors",
                            theme === "dark" ? "text-white" : "text-[#191c1f]"
                          )}>
                            RADIO CHAT
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        </div>
                      </div>

                      {/* Scrolling Chat Window */}
                      <div
                        id="gmpc-chat-window"
                        className={cn(
                          "flex-1 w-full min-h-[300px] overflow-hidden transition-colors",
                          theme === "dark" ? "bg-[#111214]" : "bg-[#f2f4f8]"
                        )}
                      >
                        <iframe
                          src={`https://chat.gmpclive.com/channel/Radio-Chat?layout=embedded${theme === "dark" ? "&theme=dark" : ""}`}
                          className="w-full h-full border-none block"
                          title="GMPC Live Radio Chat"
                          allow="autoplay; camera; microphone"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap gap-4 items-center w-full"
          >
            {/* Watch Live CTA Pill Button */}
            <button
              onClick={() => setShowLiveStream(!showLiveStream)}
              className="bg-[#ff6c2f] hover:bg-[#ff804a] text-white font-mono text-[11px] uppercase tracking-widest font-bold px-8 py-4.5 rounded-full shadow-lg transition-all duration-150 transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              {showLiveStream ? "Close Live Stream" : "Watch Live Stream"}
            </button>

            {/* Secondary join Discord style link */}
            <a
              href="#weekly-schedule"
              className="border border-white/20 hover:border-white text-white font-mono text-[11px] uppercase tracking-widest px-8 py-4.5 rounded-full transition-all duration-150 flex items-center gap-2 hover:bg-white/5"
            >
              <span>EXPLORE WEEKLY SHOWS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Decorative corner indicators */}
        <div className="absolute bottom-6 right-6 z-10 hidden md:flex items-center gap-4 text-[10px] font-mono text-white/40 tracking-widest pointer-events-none uppercase">
          <span>TX.POWER // 1440KW</span>
          <span>● GOLDEN HOUR BRASS SYSTEM</span>
        </div>
      </section>

      {/* WEEKLY SHOW SCHEDULE / PROGRAMS GRID */}
      <SectionReveal className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24 md:mt-32 scroll-mt-24 select-none" id="weekly-schedule">
        {/* Section Header Block (2-Column structure as specified) */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-8 border-b pb-8 mb-12 transition-colors",
          theme === "dark" ? "border-zinc-800" : "border-[#e5e7eb]"
        )}>
          <div className="md:col-span-6">
            <h2 className={cn(
              "font-sans font-bold text-[36px] sm:text-[48px] uppercase tracking-[-0.03em] leading-none transition-colors",
              theme === "dark" ? "text-white" : "text-[#1a1c1f]"
            )}>
              WEEKLY DJS
            </h2>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end">
            <p className={cn(
              "font-sans text-[15px] leading-[1.45] max-w-md transition-colors",
              theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
            )}>
              The frequency of the golden hour. A curated rotation of global sounds, legendary veterans, and local acoustic expertise broadcasting live every day.
            </p>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCHEDULE.map((item, index) => {
            const isFlagship = item.day === "FRIDAY 12AM";
            return (
              <motion.div
                key={index}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: reduceMotion ? 0 : index * 0.04 }}
                onClick={() => setSelectedScheduleDay(item)}
                className={cn(
                  "group relative rounded-[24px] p-6 h-[180px] flex flex-col justify-between border cursor-pointer transition-all duration-300 active:scale-[0.98] overflow-hidden",
                  isFlagship
                    ? (theme === "dark" ? "bg-[#1f2024] border-zinc-700 text-white shadow-lg" : "bg-[#191c1f] border-transparent text-white shadow-lg shadow-black/10 hover:bg-[#25282c]")
                    : (theme === "dark"
                        ? "bg-[#18191c] hover:bg-[#1f2125] text-white border-zinc-800 hover:border-[#ff6c2f] hover:-translate-y-1"
                        : "bg-white hover:bg-white text-[#191c1f] border-[#e5e7eb] hover:border-[#ff6c2f] hover:-translate-y-1")
                )}
              >
                {isFlagship && <BorderBeam duration={7.5} delay={1.5} />}
                <div className={cn(
                  "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,108,47,0.18),transparent_45%)] opacity-0 transition-opacity duration-300",
                  isFlagship ? "opacity-100" : "group-hover:opacity-100"
                )} />
                <div className="relative z-10">
                  <div className="font-mono text-[10px] tracking-widest leading-none mb-4 font-bold uppercase text-[#ff6c2f]">
                    {item.day}
                  </div>
                  <h3 className={cn(
                    "font-sans font-bold text-lg leading-tight truncate group-hover:text-[#ff6c2f] transition-colors",
                    isFlagship ? "text-white" : (theme === "dark" ? "text-white" : "text-[#191c1f]")
                  )}>
                    {item.djName}
                  </h3>
                </div>

                <div className={cn(
                  "relative z-10 flex items-end justify-between border-t pt-4 mt-auto transition-colors",
                  theme === "dark" ? "border-zinc-800/80" : "border-[#e5e7eb]/10"
                )}>
                  <span className={cn(
                    "font-mono text-[9px] uppercase tracking-wider",
                    isFlagship ? "text-white/60" : "text-[#a3a3a3]"
                  )}>
                    {item.showTitle}
                  </span>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform group-hover:translate-x-1",
                    isFlagship ? "text-[#ff6c2f]" : (theme === "dark" ? "text-white" : "text-[#191c1f]")
                  )} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionReveal>

      {/* THE RESIDENTS / OUR COMMUNITY SECTION */}
      <SectionReveal id="residents-grid" className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24 md:mt-32 scroll-mt-24">
        {/* Section Header Block */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-8 border-b pb-8 mb-10 select-none transition-colors",
          theme === "dark" ? "border-zinc-800" : "border-[#e5e7eb]"
        )}>
          <div className="md:col-span-6 space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-[#ff6c2f] font-bold uppercase block">
              OUR COMMUNITY
            </span>
            <h2 className={cn(
              "font-sans font-bold text-[36px] sm:text-[48px] uppercase tracking-[-0.03em] leading-none transition-colors",
              theme === "dark" ? "text-white" : "text-[#1a1c1f]"
            )}>
              THE RESIDENTS
            </h2>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end">
            <p className={cn(
              "font-sans text-[15px] leading-[1.45] max-w-md transition-colors",
              theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
            )}>
              A global lineup of cultural pioneers, record directors, and sound designers. Filter by specialization to discover signature sets.
            </p>
          </div>
        </div>

        {/* Filter Bar and Navigation wrapper */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className={cn(
            "flex flex-wrap gap-2 select-none p-4.5 rounded-[16px] border transition-all duration-300 flex-1",
            theme === "dark" ? "bg-[#18191c] border-zinc-800" : "bg-white border-[#e5e7eb]"
          )}>
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={cn(
                "px-4.5 py-2 rounded-xs font-mono text-[11px] uppercase tracking-wider transition-all border cursor-pointer",
                selectedCategory === "ALL"
                  ? (theme === "dark" ? "bg-[#ff6c2f] text-white border-transparent" : "bg-[#191c1f] text-white border-transparent")
                  : (theme === "dark"
                      ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800/80"
                      : "bg-white hover:bg-[#e5e7eb] text-[#191c1f] border-[#e5e7eb]")
              )}
            >
              ALL CAPABILITIES
            </button>
            {(["AMAPIANO", "SOUL", "REGGAE", "DANCEHALL", "AFROBEATS", "OLD SCHOOL", "GOSPEL", "DEEP HOUSE"] as GenreCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4.5 py-2 rounded-xs font-mono text-[11px] uppercase tracking-wider transition-all border cursor-pointer",
                  selectedCategory === cat
                    ? "bg-[#ff6c2f] text-white border-transparent font-semibold"
                    : (theme === "dark"
                        ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800/80"
                        : "bg-white hover:bg-[#e5e7eb] text-[#191c1f] border-[#e5e7eb]")
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto bg-black/5 dark:bg-white/5 py-2 px-3 rounded-full border border-black/10 dark:border-white/10 select-none">
            <span className={cn(
              "font-mono text-[10px] uppercase font-bold tracking-widest px-2.5",
              theme === "dark" ? "text-zinc-500" : "text-zinc-400"
            )}>
              NAVIGATE
            </span>
            <button onClick={() => scrollCarousel("left")} disabled={!canScrollLeft} className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border active:scale-95",
              !canScrollLeft
                ? "opacity-30 cursor-not-allowed border-transparent text-zinc-400"
                : theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white"
                  : "bg-white hover:bg-[#e5e7eb] text-[#191c1f] border-[#e5e7eb]"
            )} title="Slide Left">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scrollCarousel("right")} disabled={!canScrollRight} className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border active:scale-95",
              !canScrollRight
                ? "opacity-30 cursor-not-allowed border-transparent text-zinc-400"
                : theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white"
                  : "bg-white hover:bg-[#e5e7eb] text-[#191c1f] border-[#e5e7eb]"
            )} title="Slide Right">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative group/carousel">
          <div className={cn(
            "absolute -left-3 top-0 bottom-0 w-12 z-20 pointer-events-none transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )} style={{
            background: theme === "dark"
              ? "linear-gradient(to right, #111214 0%, rgba(17, 18, 20, 0) 100%)"
              : "linear-gradient(to right, #e5e7eb 0%, rgba(229, 231, 235, 0) 100%)"
          }} />
          <div className={cn(
            "absolute -right-3 top-0 bottom-0 w-12 z-20 pointer-events-none transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0"
          )} style={{
            background: theme === "dark"
              ? "linear-gradient(to left, #111214 0%, rgba(17, 18, 20, 0) 100%)"
              : "linear-gradient(to left, #e5e7eb 0%, rgba(229, 231, 235, 0) 100%)"
          }} />

          <div
            ref={carouselRef}
            onScroll={checkScrollLimits}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            onTouchStart={() => { isHoveredRef.current = true; }}
            onTouchEnd={() => { isHoveredRef.current = false; }}
            className="flex overflow-x-auto gap-6 pb-6 pt-1 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "auto" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredResidents.map((dj, index) => (
                <motion.div
                  layout
                  initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: reduceMotion ? 0 : index * 0.03 }}
                  key={dj.id}
                  className="w-[245px] sm:w-[280px] shrink-0"
                >
                  <SpotlightCard
                    onClick={() => setSelectedDJForModal(dj)}
                    className={cn(
                      "group/card relative aspect-[1/1.3] rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-md border active:scale-[0.98] transition-all duration-300 w-full",
                      theme === "dark" ? "bg-[#18191c] border-zinc-850" : "bg-[#ffffff] border-[#e5e7eb]/80"
                    )}
                  >
                    <div className="absolute inset-0 z-0">
                      <Image src={dj.imageUrl} alt={dj.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover opacity-90 transition-transform duration-500 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35" />
                    </div>
                    <div className="absolute inset-0 z-10 p-5 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span className="bg-white/10 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm backdrop-blur-sm select-none">{dj.genre}</span>
                        <div className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#ff6c2f]/90 text-white flex items-center justify-center backdrop-blur-sm group-hover/card:bg-[#ff6c2f] transition-all duration-200">
                          <Play className="w-3.5 h-3.5 fill-current stroke-none translate-x-0.5" />
                        </div>
                      </div>
                      <div className="space-y-0.5 select-none">
                        <h3 className="text-white font-sans text-base font-bold uppercase tracking-tight truncate group-hover/card:text-[#ffa17a] transition-colors">{dj.name}</h3>
                        <p className="text-[#a3a3a3] font-mono text-[9px] uppercase tracking-wider">{dj.role}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 mt-2 select-none max-w-full px-4">
            {filteredResidents.map((dj, index) => (
              <button
                key={dj.id}
                onClick={() => {
                  pauseAutoScroll();
                  if (carouselRef.current) {
                    const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
                    const cardWidth = isSmall ? 245 : 280;
                    const actualCardWidth = cardWidth + 24;
                    carouselRef.current.scrollTo({ left: index * actualCardWidth, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  activeIndex === index
                    ? "w-6 bg-[#ff6c2f]"
                    : theme === "dark"
                      ? "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                      : "w-1.5 bg-zinc-300 hover:bg-zinc-500"
                )}
                title={`Go to ${dj.name}`}
              />
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* ABOUT GMPC / HISTORICAL BACKGROUND SECTION */}

      <section id="about-section" className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24 md:mt-32 scroll-mt-24 select-none">
        <div className="bg-[#191919] text-white rounded-[32px] p-8 md:p-16 border border-[#e5e7eb]/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Large Column (4 / 12) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-[9px] tracking-widest text-[#ff6c2f] font-bold uppercase block">
              FREQUENCY BLUEPRINT
            </span>
            <h2 className="font-sans font-bold text-[48px] md:text-[60px] uppercase tracking-[-0.03em] leading-[0.85] text-white">
              ABOUT <br className="hidden lg:block"/>
              GMPC
            </h2>
          </div>

          {/* Right Text Column (8 / 12) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-sans font-bold text-lg md:text-[22px] leading-snug tracking-tight text-[#ffbdb3] text-[#ffa17a]">
              From London 2020 to GMPC Studio 2022, our journey has been one of sonic evolution and cultural preservation.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] text-[#e5e7eb] leading-relaxed font-sans font-normal opacity-90">
              <p>
                GMPC Live Radio was born from a desire to bridge the gap between high-end broadcast engineering and the raw, unrefined energy of underground music culture. What started as a small, isolated vision back in 2020 has grown into a powerful global radio community, broadcasting high-fidelity audio and video straight from the heart of our custom-built analog GMPC Studio.
              </p>
              <p>
                We are far more than just a typical radio station. We are a community-driven musical frequency dedicated purely to the nourishment of the mind, body, and soul. Our permanent mission is to serve as an uncorrupted sonic space where legendary veterans of the craft and rising young talents coexist seamlessly, delivering pristine sounds that transcend geographic boundaries.
              </p>
            </div>
            
            {/* Custom vector dials illustration decor */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 justify-between text-[10px] font-mono text-[#a3a3a3] tracking-widest">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#ff6c2f]" />
                <span>EQ_MID // +3.2DB</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-[#ff6c2f]" />
                <span>DECK_01 // STEREO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-[#ff6c2f]" />
                <span>LATENCY // 12.8MS</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* PUBLIC FILE & STATS SECTION */}
      <section id="public-file" className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24 md:mt-32 scroll-mt-24">
        {/* Core Title Center */}
        <div className="text-center space-y-3 mb-16 select-none">
          <h2 className={cn(
            "font-sans font-bold text-[42px] sm:text-[56px] uppercase tracking-[-0.04em] leading-none transition-colors",
            theme === "dark" ? "text-white" : "text-[#191c1f]"
          )}>
            PUBLIC FILE
          </h2>
          <div className="w-20 h-1 bg-[#ff6c2f] mx-auto rounded-full" />
          <p className="font-sans text-[14px] text-[#a3a3a3] uppercase tracking-wider max-w-md mx-auto pt-2">
            REGULATORY COMPLIANCE & STUDIO STANDARDS
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "ORIGIN & IDENTITY",
              desc: "Founded by Benson & Nubian, GMPC Live Radio operates as an independent, fully self-governed broadcast entity dedicated to representing authentic, multi-cultural musical heritage within an optimized modern digital framework.",
              action: "View Charter Protocols"
            },
            {
              title: "YOUTH & ACCESS",
              desc: "We actively prioritize accessibility for the next generation of broadcasters, offering direct mentorship, technical audio workshops, and free off-hours studio access to aspiring young creatives in local communities.",
              action: "Apply for Live Mentorship"
            },
            {
              title: "GLOBAL OUTREACH",
              desc: "Streaming high-fidelity audio 24/7 across multiple primary digital transmitters, currently reaching listeners in over 120 countries, with a primary mission of collaborative cultural exchange and sonic exploration.",
              action: "Explore Spatial Analytics"
            },
            {
              title: "QUALITY STANDARD",
              desc: "Every single set broadcasted on GMPC adheres strictly to high-fidelity analog audio rendering, ensuring the pristine, distinct 'Golden Hour' acoustic warmth is preserved through uncompromising studio layouts.",
              action: "Analyze Technical Rack Specs"
            }
          ].map((item, index) => (
            <div
              key={index}
              className={cn(
                "rounded-[24px] p-8 border flex flex-col justify-between group hover:border-[#ff6c2f] transition-all duration-300 relative overflow-hidden",
                theme === "dark" ? "bg-[#18191c] border-zinc-800" : "bg-[#ffffff] border-[#e5e7eb]"
              )}
            >
              {/* Highlight background elements */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#ff6c2f]/5 rounded-full blur-2xl group-hover:bg-[#ff6c2f]/10 transition-all" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#ff6c2f]/10 text-[#ff6c2f] flex items-center justify-center font-bold font-mono text-xs select-none">
                    0{index + 1}
                  </div>
                  <h3 className={cn(
                    "font-sans font-bold text-lg tracking-tight uppercase select-none transition-colors",
                    theme === "dark" ? "text-white" : "text-[#191c1f]"
                  )}>
                    {item.title}
                  </h3>
                </div>
                <p className={cn(
                  "font-sans text-sm leading-relaxed font-normal transition-colors",
                  theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                )}>
                  {item.desc}
                </p>
              </div>

              {/* Action trigger chevron */}
              <div 
                onClick={() => {
                  setAudioFeedback(`DOC: ${item.title} ACCESSED SUCCESFULLY`);
                  setTimeout(() => setAudioFeedback(null), 3000);
                }}
                className={cn(
                  "pt-6 border-t mt-6 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer group-hover:text-[#ff6c2f] transition-all select-none",
                  theme === "dark" ? "border-zinc-805 text-white" : "border-[#e5e7eb] text-[#191c1f]"
                )}
              >
                <span>{item.action}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-current" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENSON & NUBIAN BIOGRAPHICAL / TEAM DETAIL SECTION */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24 md:mt-32 select-none">
        
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
              STUDIO DRIVERS
            </h2>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end">
            <p className={cn(
              "font-sans text-[15px] leading-[1.45] max-w-md transition-colors",
              theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
            )}>
              The co-founders of GMPC Live. Merging hardware broadcast engineering with uncompromised creative oversight.
            </p>
          </div>
        </div>

        {/* Three Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Driver 1: Benson */}
          <div className="bg-[#191919] text-white rounded-[32px] overflow-hidden p-6 md:p-8 border border-white/5 flex flex-col xl:flex-row items-center gap-8 group">
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
                <h3 className="font-sans font-bold text-2xl uppercase tracking-tight text-white mt-0.5">BENSON</h3>
              </div>
              <p className="font-sans text-[#e5e7eb] text-sm leading-relaxed opacity-90 max-w-md">
                Co-Founder & Technical Lead. The brilliant audio engineer and architect behind the uncompromised custom-built GMPC Studio acoustics, audio rack design, and multi-camera stream automation console.
              </p>

            </div>
          </div>

          {/* Driver 2: Nubian */}
          <div className="bg-[#191919] text-white rounded-[32px] overflow-hidden p-6 md:p-8 border border-white/5 flex flex-col xl:flex-row items-center gap-8 group">
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
                <h3 className="font-sans font-bold text-2xl uppercase tracking-tight text-white mt-0.5">NUBIAN</h3>
              </div>
              <p className="font-sans text-[#e5e7eb] text-sm leading-relaxed opacity-90 max-w-md">
                Co-Founder & Creative Director. Curating GMPC&apos;s rich cultural voice, global resident DJ lists, visual brand guidelines, and community outreach programs focused on authentic underground preservation.
              </p>

            </div>
          </div>

          {/* Driver 3: Mergelab */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-full md:w-[calc(50%-1rem)] bg-[#191919] text-white rounded-[32px] overflow-hidden p-6 md:p-8 border border-white/5 flex flex-col xl:flex-row items-center gap-8 group">
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
                <h3 className="font-sans font-bold text-2xl uppercase tracking-tight text-white mt-0.5">MERGELAB</h3>
              </div>
              <p className="font-sans text-[#e5e7eb] text-sm leading-relaxed opacity-90 max-w-md">
                Co-Founder & Technical Lead. Driving the digital infrastructure, custom-built tools, and technical integrations that keep GMPC Live Radio on the cutting edge of underground broadcasting.
              </p>

            </div>
          </div>
          </div>

        </div>
      </section>

      {/* JOIN US SECTION */}

      <section id="join-us-section" className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24 md:mt-32 scroll-mt-24 select-none">
        {/* Section Header Block */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-8 border-b pb-8 mb-10 select-none transition-colors",
          theme === "dark" ? "border-zinc-800" : "border-[#e5e7eb]"
        )}>
          <div className="md:col-span-6 space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-[#ff6c2f] font-bold uppercase block">
              GET INVOLVED
            </span>
            <h2 className={cn(
              "font-sans font-bold text-[36px] sm:text-[48px] uppercase tracking-[-0.03em] leading-none transition-colors",
              theme === "dark" ? "text-white" : "text-[#1a1c1f]"
            )}>
              JOIN US
            </h2>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end">
            <p className={cn(
              "font-sans text-[15px] leading-[1.45] max-w-xl transition-colors",
              theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
            )}>
              GMPCLive Radio is powered by passionate volunteers like you. Whether you have broadcasting experience or just a love for radio, we have a place for you.
            </p>
          </div>
        </div>

        {/* 3 Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Become a DJ */}
          <div className={cn(
            "p-8 rounded-[24px] border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg",
            theme === "dark" 
              ? "bg-[#18191c] border-zinc-800 hover:border-zinc-700 hover:shadow-black/40" 
              : "bg-white border-[#e5e7eb] hover:shadow-zinc-100"
          )}>
            <div className="space-y-6">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                theme === "dark" ? "bg-[#ff6c2f]/10 text-[#ff6c2f]" : "bg-[#ff6c2f]/5 text-[#ff6c2f]"
              )}>
                <Mic className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className={cn(
                  "font-sans font-bold text-xl tracking-tight transition-colors",
                  theme === "dark" ? "text-white" : "text-[#1a1c1f]"
                )}>
                  Become a DJ
                </h3>
                <p className={cn(
                  "font-sans text-[14px] leading-relaxed transition-colors",
                  theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                )}>
                  Share your passion for music and host your own radio show. No experience necessary - we&apos;ll provide training and support.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: On-Air Talent */}
          <div className={cn(
            "p-8 rounded-[24px] border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg",
            theme === "dark" 
              ? "bg-[#18191c] border-zinc-800 hover:border-zinc-700 hover:shadow-black/40" 
              : "bg-white border-[#e5e7eb] hover:shadow-zinc-100"
          )}>
            <div className="space-y-6">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                theme === "dark" ? "bg-[#ff6c2f]/10 text-[#ff6c2f]" : "bg-[#ff6c2f]/5 text-[#ff6c2f]"
              )}>
                <Radio className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className={cn(
                  "font-sans font-bold text-xl tracking-tight transition-colors",
                  theme === "dark" ? "text-white" : "text-[#1a1c1f]"
                )}>
                  On-Air Talent
                </h3>
                <p className={cn(
                  "font-sans text-[14px] leading-relaxed transition-colors",
                  theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                )}>
                  Bring your voice to the airwaves. Whether you&apos;re into talk shows, interviews, or news, we need passionate presenters.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Community Support */}
          <div className={cn(
            "p-8 rounded-[24px] border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg",
            theme === "dark" 
              ? "bg-[#18191c] border-zinc-800 hover:border-zinc-700 hover:shadow-black/40" 
              : "bg-white border-[#e5e7eb] hover:shadow-zinc-100"
          )}>
            <div className="space-y-6">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                theme === "dark" ? "bg-[#ff6c2f]/10 text-[#ff6c2f]" : "bg-[#ff6c2f]/5 text-[#ff6c2f]"
              )}>
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className={cn(
                  "font-sans font-bold text-xl tracking-tight transition-colors",
                  theme === "dark" ? "text-white" : "text-[#1a1c1f]"
                )}>
                  Community Support
                </h3>
                <p className={cn(
                  "font-sans text-[14px] leading-relaxed transition-colors",
                  theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                )}>
                  Help us run events, manage social media, handle promotions, and engage with our audience on the ground.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO MAKE A DIFFERENCE BANNER */}
      <section id="make-a-difference-section" className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-16 md:mt-24 select-none">
        <div className={cn(
          "p-10 md:p-14 rounded-[20px] border text-center transition-colors duration-300",
          theme === "dark" 
            ? "bg-[#18191c]/50 border-zinc-800" 
            : "bg-[#f2f4f8] border-[#e5e7eb]"
        )}>
          <h2 className={cn(
            "font-sans font-bold text-2xl sm:text-3xl tracking-tight transition-colors mb-4",
            theme === "dark" ? "text-white" : "text-[#1a1c1f]"
          )}>
            Ready to Make a Difference?
          </h2>
          <p className={cn(
            "font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto transition-colors",
            theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
          )}>
            Join our community of broadcasters, creators, and radio enthusiasts. Contact us today to learn more about volunteering opportunities and how you can be part of GMPCLive Radio.
          </p>
        </div>
      </section>

      {/* GET IN TOUCH & CONTACT INFORMATION SPLIT SECTION */}
      <section id="contact-section" className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-16 md:mt-24 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: GET IN TOUCH FORM */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className={cn(
                "font-sans font-bold text-2xl sm:text-3xl tracking-tight transition-colors",
                theme === "dark" ? "text-white" : "text-[#1a1c1f]"
              )}>
                Get In Touch
              </h2>
              <p className={cn(
                "font-sans text-sm mt-2 transition-colors",
                theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
              )}>
                Have a question, comment, or want to get involved? We&apos;d love to hear from you!
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!contactName || !contactEmail || !contactMessage) return;
                setIsSubmittingContact(true);
                setTimeout(() => {
                  setIsSubmittingContact(false);
                  setContactSuccess(true);
                  setContactName("");
                  setContactEmail("");
                  setContactMessage("");
                  setTimeout(() => setContactSuccess(false), 5000);
                }, 1000);
              }}
              className="space-y-4"
            >
              <AnimatePresence mode="wait">
                {contactSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono"
                  >
                    MESSAGE TRANSMITTED SECURELY. THANK YOU FOR GETTING IN TOUCH!
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6c2f]/40 transition-all font-sans text-sm",
                      theme === "dark" 
                        ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500" 
                        : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400"
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6c2f]/40 transition-all font-sans text-sm",
                      theme === "dark" 
                        ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500" 
                        : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6c2f]/40 transition-all font-sans text-sm resize-none",
                    theme === "dark" 
                      ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500" 
                      : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400"
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-widest font-bold px-8 py-4.5 rounded-full shadow-lg transition-all duration-150 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-white",
                  isSubmittingContact 
                    ? "bg-zinc-600 cursor-not-allowed" 
                    : "bg-[#ff6c2f] hover:bg-[#ff804a]"
                )}
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmittingContact ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: CONTACT INFO & LINKS & FOLLOW US */}
          <div className="lg:col-span-5 space-y-8 lg:pl-4">
            
            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className={cn(
                "font-sans font-bold text-lg transition-colors",
                theme === "dark" ? "text-white" : "text-[#1a1c1f]"
              )}>
                Contact Information
              </h3>
              <div className="space-y-3 font-sans text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#ff6c2f] shrink-0" />
                  <span className={theme === "dark" ? "text-zinc-300" : "text-[#1a1c1f]"}>
                    +79 03 129265
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#ff6c2f] shrink-0" />
                  <a 
                    href="mailto:gmpcliveradio@gmail.com"
                    className={cn(
                      "transition-colors hover:text-[#ff6c2f] hover:underline",
                      theme === "dark" ? "text-zinc-300" : "text-[#1a1c1f]"
                    )}
                  >
                    gmpcliveradio@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className={cn(
                "font-sans font-bold text-lg transition-colors",
                theme === "dark" ? "text-white" : "text-[#1a1c1f]"
              )}>
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 font-sans text-sm">
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  Home
                </a>
                <a 
                  href="#weekly-schedule"
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  Schedule
                </a>
                <a 
                  href="#residents-grid"
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  Shows
                </a>
                <a 
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  Events
                </a>
                <a 
                  href="#about-section"
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  About
                </a>
                <a 
                  href="#contact-section"
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  Contact
                </a>
                <a 
                  href="#join-us-section"
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  Join Us
                </a>
                <a 
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={cn(
                    "transition-colors hover:text-[#ff6c2f]",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h3 className={cn(
                "font-sans font-bold text-sm uppercase tracking-wider transition-colors",
                theme === "dark" ? "text-white" : "text-[#1a1c1f]"
              )}>
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110",
                    theme === "dark" 
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#ff6c2f] hover:border-[#ff6c2f]/40" 
                      : "bg-[#f2f4f8] text-zinc-600 hover:text-[#ff6c2f]"
                  )}
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110",
                    theme === "dark" 
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#ff6c2f] hover:border-[#ff6c2f]/40" 
                      : "bg-[#f2f4f8] text-zinc-600 hover:text-[#ff6c2f]"
                  )}
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110",
                    theme === "dark" 
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#ff6c2f] hover:border-[#ff6c2f]/40" 
                      : "bg-[#f2f4f8] text-zinc-600 hover:text-[#ff6c2f]"
                  )}
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110",
                    theme === "dark" 
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#ff6c2f] hover:border-[#ff6c2f]/40" 
                      : "bg-[#f2f4f8] text-zinc-600 hover:text-[#ff6c2f]"
                  )}
                >
                  <Music className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={cn(
        "max-w-7xl mx-auto w-full px-6 mt-32 select-none border-t pt-12 pb-12 transition-all duration-300",
        theme === "dark" ? "border-zinc-800 text-zinc-400" : "border-[#e5e7eb] text-[#191c1f]/80"
      )}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold tracking-tight text-base">
              © 2026 GMPC LIVE RADIO. BROADCASTING FROM THE GOLDEN HOUR.
            </span>
            <span className="text-red-500 animate-pulse text-xs">●</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[#a3a3a3]">
            <span className="hover:text-[#ff6c2f] cursor-pointer">INSTAGRAM</span>
            <span className="hover:text-[#ff6c2f] cursor-pointer">SOUNDCLOUD</span>
            <span className="hover:text-[#ff6c2f] cursor-pointer">DISCORD</span>
            <span className="hover:text-[#ff6c2f] cursor-pointer" onClick={() => {
              setAudioFeedback("DOCUMENT ACCESSED: PUBLIC SYSTEM FILE");
              setTimeout(() => setAudioFeedback(null), 3000);
            }}>PUBLIC DOCUMENTS</span>
          </div>
        </div>

        {/* TAKE ME TO THE TOP BUTTON */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-sm",
              theme === "dark"
                ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-[#ff6c2f] hover:border-[#ff6c2f]/40"
                : "bg-[#f2f4f8] border-[#e5e7eb] text-[#191c1f] hover:text-[#ff6c2f] hover:border-[#ff6c2f]"
            )}
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            <span>TAKE ME TO THE TOP</span>
          </button>
        </div>
      </footer>



      {/* SCHEDULE DAY LIGHTBOX DIALOG PANEL */}
      <AnimatePresence>
        {selectedScheduleDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#191c1f]/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedScheduleDay(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={cn(
                "rounded-[24px] max-w-xl w-full p-8 relative border shadow-2xl transition-colors duration-300",
                theme === "dark" ? "bg-[#18191c] border-zinc-800 text-white" : "bg-white border-[#e5e7eb] text-[#191c1f]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedScheduleDay(null)}
                className={cn(
                  "absolute top-6 right-6 transition-all",
                  theme === "dark" ? "text-white/80 hover:text-[#ff6c2f]" : "text-[#191c1f]/80 hover:text-[#ff6c2f]"
                )}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 select-none">
                <div className="space-y-1">
                  <span className="text-[#ff6c2f] font-mono text-[10px] tracking-widest font-bold uppercase block">
                    GMPC SESSION SCHEDULER • {selectedScheduleDay.day}
                  </span>
                  <h3 className={cn(
                    "font-sans font-bold text-3xl uppercase tracking-tight transition-colors",
                    theme === "dark" ? "text-white" : "text-[#191c1f]"
                  )}>
                    {selectedScheduleDay.djName}
                  </h3>
                  <div className={cn(
                    "font-mono text-xs font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-sm mt-1 transition-colors",
                    theme === "dark" ? "bg-zinc-800 text-zinc-300" : "bg-[#e5e7eb]/60 text-[#a3a3a3]"
                  )}>
                    {selectedScheduleDay.timeSlot}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-[#a3a3a3] uppercase tracking-wider">SHOW SPECS:</div>
                  <h4 className="font-sans font-bold text-lg uppercase text-[#ff6c2f]">
                    {selectedScheduleDay.showTitle}
                  </h4>
                  <p className={cn(
                    "font-sans text-sm leading-relaxed font-normal transition-colors",
                    theme === "dark" ? "text-zinc-400" : "text-[#5e5e5e]"
                  )}>
                    {selectedScheduleDay.description}
                  </p>
                </div>

                <div className={cn(
                  "border-t pt-6 flex items-center gap-3 transition-colors",
                  theme === "dark" ? "border-zinc-800" : "border-[#e5e7eb]"
                )}>
                  <button
                    onClick={() => {
                      // Match DJ's show genre with corresponding channel
                      let matchingChan = CHANNELS[0];
                      if (selectedScheduleDay.showTitle.includes("ROOTS") || selectedScheduleDay.showTitle.includes("REGGAE") || selectedScheduleDay.showTitle.includes("DANCEHALL")) {
                        matchingChan = CHANNELS[1];
                      } else if (selectedScheduleDay.showTitle.includes("MIDWEEK") || selectedScheduleDay.showTitle.includes("SOUL") || selectedScheduleDay.showTitle.includes("AMAPIANO")) {
                        matchingChan = CHANNELS[2];
                      }
                      selectChannel(matchingChan, true);
                      setSelectedScheduleDay(null);
                    }}
                    className="flex-1 bg-[#ff6c2f] hover:bg-[#ff6c2f]/90 text-white py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-150 text-center uppercase"
                  >
                    TUNE LIVE TRANSMITTER NOW
                  </button>
                  <button
                    onClick={() => setSelectedScheduleDay(null)}
                    className={cn(
                      "flex-1 border py-3.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-150 text-center uppercase",
                      theme === "dark"
                        ? "border-zinc-800 hover:bg-zinc-800 text-white"
                        : "border-[#e5e7eb] hover:bg-[#f2f4f8] text-[#191c1f]"
                    )}
                  >
                    Close Specs
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESIDENT DJ BIO LIGHTBOX DIALOG PANEL */}
      <AnimatePresence>
        {selectedDJForModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#121417]/90 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedDJForModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={cn(
                "rounded-[24px] max-w-2xl w-full overflow-hidden relative border shadow-2xl flex flex-col md:flex-row h-[550px] md:h-auto transition-colors duration-300",
                theme === "dark" ? "bg-[#18191c] border-zinc-800 text-white" : "bg-white border-[#e5e7eb] text-[#191c1f]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Box Left */}
              <div className="relative w-full md:w-1/2 h-1/2 md:h-initial bg-[#191c1f] shrink-0">
                <Image
                  src={selectedDJForModal.imageUrl}
                  alt={selectedDJForModal.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-black/40" />
              </div>

              {/* Specs Box Right */}
              <div className="p-8 flex flex-col justify-between flex-1 select-none">
                <button
                  onClick={() => setSelectedDJForModal(null)}
                  className={cn(
                    "absolute top-6 right-6 transition-all",
                    theme === "dark" ? "text-white/80 hover:text-[#ff6c2f]" : "text-[#191c1f]/80 hover:text-[#ff6c2f]"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <div>
                    <span className="bg-[#ff6c2f] text-white font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm">
                      {selectedDJForModal.genre}
                    </span>
                    <h3 className={cn(
                      "font-sans font-bold text-2xl uppercase tracking-tight mt-2 leading-none transition-colors",
                      theme === "dark" ? "text-white" : "text-[#191c1f]"
                    )}>
                      {selectedDJForModal.name}
                    </h3>
                    <span className="text-[#a3a3a3] font-mono text-[10px] uppercase tracking-wider block mt-1">
                      {selectedDJForModal.role}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-wider font-semibold">Artist Biography:</div>
                    <p className={cn(
                      "font-sans text-xs leading-relaxed font-normal h-24 md:h-initial overflow-y-auto pr-1 transition-colors",
                      theme === "dark" ? "text-zinc-300" : "text-[#5e5e5e]"
                    )}>
                      {selectedDJForModal.bio}
                    </p>
                  </div>

                  <div className={cn(
                    "p-3 rounded-lg border font-mono text-[10px] space-y-1 transition-all",
                    theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-[#f2f4f8] border-[#e5e7eb]/10"
                  )}>
                    <span className="text-[#ff6c2f] uppercase font-bold tracking-wide">Featured Archive Cut:</span>
                    <div className={cn(
                      "font-sans font-bold text-xs truncate uppercase mt-0.5 transition-colors",
                      theme === "dark" ? "text-white" : "text-[#191c1f]"
                    )}>
                      {selectedDJForModal.mixTitle}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => loadResidentShowToPlayer(selectedDJForModal)}
                    className="flex-1 bg-[#ff6c2f] hover:bg-[#ff6c2f]/90 text-white py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-150 flex items-center justify-center gap-2 uppercase"
                  >
                    <Play className="w-3.5 h-3.5 fill-white stroke-none" />
                    Load Archive Set
                  </button>
                  <button
                    onClick={() => {
                      setAudioFeedback(`TRACK REQUEST FOR ${selectedDJForModal.name} SENT`);
                      setTimeout(() => setAudioFeedback(null), 3000);
                      setSelectedDJForModal(null);
                    }}
                    className={cn(
                      "flex-1 border py-3.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-150 uppercase",
                      theme === "dark"
                        ? "border-zinc-800 hover:bg-zinc-800 text-white"
                        : "border-[#e5e7eb] hover:bg-[#f2f4f8] text-[#191c1f]"
                    )}
                  >
                    Request Track
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}