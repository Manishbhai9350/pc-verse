import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../utils'
import SoundBar from './SoundBar'

const Switch = ({active = true,setActive = () => null}) => {
  const soundRef = useRef(null)
  useEffect(() => {
    if (active) {
      soundRef.current.play()
    }else {
      soundRef.current.pause()
    }
  }, [active])
  
  return (
   <>
      <audio loop ref={soundRef} src="/sounds/amnient.mp3"></audio>
      <div onClick={e => setActive(e)} className={cn('w-[80px] h-[32px]  rounded-full relative duration-[1s]',!active ? 'bg-black/10' : 'bg-black/90')}>
          <div className={cn('dot absolute top-1/2 -translate-y-1/2 h-[85%] aspect-square rounded-full duration-[1s]',!active ? 'bg-black/90 left-1' : 'bg-white left-[61%]')}></div>
      </div>
   </>
  )
}

export default Switch