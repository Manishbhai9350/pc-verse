import { forwardRef, useEffect, useRef, useState } from "react";
import GraphicCard from "../components/GraphicCard";
import ControllPanel from "../components/ControllPanel";
import gsap from "gsap";
import * as THREE from "three";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Info from "../components/Info";
import { InfoData } from "../data/Info.data";
import useWindow from "../hooks/useWindow";

const Three = forwardRef(({isSwitchActive,setIsSwitchActive},ref) => {
  const { width } = useWindow();
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const left = useRef(50);
  const card = useRef(null);
  const graphicSecRef = useRef(null);
  // all the sections
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const [graphicsLeft, setGraphicsLeft] = useState(50);
  const [speed, setSpeed] = useState(0);
  const [currentColor, setcurrentColor] = useState("#33FF57");

  const changeColor = (clr) => {
    setcurrentColor(clr);
  };
  const changeSpeed = (n) => {
    setSpeed(n);
  };

  const { scrollYProgress: sec2Y } = useScroll({
    target: section2Ref,
    offset: ["start end", "start start"],
  });

  const sec2YT = useTransform(sec2Y,[0,1],[0,.7])

  useMotionValueEvent(sec2YT, "change", (latest) => {
    const val = (1-latest)
    gsap.to(graphicSecRef.current, {
      left: (1-latest) * 50 + "%",
    });
  });

  const alertRef = useRef(null);
  const itervalId = useRef(null);

  const { Info1, Info2, Info3 } = InfoData;

  const alertIt = (str) => {
    clearInterval(itervalId.current);
    const { current: alertBox } = alertRef;
    alertBox.textContent = str;
    gsap.to(alertBox, {
      top: 5,
      duration: 0.3,
      onComplete() {
        itervalId.current = setTimeout(() => {
          gsap.to(alertBox, {
            top: "-100%",
            duration: 0.4,
          });
        }, 1400);
      },
    });
  };

  const { scrollYProgress: sec1YPro } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  useMotionValueEvent(sec1YPro, "change", (latest) => {
    let scale = width < 600 ? 0.15 : 0.2;
    scale *= latest;
    const { current: graphicCard } = card;
    if (graphicCard) {
      graphicCard.scale.x = scale;
      graphicCard.scale.y = scale;
      graphicCard.scale.z = scale;
    }
  });
  const { scrollYProgress: graphicScale } = useScroll({
    target: section4Ref,
    offset: ["end end ", "end center"],
  });
  
  useMotionValueEvent(graphicScale, "change", (latest) => {
    let scale = width < 600 ? 0.15 : 0.2;
    scale *= (1 - latest )
    const { current: graphicCard } = card;
    if (graphicCard) {
      graphicCard.scale.x = scale;
      graphicCard.scale.y = scale;
      graphicCard.scale.z = scale;
    }
    if (latest > .2) {
      graphicSecRef.current.style.pointerEvents = 'none'
    } else {
      graphicSecRef.current.style.pointerEvents = 'all'
    }
  });

  return (
    <>
      <div className="page3-wrapper min-h-screen relative">
        <div
          ref={alertRef}
          className="alert fixed -top-full left-1/2 -translate-x-1/2 h-8 w-44 bg-black/30 text-white rounded-xl font-['Technor-Light'] z-[100] text-center leading-8"
        ></div>
        <div className="graphic z-[80] fixed top-0 left-0 w-full min-w-[320px] pointer-events-none h-screen">
          <GraphicCard
            setInitialMousePos={setInitialMousePos}
            setInitialRotation={setInitialRotation}
            initialMousePos={initialMousePos}
            initialRotation={initialRotation}
            refs={{ graphicSecRef, card }}
            left={graphicsLeft}
            speed={speed}
            currentColor={currentColor}
          />
        </div>
        <section
          className="z-[82] md:py-16 h-screen select-none w-screen relative flex flex-col justify-between items-start sm:flex-col md:justify-between md:items-center"
          ref={ref}
        >
          <div className="text text-1 w-full hidden sm:flex  h-[40%] flex-col items-start  justify-center">
            <div className="overflow-hidden">
              <h1 className="text-[2.5rem]  leading-[3rem] text-black/70 md:text-[4rem] lg:w-[400px] lg:text-[5rem] lg:leading-[4.5rem] font-['Technor-Semibold'] ">
                BEAST
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-[2.5rem]  leading-[3rem] text-black/70 md:text-[4rem] lg:w-[400px] lg:text-[5rem] lg:leading-[4.5rem] font-['Technor-Semibold'] ">
                GRAPHICS
              </h1>
            </div>
          </div>
          <div className="text text-2 w-full hidden sm:flex  h-[40%]  flex-col items-start sm:items-end  justify-center">
            <div className="overflow-hidden">
              <h1 className="text-[2.5rem] pl-6 text-right sm:text-start w-[100px]  leading-[3rem] text-black/70 sm:w-[240px] lg:w-[360px] lg:text-[5rem] lg:leading-[4.5rem] font-['Technor-Semibold'] uppercase">
                great
              </h1>
            </div>
            <div className="overflow-hidden ">
              <h1 className="text-[2.5rem] pl-6 text-right sm:text-start w-[100px]  leading-[3rem] text-black/70 sm:w-[240px] lg:w-[360px] lg:text-[5rem] lg:leading-[4.5rem] font-['Technor-Semibold'] uppercase">
                gaming
              </h1>
            </div>
          </div>
          <ControllPanel
            setIsSwitchActive={setIsSwitchActive}
            isSwitchActive={isSwitchActive}
            alertIt={alertIt}
            speed={speed}
            changeSpeed={changeSpeed}
            changeColor={changeColor}
            currentColor={currentColor}
          />
        </section>
        <section ref={section2Ref} className="h-screen w-full">
          <Info axis="right" heading={Info1.heading} para={Info1.para} />
        </section>
        <section ref={section3Ref} className="h-screen w-full ">
          <Info axis="right" heading={Info2.heading} para={Info2.para} />
        </section>
        <section ref={section4Ref} className="h-screen w-full ">
          <Info axis="right" heading={Info3.heading} para={Info3.para} />
        </section>
      </div>
    </>
  );
});

export default Three;
