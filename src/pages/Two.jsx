import { useMotionValueEvent, useScroll } from "framer-motion"
import gsap from "gsap"
import { ArrowRight, CornerDownRight } from "lucide-react"
import { forwardRef, useEffect, useRef } from "react"
import Beast from "../components/Beast"
import { cn } from "../utils"
import useWindow from '../hooks/useWindow'

const Two = forwardRef(
    (props,ref) => {
      const {height,width} = useWindow()
      const {scrollYProgress} = useScroll({
        target:ref,
        offset:['.2 end','start .2']
      })

      useMotionValueEvent(scrollYProgress,'change',latest => {
        const spans = ref.current.querySelectorAll('.heading span')
        const idx = Math.round(latest * spans.length)
        spans.forEach((span,i) => {
          if (i < idx) {
            gsap.to(span,{
              opacity:1
            })
          } else {
            gsap.to(span,{
              opacity:.4
            })
          }
        })
      })
      
        return (
          <section ref={ref} className={cn('flex border-b border-b-zinc-700 relative bg-white z-[82] flex-col justify-start items-center min-h-[120vh] w-screen py-[10vh]',width < 630 ? 'h-[220vh]' : 'auto')}>
              <div className={cn('heading mb-[2vh] border-b border-b-zinc-800 w-[100%] flex justify-start items-center gap-18 h-40')}>
                <h1 className={cn("lg:text-[10rem] md:text-[8rem] text-[5rem] font-['Technor-Variable']  leading-[10rem]'" , width < 500 && 'text-[2.4rem]')}>
                  {
                    'Powerfull'.split('').map((e,i) => {
                      return <span className="opacity-[.4]" key={i}>{e}</span>
                    })
                  }
                </h1>
                <h1 className={cn("lg:text-[10rem] md:text-[8rem] text-[5rem] font-['Technor-Variable'] font-semibold leading-[10rem]" , width < 500 && 'text-[2.4rem]')}>
                {
                    'PC'.split('').map((e,i) => {
                      return <span className="opacity-[.4]" key={i}>{e}</span>
                    })
                  }
                </h1>
              </div>
              <div className="beasts flex-wrap relative gap-10 flex justify-center items-center  w-full h-[75%]">
                <Beast str='GAMING' img="/images/pc1.jpg" />
                <Beast str='EDITING' img="/images/pc2.jpg" />
                <Beast str='DESIGNING' img="/images/pc3.jpeg" />
              </div>
          </section>
        )
      }
)

export default Two