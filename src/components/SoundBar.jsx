import React, { useEffect, useRef, useState } from "react";
import { cn } from "../utils";
import { motion } from "framer-motion";
import gsap from "gsap";

const SoundBar = ({ active, setActive }) => {
  const soundBarRef = useRef(null);
  const animationTl = useRef(gsap.timeline())
  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
      const bars = soundBarRef.current.querySelectorAll(".line");
    if (active) {
        if (!isFirstRender) {
            animationTl.current.restart()
        } else {
            bars.forEach((bar, i) => {
                animationTl.current.to(bar, {
                  yPercent: 0,
                  repeat: -1,
                  yoyo: true,
                  ease:'none',
                  duration: .5 + i / 10,
                });
            });
            setIsFirstRender(false)
        }
    } else {
        if (!isFirstRender) {
          animationTl.current?.pause()
        }
        gsap.to(bars, {
            yPercent: 90,
            duration:1.5
        });
    }
  }, [active]);

  return (
    <div
        ref={soundBarRef}
        className={cn(
            "fixed soundbar flex justify-between items-center overflow-hidden right-5 bottom-5 h-8 w-10 z-[400]"
        )}
    >
      <div className="line h-full w-[10px] bg-gray-500"></div>
      <div className="line h-full w-[10px] bg-gray-500"></div>
      <div className="line h-full w-[10px] bg-gray-500"></div>
    </div>
  );
};

export default SoundBar;
