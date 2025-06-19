import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

// Fonction pour nettoyer l'URL des paramètres de redirection en boucle
function cleanUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // Supprimer les paramètres qui peuvent causer des boucles
    urlObj.searchParams.delete("callbackUrl")
    urlObj.searchParams.delete("error")
    return urlObj.pathname
  } catch {
    return url
  }
}

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/connexion") || 
                      req.nextUrl.pathname.startsWith("/inscription")

    // Ne pas rediriger les requêtes API
    if (req.nextUrl.pathname.startsWith("/api")) {
      return null
    }

    // Si l'utilisateur est sur une page d'auth et est authentifié
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/espace-candidat", req.url))
    }

    // Si l'utilisateur n'est pas sur une page d'auth et n'est pas authentifié
    if (!isAuthPage && !isAuth && !req.nextUrl.pathname.startsWith("/api/auth")) {
      const from = cleanUrl(req.nextUrl.pathname)
      const redirectUrl = new URL("/connexion", req.url)
      if (from !== "/connexion") {
        redirectUrl.searchParams.set("callbackUrl", from)
      }
      return NextResponse.redirect(redirectUrl)
    }

    return null
  },
  {
    callbacks: {
      authorized: ({ token }) => true // On laisse le middleware gérer l'autorisation
    },
  }
)

// Configurer les chemins qui nécessitent une authentification
export const config = {
  matcher: [
    "/espace-candidat/:path*",
    "/espace-recruteur/:path*",
    "/connexion",
    "/inscription",
  ],
} 