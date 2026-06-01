import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  
  const skills = {
    ai_engineering: [
      "GraphRAG",
      "Local LLMs & Ollama",
      "Vector Databases",
      "Semantic Search",
      "Multimodal Ingestion",
      "Scikit-learn",
      "PyTorch",
      "Signal Processing",
    ],
    software: [
      "Python",
      "C++", 
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "System Architecture",
    ],
    linux: [
      "Arch Linux (Daily Driver)",
      "Hyprland WM",
      "Quickshell",
      "Bash & Shell Scripting",
      "Systemd",
      "Process & Memory Management",
      "Hardware-Aware Optimization",
    ],
    tools: [
      "Cursor",
      "Claude Code",
      "GitHub Copilot",
      "Git",
      "VS Code",
      "Docker (Basics)",
    ],
  };

  return (
    <section id="about" ref={aboutRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Content */}
          <div className={`space-y-8 ${aboutVisible ? 'scroll-animate' : ''}`}>
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                About Me
              </p>
              <h2 className="text-5xl font-bold mb-8">My background</h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                I'm a Bachelor of Engineering student in Computer Engineering at Thapar Institute of Engineering & Technology, maintaining a{" "}
                <span className="font-bold text-black dark:text-white">CGPA of 8.88/10.0</span>. 
                I specialize in AI Engineering and Full-Stack Architecture, building production-grade intelligence into highly scalable platforms.
              </p>

              <p>
                My focus lies in applied AI and advanced retrieval architectures. I have engineered enterprise-grade semantic search engines using{" "}
                <span className="font-bold text-black dark:text-white">GraphRAG and multimodal ingestion</span> to classify unstructured data, 
                alongside building robust machine learning pipelines that achieved 99.23% accuracy for EEG-based ADHD detection.
              </p>

              <p>
                I’m genuinely obsessed with system-level optimization and Linux. I’ve been using{" "}
                <span className="font-bold text-black dark:text-white">Arch Linux with Hyprland</span> as my daily driver for over 2 years. 
                Whether I'm developing custom desktop utilities with Quickshell or orchestrating local LLM inference on resource-constrained APUs (like my Ryzen 5 3500U / Vega 8 setup), I am deeply comfortable tuning performance, managing memory, and understanding systems under the hood.
              </p>

              <p>
                What drives me is building efficient, reliable systems — whether that’s engineering zero-latency AI search pipelines, 
                optimizing local language models, or squeezing maximum performance out of a development environment. I enjoy understanding software end-to-end, from hardware-aware execution to the final user experience.
              </p>
            </div>
          </div>

          {/* Right Content - Skills Card */}
          <div className={`glass-card rounded-3xl p-8 shadow-xl ${aboutVisible ? 'scroll-animate scroll-animate-delay-2' : ''}`}>
            <h3 className="text-2xl font-bold mb-8">Skills & Expertise</h3>

            <div className="space-y-8">
              
              {/* AI Engineering */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  AI Engineering & Machine Learning
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.ai_engineering.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Software & Full-Stack */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Software Engineering & Web
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.software.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Linux */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Linux & System Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.linux.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  AI Dev Tools & Ecosystem
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;