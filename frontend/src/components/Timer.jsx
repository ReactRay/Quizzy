import { useEffect } from "react"

function Timer({ dispatch, secondsRemaining }) {
    useEffect(() => {
        const time = setInterval(() => {
            dispatch({ type: 'tick' })
        }, 1000)

        return () => {
            clearInterval(time)
        }
    }, [dispatch])

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    return (
        <div className="timer">
            {`${minutes}:${seconds.toString().padStart(2, '0')}`}
        </div>
    )
}

export default Timer
