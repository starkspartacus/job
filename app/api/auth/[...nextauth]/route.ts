import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import NextAuth, { type NextAuthOptions, type User as NextAuthUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import type { CandidateProfile, EmployerProfile, Role } from "@prisma/client"
// Pas besoin d'importer getToken ici pour le callback redirect,
// la logique sera gérée côté client ou par le middleware.

// Déclarer les modules pour étendre les types de NextAuth
declare module "next-auth" {
  interface User {
    role?: Role
    phone?: string | null
    candidateProfile?: CandidateProfile | null
    employerProfile?: EmployerProfile | null
  }

  interface Session {
    user?: User & {
      id: string
      role?: Role
      phone?: string | null
      candidateProfile?: CandidateProfile | null
      employerProfile?: EmployerProfile | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: Role
    phone?: string | null
    candidateProfile?: CandidateProfile | null
    employerProfile?: EmployerProfile | null
  }
}

// Cette fonction est principalement pour s'assurer que le callbackUrl est sûr
// et ne pointe pas vers une page d'authentification si l'utilisateur est déjà connecté.
// La redirection finale basée sur le rôle sera gérée côté client.
function determineSafeRedirectPath(callbackUrlFromAuth: string, baseUrl: string): string {
  try {
    const fullCallbackUrl = callbackUrlFromAuth.startsWith("/")
      ? `${baseUrl}${callbackUrlFromAuth}`
      : callbackUrlFromAuth

    const parsedUrl = new URL(fullCallbackUrl)

    if (parsedUrl.origin === new URL(baseUrl).origin) {
      const path = parsedUrl.pathname
      // Si le callbackUrl est une page d'authentification, rediriger vers la racine.
      // Le useEffect côté client gérera ensuite la redirection basée sur le rôle.
      if (path.startsWith("/connexion") || path.startsWith("/inscription") || path.startsWith("/api/")) {
        return "/"
      }
      return path // Sinon, utiliser le chemin sûr fourni
    }
  } catch (e) {
    console.warn("Failed to parse callbackUrlFromAuth:", callbackUrlFromAuth, e)
  }
  return "/" // Fallback vers la racine si l'analyse échoue ou l'origine ne correspond pas
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
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
      async authorize(credentials): Promise<NextAuthUser | null> {
        console.log("[DEBUG AUTH] Tentative d'autorisation avec les identifiants:", credentials)

        if (!credentials?.email && !credentials?.phone) {
          console.error("[DEBUG AUTH] Aucun email ou numéro de téléphone fourni.")
          throw new Error("Veuillez entrer votre email ou numéro de téléphone.")
        }
        if (!credentials?.password) {
          console.error("[DEBUG AUTH] Aucun mot de passe fourni.")
          throw new Error("Veuillez entrer votre mot de passe.")
        }

        const query = credentials.email ? { email: credentials.email } : { phone: credentials.phone }
        console.log("[DEBUG AUTH] Recherche de l'utilisateur avec:", query)

        const userFromDb = await prisma.user.findFirst({
          where: {
            OR: [
              credentials.email ? { email: credentials.email } : {},
              credentials.phone ? { phone: credentials.phone } : {},
            ],
          },
          include: {
            candidateProfile: true,
            employerProfile: true,
          },
        })

        if (!userFromDb) {
          console.error("[DEBUG AUTH] Utilisateur non trouvé pour la requête:", query)
          throw new Error("Identifiants incorrects.")
        }

        if (!userFromDb.hashedPassword) {
          console.error("[DEBUG AUTH] Utilisateur trouvé mais sans mot de passe haché:", userFromDb.email)
          throw new Error("Identifiants incorrects.")
        }

        console.log("[DEBUG AUTH] Utilisateur trouvé:", userFromDb.email)
        console.log("[DEBUG AUTH] Comparaison du mot de passe...")
        const isPasswordValid = await compare(credentials.password, userFromDb.hashedPassword)

        if (!isPasswordValid) {
          console.error("[DEBUG AUTH] La comparaison du mot de passe a échoué pour l'utilisateur:", userFromDb.email)
          throw new Error("Identifiants incorrects.")
        }

        console.log("[DEBUG AUTH] Mot de passe valide. Utilisateur autorisé:", userFromDb.email)
        const name =
          userFromDb.candidateProfile?.firstName || userFromDb.employerProfile?.companyName || userFromDb.email
        const image = userFromDb.candidateProfile?.avatar || userFromDb.employerProfile?.companyLogo || userFromDb.image

        return {
          id: userFromDb.id,
          email: userFromDb.email,
          name: name,
          image: image,
          role: userFromDb.role,
          phone: userFromDb.phone,
          candidateProfile: userFromDb.candidateProfile,
          employerProfile: userFromDb.employerProfile,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name
        token.picture = user.image
        token.phone = user.phone
        token.candidateProfile = user.candidateProfile
        token.employerProfile = user.employerProfile
      }
      if (trigger === "update" && session) {
        if (session.user) {
          token.role = session.user.role
          token.phone = session.user.phone
          token.name = session.user.name
          token.email = session.user.email
          token.picture = session.user.image
          token.candidateProfile = session.user.candidateProfile
          token.employerProfile = session.user.employerProfile
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.phone = token.phone
        session.user.candidateProfile = token.candidateProfile
        session.user.employerProfile = token.employerProfile
      }
      return session
    },
    async redirect({ url, baseUrl }): Promise<string> {
      console.log("AuthOptions Redirect Callback Input:", { url, baseUrl })
      // Utilise la logique de chemin de redirection sûr.
      // Le useEffect côté client dans connexion/page.tsx gérera la redirection basée sur le rôle.
      const redirectPath = determineSafeRedirectPath(url, baseUrl)
      const finalRedirectUrl =
        `${baseUrl}${redirectPath === "/" && baseUrl.endsWith("/") ? "" : redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`}`
          .replace(/\/\//g, "/")
          .replace(/\/$/, "") || baseUrl

      console.log("AuthOptions Redirect Callback Output:", { finalRedirectUrl })
      return finalRedirectUrl
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
