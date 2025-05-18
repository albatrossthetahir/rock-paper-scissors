"use client"

import { useEffect, useRef } from "react"

type SoundType = "select" | "win" | "lose" | "draw"

const soundFiles = {
  select: "/sounds/select.mp3",
  win: "/sounds/win.mp3",
  lose: "/sounds/lose.mp3",
  draw: "/sounds/draw.mp3",
}

export function useSound() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    select: null,
    win: null,
    lose: null,
    draw: null,
  })

  useEffect(() => {
    // Initialize audio elements
    Object.entries(soundFiles).forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.preload = "auto"
      audioRefs.current[key as SoundType] = audio
    })

    // Cleanup function
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.src = ""
        }
      })
    }
  }, [])

  const playSound = (type: SoundType) => {
    const audio = audioRefs.current[type]
    if (audio) {
      // Reset the audio to the beginning if it's already playing
      audio.pause()
      audio.currentTime = 0

      // Play the sound
      audio.play().catch((error) => {
        // Handle any errors (e.g., if the browser blocks autoplay)
        console.error("Error playing sound:", error)
      })
    }
  }

  return { playSound }
}

export default function SoundEffects() {
  return null // This component doesn't render anything
}
