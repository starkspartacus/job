import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route" // Ajustez le chemin
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit3, LogOut, Settings, UserCircle, Briefcase, Star, BookOpen } from "lucide-react"
import { SkillList } from "@/components/espace-candidat/SkillList"
import { ExperienceList } from "@/components/espace-candidat/ExperienceList"
import { getCandidateProfileWithDetails } from "@/app/actions/candidates" // Nouvelle action
import { revalidatePath } from "next/cache" // Pour le refresh manuel

// Fonction de rafraîchissement à passer aux listes
async function refreshCandidateData() {
  "use server"
  revalidatePath("/espace-candidat")
}

export default async function EspaceCandidatPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || session.user.role !== "CANDIDATE") {
    redirect("/connexion?callbackUrl=/espace-candidat")
  }

  const candidateProfile = await getCandidateProfileWithDetails()

  if (!candidateProfile) {
    // Gérer le cas où le profil n'existe pas encore, peut-être rediriger vers une page de création de profil
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profil Candidat Introuvable</CardTitle>
            <CardDescription>
              Il semble que votre profil candidat n'ait pas encore été créé ou est incomplet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Veuillez compléter votre profil pour accéder à toutes les fonctionnalités de l'espace candidat.
            </p>
            <Link href="/profil/candidat/edition">
              {" "}
              {/* Adaptez ce lien */}
              <Button>Compléter mon profil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { user } = session
  const profile = candidateProfile // Utiliser le profil complet récupéré

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Espace Candidat</h1>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profil/candidat/edition">
                  {" "}
                  {/* Adaptez ce lien */}
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="bg-white">
                <Link href="/api/auth/signout">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche: Profil et Navigation */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg bg-white">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-500 ring-offset-2">
                  <AvatarImage src={profile.avatar  || undefined} alt={profile.firstName} />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">
                    {profile.firstName?.charAt(0)}
                    {profile.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-blue-600 font-medium mb-1">{user.email}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {profile.city && profile.country ? `${profile.city}, ${profile.country}` : "Localisation non définie"}
                </p>
                <Link href="/profil/candidat/edition">
                  {" "}
                  {/* Adaptez ce lien */}
                  <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Mon Profil Public", href: `/candidats/${profile.id}`, icon: UserCircle },
                  { label: "Mes Candidatures", href: "/espace-candidat/candidatures", icon: Briefcase },
                  { label: "Offres Sauvegardées", href: "/espace-candidat/offres-sauvegardees", icon: Star },
                  { label: "Formations & Conseils", href: "/espace-candidat/conseils", icon: BookOpen },
                ].map((item) => (
                  <Button key={item.label} variant="ghost" className="w-full justify-start" asChild>
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4 mr-3 text-gray-600" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Colonne de droite: Contenu principal (Compétences, Expériences, etc.) */}
          <section className="lg:col-span-2 space-y-8">
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle>Aperçu du Profil</CardTitle>
                <CardDescription>Gérez vos informations professionnelles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Section Compétences */}
                <SkillList
                  skills={profile.skills || []}
                  candidateProfileId={profile.id}
                  refreshSkills={refreshCandidateData}
                />
                <hr className="my-6" />
                {/* Section Expériences */}
                <ExperienceList
                  experiences={profile.experiences || []}
                  candidateProfileId={profile.id}
                  refreshExperiences={refreshCandidateData}
                />
                {/* Ajoutez d'autres sections ici: Formations, Portfolio, etc. */}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
