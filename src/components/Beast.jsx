import { useEffect, useRef, useState } from 'react'
import { cn } from '../utils'
import gsap from 'gsap'
import useWindow from '../hooks/useWindow'

const Beast = ({str,img}) => {
    const bg = useRef(null)
    const text = useRef(null)
    const audioEnter = useRef(null)
    const audioLeave = useRef(null)
    
    const {width,height} = useWindow()

    const mins = [
        {
            min:[1030,9999],
            value:330
        },
        {
            min:[900,1030],
            value:260
        },
        {
            min:[750,900],
            value:200
        },
        {
            min:[600,750],
            value:210
        },
        {
            min:[340,600],
            value:320
        },
        {
            min:[0,340],
            value:240
        },
    ]

    const sectionWidth = mins.find(min => {
        return width > min.min[0] && width <= min.min[1]
    })



  return (
    <section
    style={{height:sectionWidth?.value || 0}}
    onMouseEnter={() => {
        // audioEnter.current.play()
        gsap.to(bg.current,{
            width:'98%',
            ease:'power3.out',
            duration:.5,
        })
        gsap.to(text.current,{
            color:'rgba(0,0,0.1)'
        })
    }}
    onMouseLeave={() => {
        // audioLeave.current.play()
        gsap.to(bg.current,{
            width:'90%',
            ease:'power3.out',
            duration:.5,
        })
        gsap.to(text.current,{
            color:'#111111'
        })
    }}
    className={cn('beast relative flex justify-center duration-300 items-end border border-zinc-800 aspect-square', )}>
        <audio ref={audioEnter} src='/sounds/transition2.mp3' />
        <audio ref={audioLeave} src='/sounds/transition.mp3' />
        <div ref={text} className={cn(`text pointer-events-none absolute left-1/2 -top-1 -translate-x-1/2 font-['Technor-Regular'] text-[#222222] text-[2rem] `,width < 500 ? "" : 'mix-blend-difference' )}>{str}</div>
        <div ref={bg} className={cn('img pointer-events-none aspect-square',width < 500 ? 'w-full' : 'w-[90%]')}>
            <img src={img} className='h-full w-full object-cover'/>
        </div>
    </section>
  )
}

export default Beast