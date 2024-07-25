import React from 'react'
import {cn} from '../utils/index'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import useWindow from '../hooks/useWindow'
import { useGSAP } from '@gsap/react'

const Heading = ({value,tl,isLoading,mr}) => {
    const style = {
        fontFamily:'Technor-Semibold'
    }
    const {height,width} = useWindow()
    useGSAP(() => {
        if (!isLoading) {
            gsap.to('.text-heading-h1 span',{
                y:0,
                duration:1,
                stagger:0.03
            })
        }
    },[isLoading])
  return (
    <>
    <div style={style} className={cn('text-parent h-[20rem] relative flex justify-start text-white duration-300',width < 550 ? 'flex-col -translate-y-20' : 'flex-row')}>
    {
        value.split(' ').map((word,wi) => {
            return <div key={wi} className='flex text-heading-h1 h-fit overflow-hidden'>
                {
                    word.split('').map((e,i) => {
                        return <span initial={{y:'100%'}} animate={{y:0}} transition={{delay:1 + i * .06}} 
                                className={cn('md:text-[10rem] md:leading-[7rem] relative translate-y-full text-[6rem] leading-[6rem]',(i == mr.which - 1  && `mr-[${mr.value}]`))} key={i}>{e}</span>
                    })
                }
            </div>
            })
    }
    </div>
    </>
  )
}

export default Heading