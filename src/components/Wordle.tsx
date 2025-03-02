import clsx from "clsx"
import { useRef } from "react"
import formatDate from "../scripts/formatDate"

const brainrotSounds = [
  new Audio("sfx/brain-rot-7000.mp3"),
  new Audio("sfx/calk-tuah.mp3"),
  new Audio("sfx/get-out-memes.mp3"),
  new Audio("sfx/gyyaaaaat.mp3"),
  new Audio("sfx/how-are-your-balls.mp3"),
  new Audio("sfx/what-help-me.mp3"),
]

function playSoundWithRef(soundRef: React.RefObject<HTMLAudioElement | null>, sound: HTMLAudioElement) {
  // stop currently referenced sound and restart it
  if (soundRef.current) {
    soundRef.current.pause();
  }

  // replace reference for sound at the picked index, and play it!
  soundRef.current = sound
  soundRef.current.play()
}

interface WordleTileProps {
  color: string
}

export function WordleTile({ color }: WordleTileProps) {
  const styles = clsx(
    "w-[20%]",
    "h-[15%]",
    "aspect-[1/1]",
    "rounded-[4px]",
    "scale-[90%]",

    "transition-all duration-[0.12s]",
    "hover:cursor-pointer",
    "hover:relative",
    "hover:shadow-[0px_0px_30px_rgba(244,131,190,1)]",
    "hover:z-[999]",
    "transform hover:scale-[115%]",

    "transform active:scale-[100%]",
  )

  // play sounds when clicking tiles 

  // NOTE: refs are react pointers
  // they can hold direct refs to dom items/instances of stuff for direct mutation!
  // here we are using refs to the objects in our array to interact with them
  const soundRef = useRef<HTMLAudioElement | null>(null);

  // grab an index, ts doesn't have a randint function for some dumbfuck reason
  const randomBrainrotIndex = Math.floor(Math.random() * brainrotSounds.length)

  // call play function
  const playBrainrot = () => {
    playSoundWithRef(soundRef, brainrotSounds[randomBrainrotIndex])
  }

  return (
    <button className={styles} style={{ backgroundColor: color }} onClick={playBrainrot} />
  )
}

interface WordleProps {
  tiles?: React.ReactNode // use reactnode for child
  number: number
  tries: number
  date: string
}

export default function Wordle({ tiles, number, tries, date }: WordleProps) {
  const container = clsx(
    "w-[200px]",
    "aspect-[1/1]",

    "bg-[#101415]",
    "pt-[12.5px]",
    "pb-[15px]",

    "rounded-[30px]",

    "shadow-[0px_0px_30px_rgba(0,0,0,0.6)]",

    "hover:shadow-[0px_0px_30px_rgba(255,255,255,1)]",
  )

  const boldText = clsx(
    "text-white",
    "text-[20px]",

    "font-funnel",
    "font-bold",

    "flex",
    "items-center",
    "justify-center"
  )

  const tileContainer = clsx(
    "m-[5%]",
  )

  const dimText = clsx(
    "font-funnel",
    "text-gray-500",
    "text-[12px]",

    "flex",
    "items-center",
    "justify-center"
  )

  const smallText = clsx(
    "font-funnel",
    "text-white",
    "text-[12px]",

    "flex",
    "items-center",
    "justify-center"
  )

  const jumpIn = clsx(
    "animate-jump-in",
    "animate-once",
    "animate-ease-out",
  )

  const hoverDance = clsx(
    "hover:animate-wiggle",
    "hover:animate-infinite",
    "hover:animate-ease-in-out",
    "hover:animate-ease-in",
  )

  return (
    <div className={jumpIn}>
      <div className={`${container} ${hoverDance}`}>
        <span className={boldText}>{number.toLocaleString()}</span>
        <div className={tileContainer}>
          {tiles}
        </div>
        <span className={smallText}>{`${tries}/6`}</span>
        <span className={dimText}>{formatDate(date)}</span>
      </div>
    </div>
  )
}
