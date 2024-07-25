import { AlignJustify, MoveUpRight } from "lucide-react"
import { forwardRef, useEffect, useRef } from "react"
import MyArrow from "./MyArrow"
import { Squash as Hamburger } from 'hamburger-react'
import { cn } from "../utils"
import useWindow from "../hooks/useWindow"
import gsap from "gsap"

const Nav = forwardRef(
  ({tl,isLoading,setLoader,setIsNav,isNav},ref) => {
    const {height,width} = useWindow()
    const nav = useRef()
    useEffect(() => {
      if (!isLoading) {
        tl.to('.nav',{
          duration: 1.8,
          ease: 'none',
          top: 0,
        })
      }
    }, [isLoading])
    
    return (
      <nav ref={nav} style={{paddingInline:width < 550 ? '.3rem' : '4rem'}} ref={ref} className='nav -top-full'>
        <div className="nav-left nav-links">
          <a href="#" style={{'--hvr-clr':'rgba(223, 223, 223, 1)','--clr':'rgba(223, 223, 223, 0.79)'}} className={cn('nav-link', width < 900 ? 'hidden' : 'inline-block')}>PC VERSE</a>
          <a href="#" style={{'--hvr-clr':'rgba(223, 223, 223, 1)','--clr':'rgba(223, 223, 223, 0.79)'}} className={cn('nav-link', width < 900 ? 'hidden' : 'inline-block')}>Clients</a>
          <a href="#" style={{'--hvr-clr':'rgba(223, 223, 223, 1)','--clr':'rgba(223, 223, 223, 0.79)'}} className={cn('nav-link', width < 900 ? 'hidden' : 'inline-block')}>Partners</a>
        </div>
        <div className="nav-right min-w-64">
          <div style={{display:width < 500 ? 'none' : 'flex'}} className={cn('get-pc relative overflow-hidden opacity-0')}>
            <p className="z-[99] text-left w-full">GET PC</p>
            <MyArrow />
          </div>
          <div className="hamburger text-white">
          <Hamburger toggled={isNav} onToggle={() => {
              setIsNav(true)
              setLoader(false)
          }} />
          </div>
        </div>
      </nav>
    )
  }
)

export default Nav