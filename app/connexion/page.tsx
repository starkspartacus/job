"use client"

import type React from "react" // Assurez-vous que React est importé

import { useState, useEffect } from "react" // useEffect importé
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { useRouter, useSearchParams } from "next/navigation" // useSearchParams importé
import { toast } from "@/hooks/use-toast"
import { signIn, useSession } from "next-auth/react"

export default function ConnexionPage() {
  const router = useRouter()
  const searchParams = useSearchParams() // Pour obtenir le callbackUrl
  const { data: session, status } = useSession()

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role) {
        const targetDashboard = session.user.role === "employer" ? "/espace-recruteur" : "/espace-candidat"
        // Vérifier s'il y a un callbackUrl valide et sûr
        const callbackUrl = searchParams?.get("callbackUrl")
        let redirectTo = targetDashboard // Par défaut, le tableau de bord basé sur le rôle

        if (callbackUrl) {
          try {
            const callbackUrlObj = new URL(callbackUrl, window.location.origin)
            // Assurer que le callbackUrl est sur le même domaine et n'est pas une page d'auth
            if (
              callbackUrlObj.origin === window.location.origin &&
              !callbackUrlObj.pathname.startsWith("/connexion") &&
              !callbackUrlObj.pathname.startsWith("/inscription")
            ) {
              redirectTo = callbackUrlObj.pathname + callbackUrlObj.search + callbackUrlObj.hash
            }
          } catch (e) {
            console.warn("Invalid callbackUrl:", callbackUrl)
            // Si callbackUrl est invalide, on garde redirectTo = targetDashboard
          }
        }

        console.log(`ConnexionPage: Authenticated (role: ${session.user.role}). Redirecting to: ${redirectTo}`)
        router.push(redirectTo)
      } else {
        // Le rôle n'est pas encore dans la session, ou utilisateur sans rôle défini.
        // Rediriger vers la page d'accueil peut être une option sûre.
        console.warn("ConnexionPage: Authenticated, but role is missing in session. Redirecting to /")
        router.push("/")
      }
    }
  }, [status, session, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false, // Important: la redirection est gérée par le useEffect
        email: loginMethod === "email" ? email : undefined,
        phone: loginMethod === "phone" ? phone : undefined,
        password: password,
        // callbackUrl: searchParams?.get("callbackUrl") || undefined // NextAuth le gère automatiquement
      })

      if (result?.error) {
        // L'erreur est souvent un message générique comme "CredentialsSignin"
        // Il est préférable d'afficher un message personnalisé.
        const errorMessage =
          result.error === "CredentialsSignin"
            ? "Email/téléphone ou mot de passe incorrect."
            : "Une erreur de connexion est survenue."
        setError(errorMessage)
        toast({
          title: "Erreur de connexion",
          description: errorMessage,
          variant: "destructive",
        })
      } else if (result?.ok) {
        // La connexion a réussi, le useEffect se chargera de la redirection
        // Afficher un toast de succès peut être redondant si la redirection est rapide
        toast({
          title: "Connexion réussie !",
          description: "Vous allez être redirigé.",
          variant: "default",
        })
        // Le useEffect s'occupera de la redirection basée sur le statut et la session
      } else {
        // Cas où result est null ou n'a pas de propriété error/ok (ne devrait pas arriver avec credentials)
        setError("Une erreur inattendue est survenue lors de la connexion.")
        toast({
          title: "Erreur inattendue",
          description: "La réponse de la connexion était inattendue.",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Login error (catch block):", err)
      setError("Une erreur inattendue est survenue. Veuillez réessayer.")
      toast({
        title: "Erreur inattendue",
        description: "Une erreur est survenue lors de la tentative de connexion.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Si l'utilisateur est déjà authentifié et que le statut est en cours de chargement,
  // ou si la redirection est sur le point de se produire, afficher un loader.
  if (status === "loading" || (status === "authenticated" && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Chargement de la session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">Connexion</CardTitle>
          <CardDescription className="text-blue-100 text-center">
            Connectez-vous à votre compte AfricaJobs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center mb-6 space-x-2 sm:space-x-4">
            <Button
              variant={loginMethod === "email" ? "default" : "outline"}
              onClick={() => setLoginMethod("email")}
              className={`flex-1 ${loginMethod === "email" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`}
            >
              Par Email
            </Button>
            <Button
              variant={loginMethod === "phone" ? "default" : "outline"}
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 ${loginMethod === "phone" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`}
            >
              Par Téléphone
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
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
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
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion...
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
    </div>
  )
}
