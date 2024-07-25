import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "./App.css";
import "./fonts/technor/css/technor.css";
import "./fonts/panchang/css/panchang.css";
import "./fonts/alpino/css/alpino.css";
import "./fonts/general_sans/css/index.css";
import Nav from "./components/Nav";
import One from "./pages/One";
import gsap from "gsap";
import Mouse from "./components/Mouse";
import Two from "./pages/Two";
import Three from "./pages/Three";
import Loader from "./components/Loader";
import Four from "./pages/Four";
import Footer from "./components/Footer";
import SoundBar from "./components/SoundBar";

const App = () => {
  
  const nav = useRef(null)
  const page1 = useRef(null)
  const page2 = useRef(null)
  const page3 = useRef(null)
  const [isSwitchActive, setIsSwitchActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loader, setLoader] = useState(null)
  const afterLoadingTL = useRef(gsap.timeline())
  const [isNav, setIsNav] = useState(false)
  const {scrollYProgress:page1YPro} = useScroll({
    target:page1,
    offset:['start start','end .7']
  })

  const scale = useTransform(page1YPro,[0,1],[1,.97])
  const transformY = useTransform(page1YPro,[0,1],[0,100])
  useMotionValueEvent(scale,'change',latest => {
    gsap.to(page1.current , {
      scaleX:latest
    })
  })
  useMotionValueEvent(transformY,'change',latest => {
    const bg = page1.current.querySelector('.bg')
    gsap.to(bg, {
      y:latest,
      ease:'none'
    })
    if (latest < .5) {
      gsap.to(page1.current.querySelector('.para'),{
        opacity:1
      })
    } else {
      gsap.to(page1.current.querySelector('.para'),{
        opacity:0
      })
    }
  })

  const {scrollYProgress:page2YProg} = useScroll({
    target:page2,
    offset:['start center','start start']
  })

  useMotionValueEvent(page2YProg,'change',latest => {
    const navLinks = nav.current.querySelectorAll('.nav-link')
    const hamburger = nav.current.querySelector('.hamburger')
    if (latest > .9) {
      gsap.to(navLinks,{
        opacity:1,
        duration:.5,
        color:"black",
        '--hvr-clr':'rgba(223, 223, 223, 0.79)'
      })
      gsap.to(hamburger,{
        color:'black'
      })
    } else {
      gsap.to(hamburger,{
        color:'white'
      })
      gsap.to(navLinks,{
        opacity:.7,
        duration:.5,
        color:"white",
        '--hvr-clr':'rgba(223, 223, 223, 0.79)'
      })

    }
  })

  return (
    <main className="overflow-x-hidden ">
      <SoundBar active={isSwitchActive} setActive={setIsSwitchActive} />
      <Loader isNav={isNav} setIsNav={setIsNav} setLoader={setLoader} loader={loader} tl={afterLoadingTL.current} isLoading={isLoading} setIsLoading={setIsLoading} />
      <Mouse tl={afterLoadingTL.current} isLoading={isLoading} />
      <Nav isNav={isNav} setIsNav={setIsNav} loader={loader} setLoader={setLoader} setLoader={setLoader} tl={afterLoadingTL.current} isLoading={isLoading} ref={nav} />

      {/* pages */}
      <div className="page1 bg-white h-full w-full relative">
        <One tl={afterLoadingTL.current} isLoading={isLoading} ref={page1} />
      </div>
      <Two tl={afterLoadingTL.current} isLoading={isLoading} ref={page2}  />
      <Three setIsSwitchActive={setIsSwitchActive} isSwitchActive={isSwitchActive} tl={afterLoadingTL.current} isLoading={isLoading} ref={page3} />
      <Four />
      <Footer />
    </main>
  );
};

export default App;
