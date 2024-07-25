import { useMotionValueEvent, useScroll } from "framer-motion"
import useWindow from "../hooks/useWindow"
import { cn } from "../utils"
import MyArrow from "./MyArrow"
import { useRef } from "react"
import gsap from "gsap"

const Info = ({axis = 'right' , heading , para}) => {
  const infoContainer = useRef(null)
  const paraRef = useRef(null)
  const {scrollYProgress} = useScroll({
    target:infoContainer,
    offset:['start end','start start']
  })
  useMotionValueEvent(scrollYProgress,'change',latest => {
    if (latest < .6) {
      gsap.to(paraRef.current,{
        opacity:.1,
        ease:'power3.out',
        duration:.6
      })
    } else {
      gsap.to(paraRef.current,{
        opacity:1,
        ease:'power3.out',
        duration:.6
      })
    }
  })
  const {height,width} = useWindow()
  return (
    <div ref={infoContainer} className={cn('min-h-[120vh] w-full flex items-start ',axis == 'right' ? 'justify-end' : 'justify-start' )}>
       <div className="right w-2/3 py-6 px-6 h-full flex flex-col justify-start items-start pt-10">
          <div className="heading">
            <h1 className={cn(`uppercase text-[2.1rem] leading-1 sm:text-[3rem] font-['General-Semibold']`,width < 350 && 'text-[1.5rem]')}>{heading}</h1>
          </div>
          <div className="paragraph">
          <p ref={paraRef} className={cn(`font-['General-Regular']  flex justify-start items-start flex-wrap sm:tracking-tighter text-black/70 text-[1rem] leading-6 sm:leading-6 md:leading-10 sm:text-[1.5rem]`,width < 400 && 'text-[.85rem] leading-5')}>
          {
            para
          }
          </p>
          </div>
          <div className={cn('button w-full px-12 sm:px6 sm:hidden  relative flex justify-start items-center sm:w-[260px] min-h-16 mt-14 bg-zinc-700',width < 900 && 'hidden')}>
            <p className={cn('text-[1.5rem] capitalize  leading-[1.1rem] text-white' , width < 350 && 'text-[1.2rem] w-full text-center')}>READ MORE</p>
              <MyArrow size={width < 350 ? 0 : .8}  />
          </div>
          <div className="line"></div>
        </div>
    </div>
  )
}

export default Info