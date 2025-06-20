"use client"

import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

export function AuthDebugButton() {
  const { data: session, status } = useSession()

  // Affiche le bouton uniquement si l'utilisateur est authentifié
  if (status === "authenticated") {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={() => signOut()} variant="destructive" className="bg-red-600 text-white">
          Déconnexion (Debug)
        </Button>
      </div>
    )
  }
  return null
}
