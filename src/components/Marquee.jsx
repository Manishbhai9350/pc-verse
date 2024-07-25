import { motion } from 'framer-motion';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { cn } from '../utils';

const Marquee = () => {
    const text = "PC VERSE";
  const [isMouseEntered, setIsMouseEntered] = useState(false)
  const [xy, setXy] = useState({x:0,y:0})
  const marqueeInner2Ref = useRef(null)
  const parentRef = useRef(null)

  const handleMouseOut = e => {
    setIsMouseEntered(false)
    const clipath = `circle(0% at ${xy.x * 100}% ${xy.y * 100}%)`
      gsap.to(marqueeInner2Ref.current,{
        clipPath:clipath,
        duration:.6
      })
  }
  const handleMouseIn = e => {
      setIsMouseEntered(true)
  }
  const calcPath = e => {
    
    if (isMouseEntered) {
      const rect = parentRef.current.getBoundingClientRect()
      const deltaX = rect.left 
      const deltaY = rect.top 
      const {height,width} = rect
      const {clientX:x,clientY:y} = e 
      const finalX = x - deltaX 
      const finalY = y - deltaY
      const percX = finalX / width
      const percY = finalY / height
      setXy({x:percX,y:percY})
      const clipath = `circle(6% at ${percX * 100}% ${percY * 100}%)`
      gsap.to(marqueeInner2Ref.current,{
        clipPath:clipath,
        duration:.4
      })
    }
  }
  return (
    <div
        ref={parentRef}
        onMouseEnter={(e) => handleMouseIn(e)}
        onMouseMove={e => calcPath(e)}
        onMouseLeave={(e) => handleMouseOut(e)}
        className="marquee relative h-36 sm:h-52 w-full">
        <div 
        className="marquee_inner overflow-hidden border border-zinc-800  absolute flex justify-evenly items-center top-0 -left-5 h-full w-screen bg-zinc-800 text-white ">
          {new Array(6).fill(text).map((t, i) => {
            return (
              <motion.div
                animate={{ x: "-100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  repeatType: "loop",
                  ease: "linear",
                }}
                key={i}
                className="marquee_part  pointer-events-none w-fit flex-shrink-0 px-12 font-['General-SemiBold']  text-[5rem]  leading-[6rem] sm:text-[7rem] sm:leading-[7rem] text-nowrap "
              >
                {t}
              </motion.div>
            );
          })}
        </div>
        <div 
          ref={marqueeInner2Ref}
          className={cn('marquee_inner overflow-hidden border border-zinc-800 absolute flex justify-evenly items-center top-0 -left-5 h-full w-screen ',isMouseEntered ? 'text-zinc-800 bg-white':'text-white bg-zinc-800')}>
          {new Array(6).fill(text).map((t, i) => {
            return (
              <motion.div
                animate={{ x: "-100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  repeatType: "loop",
                  ease: "linear",
                }}
                key={i}
                className="marquee_part  pointer-events-none w-fit flex-shrink-0 px-12 font-['General-SemiBold']  text-[5rem]  leading-[6rem] sm:text-[7rem] sm:leading-[7rem] text-nowrap "
              >
                {t}
              </motion.div>
            );
          })}
        </div>
      </div>
  )
}

export default Marquee