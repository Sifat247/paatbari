"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  INITIAL_SLIDES,
  PRESENTATION_METADATA,
  SlideItem,
} from "@/lib/presentation-data";
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Grid,
  FileText,
  PlusCircle,
  HelpCircle,
  Share2,
  Printer,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Layers,
  X,
  Volume2,
} from "lucide-react";

export default function PresentationPage() {
  const [slides, setSlides] = useState<SlideItem[]>(INITIAL_SLIDES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [presentationTheme, setPresentationTheme] = useState<"forest" | "cream">("forest");
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // New slide form state
  const [newTitleBn, setNewTitleBn] = useState("");
  const [newTag, setNewTag] = useState("নতুন স্লাইড");
  const [newSubtitleBn, setNewSubtitleBn] = useState("");
  const [newBulletsBn, setNewBulletsBn] = useState("");
  const [newImage, setNewImage] = useState("/images/products/classic-tote.jpg");
  const [newNotesBn, setNewNotesBn] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Load custom slides from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("paatbari_custom_slides");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load custom slides", e);
    }
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const currentSlide = slides[currentIdx] || slides[0];

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIdx((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIdx(index);
      setShowThumbnails(false);
    }
  };

  // Toggle native browser fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {
        setIsFullscreen(!isFullscreen);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  // Track native fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Global Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in form inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault();
          goToNext();
          break;

        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          goToPrev();
          break;

        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;

        case "End":
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;

        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;

        case "s":
        case "S":
          e.preventDefault();
          setShowSpeakerNotes((prev) => !prev);
          break;

        case "t":
        case "T":
          e.preventDefault();
          setShowThumbnails((prev) => !prev);
          break;

        case "Escape":
          setShowThumbnails(false);
          setShowSpeakerNotes(false);
          setShowAddSlideModal(false);
          setShowShortcutsHelp(false);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, toggleFullscreen, slides.length]);

  // Touch Swipe Handlers for Mobile & Tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold 50px
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    setTouchStart(null);
  };

  // Add custom slide
  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleBn.trim()) return;

    const bullets = newBulletsBn
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const newSlide: SlideItem = {
      id: slides.length + 1,
      tag: newTag.trim() || "কাস্টম স্লাইড",
      titleBn: newTitleBn.trim(),
      titleEn: "Custom Jute Presentation Slide",
      subtitleBn: newSubtitleBn.trim() || undefined,
      theme: presentationTheme,
      layout: newImage ? "split" : "grid",
      bulletsBn: bullets.length > 0 ? bullets : ["পাটবাড়ি হস্তশিল্প পণ্য বিবরণ"],
      bulletsEn: [],
      image: newImage.trim() || undefined,
      speakerNotesBn: newNotesBn.trim() || "মিটিং বক্তব্য পয়েন্টস...",
    };

    const updated = [...slides, newSlide];
    setSlides(updated);
    try {
      localStorage.setItem("paatbari_custom_slides", JSON.stringify(updated));
    } catch (err) {}

    // Reset form
    setNewTitleBn("");
    setNewSubtitleBn("");
    setNewBulletsBn("");
    setNewNotesBn("");
    setShowAddSlideModal(false);
    setCurrentIdx(updated.length - 1);
  };

  const handleResetToDefaultSlides = () => {
    if (confirm("আপনি কি সমস্ত স্লাইড ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?")) {
      setSlides(INITIAL_SLIDES);
      try {
        localStorage.removeItem("paatbari_custom_slides");
      } catch (err) {}
      setCurrentIdx(0);
    }
  };

  // Format pitch timer
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Format progress percentage
  const progressPercent = Math.round(((currentIdx + 1) / slides.length) * 100);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative select-none flex flex-col font-bn ${
        isFullscreen
          ? "fixed inset-0 z-[100] w-screen h-screen bg-[#0B231A]"
          : "w-full min-h-[90vh] bg-[#0E2C21] rounded-3xl my-4 shadow-pop border-2 border-jute/30 overflow-hidden"
      } transition-colors duration-500`}
    >
      {/* Top HUD Bar */}
      <header className="px-4 sm:px-8 py-3 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-white text-xs z-30">
        {/* Brand & Deck Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="পাটবাড়ি হোম পেজে যান"
          >
            <img
              src="/images/logo-white.png"
              alt="Paatbari · পাটবাড়ি"
              className="h-7 w-auto object-contain"
            />
          </Link>
          <span className="hidden md:inline-block text-white/40">|</span>
          <span className="hidden md:inline-block text-white/80 font-medium">
            বিজনেস মিটিং ও পিচ প্রেজেন্টেশন
          </span>
          <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px]">
            <Clock className="w-3 h-3 text-jute" />
            <span>মিটিং টাইমার: {formatTime(timerSeconds)}</span>
          </span>
        </div>

        {/* Right Tools & Fullscreen Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Timer play/pause */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isTimerRunning ? "টাইমার থামান" : "টাইমার শুরু করুন"}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setTimerSeconds(0)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="টাইমার রিসেট"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setPresentationTheme(presentationTheme === "forest" ? "cream" : "forest")}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-[11px]"
            title="থিম পরিবর্তন"
          >
            <span>{presentationTheme === "forest" ? "🌿 গাঢ় থিম" : "☀️ লাইট থিম"}</span>
          </button>

          {/* Speaker Notes */}
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors text-[11px] ${
              showSpeakerNotes
                ? "bg-jute text-ink font-bold shadow-xs"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title="স্পিকার নোটস (S)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">নোটস</span>
          </button>

          {/* Thumbnails Overview */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-1.5 rounded-lg transition-colors ${
              showThumbnails
                ? "bg-jute text-ink font-bold"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title="সকল স্লাইড প্রিভিউ (T)"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1 bg-leaf hover:bg-leaf/90 text-white rounded-lg font-bold shadow-md transition-all text-xs"
            title="ফুলস্ক্রিন মোড (F)"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">প্রস্থান</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ফুলস্ক্রিন (F)</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Progress Line */}
      <div className="w-full h-1 bg-white/10 relative z-20">
        <div
          className="h-full bg-gradient-to-r from-jute to-leaf transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Slide Content Canvas */}
      <main
        className={`flex-1 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 relative overflow-hidden transition-all duration-500 ${
          presentationTheme === "cream"
            ? "bg-[#FCFBF7] text-[#16382A]"
            : "bg-gradient-to-br from-[#0F2E22] via-[#0A2218] to-[#081C14] text-white"
        }`}
      >
        {/* Ambient Subtle Jute Thread Weave Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#c8a165_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

        {/* Ambient Golden Radial Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-jute/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-leaf/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto z-10 flex-1 flex flex-col justify-center">
          {/* Slide Tag Pill */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                presentationTheme === "cream"
                  ? "bg-leaf/10 text-leaf border-leaf/20"
                  : "bg-jute/20 text-jute border-jute/40"
              }`}
            >
              <Sparkles className="w-3 h-3 text-jute" />
              <span>{currentSlide.tag}</span>
            </span>
            <span
              className={`text-xs ${
                presentationTheme === "cream" ? "text-ink/50" : "text-white/40"
              }`}
            >
              স্লাইড {currentIdx + 1} / {slides.length}
            </span>
          </div>

          {/* Cover slide brand logo */}
          {currentSlide.layout === "cover" && (
            <div className="mb-4">
              <img
                src={presentationTheme === "cream" ? "/images/logo.png" : "/images/logo-white.png"}
                alt="Paatbari · পাটবাড়ি"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-md"
              />
            </div>
          )}

          {/* Slide Heading & Subtitle */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bn-display tracking-tight leading-tight ${
              presentationTheme === "cream" ? "text-[#0F2E22]" : "text-white"
            }`}
          >
            {currentSlide.titleBn}
          </h1>

          {currentSlide.subtitleBn && (
            <p
              className={`text-base sm:text-lg md:text-xl font-medium mt-2 max-w-3xl leading-relaxed ${
                presentationTheme === "cream" ? "text-ink/80" : "text-[#E2E8F0]/90"
              }`}
            >
              {currentSlide.subtitleBn}
            </p>
          )}

          {/* Dynamic Layout Rendering */}
          <div className="mt-8 flex-1 flex flex-col justify-center">
            {/* 1. Cover Layout */}
            {currentSlide.layout === "cover" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div
                    className={`p-6 rounded-2xl border space-y-3 ${
                      presentationTheme === "cream"
                        ? "bg-white/80 border-sand shadow-sm"
                        : "bg-white/5 border-white/10 backdrop-blur-sm"
                    }`}
                  >
                    {currentSlide.bulletsBn.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-jute flex-shrink-0 mt-0.5" />
                        <span
                          className={`text-sm sm:text-base leading-relaxed ${
                            presentationTheme === "cream" ? "text-ink" : "text-white/90"
                          }`}
                        >
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Presenter Accreditation Card */}
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      presentationTheme === "cream"
                        ? "bg-cream border-sand"
                        : "bg-black/30 border-white/10"
                    }`}
                  >
                    <div>
                      <span className="text-[11px] text-jute font-bold block uppercase tracking-wider">
                        বক্তা ও উপস্থাপক
                      </span>
                      <h4
                        className={`text-base font-bold ${
                          presentationTheme === "cream" ? "text-forest" : "text-white"
                        }`}
                      >
                        {PRESENTATION_METADATA.presenter}
                      </h4>
                      <p
                        className={`text-xs ${
                          presentationTheme === "cream" ? "text-ink/60" : "text-white/60"
                        }`}
                      >
                        {PRESENTATION_METADATA.designation} · {PRESENTATION_METADATA.company}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-jute font-bold block">
                        {PRESENTATION_METADATA.phone}
                      </span>
                      <span
                        className={
                          presentationTheme === "cream" ? "text-ink/60" : "text-white/60"
                        }
                      >
                        {PRESENTATION_METADATA.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  {currentSlide.image && (
                    <div className="relative rounded-2xl overflow-hidden shadow-pop border-2 border-jute/40 max-w-sm group">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.titleBn}
                        className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      {currentSlide.imageCaption && (
                        <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                          <span className="font-bold block">{currentSlide.imageCaption}</span>
                          <span className="text-jute text-[11px]">মানিকগঞ্জ সদর, বাংলাদেশ</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. Split Image Layout */}
            {currentSlide.layout === "split" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  {currentSlide.bulletsBn.map((bullet, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                        presentationTheme === "cream"
                          ? "bg-white border-sand shadow-xs hover:border-leaf"
                          : "bg-white/5 border-white/10 hover:border-jute/60"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-jute/20 text-jute flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span
                        className={`text-sm sm:text-base leading-relaxed ${
                          presentationTheme === "cream" ? "text-ink" : "text-white/90"
                        }`}
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  {currentSlide.image && (
                    <div className="relative rounded-2xl overflow-hidden shadow-pop border-2 border-jute/30 max-w-md w-full">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.titleBn}
                        className="w-full h-80 sm:h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      {currentSlide.imageCaption && (
                        <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                          <p className="font-bold text-sm text-jute">
                            {currentSlide.imageCaption}
                          </p>
                          <p className="text-white/80 text-[11px]">
                            ১০০% অর্গানিক মানিকগঞ্জ জুট ক্রাফট
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Stats Layout */}
            {currentSlide.layout === "stats" && (
              <div className="space-y-6">
                {currentSlide.stats && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentSlide.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border text-center transition-all ${
                          presentationTheme === "cream"
                            ? "bg-white border-sand shadow-sm"
                            : "bg-white/5 border-white/10 backdrop-blur-sm"
                        }`}
                      >
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-bn-display text-jute block">
                          {stat.value}
                        </span>
                        <h4
                          className={`text-sm font-bold mt-1 ${
                            presentationTheme === "cream" ? "text-forest" : "text-white"
                          }`}
                        >
                          {stat.label}
                        </h4>
                        {stat.desc && (
                          <p
                            className={`text-xs mt-1 ${
                              presentationTheme === "cream" ? "text-ink/60" : "text-white/60"
                            }`}
                          >
                            {stat.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`p-6 rounded-2xl border space-y-3 ${
                    presentationTheme === "cream"
                      ? "bg-white border-sand"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  {currentSlide.bulletsBn.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-jute flex-shrink-0 mt-0.5" />
                      <span
                        className={`text-sm sm:text-base leading-relaxed ${
                          presentationTheme === "cream" ? "text-ink" : "text-white/90"
                        }`}
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Portfolio Layout */}
            {currentSlide.layout === "portfolio" && (
              <div className="space-y-6">
                {currentSlide.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentSlide.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border relative overflow-hidden flex flex-col justify-between transition-all ${
                          presentationTheme === "cream"
                            ? "bg-white border-sand shadow-sm hover:border-leaf"
                            : "bg-white/5 border-white/10 hover:border-jute/60"
                        }`}
                      >
                        <div>
                          {item.badge && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-leaf text-white mb-2">
                              {item.badge}
                            </span>
                          )}
                          <h4
                            className={`text-base font-bold ${
                              presentationTheme === "cream" ? "text-forest" : "text-white"
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p
                            className={`text-xs mt-1 ${
                              presentationTheme === "cream" ? "text-ink/70" : "text-white/70"
                            }`}
                          >
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-jute font-bold flex items-center gap-1">
                          <span>এক্সপ্লোর কালেকশন</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`p-5 rounded-2xl border space-y-2.5 ${
                    presentationTheme === "cream"
                      ? "bg-cream border-sand"
                      : "bg-black/30 border-white/10"
                  }`}
                >
                  {currentSlide.bulletsBn.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-jute mt-2 flex-shrink-0" />
                      <span
                        className={`text-xs sm:text-sm ${
                          presentationTheme === "cream" ? "text-ink" : "text-white/90"
                        }`}
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Grid Layout */}
            {currentSlide.layout === "grid" && (
              <div className="space-y-6">
                {currentSlide.highlights && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentSlide.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border ${
                          presentationTheme === "cream"
                            ? "bg-white border-sand"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <span className="text-xs font-bold text-jute uppercase block">
                          {h.badge}
                        </span>
                        <h4
                          className={`text-sm font-bold mt-1 ${
                            presentationTheme === "cream" ? "text-forest" : "text-white"
                          }`}
                        >
                          {h.title}
                        </h4>
                        <p
                          className={`text-xs mt-1 ${
                            presentationTheme === "cream" ? "text-ink/60" : "text-white/60"
                          }`}
                        >
                          {h.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentSlide.bulletsBn.map((bullet, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-start gap-3 ${
                        presentationTheme === "cream"
                          ? "bg-white border-sand shadow-xs"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-jute flex-shrink-0 mt-0.5" />
                      <span
                        className={`text-sm leading-relaxed ${
                          presentationTheme === "cream" ? "text-ink" : "text-white/90"
                        }`}
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Timeline / Roadmap Layout */}
            {currentSlide.layout === "timeline" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  {currentSlide.bulletsBn.map((b, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-start gap-4 ${
                        presentationTheme === "cream"
                          ? "bg-white border-sand shadow-xs"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <span className="px-2.5 py-1 rounded-md bg-jute text-ink font-bold text-xs">
                        পর্যায় {idx + 1}
                      </span>
                      <span
                        className={`text-sm sm:text-base leading-relaxed ${
                          presentationTheme === "cream" ? "text-ink" : "text-white/90"
                        }`}
                      >
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

                {currentSlide.quoteText && (
                  <div
                    className={`p-5 rounded-2xl border text-center ${
                      presentationTheme === "cream"
                        ? "bg-leaf/10 border-leaf/20"
                        : "bg-jute/10 border-jute/30"
                    }`}
                  >
                    <p className="text-base sm:text-lg italic font-medium font-bn-display text-jute">
                      "{currentSlide.quoteText}"
                    </p>
                    {currentSlide.quoteAuthor && (
                      <span
                        className={`text-xs block mt-2 ${
                          presentationTheme === "cream" ? "text-ink/60" : "text-white/60"
                        }`}
                      >
                        — {currentSlide.quoteAuthor}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 7. Contact Layout */}
            {currentSlide.layout === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div
                    className={`p-6 rounded-2xl border space-y-4 ${
                      presentationTheme === "cream"
                        ? "bg-white border-sand shadow-sm"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-jute text-ink font-bold flex items-center justify-center">
                        SP
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold ${
                            presentationTheme === "cream" ? "text-forest" : "text-white"
                          }`}
                        >
                          {PRESENTATION_METADATA.presenter}
                        </h3>
                        <p
                          className={`text-xs ${
                            presentationTheme === "cream" ? "text-ink/60" : "text-white/60"
                          }`}
                        >
                          {PRESENTATION_METADATA.designation} · {PRESENTATION_METADATA.company}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-white/10 text-sm">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-jute" />
                        <span className="font-bold">{PRESENTATION_METADATA.phone}</span>
                        <span className="text-xs text-white/50">(কল ও হোয়াটসঅ্যাপ)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-jute" />
                        <span>{PRESENTATION_METADATA.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-jute" />
                        <span>{PRESENTATION_METADATA.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/8801793648214`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-leaf hover:bg-forest text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>সরাসরি হোয়াটসঅ্যাপে কথা বলুন</span>
                    </a>
                    <Link
                      href="/shop"
                      className="px-5 py-2.5 bg-jute hover:bg-jute-deep text-ink rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
                    >
                      <span>লাইভ ক্যাটালগ দেখুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  {currentSlide.image && (
                    <div className="relative rounded-2xl overflow-hidden shadow-pop border-2 border-jute/40 max-w-sm">
                      <img
                        src={currentSlide.image}
                        alt="পাটবাড়ি উপহার"
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs text-center">
                        <span className="font-bold text-sm text-jute block">
                          ধন্যবাদ ও কৃতজ্ঞতা
                        </span>
                        <span className="text-white/80 text-[11px]">
                          সোনালি আঁশের আধুনিক পুনর্জাগরণে আপনার পাশে
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Quick Next / Prev Arrows for Mouse Clickers */}
        <button
          onClick={goToPrev}
          disabled={currentIdx === 0}
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            currentIdx === 0
              ? "opacity-20 cursor-not-allowed"
              : "bg-black/40 hover:bg-jute hover:text-ink text-white backdrop-blur-md shadow-md hover:scale-110"
          }`}
          title="পূর্ববর্তী স্লাইড (PageUp / ←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          disabled={currentIdx === slides.length - 1}
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            currentIdx === slides.length - 1
              ? "opacity-20 cursor-not-allowed"
              : "bg-black/40 hover:bg-jute hover:text-ink text-white backdrop-blur-md shadow-md hover:scale-110"
          }`}
          title="পরবর্তী স্লাইড (PageDown / Space / →)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </main>

      {/* Bottom Speaker Notes Drawer (Toggled by S) */}
      {showSpeakerNotes && (
        <div className="bg-black/90 backdrop-blur-md border-t border-jute/40 px-6 py-4 text-white z-40 transition-all">
          <div className="max-w-4xl mx-auto flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-jute" />
                <span className="text-xs font-bold text-jute uppercase tracking-wider">
                  স্পিকার প্রেজেন্টেশন গাইড ও টকিং পয়েন্টস (Speaker Notes):
                </span>
              </div>
              <p className="text-xs sm:text-sm text-sand/90 leading-relaxed font-bn">
                {currentSlide.speakerNotesBn}
              </p>
            </div>
            <button
              onClick={() => setShowSpeakerNotes(false)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Persistent Controller HUD */}
      <footer className="px-4 sm:px-8 py-3 bg-black/50 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-white text-xs z-30">
        {/* Slide navigation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">পূর্ববর্তী (PgUp)</span>
          </button>

          {/* Slide selector dropdown */}
          <select
            value={currentIdx}
            onChange={(e) => goToSlide(Number(e.target.value))}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-jute"
          >
            {slides.map((s, idx) => (
              <option key={s.id} value={idx} className="bg-[#0F2E22] text-white">
                {idx + 1}. {s.titleBn.length > 25 ? s.titleBn.slice(0, 25) + "..." : s.titleBn}
              </option>
            ))}
          </select>

          <button
            onClick={goToNext}
            disabled={currentIdx === slides.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-jute text-ink hover:bg-jute-deep disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold shadow-xs"
          >
            <span className="hidden sm:inline">পরবর্তী (PgDn)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center Indicator */}
        <div className="hidden md:flex items-center gap-2 text-white/60 text-xs">
          <span>কীবোর্ড শর্টকাট:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">PgUp</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">PgDn</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">Space</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">F</kbd>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Add Slide button */}
          <button
            onClick={() => setShowAddSlideModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs"
            title="নতুন স্লাইড তৈরি / লিংক করুন"
          >
            <PlusCircle className="w-3.5 h-3.5 text-jute" />
            <span className="hidden sm:inline">স্লাইড যোগ করুন</span>
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="কীবোর্ড গাইড"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Thumbnails Modal / Drawer (Toggled by T) */}
      {showThumbnails && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg z-50 p-6 sm:p-10 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-white/20 max-w-6xl mx-auto w-full">
            <div>
              <h3 className="text-xl font-bold text-white font-bn-display">
                সকল স্লাইড ওভারভিউ ({slides.length}টি স্লাইড)
              </h3>
              <p className="text-xs text-white/60">
                যেকোনো স্লাইডে ক্লিক করে সরাসরি সেই পৃষ্ঠায় চলে যান
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetToDefaultSlides}
                className="text-xs text-red-300 hover:text-red-200 underline"
              >
                ডিফল্ট স্লাইডে রিসেট
              </button>
              <button
                onClick={() => setShowThumbnails(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-8 max-w-6xl mx-auto w-full flex-1">
            {slides.map((s, idx) => {
              const isSelected = idx === currentIdx;
              return (
                <div
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`group cursor-pointer rounded-xl border p-3 flex flex-col justify-between transition-all ${
                    isSelected
                      ? "bg-jute/20 border-jute shadow-glow scale-102"
                      : "bg-white/5 border-white/10 hover:border-white/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-jute font-bold">
                      <span>#{idx + 1}</span>
                      <span className="truncate max-w-[80px]">{s.tag}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white mt-1.5 line-clamp-2">
                      {s.titleBn}
                    </h5>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-white/50 flex justify-between">
                    <span>{s.layout}</span>
                    <span className="text-jute group-hover:underline">দেখুন →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add / Link Custom Slide Modal */}
      {showAddSlideModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#123628] border-2 border-jute/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-white shadow-pop">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-bn-display text-jute flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                <span>নতুন প্রেজেন্টেশন স্লাইড যোগ করুন</span>
              </h3>
              <button
                onClick={() => setShowAddSlideModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSlide} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-white/80 font-bold mb-1">
                  স্লাইড শিরোনাম (Title)*
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ক্লায়েন্ট ফিডব্যাক ও সার্টিফিকেশন"
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-jute focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">ট্যাগ / ক্যাটাগরি</label>
                <input
                  type="text"
                  placeholder="যেমন: কোয়ালিটি নিশ্চয়তা"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-jute focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">
                  উপশিরোনাম / সংক্ষিপ্ত ব্যাখ্যা
                </label>
                <input
                  type="text"
                  placeholder="সংক্ষেপে মূল বার্তা..."
                  value={newSubtitleBn}
                  onChange={(e) => setNewSubtitleBn(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-jute focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">
                  পয়েন্টসমূহ (প্রতি লাইনে একটি করে বুলেট লিখুন)*
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="১ম পয়েন্ট&#10;২য় পয়েন্ট&#10;৩য় পয়েন্ট"
                  value={newBulletsBn}
                  onChange={(e) => setNewBulletsBn(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-jute focus:outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">
                  ফটোগ্রাফি ইমেজ নির্বাচন
                </label>
                <select
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-jute focus:outline-none"
                >
                  <option value="/images/products/classic-tote.jpg">ক্লাসিক টোট ব্যাগ</option>
                  <option value="/images/products/laptop-bag.jpg">ল্যাপটপ ব্যাগ</option>
                  <option value="/images/products/ladies-handbag.jpg">লেডিস হ্যান্ডব্যাগ</option>
                  <option value="/images/products/storage-basket.jpg">স্টোরেজ বাস্কেট</option>
                  <option value="/images/products/table-runner.jpg">টেবিল রানার</option>
                  <option value="/images/products/placemat-set.jpg">প্লেসম্যাট সেট</option>
                  <option value="/images/products/file-folder.jpg">ফাইল ফোল্ডার</option>
                  <option value="/images/products/gift-box.jpg">গিফট বক্স</option>
                  <option value="/images/artisan/artisan-loom.jpg">মানিকগঞ্জের তাঁত কারিগর</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">
                  স্পিকার টকিং পয়েন্টস (নোটস)
                </label>
                <input
                  type="text"
                  placeholder="মিটিংয়ে বলার জন্য ব্যক্তিগত নোট..."
                  value={newNotesBn}
                  onChange={(e) => setNewNotesBn(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-jute focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddSlideModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-jute text-ink font-bold hover:bg-jute-deep shadow-md"
                >
                  স্লাইড সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showShortcutsHelp && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#123628] border-2 border-jute/50 rounded-2xl p-6 sm:p-8 max-w-md w-full text-white shadow-pop">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-bn-display text-jute flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                <span>প্রেজেন্টেশন কীবোর্ড শর্টকাট গাইড</span>
              </h3>
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">পরবর্তী স্লাইড</span>
                <span className="font-mono text-jute font-bold">
                  PageDown / Space / → / ↓
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">পূর্ববর্তী স্লাইড</span>
                <span className="font-mono text-jute font-bold">PageUp / ← / ↑</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">ফুলস্ক্রিন টগল</span>
                <span className="font-mono text-jute font-bold">F</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">স্পিকার নোটস দেখুন</span>
                <span className="font-mono text-jute font-bold">S</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">সকল স্লাইডের গ্রিড ভিউ</span>
                <span className="font-mono text-jute font-bold">T</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">প্রথম / শেষ স্লাইড</span>
                <span className="font-mono text-jute font-bold">Home / End</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">মোবাইলে সোয়াইপ</span>
                <span className="font-mono text-jute font-bold">Swipe Left / Right</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-white/80">ডক / মোডাল বন্ধ করুন</span>
                <span className="font-mono text-jute font-bold">Esc</span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 text-center">
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="px-6 py-2 rounded-lg bg-leaf text-white font-bold text-xs"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
