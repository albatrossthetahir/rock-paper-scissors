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

export default function RockPaperScissors() {


  return (
    <div className="min-h-screen bg-[#0a0e25] text-white">
    
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
