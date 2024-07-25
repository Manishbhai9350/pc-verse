import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Cross, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import NavSpan from "./NavSpan";
import useWindow from "../hooks/useWindow";
import { cn } from "../utils";
import CountUp from "react-countup";

const Loader = ({
  isLoading,
  setIsLoading,
  setLoader,
  loader,
  tl,
  setIsNav,
  isNav,
}) => {
  const parent = useRef(null);
  const clips = useRef(null);
  const timeOutID = useRef(null);

  const navTl = useRef(gsap.timeline());
  const navUpdated = useRef(false);
  const isNavLoaded = useRef(false);
  const [isCount, setIsCount] = useState(true);

  const disAssemble = () => {
    const clipChildrens = clips.current.querySelectorAll(".clip");
    const delay = 2;
    clipChildrens.forEach((clip, i) => {
      clearTimeout(timeOutID.current);
      const top = Number(clip.getAttribute("top"));
      const left = Number(clip.getAttribute("left"));
      gsap.to(clip, {
        delay: delay / 2 + i * 0.1,
        top: top + "%",
        left: left + "%",
        duration: 2,
        ease: "power3.inOut",
      });
      timeOutID.current = setTimeout(() => {
        setIsLoading(false);
      }, 2000 + delay * 1000);
    });
  };
  const reAssemble = () => {
    const clipChildrens = clips.current.querySelectorAll(".clip");
    clipChildrens.forEach((clip, i) => {
      const top = Number(clip.getAttribute("inttop"));
      const left = Number(clip.getAttribute("intleft"));
      gsap.to(clip, {
        delay: i * 0.1,
        top: top + "%",
        left: left + "%",
        duration: 1.5,
        ease: "power3.inOut",
      });
    });
  };

  useEffect(() => {
    if (loader == true || loader == false) {
      if (loader) {
        disAssemble();
      } else {
        reAssemble();
      }
    }
  }, [loader]);

  useEffect(() => {
    const { current: tl } = navTl;
    if (isNav) {
      if (navUpdated.current) {
        tl.play();
      } else {
        tl.to(".nav-items", {
          delay: 2,
          top: 0,
        });
        tl.to(".nav-items .close", {
          opacity: 1,
        });
        tl.to(".link-content", {
          y: 0,
          stagger: 0.1,
          onComplete() {
            isNavLoaded.current = true;
          },
        });
        navUpdated.current = true;
      }
    } else {
      if (navUpdated.current) {
        tl.reverse();
      }
    }
  }, [isNav]);

  useEffect(() => {
    const links = document.querySelectorAll(".nav-items .content .link");
    links.forEach((e, i) => {
      const bg = e.querySelector(".bg");
      e.addEventListener("mouseenter", () => {
        if (isNavLoaded.current) {
          gsap.to(bg, {
            y: 0,
          });
        }
      });
      e.addEventListener("mouseleave", () => {
        gsap.to(bg, {
          y: "120%",
        });
      });
    });

    return () => {};
  }, []);
  const { width } = useWindow();

  return (
    <>
      <div className="nav-items h-screen w-screen fixed left-0 flex justify-center items-center top-[-100vh]  z-[301]">
        <div
          onClick={() => {
            setIsNav(false);
            setLoader(true);
            isNavLoaded.current = false;
          }}
          className="close flex justify-center items-center text-white absolute top-[40px] right-[70px] opacity-100"
        >
          <p className="font-['Technor-Variable'] text-2xl cursor-pointer uppercase">
            close
          </p>
        </div>

        <div
          className={cn(
            "content w-2/3 flex flex-col justify-evenly items-start h-2/3",
            width < 400 ? "w-full px-2" : "w-2/3"
          )}
        >
          <div className="link cursor-pointer text-white hover:font-[900] overflow-hidden hover:tracking-wide font-['Panchang-SemiBold'] relative ">
            <div className="bg h-full w-full absolute top-0 left-0 translate-y-[120%] bg-white"></div>
            <h1 className="overflow-hidden relative">
              <div className="relative translate-y-full link-content">
                <NavSpan val="GIT-HUB" href="https://github.com/Manishbhai9350" />
              </div>
            </h1>
          </div>
          <div className="link cursor-pointer text-white hover:font-[900] overflow-hidden hover:tracking-wide font-['Panchang-SemiBold'] relative ">
            <div className="bg h-full w-full absolute top-0 left-0 translate-y-[120%] bg-white"></div>
            <h1 className="overflow-hidden relative">
              <div className="relative translate-y-full link-content">
                <NavSpan val="LINKED IN" href="https://www.linkedin.com/in/manish-dhaka-b01b1828b/" />
              </div>
            </h1>
          </div>
          <div className="link cursor-pointer text-white hover:font-[900] overflow-hidden hover:tracking-wide font-['Panchang-SemiBold'] relative ">
            <div className="bg h-full w-full absolute top-0 left-0 translate-y-[120%] bg-white"></div>
            <h1 className="overflow-hidden relative">
              <div className="relative translate-y-full link-content">
                <NavSpan val="YOU TUBE" href="https://www.youtube.com/@manishfe" />
              </div>
            </h1>
          </div>
          <div className="link cursor-pointer text-white hover:font-[900] overflow-hidden hover:tracking-wide font-['Panchang-SemiBold'] relative ">
            <div className="bg h-full w-full absolute top-0 left-0 translate-y-[120%] bg-white"></div>
            <h1 className="overflow-hidden relative">
              <div className="relative translate-y-full link-content">
                <NavSpan val="INSTAGRAM" href="https://www.instagram.com/manish__dhaka__/" />
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div
        ref={parent}
        className="loader h-full w-full fixed top-0 left-0 z-[300] pointer-events-none"
      >
        {isCount && (
          <div className="coutUp fixed h-52 w-52 z-[400] flex justify-center items-center  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <CountUp
              prefix="%"
              className="font-['Technor-SemiBold'] text-white text-[8rem]"
              onEnd={() => {
                setIsCount(false)
                setLoader(true)
              }}
              start={0}
              delay={2}
              duration={6}
              end={100}
            />
          </div>
        )}
        <div
          ref={clips}
          className="clips h-full w-full absolute top-0 left-0 pointer-events-none"
        >
          <div
            top={-100}
            left={0}
            intleft={0}
            inttop={0}
            className="clip absolute bg-zinc-900 w-1/2 h-1/2 top-0 left-0"
          ></div>
          <div
            top={150}
            left={50}
            intleft={50}
            inttop={50}
            className="clip absolute bg-zinc-900 w-1/2 h-1/2 top-1/2 left-1/2"
          ></div>
          <div
            top={50}
            left={-100}
            intleft={0}
            inttop={50}
            className="clip absolute bg-zinc-900 w-1/2 h-1/2 top-1/2 left-0"
          ></div>
          <div
            top={0}
            left={150}
            intleft={50}
            inttop={0}
            className="clip absolute bg-zinc-900 w-1/2 h-1/2 top-0 left-1/2"
          ></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
