import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma" // Importez votre client Prisma
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        phone: { label: "Téléphone", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.phone) {
          throw new Error("Veuillez entrer votre email ou numéro de téléphone.")
        }
        if (!credentials?.password) {
          throw new Error("Veuillez entrer votre mot de passe.")
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              credentials.email ? { email: credentials.email } : {},
              credentials.phone ? { phone: credentials.phone } : {},
            ],
          },
        })

        if (!user || !user.hashedPassword) {
          throw new Error("Identifiants invalides.")
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!isValidPassword) {
          throw new Error("Mot de passe incorrect.")
        }

        // Return user object, NextAuth will automatically handle session creation
        return {
          id: user.id,
          email: user.email,
          role: user.role, // Make sure 'role' is part of your User model
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role // Add user role to the JWT
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string // Add user role to the session
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/connexion", // Redirige les utilisateurs non authentifiés ici
    error: "/connexion", // Pages d'erreur personnalisées pour l'authentification
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
