import { useEffect } from "react";
// @ts-ignore
import useSound from 'use-sound';

import { useToogle } from "shared/lib/toggle";
import soudBg from '../assets/sound.mp3'


export const useMusic = () => {
    const [play, {pause}] = useSound(soudBg);

    const [isPlay, setPlay] = useToogle(true);

    useEffect(() => {
        if(isPlay) {
            play()
        } else {
            pause()
        }

        const interval = setInterval(() => {
            if(isPlay && play) {
                play()
            }
        }, 226 * 1000)
      
        return () => clearInterval(interval)
    }, [isPlay, play, pause])

    return{
        isPlay,
        setPlay,
    }
}