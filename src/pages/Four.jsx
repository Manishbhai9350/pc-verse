import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import gsap from "gsap";
import { useRef, useState } from "react";
import { cn } from "../utils";
import Marquee from "../components/Marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MySlide from "../components/MySlide";
import { partners } from "../data/Partners.js";
import useWindow from "../hooks/useWindow.jsx";
import CountUp from "react-countup";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const Four = () => {
  const { width } = useWindow();
  const statsSecRef = useRef(null)
  const [isCountUP, setIsCountUP] = useState(false)

  const {scrollYProgress} = useScroll({
    target:statsSecRef,
    offset:['start end','start start']
  })

  useMotionValueEvent(scrollYProgress,'change',latest => {
    if (latest > .6) {
      setIsCountUP(true)
    } else if(latest < .3) {
      setIsCountUP(false)
    }
  })

  return (
    <section className="w-screen relative h-[250vh] pt-7 z-[200] bg-white">
      <Marquee />
      <div className="work mt-6 flex flex-col justify-center items-start w-full h-[100vh]">
        <div className="flex justify-start items-center p-10 gap-2">
          <div className="dot w-4 h-4 bg-zinc-800 rounded-full"></div>
          <p className="font-['Technor-Light'] opacity-80 uppercase">
            Who We Work With
          </p>
        </div>
        <div className="swiper border-y border-black h-[60vh] w-full">
          <Swiper
            slidesPerView={width < 600 ? 1 : width < 800 ? 2 : 3}
            centeredSlides={true}
            spaceBetween={20}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper h-[70vh] flex "
          >
            {partners.map((part, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className="m-3 min-w-[350px] w-1/3 max-w-[350px] flex-shrink-0"
                >
                  <MySlide part={part} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div ref={statsSecRef} className="stats mt-6 flex flex-col justify-center items-start w-full h-[100vh]">
        <div className="flex justify-start items-center p-10 gap-2">
          <div className="dot w-4 h-4 bg-zinc-800 rounded-full"></div>
          <p className="font-['Technor-Light'] opacity-80 uppercase">
            our stats
          </p>
        </div>
        <div className="boxes flex justify-evenly gap-3 items-center w-full h-[96%]">
          <div className="stat  w-[350px] border-x border-zinc-800 hidden md:inline-block h-[300px]">
            <div>
              <p className="text-center text-black/60 font-['Technor-Variable'] uppercase text-xl  sm:text-4xl">
                {
                  isCountUP ? (
                    <CountUp start={0} end={423} duration={4} />
                  ) : (
                    <CountUp start={0} end={0} duration={.1} />
                  )
                }
                k
              </p>
            </div>
            <p className="text-center text-black font-['Technor-Variable'] text-3xl">
              Product Delivered
            </p>
            <p className="px-4 text-center text-[.7rem] md:text-[1rem] font-['General-Regular'] text-black/70 mt-3">
              PC Verse has delivered over 423,000 custom PCs, pre-built systems,
              and PC parts globally. PC Verse meets diverse computing
              needs with innovative and reliable solutions.
            </p>
          </div>
          <div className="stat  w-[350px] border-x border-zinc-800 hidden md:inline-block h-[300px]">
            <div>
              <p className="text-center text-black/60 font-['Technor-Variable'] uppercase text-xl  sm:text-4xl">
                {
                  isCountUP ? (
                    <CountUp start={0} end={1234} duration={4} />
                  ) : (
                    <CountUp start={0} end={0} duration={.1} />
                  )
                }

              </p>
            </div>
            <p className="text-center text-black font-['Technor-Variable'] text-3xl">
              Customizable PC
            </p>
            <p className="px-4 text-center text-[.7rem] md:text-[1rem] font-['General-Regular'] text-black/70 mt-3">
              We offer 1,234 customizable PCs, known for their high quality and
              exceptional customer service, meeting diverse computing needs with
              innovative and reliable solutions.
            </p>
          </div>
          <div className="stat  w-[350px] border-x border-zinc-800 inline-block  h-[300px]">
            <div>
              <p className="text-center text-black/60 font-['Technor-Variable'] uppercase text-xl  sm:text-4xl">
                {
                  isCountUP ? (
                    <CountUp start={0} end={123} duration={4} />
                  ) : (
                    <CountUp start={0} end={0} duration={.1} />
                  )
                }
                k
              </p>
            </div>
            <p className="text-center text-black font-['Technor-Variable'] text-3xl">
              ORDERS PLACED
            </p>
            <p className="px-4 text-center text-[.8rem] sm:text-[.7rem] md:text-[1rem] font-['General-Regular'] text-black/70 mt-3">
              PC Verse has placed 123,000 orders, delivering over 423,000 custom
              PCs, pre-built systems, and PC parts globally. They offer 1,234
              customizable PCs, meeting diverse computing needs with innovative
              and reliable solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Four;
