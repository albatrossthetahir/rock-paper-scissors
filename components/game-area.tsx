"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Shield, ScissorsIcon } from "lucide-react"
import RockImage from "@/components/rock-image"
import PaperImage from "@/components/paper-image"
import ScissorsImage from "@/components/scissors-image"
import { useSound } from "@/components/sound-effects"
import { useMediaQuery } from "@/hooks/use-media-query"

type Choice = "rock" | "paper" | "scissors" | null
type GameState = "choosing" | "result" | "waiting"
type Result = "win" | "lose" | "draw" | null

export default function GameArea() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null)
  const [opponentChoice, setOpponentChoice] = useState<Choice>(null)
  const [gameState, setGameState] = useState<GameState>("choosing")
  const [result, setResult] = useState<Result>(null)
  const [countdown, setCountdown] = useState(5)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { playSound } = useSound()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Reset the game
  const resetGame = () => {
    setPlayerChoice(null)
    setOpponentChoice(null)
    setGameState("choosing")
    setResult(null)
    setCountdown(5)
  }

  // Handle player choice
  const handleChoice = (choice: Choice) => {
    if (gameState !== "choosing") return

    setPlayerChoice(choice)
    setGameState("waiting")
    playSound("select")

    // Simulate opponent choosing after a delay
    setTimeout(() => {
      const choices: Choice[] = ["rock", "paper", "scissors"]
      const randomChoice = choices[Math.floor(Math.random() * choices.length)]
      setOpponentChoice(randomChoice)
      setGameState("result")

      // Determine the result
      if (choice === randomChoice) {
        setResult("draw")
        playSound("draw")
      } else if (
        (choice === "rock" && randomChoice === "scissors") ||
        (choice === "paper" && randomChoice === "rock") ||
        (choice === "scissors" && randomChoice === "paper")
      ) {
        setResult("win")
        playSound("win")
      } else {
        setResult("lose")
        playSound("lose")
      }

      // Reset after showing result
      setTimeout(resetGame, 3000)
    }, 1000)
  }

  // Handle "I feel lucky" button
  const handleFeelLucky = () => {
    if (gameState !== "choosing") return
    const choices: Choice[] = ["rock", "paper", "scissors"]
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    playSound("select")
    handleChoice(randomChoice)
  }

  // Countdown timer
  useEffect(() => {
    if (gameState === "choosing") {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Auto-select a random choice when timer runs out
            handleFeelLucky()
            return 5
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  return (
    <div className="p-3 md:p-6 relative">
      <div className="flex justify-between items-start mb-4 md:mb-8 pt-2 md:pt-4">
        <div className="text-center">
          <p className="text-blue-300 text-sm md:text-base">Computer</p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl md:text-7xl font-bold">{countdown < 10 ? `0${countdown}` : countdown} sec</h2>
          <p className="text-blue-400 mt-1 md:mt-2 text-xs md:text-base">Until the end of the choice</p>
        </div>

        <div className="text-center">
          <p className="text-blue-300 text-sm md:text-base">You</p>
        </div>
      </div>

      <div className="flex justify-between items-center my-6 md:my-16">
        <div className="w-1/3 flex justify-center">
          {opponentChoice === "rock" && <RockImage flipped />}
          {opponentChoice === "paper" && <PaperImage flipped />}
          {opponentChoice === "scissors" && <ScissorsImage flipped />}
          {opponentChoice === null && <RockImage flipped />}
        </div>

        <div className="w-1/3 flex justify-center">
          {result && (
            <div className="bg-blue-900/50 px-3 md:px-6 py-2 md:py-3 rounded-lg text-base md:text-xl font-bold">
              {result === "win" && "You Win!"}
              {result === "lose" && "You Lose!"}
              {result === "draw" && "Draw!"}
            </div>
          )}
        </div>

        <div className="w-1/3 flex justify-center">
          {playerChoice === "rock" && <RockImage />}
          {playerChoice === "paper" && <PaperImage />}
          {playerChoice === "scissors" && <ScissorsImage />}
          {playerChoice === null && <ScissorsImage />}
        </div>
      </div>

      <div className="text-center mb-4">
        {gameState === "waiting" && <p className="text-blue-400 text-sm md:text-lg">Opponent is choosing a hand...</p>}
      </div>

      <div className="flex flex-col gap-2 md:gap-3 max-w-xs mx-auto">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base py-2 md:py-4"
          onClick={() => handleChoice("scissors")}
          disabled={gameState !== "choosing"}
        >
          <ScissorsIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Scissors
        </Button>

        <Button
          className="bg-blue-900/50 hover:bg-blue-900/70 text-white text-sm md:text-base py-2 md:py-4"
          onClick={() => handleChoice("paper")}
          disabled={gameState !== "choosing"}
        >
          <span className="mr-2">📄</span>
          Paper
        </Button>

        <Button
          className="bg-blue-900/50 hover:bg-blue-900/70 text-white text-sm md:text-base py-2 md:py-4"
          onClick={() => handleChoice("rock")}
          disabled={gameState !== "choosing"}
        >
          <span className="mr-2">🪨</span>
          Rock
        </Button>

        <Button
          variant="outline"
          className="border-blue-600 text-blue-400 hover:bg-blue-900/30 text-sm md:text-base py-2 md:py-4"
          onClick={handleFeelLucky}
          disabled={gameState !== "choosing"}
        >
          I feel lucky!
        </Button>
      </div>
    </div>
  )
}
