import gsap from "gsap";
import { useEffect, useRef } from "react";
const Mouse = () => {
    const mouse = useRef(null)
  useEffect(() => {
    const handleMouseMove = (e) => {
        gsap.to(mouse.current,{
            x: e.clientX ,
            y: e.clientY ,
        })
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div ref={mouse} className="mouse z-[99] flex justify-center items-center pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 top-0 left-0 w-5 h-5 bg-gray-300 rounded-full"></div>
  );
};

export default Mouse;
