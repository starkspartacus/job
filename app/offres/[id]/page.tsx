"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Building,
  Star,
  Heart,
  Share2,
  ArrowLeft,
  Send,
  Eye,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Globe,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { LocationMap } from "@/components/ui/location-map"

export default function JobDetailPage() {
  const [isApplying, setIsApplying] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [applicationStep, setApplicationStep] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  // Données d'exemple pour l'offre d'emploi
  const jobData = {
    id: 1,
    title: "Serveuse expérimentée",
    company: {
      name: "Restaurant Le Palmier",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Restaurant traditionnel sénégalais situé au cœur de Dakar, réputé pour sa cuisine authentique et son service de qualité.",
      employees: "25-50 employés",
      founded: "2015",
      website: "www.lepalmier.sn",
      phone: "+221 33 123 45 67",
      email: "rh@lepalmier.sn",
      address: "Avenue Léopold Sédar Senghor, Plateau",
      city: "Dakar, Sénégal",
      country: "Sénégal",
      coordinates: {
        lat: 14.6937,
        lng: -17.4441,
      },
      hours: "Lun-Dim: 11h-23h",
    },
    location: "Dakar, Sénégal",
    type: "CDI",
    salary: "150,000 - 200,000 FCFA",
    posted: "Il y a 2 heures",
    expires: "Dans 28 jours",
    views: 156,
    applications: 23,
    category: "Service",
    experience: "2-3 ans",
    education: "Niveau Bac",
    description: `Nous recherchons une serveuse expérimentée et dynamique pour rejoindre notre équipe dans notre restaurant traditionnel sénégalais. 

Le candidat idéal aura une excellente présentation, un sens du service développé et une connaissance de la cuisine locale.

Cette position offre une excellente opportunité de développement professionnel dans un environnement de travail convivial et stimulant.`,
    responsibilities: [
      "Accueillir et installer les clients avec le sourire",
      "Prendre les commandes et conseiller sur les plats",
      "Servir les plats et boissons avec professionnalisme",
      "Encaisser les paiements et gérer la caisse",
      "Maintenir la propreté de la salle et des tables",
      "Collaborer efficacement avec l'équipe de cuisine",
    ],
    requirements: [
      "Minimum 2 ans d'expérience en restauration",
      "Excellente présentation et sens du service",
      "Maîtrise du français et du wolof",
      "Disponibilité pour les week-ends et soirées",
      "Capacité à travailler sous pression",
      "Connaissance de la cuisine sénégalaise appréciée",
    ],
    benefits: [
      "Salaire attractif + pourboires",
      "Formation continue",
      "Repas offerts",
      "Ambiance de travail conviviale",
      "Possibilités d'évolution",
      "Congés payés",
    ],
    skills: [
      { name: "Service client", required: true },
      { name: "Prise de commandes", required: true },
      { name: "Encaissement", required: true },
      { name: "Travail en équipe", required: true },
      { name: "Langues locales", required: false },
      { name: "Connaissance vins", required: false },
    ],
  }

  const similarJobs = [
    {
      id: 2,
      title: "Barman cocktails",
      company: "Hôtel Ivoire",
      location: "Lomé, Togo",
      salary: "180,000 FCFA",
      type: "CDD",
    },
    {
      id: 3,
      title: "Caissière restaurant",
      company: "Fast Food Express",
      location: "Cotonou, Bénin",
      salary: "120,000 FCFA",
      type: "CDI",
    },
    {
      id: 4,
      title: "Serveuse week-end",
      company: "Café Central",
      location: "Dakar, Sénégal",
      salary: "100,000 FCFA",
      type: "Temps partiel",
    },
  ]

  const handleApply = () => {
    setIsApplying(true)
    // Simulation du processus de candidature
    setTimeout(() => {
      setApplicationStep(1)
      setTimeout(() => {
        setApplicationStep(2)
        setTimeout(() => {
          setIsApplying(false)
          setApplicationStep(0)
        }, 1000)
      }, 1500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/offres" className="flex items-center space-x-2 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Retour aux offres</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
                className={`hover:scale-105 transition-all ${isSaved ? "bg-red-50 text-red-600 border-red-200" : ""}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Sauvegardé" : "Sauvegarder"}
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20 animate-fade-in-up">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                        <AvatarImage src={jobData.company.logo || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl">
                          {jobData.company.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl md:text-3xl text-gray-900 mb-2">{jobData.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-orange-600">
                          {jobData.company.name}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        {jobData.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                        {jobData.type}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        {jobData.salary}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-purple-500" />
                        {jobData.experience}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="secondary" className="animate-pulse">
                      {jobData.category}
                    </Badge>
                    <div className="text-sm text-gray-500">{jobData.posted}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs Content */}
            <Card
              className="bg-white/80 backdrop-blur-md border-white/20 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Aperçu</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="requirements">Exigences</TabsTrigger>
                    <TabsTrigger value="company">Entreprise</TabsTrigger>
                    <TabsTrigger value="location">Localisation</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="overview" className="space-y-6">
                    {/* Job Stats */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                          <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{jobData.views}</div>
                        <div className="text-sm text-gray-600">Vues</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{jobData.applications}</div>
                        <div className="text-sm text-gray-600">Candidatures</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                          <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">28</div>
                        <div className="text-sm text-gray-600">Jours restants</div>
                      </div>
                    </div>

                    <Separator />

                    {/* Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Informations clés</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type de contrat :</span>
                            <span className="font-medium">{jobData.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expérience :</span>
                            <span className="font-medium">{jobData.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Niveau d'études :</span>
                            <span className="font-medium">{jobData.education}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date limite :</span>
                            <span className="font-medium text-orange-600">{jobData.expires}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Avantages principaux</h3>
                        <div className="space-y-2">
                          {jobData.benefits.slice(0, 4).map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="description" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-orange-600" />
                        Description du poste
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        {jobData.description.split("\n\n").map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        Responsabilités
                      </h3>
                      <ul className="space-y-3">
                        {jobData.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start space-x-3 group">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform" />
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                              {responsibility}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                        Exigences du poste
                      </h3>
                      <ul className="space-y-3">
                        {jobData.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3 group">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 group-hover:scale-110 transition-transform" />
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                              {requirement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-600" />
                        Compétences recherchées
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobData.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                          >
                            <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                              {skill.name}
                            </span>
                            <Badge
                              variant={skill.required ? "default" : "secondary"}
                              className="group-hover:scale-105 transition-transform"
                            >
                              {skill.required ? "Requis" : "Souhaité"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="company" className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={jobData.company.logo || "/placeholder.svg"} />
                        <AvatarFallback>
                          {jobData.company.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{jobData.company.name}</h3>
                        <p className="text-gray-600">{jobData.company.employees}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{jobData.company.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Fondée en {jobData.company.founded}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Globe className="w-4 h-4 mr-2" />
                          {jobData.company.website}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {jobData.company.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {jobData.company.email}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                          Voir tous les postes
                        </Button>
                        <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                          Site web de l'entreprise
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="location" className="space-y-6">
                    <LocationMap
                      company={{
                        name: jobData.company.name,
                        address: jobData.company.address,
                        city: jobData.company.city,
                        country: jobData.company.country,
                        coordinates: jobData.company.coordinates,
                        phone: jobData.company.phone,
                        website: jobData.company.website,
                        hours: jobData.company.hours,
                      }}
                    />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-24 bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <CardContent className="p-6">
                {!isApplying && applicationStep === 0 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{jobData.salary}</div>
                      <div className="text-sm text-gray-600">Salaire mensuel</div>
                    </div>
                    <Separator />
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type de contrat :</span>
                        <span className="font-medium">{jobData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expérience :</span>
                        <span className="font-medium">{jobData.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Niveau d'études :</span>
                        <span className="font-medium">{jobData.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date limite :</span>
                        <span className="font-medium text-orange-600">{jobData.expires}</span>
                      </div>
                    </div>
                    <Separator />
                    <Button
                      onClick={handleApply}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Postuler maintenant
                    </Button>
                    <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contacter l'employeur
                    </Button>
                  </div>
                )}

                {isApplying && (
                  <div className="text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                      {applicationStep === 0 && <Send className="w-8 h-8 text-orange-600 animate-pulse" />}
                      {applicationStep === 1 && <Clock className="w-8 h-8 text-blue-600 animate-spin" />}
                      {applicationStep === 2 && <CheckCircle className="w-8 h-8 text-green-600" />}
                    </div>
                    <div>
                      {applicationStep === 0 && <p className="font-medium">Envoi de votre candidature...</p>}
                      {applicationStep === 1 && <p className="font-medium">Traitement en cours...</p>}
                      {applicationStep === 2 && (
                        <div>
                          <p className="font-medium text-green-600 mb-2">Candidature envoyée !</p>
                          <p className="text-sm text-gray-600">Vous recevrez une réponse sous 48h</p>
                        </div>
                      )}
                    </div>
                    {applicationStep < 2 && <Progress value={(applicationStep + 1) * 50} className="h-2" />}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card
              className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                  Emplois similaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {similarJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <h4 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{job.location}</span>
                      <Badge variant="outline" className="group-hover:scale-105 transition-transform">
                        {job.type}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-green-600 mt-1">{job.salary}</div>
                  </div>
                ))}
                <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                  Voir plus d'offres
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
