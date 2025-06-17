"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Settings,
  LogOut,
  Building,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function EspaceRecruteurPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Données d'exemple
  const stats = {
    activeJobs: 5,
    totalApplications: 23,
    viewsThisMonth: 156,
    messagesUnread: 3,
  }

  const myJobs = [
    {
      id: 1,
      title: "Serveuse expérimentée",
      status: "active",
      applications: 8,
      views: 45,
      posted: "2024-01-15",
      expires: "2024-02-15",
    },
    {
      id: 2,
      title: "Barman cocktails",
      status: "active",
      applications: 12,
      views: 67,
      posted: "2024-01-10",
      expires: "2024-02-10",
    },
    {
      id: 3,
      title: "DJ week-end",
      status: "paused",
      applications: 3,
      views: 23,
      posted: "2024-01-08",
      expires: "2024-02-08",
    },
  ]

  const recentApplications = [
    {
      id: 1,
      candidateName: "Aminata Diallo",
      jobTitle: "Serveuse expérimentée",
      appliedDate: "2024-01-16",
      status: "new",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      candidateName: "Moussa Traoré",
      jobTitle: "Barman cocktails",
      appliedDate: "2024-01-15",
      status: "reviewed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      candidateName: "Fatou Sow",
      jobTitle: "Serveuse expérimentée",
      appliedDate: "2024-01-14",
      status: "contacted",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AfricaJobs</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <MessageSquare className="w-5 h-5" />
                {stats.messagesUnread > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {stats.messagesUnread}
                  </Badge>
                )}
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>RP</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Restaurant Le Palmier</p>
                  <p className="text-xs text-gray-500">Employeur</p>
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
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Tableau de bord
                  </Button>
                  <Button
                    variant={activeTab === "jobs" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("jobs")}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Mes offres
                  </Button>
                  <Button
                    variant={activeTab === "applications" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("applications")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Candidatures
                  </Button>
                  <Button
                    variant={activeTab === "messages" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                    {stats.messagesUnread > 0 && <Badge className="ml-auto">{stats.messagesUnread}</Badge>}
                  </Button>
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Mon profil
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
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Publier une offre
                  </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Offres actives</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Candidatures</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Vues ce mois</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.viewsThisMonth}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Messages</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.messagesUnread}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Candidatures récentes</CardTitle>
                    <CardDescription>Les dernières candidatures reçues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={application.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {application.candidateName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{application.candidateName}</p>
                              <p className="text-sm text-gray-600">{application.jobTitle}</p>
                              <p className="text-xs text-gray-500">Candidature du {application.appliedDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                application.status === "new"
                                  ? "default"
                                  : application.status === "reviewed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {application.status === "new"
                                ? "Nouveau"
                                : application.status === "reviewed"
                                  ? "Vu"
                                  : "Contacté"}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Voir profil
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "jobs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Mes offres d'emploi</h2>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle offre
                  </Button>
                </div>

                <div className="space-y-4">
                  {myJobs.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              <Badge variant={job.status === "active" ? "default" : "secondary"}>
                                {job.status === "active" ? "Active" : "En pause"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {job.applications} candidatures
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {job.views} vues
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Publié le {job.posted}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Expire le {job.expires}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Modifier
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des candidatures</h2>

                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">Toutes (23)</TabsTrigger>
                    <TabsTrigger value="new">Nouvelles (8)</TabsTrigger>
                    <TabsTrigger value="reviewed">Vues (12)</TabsTrigger>
                    <TabsTrigger value="contacted">Contactées (3)</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {recentApplications.map((application) => (
                      <Card key={application.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={application.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {application.candidateName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">{application.candidateName}</h3>
                                <p className="text-sm text-gray-600">Candidature pour : {application.jobTitle}</p>
                                <p className="text-xs text-gray-500">Reçue le {application.appliedDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  application.status === "new"
                                    ? "default"
                                    : application.status === "reviewed"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {application.status === "new"
                                  ? "Nouveau"
                                  : application.status === "reviewed"
                                    ? "Vu"
                                    : "Contacté"}
                              </Badge>
                              <Button size="sm" variant="outline">
                                Voir CV
                              </Button>
                              <Button size="sm">Contacter</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Profil de l'établissement</h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                    <CardDescription>Gérez les informations de votre établissement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'établissement</label>
                        <input
                          type="text"
                          defaultValue="Restaurant Le Palmier"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type d'établissement</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                          <option>Restaurant</option>
                          <option>Bar</option>
                          <option>Club</option>
                          <option>Hôtel</option>
                          <option>Maquis</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          defaultValue="contact@lepalmier.sn"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                          type="tel"
                          defaultValue="+221 77 123 45 67"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <input
                        type="text"
                        defaultValue="Avenue Léopold Sédar Senghor, Dakar"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={4}
                        defaultValue="Restaurant traditionnel sénégalais situé au cœur de Dakar. Nous proposons une cuisine authentique dans un cadre chaleureux et convivial."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Sauvegarder les modifications
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
