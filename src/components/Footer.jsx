import { useMotionValueEvent, useScroll } from 'framer-motion'
import React, { useRef } from 'react'
import { cn } from '../utils'
import gsap from 'gsap'

const Footer = () => {
    const footer = useRef(null)
    const h1Ref = useRef(null)

    const {scrollYProgress} = useScroll({
        target:footer,
        offset:['start end','start start']
    })

    useMotionValueEvent(scrollYProgress,'change',latest => {
        // console.log(latest)
        const spans = h1Ref.current.querySelectorAll('.text-span')
        if (latest > .6) {
            gsap.to(spans,{
                y:0,
                duration:.4,
                ease:'none',
                stagger:0.05
            })
        } if(latest < .2) {
            gsap.set(spans,{
                y:'120%',
                ease:'none',
            })
        }
    })
    // https://www.instagram.com/manish__dhaka__/
    const tags = [
        {
            name:'Instagram',
            link:'https://www.instagram.com/manish__dhaka__/'
        },
        {
            name: 'LinkedIN',
            link:'https://www.linkedin.com/in/manish-dhaka-b01b1828b/'
        },
    ]
  return (
    <footer ref={footer} className='h-screen w-full flex flex-col justify-end items-center z-[210] relative bg-zinc-800 '>
        <div className="text w-full border-y border-white h-fit">
            <h1 ref={h1Ref} className='font-["Technor-Variable"] overflow-hidden font-semibold h-fit text-white  text-[4rem] sm:text-[9rem] lg:text-[14rem]  w-full text-center'>
                {
                    'PC VERSE'.split('').map((t,i)=> {
                        return (<span key={i} className={cn('text-span translate-y-full inline-block relative',i == 1 && 'mr-5')}>{t}</span>)
                    })
                }
            </h1>
        </div>
        <div className="bottom flex justify-between items-center sm:px-24 h-20 w-full">
            <p className="text-[15px] relative inline-block text-white px-4 font-['General-Light'] hover:text-white/80">copyright@2024</p>
            {
                tags.map((tag, index) => (
                    <a key={index} target='_blank' href={tag.link} className="text-[15px] relative inline-block text-white px-4 font-['General-Light'] hover:text-white/80">{tag.name}</a>
                ))
            }
        </div>
    </footer>
  )
}

export default Footer