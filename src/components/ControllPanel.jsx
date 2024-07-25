import React, { useEffect, useState } from 'react'
import { cn } from '../utils'
import Switch from './Switch'
import useWindow from '../hooks/useWindow'
import SoundBar from './SoundBar'

const ControllPanel = ({currentColor,changeColor,speed,changeSpeed,alertIt,isSwitchActive,setIsSwitchActive}) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFF2"]
    const speeds = [1,2,3]
    const [isFanPlaying, setIsFanPlaying] = useState(false)
    const {width} = useWindow()
    
  return (
    <div className={cn('conroll-panel sm:pl-10 flex flex-col justify-center items-start lg:w-[415px] sm:w-[300px]  h-1/2 absolute top-[40%] -translate-y-1/2 right-0',width < 800 && 'w-[150px] items-center')}> 
        <div className="colors w-full pl-6 h-20 flex flex-col items-end sm:items-start justify-evenly">
          <p className="text-[1.3rem] font-['Technor-Variable'] hidden sm:flex text-black/80 gap-1">
            <span className={cn('px-1 rounded-md duration-300',!isFanPlaying ? 'bg-black/30' : 'bg-transparent')}>OFF</span>
            <span>/</span>
            <span className={cn('px-1 rounded-md duration-300',isFanPlaying ? 'bg-black/30' : 'bg-transparent')}>ON</span>
          </p>
          <div className="switch  rotate-[90deg] sm:rotate-0 ">
            <Switch active={isFanPlaying} setActive={() => {
              setIsFanPlaying(prev => {
                if (prev == false) {
                  changeSpeed(1)
                  setIsSwitchActive(true)
                  return true
                } else {
                  changeSpeed(0)
                  setIsSwitchActive(false)
                  return false
                }
              })
            }} />
          </div>
        </div>
        <div className="colors w-full pl-6 h-20 flex flex-col justify-evenly items-start">
          <p className="text-[1.3rem] font-['Technor-Variable'] text-black/80 hidden sm:inline-block">FAN SPEED</p>
          <div className="colors-panel mt-4 flex-1 w-full flex flex-col sm:flex-row justify-start items-end pr-5  sm:pr-0 sm:items-center gap-6">
            {
                speeds.map((s,i) => {
                    return<div key={i} onClick={() => {
                      if (isFanPlaying) {
                        changeSpeed(s)
                      } else {
                        alertIt('Turn Fan ON First')
                      }
                    }} className={cn('user-select-none speed-box flex justify-center items-center text-3xl  h-[40px] border aspect-square duration-500',s == speed ? 'border-zinc-900 text-zinc-900' : 'border-zinc-400 text-zinc-400' )}  >
                    <span>{s}</span>
                  </div>
                })
            }
          </div>
        </div>
      </div>
  )
}

export default ControllPanel





