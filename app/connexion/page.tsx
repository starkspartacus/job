"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

// Confetti component (Magic UI, à placer en bas du fichier ou dans un fichier séparé si besoin)
function Confetti() {
  // Copié/adapté de https://magicui.design/docs (exemple simplifié)
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Ici, insère le code SVG ou canvas du confetti Magic UI, ou adapte le snippet officiel */}
      {/* Exemple d'effet simple, à remplacer par le vrai code Magic UI */}
      <div className="absolute inset-0 animate-confetti bg-[radial-gradient(circle,rgba(255,200,0,0.3)_0%,rgba(255,255,255,0)_70%)]" />
    </div>
  )
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(result.error)
        setIsLoading(false)
        return
      }

      // Connexion réussie
      setShowConfetti(true)
      toast.success("Connexion réussie !")
      
      // Attendre un peu pour montrer l'animation de succès
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Rediriger vers l'espace candidat
      router.push("/espace-candidat")
      router.refresh()

    } catch (error) {
      console.error("Erreur de connexion:", error)
      toast.error("Une erreur est survenue lors de la connexion")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre espace personnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <PhoneInput
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                placeholder="Entrez votre numéro"
                required={false}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/inscription" className="text-orange-600 hover:underline">
              Pas encore inscrit ? Créez un compte
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
