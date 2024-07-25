import { cn } from "../utils"

const MySlide = ({part}) => {
  return (
    <div className='h-full  flex flex-col justify-start items-start flex-shrink-0 min-w-[270px]'>
        <div className="top flex justify-start items-center w-full">
            <div className="text w-full h-14 bg-zinc-600/40 flex  justify-between">
                <div className="img  flex px-2 justify-center items-center">
                    <img src={part.img} className="object-cover w-full h-full" alt="" />
                </div>
                <h1 className="leading-[3.4rem] text-[1.7rem] font-['General-SemiBold'] uppercase text-nowrap pr-5 ">{part.name}</h1>
            </div>
        </div>
        <div className="bottom w-full p-2 flex-1">
            <p className="text-[.8rem]">{part.brief}</p>
        </div>
    </div>
  )
}

export default MySlide