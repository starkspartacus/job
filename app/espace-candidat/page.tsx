"use client"

import React, { useState, useTransition, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Edit,
  Eye,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Plus,
  Download,
} from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { ExperienceList } from "@/components/espace-candidat/ExperienceList"
import { SkillList } from "@/components/espace-candidat/SkillList"
import { addExperience, updateExperience, addSkill, updateSkill, getCandidateById } from "@/app/actions/candidates"
import { toast } from "sonner"
import type { CandidateProfile } from "@/app/actions/candidates"
import { useRouter } from "next/navigation"

export default function EspaceCandidatPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isPending, startTransition] = useTransition()
  const [candidateData, setCandidateData] = useState<CandidateProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/connexion")
    }
  })

  const refreshData = async () => {
    if (!session?.user?.candidateProfile?.id) return
    
    try {
      const data = await getCandidateById(session.user.candidateProfile.id)
      setCandidateData(data)
    } catch (error) {
      console.error('Error refreshing data:', error)
      toast.error("Erreur lors du rafraîchissement des données")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === "loading") return
    
    if (status === "authenticated") {
      if (session?.user?.role !== "CANDIDATE") {
        router.replace("/")
        return
      }
      refreshData()
    }
  }, [status, session, router])

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: true, 
        callbackUrl: "/connexion" 
      })
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      toast.error("Erreur lors de la déconnexion")
    }
  }

  // Afficher un état de chargement pendant la vérification de la session
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

  if (!candidateData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erreur</h2>
          <p className="text-gray-600">Impossible de charger les données du profil.</p>
          <Button 
            onClick={refreshData} 
            className="mt-4"
            variant="outline"
          >
            Réessayer
          </Button>
        </div>
      </div>
    )
  }

  const handleSaveExperience = async (data: any, id?: string) => {
    const candidateId = session?.user?.candidateProfile?.id
    if (!candidateId) {
      toast.error("Profil candidat non trouvé")
      return
    }

    startTransition(async () => {
      try {
        if (id) {
          await updateExperience(id, data)
        } else {
          await addExperience(candidateId, data)
        }
        toast.success(id ? "Expérience modifiée" : "Expérience ajoutée")
        await refreshData()
      } catch (error) {
        toast.error("Une erreur est survenue")
      }
    })
  }

  const handleSaveSkill = async (data: any, id?: string) => {
    const candidateId = session?.user?.candidateProfile?.id
    if (!candidateId) {
      toast.error("Profil candidat non trouvé")
      return
    }

    startTransition(async () => {
      try {
        if (id) {
          await updateSkill(id, data)
        } else {
          await addSkill(candidateId, data)
        }
        toast.success(id ? "Compétence modifiée" : "Compétence ajoutée")
        await refreshData()
      } catch (error) {
        toast.error("Une erreur est survenue")
      }
    })
  }

  const calculateProfileCompletion = () => {
    let score = 0
    let total = 0

    // Photo de profil
    if (candidateData.avatar) { score++; }
    total++

    // Informations de base
    if (candidateData.firstName && candidateData.lastName) { score++; }
    total++

    // Contact
    if (candidateData.email && candidateData.phone) { score++; }
    total++

    // Localisation
    if (candidateData.country && candidateData.city) { score++; }
    total++

    // Expériences
    if (candidateData.experiences.length > 0) { score++; }
    total++

    // Compétences
    if (candidateData.skills.length > 0) { score++; }
    total++

    // Langues
    if (candidateData.languages.length > 0) { score++; }
    total++

    return Math.round((score / total) * 100)
  }

  const profileCompletion = calculateProfileCompletion()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AfricaJobs</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={candidateData.avatar || "/placeholder.svg?height=32&width=32"} />
                  <AvatarFallback>{`${candidateData.firstName[0]}${candidateData.lastName[0]}`}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{`${candidateData.firstName} ${candidateData.lastName}`}</p>
                  <p className="text-xs text-gray-500">Candidat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "dashboard" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mon profil
                  </Button>
                  <Button
                    variant={activeTab === "applications" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("applications")}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Mes candidatures
                  </Button>
                  <Button
                    variant={activeTab === "messages" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </Button>
                  <hr className="my-4" />
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Profile Header */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={candidateData.avatar || "/placeholder.svg?height=96&width=96"} />
                        <AvatarFallback className="text-2xl">{`${candidateData.firstName[0]}${candidateData.lastName[0]}`}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{`${candidateData.firstName} ${candidateData.lastName}`}</h2>
                        <p className="text-lg text-gray-600 mb-2">{candidateData.experienceLevel || "Niveau d'expérience non renseigné"}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          {candidateData.city && candidateData.country && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {`${candidateData.city}, ${candidateData.country}`}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {candidateData.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {candidateData.email}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{candidateData.rating.toFixed(1)}</span>
                            <span className="text-gray-500 ml-1">({candidateData.reviews} avis)</span>
                          </div>
                          {candidateData.verified && (
                            <Badge variant="secondary">Profil vérifié</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier profil
                        </Button>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger CV
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Completion */}
                <Card>
                  <CardHeader>
                    <CardTitle>Complétude du profil</CardTitle>
                    <CardDescription>Un profil complet augmente vos chances d'être contacté</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progression</span>
                        <span className="text-sm text-gray-600">{profileCompletion}%</span>
                      </div>
                      <Progress value={profileCompletion} className="h-2" />
                      <div className="space-y-2 text-sm">
                        <div className={`flex items-center ${candidateData.avatar ? "text-green-600" : "text-gray-400"}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${candidateData.avatar ? "bg-green-600" : "bg-gray-400"}`} />
                          Photo de profil {candidateData.avatar ? "ajoutée" : "manquante"}
                        </div>
                        <div className={`flex items-center ${candidateData.experiences.length > 0 ? "text-green-600" : "text-gray-400"}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${candidateData.experiences.length > 0 ? "bg-green-600" : "bg-gray-400"}`} />
                          Expériences professionnelles {candidateData.experiences.length > 0 ? "renseignées" : "manquantes"}
                        </div>
                        <div className={`flex items-center ${candidateData.skills.length > 0 ? "text-green-600" : "text-gray-400"}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${candidateData.skills.length > 0 ? "bg-green-600" : "bg-gray-400"}`} />
                          Compétences {candidateData.skills.length > 0 ? "ajoutées" : "manquantes"}
                        </div>
                        <div className={`flex items-center ${candidateData.languages.length > 0 ? "text-green-600" : "text-gray-400"}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${candidateData.languages.length > 0 ? "bg-green-600" : "bg-gray-400"}`} />
                          Langues {candidateData.languages.length > 0 ? "renseignées" : "manquantes"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardContent className="p-6">
                    <ExperienceList
                      experiences={candidateData.experiences}
                      onSave={handleSaveExperience}
                      refresh={refreshData}
                    />
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardContent className="p-6">
                    <SkillList
                      skills={candidateData.skills}
                      onSave={handleSaveSkill}
                      refresh={refreshData}
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Mes candidatures</h2>
                  <Link href="/offres">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Rechercher des offres
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-gray-600">Candidatures envoyées</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">1</div>
                      <div className="text-sm text-gray-600">Profil consulté</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">0</div>
                      <div className="text-sm text-gray-600">Entretiens programmés</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
