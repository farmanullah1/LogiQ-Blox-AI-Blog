import React from 'react';
import { motion } from 'framer-motion';

const CreatorCard = ({ title, url, description, icon, color }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-opacity-10`} style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</h3>
    </div>
    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{description}</p>
    <div className="flex items-center gap-1 text-primary font-bold text-xs uppercase tracking-widest">
      Visit Profile <span className="group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </a>
);

const Creator = () => {
  const skills = ["React", "Node.js", "Python", "MongoDB", "AI/NLP", "Tailwind CSS", "Framer Motion", "Three.js", "GSAP"];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-gradient-to-br from-primary to-correct rounded-[4rem] relative flex items-center justify-center text-9xl shadow-2xl overflow-hidden"
          >
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,white_0%,transparent_50%)]" />
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,white_0%,transparent_50%)]" />
            </div>
            👨‍💻
          </motion.div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                Farman Ullah <br /><span className="text-primary">Ansari</span>
              </h1>
              <p className="text-2xl text-slate-600 dark:text-slate-400 font-medium mb-6">
                Full-Stack Developer · AI Enthusiast · Builder
              </p>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                "I build tools that make people's lives a little easier — one line of code at a time."
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <CreatorCard 
            title="Portfolio" 
            url="https://farmanullah1.github.io/My-Portfolio" 
            description="Explore my complete portfolio of web applications and creative experiments."
            icon="🌐"
            color="#2563EB"
          />
          <CreatorCard 
            title="LinkedIn" 
            url="https://www.linkedin.com/in/farmanullah-ansari/" 
            description="Connect with me professionally and stay updated on my latest builds."
            icon="💼"
            color="#0077B5"
          />
          <CreatorCard 
            title="GitHub" 
            url="https://github.com/farmanullah1" 
            description="Dive into my source code and contribute to open-source projects."
            icon="🐙"
            color="#333333"
          />
        </div>

        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-sm font-bold shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>

        <div className="p-12 bg-slate-900 rounded-[3rem] text-center text-white">
          <h2 className="text-4xl font-display font-bold mb-6">Have a project in mind?</h2>
          <p className="text-slate-400 text-xl mb-10">I'm always open to new opportunities and collaborations.</p>
          <a 
            href="https://www.linkedin.com/in/farmanullah-ansari/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-primary text-white rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-all"
          >
            Let's Talk →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Creator;
