"use client"

import { Button } from "@/components/ui/button"
import { Eye, MessageSquare, Send } from "lucide-react"
import Link from "next/link"

interface ActionButtonsProps {
  type: "candidate" | "job"
  id: string | number
  onContact?: () => void
  className?: string
}

export function ActionButtons({ type, id, onContact, className = "" }: ActionButtonsProps) {
  if (type === "candidate") {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <Link href={`/candidats/${id}`} className="flex-1">
          <Button
            size="sm"
            variant="outline"
            className="w-full hover:scale-105 transition-transform flex items-center justify-center group"
          >
            <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Voir profil
          </Button>
        </Link>
        <Button
          size="sm"
          onClick={onContact}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all flex items-center justify-center group"
        >
          <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Contacter
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex space-x-2 ${className}`}>
      <Link href={`/offres/${id}`} className="flex-1">
        <Button
          variant="outline"
          size="sm"
          className="w-full hover:scale-105 transition-transform flex items-center justify-center group"
        >
          <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Voir détails
        </Button>
      </Link>
      <Link href={`/offres/${id}`} className="flex-1">
        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all flex items-center justify-center group"
        >
          <Send className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Postuler
        </Button>
      </Link>
    </div>
  )
}
