import { useEffect, useState } from "react"


const useMouse = () => {
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    const [target, setTarget] = useState(null)
    useEffect(() => {
        
        const handleMouseMove = e => {
            console.log(e)
            setX(e.clientX)
            setY(e.clientY)
            setTarget(e.target)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])
    return {X,Y,target}
}

export default useMouse