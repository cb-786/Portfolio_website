import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface TimelineItem {
  date: string;
  title: string;
  company?: string;
  companyUrl?: string;
  period?: string;
  summary: string;
  tech: string[];
}

const timelineData: TimelineItem[] = [
  {
    date: "AUG 2023 - PRESENT",
    title: "Research Team Leader & ELC Intern",
    company: "Thapar Institute of Engineering & Technology",
    companyUrl: "https://www.thapar.edu",
    period: "AUG 2023 - PRESENT",
    summary:
      "Led a 4-member interdisciplinary team through a 6-week intensive research program. Co-authored a paper on EEG-based ADHD detection with 95.83% accuracy.",
    tech: ["Machine Learning", "Python", "Team Leadership", "Research"],
  },
  {
  date: "AUG 2024 - PRESENT",
  title: "Core Technical Member",
  company: "IEI Orion Society, TIET",
  period: "AUG 2024 - PRESENT",
  summary:
    "Worked on designing and developing web pages for the Orion Tech-Cultural Fest website. Also contributed to creating Instagram stories and promotional pages to support event outreach and engagement.",
  tech: ["Web Development", "UI Design", "Content Design", "Team Collaboration"],
},

  {
    date: "AUG 2023 - JUNE 2027",
    title: "B.E. Computer Engineering",
    company: "Thapar Institute of Engineering & Technology",
    companyUrl: "https://thapar.edu",
    period: "AUG 2023 - JUNE 2027",
    summary:
      "Pursuing Bachelor of Engineering with a 8.88 CGPA. Recipient of the Reliance Foundation Undergraduate Scholarship and Merit-Based Scholarship.",
    tech: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"],
  },
];

function renderCompany(company?: string) {
  if (!company) return null;
  return company
    .replace(/Thapar/gi, (m) => `<span class="text-accent font-semibold">${m}</span>`)
    .replace(/LEAD Society/gi, (m) => `<span class="text-accent font-semibold">${m}</span>`);
}

const Timeline = () => {
  const { ref, isVisible } = useScrollAnimation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const scrollAccumulator = useRef(0);
  const [hasPassedProjects, setHasPassedProjects] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight && elementTop > -elementHeight) {
        const progress = Math.max(
          0,
          Math.min(100, ((windowHeight - elementTop) / (windowHeight + elementHeight)) * 100)
        );
        setScrollProgress(progress);
      }

      // One-time check: if user has scrolled past the #projects section, mark flag
      if (!hasPassedProjects) {
        const projectsEl = document.getElementById('projects') || document.querySelector('[data-section="projects"]') as HTMLElement | null;
        if (projectsEl) {
          const projBottom = projectsEl.getBoundingClientRect().bottom + window.scrollY;
          if (window.scrollY > projBottom) {
            setHasPassedProjects(true);
            setVisibleItems(timelineData.length);
            setScrollProgress(100);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!timelineRef.current) return;
      
      // Only apply scroll-jacking on desktop (lg breakpoint = 1024px)
      if (window.innerWidth < 1024) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2;

      if (isInView && visibleItems < timelineData.length) {
        e.preventDefault();

        scrollAccumulator.current += e.deltaY;

        if (Math.abs(scrollAccumulator.current) > 100) {
          if (scrollAccumulator.current > 0 && visibleItems < timelineData.length) {
            setVisibleItems((prev) => Math.min(prev + 1, timelineData.length));
          } else if (scrollAccumulator.current < 0 && visibleItems > 1) {
            setVisibleItems((prev) => Math.max(prev - 1, 1));
          }
          scrollAccumulator.current = 0;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [visibleItems]);

  return (
    <section
      ref={timelineRef}
      className="py-0 px-6 lg:px-8 relative overflow-hidden"
      id="timeline"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={ref} className={`${isVisible ? "scroll-animate" : "opacity-0"} flex items-center justify-center gap-8 mb-20 flex-wrap`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center">
           Tracing the Arc...
          </h2>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block relative">
          {/* Background Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
          
          {/* Animated Progress Line */}
          <div
            className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${(visibleItems / timelineData.length) * 100}%` }}
          />

          {/* Timeline Items */}
          <div className="grid grid-cols-3 gap-8 relative items-stretch">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  index < visibleItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Dot */}
                <div className="relative flex justify-center mb-8">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                      index < visibleItems
                        ? "bg-accent border-accent shadow-lg shadow-accent/50 scale-125"
                        : "bg-background border-border"
                    }`}
                  />
                </div>

                {/* Content Card */}
                <div className="glass-card p-4 rounded-xl group cursor-default border border-black/60 dark:border-gray-400 transition-transform duration-200 ease-out transform hover:-translate-y-1 hover:shadow-lg bg-white/5 dark:bg-white/3 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{item.period || item.date}</p>
                      <h3 className="text-xl font-bold mb-1 text-foreground">{item.title}</h3>
                      {item.company && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.companyUrl ? (
                            <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline relative pr-6">
                              <span dangerouslySetInnerHTML={{ __html: renderCompany(item.company) as string }} />
                              <ArrowRight className="absolute top-0 right-0 w-5 h-5 -rotate-45 text-accent" />
                            </a>
                          ) : (
                            <>{item.company}</>
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mt-2" dangerouslySetInnerHTML={{ __html: item.summary }} />

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tech.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted/80 text-foreground font-medium dark:bg-muted/70 dark:text-foreground"
                        style={{ borderRadius: '9999px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden relative pl-8">
          {/* Background Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Animated Progress Line */}
          <div
            className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative ${
                  isVisible ? `scroll-animate scroll-animate-delay-${index + 1}` : "opacity-0"
                }`}
              >
                {/* Dot */}
                <div className="absolute -left-[26px] top-0">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                      scrollProgress > (index / (timelineData.length - 1)) * 100
                        ? "bg-accent border-accent shadow-lg shadow-accent/50 scale-125"
                        : "bg-background border-border"
                    }`}
                  />
                </div>

                {/* Content Card */}
                <div className="glass-card p-6 rounded-xl group cursor-default border border-black/60 dark:border-gray-400 ml-4">
                  <p className="text-sm text-muted-foreground">{item.period || item.date}</p>
                  <h3 className="text-xl font-bold mb-1 text-foreground">{item.title}</h3>
                  {item.company && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.companyUrl ? (
                        <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline relative pr-6">
                          <span dangerouslySetInnerHTML={{ __html: renderCompany(item.company) as string }} />
                          <ArrowRight className="absolute top-0 right-0 w-5 h-5 -rotate-45 text-accent" />
                        </a>
                      ) : (
                        <>{item.company}</>
                      )}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground leading-relaxed mt-1" dangerouslySetInnerHTML={{ __html: item.summary }} />

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/80 text-foreground font-medium dark:bg-muted/70 dark:text-foreground"
                        style={{ borderRadius: '9999px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;