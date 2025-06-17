"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { signIn, useSession } from "next-auth/react"

export default function ConnexionPage() {
  const router = useRouter()
  const { data: session, status } = useSession() // Get session status and data

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already logged in
  React.useEffect(() => {
    if (status === "authenticated") {
      router.push(session.user?.role === "employer" ? "/espace-recruteur" : "/espace-candidat")
    }
  }, [status, session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent NextAuth from redirecting automatically
        email: loginMethod === "email" ? email : undefined,
        phone: loginMethod === "phone" ? phone : undefined,
        password: password,
      })

      if (result?.error) {
        setError("Email/téléphone ou mot de passe incorrect.")
        toast({
          title: "Erreur de connexion",
          description: "Email/téléphone ou mot de passe incorrect.",
          variant: "destructive",
        })
      } else if (result?.ok) {
        toast({
          title: "Connexion réussie !",
          description: "Vous êtes connecté.",
          variant: "default",
        })
        // Redirection handled by useEffect based on session status
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Une erreur inattendue est survenue. Veuillez réessayer.")
      toast({
        title: "Erreur inattendue",
        description: "Une erreur est survenue lors de la connexion. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {status === "loading" ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p>Chargement...</p>
        </div>
      ) : (
        <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
            <CardTitle className="text-3xl font-bold text-center">Connexion</CardTitle>
            <CardDescription className="text-blue-100 text-center">
              Connectez-vous à votre compte AfricaJobs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center mb-6 space-x-4">
              <Button
                variant={loginMethod === "email" ? "default" : "outline"}
                onClick={() => setLoginMethod("email")}
                className={loginMethod === "email" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Connexion par Email
              </Button>
              <Button
                variant={loginMethod === "phone" ? "default" : "outline"}
                onClick={() => setLoginMethod("phone")}
                className={loginMethod === "phone" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Connexion par Téléphone
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {loginMethod === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <PhoneInput value={phone} onChange={setPhone} required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Pas encore de compte ?{" "}
              <Link href="/inscription" className="text-blue-600 hover:underline font-medium">
                S'inscrire
              </Link>
            </div>
            <div className="text-center text-sm mt-2">
              <Link href="#" className="text-gray-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
