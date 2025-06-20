import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import NextAuth, { type NextAuthOptions, type User as NextAuthUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
// Importer les types directement de Prisma Client
import type { CandidateProfile, EmployerProfile, Role } from "@prisma/client"

// Déclarer les modules pour étendre les types de NextAuth
declare module "next-auth" {
  interface User {
    // Ajouter les champs personnalisés à l'interface User de NextAuth
    role?: Role
    phone?: string | null
    candidateProfile?: CandidateProfile | null
    employerProfile?: EmployerProfile | null
  }

  interface Session {
    user?: User & {
      // Assurez-vous que id est toujours présent et que les autres champs sont là
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
    // Ajouter les champs personnalisés à l'interface JWT
    id?: string
    role?: Role
    phone?: string | null
    candidateProfile?: CandidateProfile | null
    employerProfile?: EmployerProfile | null
  }
}

function determineSafeRedirectPath(callbackUrlFromAuth: string, baseUrl: string): string {
  const defaultRedirectPath = "/"

  try {
    const fullCallbackUrl = callbackUrlFromAuth.startsWith("/")
      ? `${baseUrl}${callbackUrlFromAuth}`
      : callbackUrlFromAuth

    const parsedUrl = new URL(fullCallbackUrl)

    if (parsedUrl.origin === new URL(baseUrl).origin) {
      const path = parsedUrl.pathname
      if (path.startsWith("/connexion") || path.startsWith("/inscription") || path.startsWith("/api/")) {
        return defaultRedirectPath
      }
      return path
    }
  } catch (e) {
    console.warn("Failed to parse callbackUrlFromAuth:", callbackUrlFromAuth, e)
  }
  return defaultRedirectPath
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
        // Utiliser NextAuthUser ici
        if (!credentials?.email && !credentials?.phone) {
          throw new Error("Veuillez entrer votre email ou numéro de téléphone.")
        }
        if (!credentials?.password) {
          throw new Error("Veuillez entrer votre mot de passe.")
        }

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

        if (!userFromDb || !userFromDb.hashedPassword) {
          throw new Error("Identifiants incorrects.")
        }

        const isPasswordValid = await compare(credentials.password, userFromDb.hashedPassword)

        if (!isPasswordValid) {
          throw new Error("Identifiants incorrects.")
        }

        const name =
          userFromDb.candidateProfile?.firstName || userFromDb.employerProfile?.companyName || userFromDb.email
        const image = userFromDb.candidateProfile?.avatar || userFromDb.employerProfile?.companyLogo || userFromDb.image

        // Retourner un objet qui correspond à l'interface User de NextAuth, avec nos champs personnalisés
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
      // 'user' est de type NextAuthUser (qui inclut nos champs personnalisés grâce à declare module)
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name
        token.picture = user.image // NextAuth utilise 'picture' pour l'image dans le token JWT
        token.phone = user.phone
        token.candidateProfile = user.candidateProfile
        token.employerProfile = user.employerProfile
      }
      if (trigger === "update" && session) {
        // 'session.user' est de type User (qui inclut nos champs personnalisés)
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
      // 'session.user' est de type User (qui inclut nos champs personnalisés)
      if (token && session.user) {
        session.user.id = token.id as string // id est toujours string après le jwt callback
        session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture // Mapper 'picture' du token vers 'image' de la session
        session.user.phone = token.phone
        session.user.candidateProfile = token.candidateProfile
        session.user.employerProfile = token.employerProfile
      }
      return session
    },
    async redirect({ url, baseUrl }): Promise<string> {
      console.log("AuthOptions Redirect Callback Input:", { url, baseUrl })
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
