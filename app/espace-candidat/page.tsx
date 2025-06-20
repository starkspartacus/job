"use client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Edit3,
  LogOut,
  Settings,
  UserCircle,
  Briefcase,
  Star,
  BookOpen,
  CheckCircle,
  Award,
  GraduationCap,
} from "lucide-react"
import { SkillList } from "@/components/espace-candidat/SkillList"
import { ExperienceList } from "@/components/espace-candidat/ExperienceList"
import { getCandidateProfileWithDetails, refreshCandidateDataAction } from "@/app/actions/candidates"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import type { AppCandidateProfile } from "@/lib/types"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function EspaceCandidatPageClient() {
  const [candidateData, setCandidateData] = useState<AppCandidateProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/connexion")
    },
  })

  const fetchCandidateData = async () => {
    if (status === "authenticated" && session?.user?.id) {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getCandidateProfileWithDetails()
        setCandidateData(data)
      } catch (err) {
        console.error("Failed to fetch candidate profile:", err)
        setError("Erreur lors du chargement du profil candidat.")
        toast.error("Erreur lors du chargement du profil candidat.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchCandidateData()
  }, [status, session])

  const handleRefreshData = async () => {
    await refreshCandidateDataAction()
    await fetchCandidateData()
  }

  const SignOutButton = () => {
    return (
      <Button
        variant="outline"
        size="sm"
        className="bg-white text-gray-700 border-gray-200"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Déconnexion
      </Button>
    )
  }

  const calculateProfileCompletion = () => {
    if (!candidateData) return 0
    let score = 0
    let total = 0

    if (candidateData.avatar) {
      score++
    }
    total++
    if (candidateData.firstName && candidateData.lastName) {
      score++
    }
    total++
    if (candidateData.email && candidateData.phone) {
      score++
    }
    total++
    if (candidateData.country && candidateData.city) {
      score++
    }
    total++
    if (candidateData.experiences && candidateData.experiences.length > 0) {
      score++
    }
    total++
    if (candidateData.skills && candidateData.skills.length > 0) {
      score++
    }
    total++
    if (candidateData.languages && candidateData.languages.length > 0) {
      score++
    }
    total++
    if (candidateData.education && candidateData.education.length > 0) {
      score++
    }
    total++
    if (candidateData.certifications && candidateData.certifications.length > 0) {
      score++
    }
    total++
    if (candidateData.bio) {
      score++
    }
    total++

    return Math.round((score / total) * 100)
  }

  const profileCompletion = calculateProfileCompletion()

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Chargement...</h2>
          <p className="text-gray-600">Veuillez patienter pendant le chargement de vos données.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erreur</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={handleRefreshData} className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
            Réessayer
          </Button>
        </div>
      </div>
    )
  }

  if (!candidateData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Profil Candidat Introuvable</CardTitle>
            <CardDescription>
              Il semble que votre profil candidat n'ait pas encore été créé ou est incomplet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Veuillez compléter votre profil pour accéder à toutes les fonctionnalités de l'espace candidat.
            </p>
            <Link href="/profil/candidat/edition">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Compléter mon profil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const profile = candidateData
  const user = session?.user

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 group text-gray-700 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Espace Candidat</h1>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild className="text-gray-700 hover:text-blue-600">
                <Link href="/profil/candidat/edition">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Link>
              </Button>
              <SignOutButton />
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
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-200 ring-offset-2">
                  <AvatarImage src={profile.avatar || user?.image || undefined} alt={profile.firstName} />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {profile.firstName?.charAt(0)}
                    {profile.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-blue-600 font-medium mb-1">{user?.email}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {profile.city && profile.country ? `${profile.city}, ${profile.country}` : "Localisation non définie"}
                </p>
                <Link href="/profil/candidat/edition">
                  <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Complétude du profil</CardTitle>
                <CardDescription>Un profil complet augmente vos chances d'être contacté</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Progression</span>
                    <span className="text-sm text-gray-600">{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} className="h-2 bg-gray-200 [&>*]:bg-blue-500" />
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center ${profile.avatar ? "text-green-600" : "text-gray-400"}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${profile.avatar ? "bg-green-600" : "bg-gray-400"}`} />
                      Photo de profil {profile.avatar ? "ajoutée" : "manquante"}
                    </div>
                    <div
                      className={`flex items-center ${profile.experiences && profile.experiences.length > 0 ? "text-green-600" : "text-gray-400"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${profile.experiences && profile.experiences.length > 0 ? "bg-green-600" : "bg-gray-400"}`}
                      />
                      Expériences professionnelles{" "}
                      {profile.experiences && profile.experiences.length > 0 ? "renseignées" : "manquantes"}
                    </div>
                    <div
                      className={`flex items-center ${profile.skills && profile.skills.length > 0 ? "text-green-600" : "text-gray-400"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${profile.skills && profile.skills.length > 0 ? "bg-green-600" : "bg-gray-400"}`}
                      />
                      Compétences {profile.skills && profile.skills.length > 0 ? "ajoutées" : "manquantes"}
                    </div>
                    <div
                      className={`flex items-center ${profile.languages && profile.languages.length > 0 ? "text-green-600" : "text-gray-400"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${profile.languages && profile.languages.length > 0 ? "bg-green-600" : "bg-gray-400"}`}
                      />
                      Langues {profile.languages && profile.languages.length > 0 ? "renseignées" : "manquantes"}
                    </div>
                    <div
                      className={`flex items-center ${profile.education && profile.education.length > 0 ? "text-green-600" : "text-gray-400"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${profile.education && profile.education.length > 0 ? "bg-green-600" : "bg-gray-400"}`}
                      />
                      Formation {profile.education && profile.education.length > 0 ? "renseignée" : "manquante"}
                    </div>
                    <div
                      className={`flex items-center ${profile.certifications && profile.certifications.length > 0 ? "text-green-600" : "text-gray-400"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${profile.certifications && profile.certifications.length > 0 ? "bg-green-600" : "bg-gray-400"}`}
                      />
                      Certifications{" "}
                      {profile.certifications && profile.certifications.length > 0 ? "ajoutées" : "manquantes"}
                    </div>
                    <div className={`flex items-center ${profile.bio ? "text-green-600" : "text-gray-400"}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${profile.bio ? "bg-green-600" : "bg-gray-400"}`} />
                      Bio {profile.bio ? "ajoutée" : "manquante"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Mon Profil Public", href: `/candidats/${profile.id}`, icon: UserCircle },
                  { label: "Mes Candidatures", href: "/espace-candidat/candidatures", icon: Briefcase },
                  { label: "Offres Sauvegardées", href: "/espace-candidat/offres-sauvegardees", icon: Star },
                  { label: "Formations & Conseils", href: "/espace-candidat/conseils", icon: BookOpen },
                ].map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-blue-600"
                    asChild
                  >
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
                <CardTitle className="text-gray-800">Aperçu du Profil</CardTitle>
                <CardDescription>Gérez vos informations professionnelles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Section Expériences */}
                <ExperienceList
                  experiences={profile.experiences || []}
                  candidateProfileId={profile.id}
                  refreshExperiences={handleRefreshData}
                />
                <hr className="my-6 border-gray-200" />
                {/* Section Compétences */}
                <SkillList
                  skills={profile.skills || []}
                  candidateProfileId={profile.id}
                  refreshSkills={handleRefreshData}
                />
                <hr className="my-6 border-gray-200" />
                {/* Section Formations */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                    Formation
                  </h3>
                  {profile.education && profile.education.length > 0 ? (
                    <div className="space-y-4">
                      {profile.education.map((edu) => (
                        <div
                          key={edu.id}
                          className="border-l-4 border-green-200 pl-6 hover:border-green-400 transition-colors"
                        >
                          <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                          <p className="text-green-600 font-medium">{edu.school}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{edu.location}</span>
                            <span>•</span>
                            <span>{edu.year}</span>
                            {edu.mention && (
                              <>
                                <span>•</span>
                                <Badge variant="outline">{edu.mention}</Badge>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucune formation renseignée pour le moment.</p>
                  )}
                </div>
                <hr className="my-6 border-gray-200" />
                {/* Section Certifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    Certifications
                  </h3>
                  {profile.certifications && profile.certifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.certifications.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{cert.name}</h4>
                              <p className="text-sm text-gray-600">{cert.issuer}</p>
                              <p className="text-xs text-gray-500">{cert.date}</p>
                            </div>
                            {cert.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucune certification ajoutée pour le moment.</p>
                  )}
                </div>
                {/* Ajoutez d'autres sections ici: Portfolio, etc. */}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
