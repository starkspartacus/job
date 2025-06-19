import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

// Fonction pour nettoyer l'URL des paramètres de redirection en boucle
function cleanCallbackUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // Si l'URL pointe vers /connexion, rediriger vers la page d'accueil
    if (urlObj.pathname === "/connexion") {
      return "/espace-candidat"
    }
    // Supprimer les paramètres qui peuvent causer des boucles
    urlObj.searchParams.delete("callbackUrl")
    urlObj.searchParams.delete("error")
    return urlObj.pathname
  } catch {
    return "/espace-candidat"
  }
}

export const authOptions: NextAuthOptions = {
  debug: true, // Activer les logs de débogage
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  pages: {
    signIn: "/connexion",
    error: "/connexion",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        phone: { label: "Téléphone", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Tentative d'authentification avec:", { 
          email: credentials?.email,
          phone: credentials?.phone,
          callbackUrl: req?.body?.callbackUrl 
        })

        if (!credentials?.email && !credentials?.phone) {
          console.log("Erreur: Email ou téléphone manquant")
          throw new Error("Veuillez entrer votre email ou numéro de téléphone.")
        }
        if (!credentials?.password) {
          console.log("Erreur: Mot de passe manquant")
          throw new Error("Veuillez entrer votre mot de passe.")
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              credentials.email ? { email: credentials.email } : {},
              credentials.phone ? { phone: credentials.phone } : {},
            ],
          },
          select: {
            id: true,
            email: true,
            phone: true,
            role: true,
            hashedPassword: true,
            candidateProfile: true,
            employerProfile: true,
          },
        })

        console.log("Utilisateur trouvé:", user ? "Oui" : "Non")

        if (!user || !user.hashedPassword) {
          console.log("Erreur: Utilisateur non trouvé ou mot de passe non défini")
          throw new Error("Identifiants incorrects.")
        }

        const isPasswordValid = await compare(credentials.password, user.hashedPassword)
        console.log("Mot de passe valide:", isPasswordValid)

        if (!isPasswordValid) {
          console.log("Erreur: Mot de passe invalide")
          throw new Error("Identifiants incorrects.")
        }

        console.log("Authentification réussie pour l'utilisateur:", user.id)

        return {
          id: user.id,
          email: user.email,
          phone: user.phone,
          role: user.role,
          candidateProfile: user.candidateProfile,
          employerProfile: user.employerProfile,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: JWT, user: any, trigger?: string, session?: any }) {
      console.log("Callback JWT:", { token, user, trigger })
      if (user) {
        token.id = user.id
        token.role = user.role
        token.candidateProfile = user.candidateProfile
        token.employerProfile = user.employerProfile
      }
      // Si la session est mise à jour
      if (trigger === "update" && session) {
        return { ...token, ...session.user }
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      console.log("Callback Session:", { session, token })
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.candidateProfile = token.candidateProfile
        session.user.employerProfile = token.employerProfile
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log("Callback Redirect:", { url, baseUrl })
      
      // Si l'URL est relative ("/path")
      if (url.startsWith("/")) {
        return `${baseUrl}${cleanCallbackUrl(url)}`
      }
      
      // Si l'URL est absolue et sur le même domaine
      if (url.startsWith(baseUrl)) {
        return cleanCallbackUrl(url)
      }
      
      // Par défaut, rediriger vers l'espace candidat
      return `${baseUrl}/espace-candidat`
    }
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
