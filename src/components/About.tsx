import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  
  const skills = {
    fullstack: [
      "C++",
      "Python", 
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Data Structures",
      "Algorithms",
      "REST API Design",
    ],
    ml: [
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "Machine Learning",
      "Signal Processing",
    ],
    linux: [
      "Arch Linux (Daily Driver)",
      "Linux Internals",
      "Bash & Shell Scripting",
      "Systemd",
      "Process & Memory Management",
      "Networking Tools (ip, ss, tcpdump)",
      "Package Management (pacman, AUR)",
      "Permissions & Filesystems",
      "Performance Tuning",
    ],
    tools: [
      "Git",
      "Postman",
      "VS Code",
      "Docker (Basics)",
      "JWT Authentication",
      "CI/CD",
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
                I specialize in Full-Stack Development and Machine Learning, with hands-on experience building production-grade applications using the MERN stack.
              </p>

              <p>
                I have strong experience in machine learning using Python and Scikit-learn, where I built EEG signal classification pipelines achieving{" "}
                <span className="font-bold text-black dark:text-white">99.23% accuracy</span> for ADHD detection. 
                Alongside this, I’ve developed scalable web platforms with real-time analytics and clean backend architectures.
              </p>

              <p>
                I’m genuinely obsessed with Linux. I’ve been using{" "}
                <span className="font-bold text-black dark:text-white">Arch Linux as my daily driver for over 2 years</span>, 
                and I’m deeply comfortable working at the system level — from shell scripting and debugging processes to tuning performance, 
                managing services with systemd, and understanding how things work under the hood.
              </p>

              <p>
                What drives me is building efficient, reliable systems — whether that’s optimizing backend APIs, 
                engineering robust ML pipelines, or squeezing performance out of a Linux environment. 
                I enjoy understanding software end-to-end, from hardware-aware execution to user-facing applications.
              </p>
            </div>
          </div>

          {/* Right Content - Skills Card */}
          <div className={`glass-card rounded-3xl p-8 shadow-xl ${aboutVisible ? 'scroll-animate scroll-animate-delay-2' : ''}`}>
            <h3 className="text-2xl font-bold mb-8">Skills & Expertise</h3>

            <div className="space-y-8">
              
              {/* Software & Full-Stack */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Software & Full-Stack Development
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.fullstack.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Machine Learning */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Machine Learning & Signal Processing
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.ml.map((skill) => (
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
                  Linux & Systems
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
                  Developer Tools & Ecosystem
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
