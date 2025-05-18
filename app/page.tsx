"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  Dice1Icon as Dice,
  Trophy,
  Users,
  Gift,
  Search,
  Camera,
  Bell,
  Twitter,
  DiscIcon as Discord,
  Send,
  Facebook,
  Menu,
} from "lucide-react"
import GameArea from "@/components/game-area"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function RockPaperScissors() {
  const [balance, setBalance] = useState(233.84)
  const [tokens, setTokens] = useState(21.38)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="min-h-screen bg-[#0a0e25] text-white">
      {/* Header */}
      {/* <header className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-blue-900/30">
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Hey</span>
            <span className="text-blue-500">bets</span>
          </h1>

          {isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent border-blue-900/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div className="relative ml-6 hidden md:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search game" className="w-72 bg-blue-950/50 border-blue-900/30 pl-9 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-0 w-full md:w-auto justify-between">
          <div className="bg-blue-900/30 px-3 md:px-4 py-2 rounded-md">
            <p className="text-xs text-gray-400">Balance</p>
            <p className="font-bold text-sm md:text-base">${balance.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-1 bg-blue-900/30 px-2 md:px-3 py-2 rounded-md">
            <div className="h-4 md:h-5 w-4 md:w-5 rounded-full bg-yellow-500 flex items-center justify-center text-xs">
              ₿
            </div>
            <span className="font-bold text-sm md:text-base">${tokens.toFixed(2)}</span>
            <span className="text-gray-400">▼</span>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 bg-blue-600 border-0">
              <Camera className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 bg-transparent border-blue-900/30">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            <Avatar className="h-8 w-8 border border-blue-500">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-blue-900">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header> */}

      <div className="flex flex-col md:flex-row">
        {/* Mobile Search */}
        <div className="relative p-4 md:hidden">
          <Search className="absolute left-7 top-6.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search game" className="w-full bg-blue-950/50 border-blue-900/30 pl-9 text-gray-300" />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-2 md:p-6 pb-16 md:pb-6">
          <div className="max-w-5xl mx-auto bg-[#111a3b] rounded-xl overflow-hidden">
            <GameArea />
          </div>
        </main>
      </div>
    </div>
  )
}

function NavItem({
  icon,
  label,
  active = false,
  count,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  count?: number
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center relative ${active ? "bg-blue-900/50" : "text-gray-500"}`}
      >
        {icon}
        {count && (
          <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
            {count}
          </div>
        )}
      </div>
      <span className={`text-xs ${active ? "text-white" : "text-gray-500"}`}>{label}</span>
    </div>
  )
}

function MobileNavItem({
  icon,
  label,
  active = false,
  count,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  count?: number
}) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg ${active ? "bg-blue-900/50" : ""}`}>
      <div className="relative">
        {icon}
        {count && (
          <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {count}
          </div>
        )}
      </div>
      <span className={`text-base ${active ? "text-white" : "text-gray-500"}`}>{label}</span>
    </div>
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return <div className="w-8 h-8 rounded-lg bg-blue-900/20 flex items-center justify-center text-gray-500">{icon}</div>
}
