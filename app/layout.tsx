import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider" // Importez le AuthProvider
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin" // Importez pour UploadThing
import { extractRouterConfig } from "uploadthing/server" // Importez pour UploadThing
import { ourFileRouter } from "@/app/api/uploadthing/core" // Importez pour UploadThing

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AfricaJobs",
  description: "La plateforme de recrutement pour l'hôtellerie et la restauration en Afrique.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs from the router
           * that you provide. If you don't provide a router to this plugin, it will extract
           * your entire app's router.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider> {/* Enveloppez avec AuthProvider */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
