"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Users,
  Building,
  Star,
  Zap,
  Globe,
  Award,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Animation des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const jobCategories = [
    { name: "Serveuse", count: 45, icon: "👩‍🍳", color: "from-pink-500 to-rose-500", bgColor: "bg-pink-50" },
    { name: "Barman", count: 32, icon: "🍸", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50" },
    { name: "DJ", count: 18, icon: "🎧", color: "from-purple-500 to-indigo-500", bgColor: "bg-purple-50" },
    { name: "Caissière", count: 28, icon: "💰", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50" },
    { name: "Cuisinier", count: 35, icon: "👨‍🍳", color: "from-orange-500 to-red-500", bgColor: "bg-orange-50" },
    { name: "Videur", count: 12, icon: "🛡️", color: "from-gray-500 to-slate-500", bgColor: "bg-gray-50" },
  ]

  const stats = [
    {
      icon: Briefcase,
      label: "Offres d'emploi actives",
      value: "500+",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    { icon: Users, label: "Candidats inscrits", value: "1,200+", color: "text-green-600", bgColor: "bg-green-100" },
    {
      icon: Building,
      label: "Établissements partenaires",
      value: "150+",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    { icon: Globe, label: "Pays couverts", value: "8", color: "text-orange-600", bgColor: "bg-orange-100" },
  ]

  const testimonials = [
    {
      name: "Aminata Diallo",
      role: "Serveuse",
      company: "Restaurant Le Palmier",
      message: "Grâce à AfricaJobs, j'ai trouvé l'emploi de mes rêves en moins d'une semaine !",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Moussa Traoré",
      role: "Directeur RH",
      company: "Hôtel Ivoire",
      message: "Une plateforme exceptionnelle qui nous a permis de recruter les meilleurs talents.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Fatou Sow",
      role: "Chef cuisinière",
      company: "Restaurant Traditionnel",
      message: "Interface intuitive et processus de candidature très simple. Je recommande !",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const recentJobs = [
    {
      title: "Serveuse expérimentée",
      company: "Restaurant Le Palmier",
      location: "Dakar, Sénégal",
      type: "CDI",
      salary: "150,000 - 200,000 FCFA",
      posted: "Il y a 2 heures",
      id: 1,
      featured: true,
    },
    {
      title: "DJ pour club de nuit",
      company: "Club Atmosphere",
      location: "Abidjan, Côte d'Ivoire",
      type: "Freelance",
      salary: "À négocier",
      posted: "Il y a 5 heures",
      id: 2,
      featured: false,
    },
    {
      title: "Barman cocktails",
      company: "Hôtel Ivoire",
      location: "Lomé, Togo",
      type: "CDD",
      salary: "180,000 FCFA",
      posted: "Il y a 1 jour",
      id: 3,
      featured: true,
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Recherche intelligente",
      description: "Trouvez rapidement les offres qui correspondent à votre profil",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      icon: Award,
      title: "Profils vérifiés",
      description: "Tous nos candidats et employeurs sont vérifiés",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Globe,
      title: "Couverture régionale",
      description: "Présent dans 8 pays d'Afrique de l'Ouest",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Users,
      title: "Communauté active",
      description: "Rejoignez une communauté de professionnels passionnés",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                AfricaJobs
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/offres" className="text-gray-600 hover:text-orange-600 transition-colors relative group">
                Offres d'emploi
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/candidats" className="text-gray-600 hover:text-orange-600 transition-colors relative group">
                Profils candidats
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-orange-600 transition-colors relative group">
                À propos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/connexion">
                <Button variant="outline" className="hover:scale-105 transition-transform duration-300">
                  Connexion
                </Button>
              </Link>
              <Link href="/inscription">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all duration-300">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Trouvez votre emploi idéal dans l'
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 animate-gradient">
                hôtellerie-restauration
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-300">
              La première plateforme dédiée aux métiers de bars, clubs, restaurants et maquis en Afrique. Connectez
              employeurs et talents facilement.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up animation-delay-600">
              <Card className="p-6 bg-white/90 backdrop-blur-md shadow-2xl border-0 hover:shadow-3xl transition-all duration-500">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <Input
                      placeholder="Poste recherché (serveuse, DJ, cuisinier...)"
                      className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 relative group">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <Input
                      placeholder="Ville ou région"
                      className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white transition-all"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <Button className="h-12 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all duration-300 shadow-lg">
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher
                  </Button>
                </div>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-900">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center bg-white/80 backdrop-blur-md border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Postes les plus recherchés</h3>
            <p className="text-xl text-gray-600">Découvrez les opportunités dans votre domaine</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {jobCategories.map((job, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 bg-white/80 backdrop-blur-md border-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${job.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {job.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {job.name}
                  </h4>
                  <Badge className="group-hover:scale-105 transition-transform">{job.count} offres</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir AfricaJobs ?</h3>
            <p className="text-xl text-gray-600">Des fonctionnalités pensées pour votre succès</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-white/80 backdrop-blur-md border-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h3>
            <p className="text-xl text-gray-600">Simple, rapide et efficace</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Employers */}
            <Card className="bg-white/80 backdrop-blur-md border-0 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Pour les employeurs</CardTitle>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Building className="w-8 h-8 text-white" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: "1", title: "Inscrivez-vous", desc: "Créez votre compte établissement en quelques minutes" },
                  {
                    step: "2",
                    title: "Publiez vos offres",
                    desc: "Décrivez vos besoins et attirez les meilleurs candidats",
                  },
                  {
                    step: "3",
                    title: "Recevez des candidatures",
                    desc: "Consultez les profils et contactez directement les candidats",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* For Candidates */}
            <Card className="bg-white/80 backdrop-blur-md border-0 hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Pour les candidats</CardTitle>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: "1", title: "Créez votre profil", desc: "Mettez en valeur vos compétences et expériences" },
                  { step: "2", title: "Postulez aux offres", desc: "Trouvez les opportunités qui vous correspondent" },
                  {
                    step: "3",
                    title: "Décrochez votre emploi",
                    desc: "Échangez avec les employeurs et signez votre contrat",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Offres récentes</h3>
            <Link href="/offres">
              <Button
                variant="outline"
                className="flex items-center space-x-2 hover:scale-105 transition-transform group"
              >
                <span>Voir toutes les offres</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 animate-fade-in-up ${
                  job.featured
                    ? "ring-2 ring-orange-200 bg-gradient-to-br from-orange-50 to-red-50"
                    : "bg-white/80 backdrop-blur-md"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="font-medium text-orange-600">{job.company}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant="secondary" className="group-hover:scale-105 transition-transform">
                        {job.type}
                      </Badge>
                      {job.featured && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Populaire
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="text-sm font-medium text-green-600">{job.salary}</div>
                    <div className="text-xs text-gray-500">{job.posted}</div>
                  </div>
                  <Link href={`/offres/${job.id}`}>
                    <Button className="w-full mt-4 group-hover:scale-105 transition-transform" size="sm">
                      Postuler maintenant
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h3>
            <p className="text-xl text-gray-600">Des témoignages authentiques de notre communauté</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl animate-fade-in-up">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6">
                    "{testimonials[currentTestimonial].message}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-gray-600">
                        {testimonials[currentTestimonial].role} - {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à commencer votre aventure ?</h3>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'employeurs et candidats qui font confiance à AfricaJobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inscription?type=employeur">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
                >
                  <Building className="w-5 h-5 mr-2" />
                  Je recrute
                </Button>
              </Link>
              <Link href="/inscription?type=candidat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 hover:scale-105 transition-all shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Je cherche un emploi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">AfricaJobs</h4>
              </div>
              <p className="text-gray-400 mb-4">
                La plateforme de référence pour l'emploi dans l'hôtellerie-restauration en Afrique.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up animation-delay-200">
              <h5 className="font-semibold mb-4">Pour les candidats</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/offres" className="hover:text-white transition-colors">
                    Rechercher un emploi
                  </Link>
                </li>
                <li>
                  <Link href="/inscription" className="hover:text-white transition-colors">
                    Créer mon profil
                  </Link>
                </li>
                <li>
                  <Link href="/conseils" className="hover:text-white transition-colors">
                    Conseils carrière
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in-up animation-delay-400">
              <h5 className="font-semibold mb-4">Pour les employeurs</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/candidats" className="hover:text-white transition-colors">
                    Trouver des candidats
                  </Link>
                </li>
                <li>
                  <Link href="/inscription" className="hover:text-white transition-colors">
                    Publier une offre
                  </Link>
                </li>
                <li>
                  <Link href="/tarifs" className="hover:text-white transition-colors">
                    Nos tarifs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in-up animation-delay-600">
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/aide" className="hover:text-white transition-colors">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="hover:text-white transition-colors">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up animation-delay-800">
            <p>&copy; 2024 AfricaJobs. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.6s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        
        .animation-delay-900 {
          animation-delay: 900ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
