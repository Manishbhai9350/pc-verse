import React from "react";
import useWindow from "../hooks/useWindow";
import { cn } from "../utils";

const NavSpan = ({val,href}) => {

    const {width,height} = useWindow()

  return (
    <a target="_blank" className={cn('text-white/80 hover:text-black duration-300 text-[2rem] lg:text-[5rem] md:text-[4rem] sm:text-[3rem]')} href={href}>
      {val.split((e, i) => {
        return <span className="inline-block relative translate-y-full" key={i}>{e}</span>;
      })}
    </a>
  );
};

export default NavSpan;
