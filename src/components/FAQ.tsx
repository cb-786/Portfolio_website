import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQ = () => {
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  const faqs = [
    {
      question: "What do you do and what are you currently working on?",
      answer:
        "I am a Computer Engineering student at Thapar Institute with a CGPA of 8.88. Currently, I balance my time between full-stack development—building scalable web applications using the MERN stack—and academic research, where I apply machine learning techniques to EEG-based ADHD detection.",
    },
    {
      question: "What kind of projects excite you the most?",
      answer:
        "I’m most excited by projects that bridge complex data analysis with intuitive user experiences. This includes building high-accuracy machine learning pipelines for healthcare applications and developing real-time systems like trading and analytics platforms.",
    },
    {
      question: "What tools and technologies do you feel most comfortable with?",
      answer:
        "On the web development side, I’m comfortable with React, Node.js, Express.js, and MongoDB. For machine learning and data analysis, I regularly work with Python, NumPy, Pandas, and Scikit-learn. I also have a strong foundation in C++, SQL, and system-level problem solving.",
    },
    {
      question: "How do you usually approach a new problem or project?",
      answer:
        "I start by breaking the problem down into smaller, well-defined components—whether that’s designing a backend architecture or selecting meaningful features for an ML model. Solving 430+ problems across LeetCode and GeeksforGeeks has helped me develop a structured, efficiency-driven approach to problem solving.",
    },
  ];

  return (
    <section id="faq" ref={faqRef} className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-16 ${faqVisible ? "scroll-animate" : ""}`}>
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Questions & Answers
          </p>
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`bg-transparent rounded-2xl px-6 border-none transition-all group ${
                faqVisible
                  ? `scroll-animate scroll-animate-delay-${Math.min(index % 3 + 1, 3)}`
                  : ""
              }`}
            >
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6 relative border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 group-hover:border-black dark:group-hover:border-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
