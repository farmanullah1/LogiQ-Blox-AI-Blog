import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const Counter = ({ value, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number from string value if needed (e.g. "99.2")
  const target = parseFloat(value);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      if (start === end) return;

      let totalFrames = duration * 60;
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setCount(progress * end);

        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(end);
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString(undefined, { 
        minimumFractionDigits: value.includes('.') ? 1 : 0,
        maximumFractionDigits: value.includes('.') ? 1 : 0 
      })}
      {suffix}
    </span>
  );
};

const StatsBar = () => {
  const stats = [
    { label: "Grammar Accuracy", value: "99.2", suffix: "%" },
    { label: "Correction Time", value: "500", suffix: "ms", prefix: "< " },
    { label: "Error Types Detected", value: "50", suffix: "+" }
  ];

  return (
    <div className="bg-primary-dark py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-12 text-white">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl md:text-6xl font-display font-bold mb-2">
              {stat.prefix}<Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-primary-light/80 font-medium uppercase tracking-widest text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
