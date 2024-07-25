import { ArrowDown } from "lucide-react"
import Heading from "../components/Heading"
import { forwardRef, useEffect, useRef } from "react"
import { cn } from "../utils"
import useWindow from "../hooks/useWindow"
import { useScroll } from "framer-motion"

const One = forwardRef(
  (props,ref) => {
    const {width,height} = useWindow()
    const video = useRef(null)
    useEffect(() => {
    if (!props.isLoading) {
      video.current.play()
    }
    }, [props.isLoading])
    
    return (
      <section ref={ref} className="one z-[82] bg-white overflow-hidden  flex flex-col justify-end items-start relative w-full h-screen">
        <div className="text flex flex-col justify-center items-center h-[60%] w-full z-10">
          <div className="heading px-[2px] md:px-16 w-full h-1/3 ">
            <Heading tl={props.tl} isLoading={props.isLoading}  mr={{ which: 2, value: "5rem" }} value="PC VERSE" />
          </div>
          <div className="para w-[100%] h-1/2 px-[10rem flex justify-end items-center">
            <div  className={cn('flex justify-between opacity-75 items-center relative duration-[2s]',width < 550 ? 'text-[1rem] mt-12 ' : 'gap-4 text-2xl' , props.isLoading ? 'opacity-0' : 'opacity-100' )}>
              <p className="text-white font-['Technor-Variable'] mr-1">
                Scroll Down
              </p>
              <div className={cn('arrow h-12 w-12 flex-shrink-0 flex justify-center items-center rounded-full border border-white',width < 550 && 'h-8 w-8 text-[.2rem]')}>
                <ArrowDown color="white" size={width < 550 ? 27 : 35} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg overflow-hidden h-full w-full absolute">
          <video ref={video} muted className="h-full w-full object-cover">
            <source src="/videos/fan.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    )
  }
)

export default One