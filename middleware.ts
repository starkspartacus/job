import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Fonction pour nettoyer l'URL des paramètres de redirection en boucle
function cleanUrlPath(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname // Retourne seulement le chemin, sans query params
  } catch {
    if (url.startsWith("/")) return url
    return "/" // Fallback sûr
  }
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isAuth = !!token
  const { pathname } = req.nextUrl

  console.log(`[DEBUG MIDDLEWARE] Path: ${pathname}, Authenticated: ${isAuth}`)

  // Exclure les routes API générales (sauf /api/auth) du traitement du middleware
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
    console.log("[DEBUG MIDDLEWARE] API route, skipping.")
    return NextResponse.next()
  }

  const isAuthPage = pathname.startsWith("/connexion") || pathname.startsWith("/inscription")

  // Si l'utilisateur est sur une page d'authentification et est déjà authentifié
  if (isAuthPage && isAuth) {
    console.log("[DEBUG MIDDLEWARE] Authenticated user on auth page, redirecting to /")
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Pages protégées nécessitant une authentification
  const protectedPaths = ["/espace-candidat", "/espace-recruteur"]
  if (protectedPaths.some((p) => pathname.startsWith(p)) && !isAuth) {
    console.log("[DEBUG MIDDLEWARE] Unauthenticated user on protected page, redirecting to /connexion")
    const callbackUrl = cleanUrlPath(req.url)
    const redirectUrl = new URL("/connexion", req.url)
    // Éviter d'ajouter callbackUrl si c'est déjà une page d'auth ou la racine (pour éviter des boucles ou redirections inutiles)
    if (callbackUrl !== "/connexion" && callbackUrl !== "/inscription" && callbackUrl !== "/") {
      redirectUrl.searchParams.set("callbackUrl", callbackUrl)
    }
    return NextResponse.redirect(redirectUrl)
  }

  console.log("[DEBUG MIDDLEWARE] Allowing access.")
  return NextResponse.next()
}

// Configurer les chemins sur lesquels le middleware s'exécutera
export const config = {
  matcher: [
    /*
     * Appliquer le middleware à tous les chemins sauf ceux qui commencent par:
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (fichier favicon)
     * - images/ (dossier public/images)
     * - placeholder.svg (placeholder images)
     * Les routes API générales (sauf /api/auth) sont exclues au début de la fonction middleware.
     */
    "/((?!_next/static|_next/image|favicon.ico|images|placeholder.svg).*)",
  ],
}
