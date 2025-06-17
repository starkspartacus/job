"use client"

import { useState } from "react"
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

export default function EspaceCandidatPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Données d'exemple
  const candidateData = {
    name: "Aminata Diallo",
    title: "Serveuse expérimentée",
    location: "Dakar, Sénégal",
    phone: "+221 77 123 45 67",
    email: "aminata.diallo@email.com",
    profileCompletion: 85,
    rating: 4.8,
    reviewsCount: 12,
  }

  const applications = [
    {
      id: 1,
      jobTitle: "Serveuse expérimentée",
      company: "Restaurant Le Palmier",
      appliedDate: "2024-01-15",
      status: "pending",
      location: "Dakar, Sénégal",
    },
    {
      id: 2,
      jobTitle: "Caissière",
      company: "Fast Food Express",
      appliedDate: "2024-01-12",
      status: "reviewed",
      location: "Dakar, Sénégal",
    },
    {
      id: 3,
      jobTitle: "Serveuse week-end",
      company: "Café Central",
      appliedDate: "2024-01-10",
      status: "rejected",
      location: "Dakar, Sénégal",
    },
  ]

  const experiences = [
    {
      id: 1,
      title: "Serveuse",
      company: "Restaurant Teranga",
      period: "2022 - 2024",
      description: "Service en salle, prise de commandes, conseil clientèle",
    },
    {
      id: 2,
      title: "Caissière",
      company: "Supermarché Auchan",
      period: "2020 - 2022",
      description: "Encaissement, service client, gestion de caisse",
    },
  ]

  const skills = [
    { name: "Service client", level: 90 },
    { name: "Prise de commandes", level: 85 },
    { name: "Travail en équipe", level: 95 },
    { name: "Gestion du stress", level: 80 },
    { name: "Langues (Français, Wolof)", level: 100 },
  ]

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
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{candidateData.name}</p>
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
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700">
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
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback className="text-2xl">AD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{candidateData.name}</h2>
                        <p className="text-lg text-gray-600 mb-2">{candidateData.title}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {candidateData.location}
                          </div>
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
                            <span className="font-medium">{candidateData.rating}</span>
                            <span className="text-gray-500 ml-1">({candidateData.reviewsCount} avis)</span>
                          </div>
                          <Badge variant="secondary">Profil vérifié</Badge>
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
                        <span className="text-sm text-gray-600">{candidateData.profileCompletion}%</span>
                      </div>
                      <Progress value={candidateData.profileCompletion} className="h-2" />
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-green-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                          Photo de profil ajoutée
                        </div>
                        <div className="flex items-center text-green-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                          Expériences professionnelles renseignées
                        </div>
                        <div className="flex items-center text-green-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                          Compétences ajoutées
                        </div>
                        <div className="flex items-center text-orange-600">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                          Ajouter une vidéo de présentation (+15%)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Expériences professionnelles</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="border-l-2 border-orange-200 pl-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-orange-600 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-600 mb-2">{exp.period}</p>
                          <p className="text-sm text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Compétences</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                            <span className="text-sm text-gray-600">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
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

                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{application.jobTitle}</h3>
                            <p className="text-orange-600 font-medium mb-2">{application.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {application.location}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Candidature du {application.appliedDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                application.status === "pending"
                                  ? "secondary"
                                  : application.status === "reviewed"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {application.status === "pending"
                                ? "En attente"
                                : application.status === "reviewed"
                                  ? "Consulté"
                                  : "Refusé"}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Voir l'offre
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
