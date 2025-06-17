"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Filter, Clock, Building, DollarSign, Heart, TrendingUp, Users, Zap, X } from "lucide-react"
import Link from "next/link"
import { LocationFilter } from "@/components/ui/location-filter"
import { api, type Job } from "@/lib/api" // Importez l'API et le type Job

export default function OffresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [contractType, setContractType] = useState("")
  const [locationFilters, setLocationFilters] = useState({
    country: "",
    city: "",
    commune: "",
    countryName: "",
    cityName: "",
    communeName: "",
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([]) // État pour stocker les offres
  const [loading, setLoading] = useState(true) // État de chargement

  // Catégories d'emplois avec animations (restent les mêmes)
  const jobCategories = [
    {
      id: "serveuse",
      name: "Serveuse",
      count: 45,
      icon: "👩‍🍳",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
      description: "Service en salle, accueil client",
    },
    {
      id: "barman",
      name: "Barman",
      count: 32,
      icon: "🍸",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      description: "Cocktails, service bar",
    },
    {
      id: "dj",
      name: "DJ",
      count: 18,
      icon: "🎧",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      description: "Animation, musique",
    },
    {
      id: "caissiere",
      name: "Caissière",
      count: 28,
      icon: "💰",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      description: "Encaissement, gestion",
    },
    {
      id: "cuisinier",
      name: "Cuisinier",
      count: 35,
      icon: "👨‍🍳",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      description: "Cuisine, préparation",
    },
    {
      id: "videur",
      name: "Videur",
      count: 12,
      icon: "🛡️",
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      description: "Sécurité, contrôle",
    },
  ]

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const fetchedJobs = await api.jobs.getAll({
          searchTerm,
          selectedCategory,
          contractType,
          country: locationFilters.country,
          city: locationFilters.city,
          commune: locationFilters.commune,
        })
        setJobs(fetchedJobs)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
        // Gérer l'erreur
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [searchTerm, selectedCategory, contractType, locationFilters])

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === "toutes") {
      setSelectedCategory("")
    } else {
      setSelectedCategory(categoryId === selectedCategory ? "" : categoryId)
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setContractType("")
    setLocationFilters({
      country: "",
      city: "",
      commune: "",
      countryName: "",
      cityName: "",
      communeName: "",
    })
  }

  const hasActiveFilters =
    searchTerm ||
    selectedCategory ||
    contractType ||
    locationFilters.country ||
    locationFilters.city ||
    locationFilters.commune

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AfricaJobs</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/offres" className="text-orange-600 font-medium">
                Offres d'emploi
              </Link>
              <Link href="/candidats" className="text-gray-600 hover:text-orange-600 transition-colors">
                Profils candidats
              </Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-orange-600 transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/connexion">
                <Button variant="outline" className="hover:scale-105 transition-transform">
                  Connexion
                </Button>
              </Link>
              <Link href="/inscription">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trouvez votre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 ml-3">
              emploi idéal
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez les meilleures opportunités dans l'hôtellerie-restauration en Afrique
          </p>
        </div>

        {/* Job Categories Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">Postes les plus recherchés</h2>
            <p className="text-gray-600 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Découvrez les opportunités dans votre domaine
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {jobCategories.map((category, index) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
                  selectedCategory === category.id
                    ? `ring-2 ring-orange-500 ${category.bgColor} scale-105`
                    : `${category.hoverColor} hover:scale-105`
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      {category.icon}
                    </div>
                    {selectedCategory === category.id && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <Badge
                    variant={selectedCategory === category.id ? "default" : "secondary"}
                    className="group-hover:scale-105 transition-transform"
                  >
                    {category.count} offres
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedCategory && (
            <div className="text-center animate-fade-in">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("")}
                className="hover:scale-105 transition-transform"
              >
                Voir toutes les catégories
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
          {/* Main Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative group">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
              <Input
                placeholder="Poste ou entreprise"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-gray-50 focus:bg-white transition-all"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-0 bg-gray-50 focus:bg-white transition-all">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toutes">Toutes les catégories</SelectItem>
                {jobCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger className="border-0 bg-gray-50 focus:bg-white transition-all">
                <SelectValue placeholder="Type de contrat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les contrats</SelectItem>
                <SelectItem value="CDI">CDI</SelectItem>
                <SelectItem value="CDD">CDD</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                <SelectItem value="Stage">Stage</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Filter className="w-4 h-4" />
              <span>Filtres avancés</span>
            </Button>
          </div>

          {/* Location Filters - Compact Mode */}
          <div className="mb-4">
            <LocationFilter onLocationChange={setLocationFilters} compact={true} showLabels={false} />
          </div>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="border-t pt-4 mt-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Localisation détaillée</h4>
                  <LocationFilter onLocationChange={setLocationFilters} compact={false} showLabels={true} />
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Salaire</h4>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Fourchette de salaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-100000">0 - 100,000 FCFA</SelectItem>
                        <SelectItem value="100000-200000">100,000 - 200,000 FCFA</SelectItem>
                        <SelectItem value="200000-300000">200,000 - 300,000 FCFA</SelectItem>
                        <SelectItem value="300000+">300,000+ FCFA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Date de publication</h4>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Publié depuis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="week">Cette semaine</SelectItem>
                        <SelectItem value="month">Ce mois</SelectItem>
                        <SelectItem value="all">Toutes les dates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filter Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">
                {loading
                  ? "Chargement..."
                  : `${jobs.length} offre${jobs.length > 1 ? "s" : ""} trouvée${jobs.length > 1 ? "s" : ""}`}
              </p>
              {selectedCategory && (
                <Badge className="bg-orange-500 hover:bg-orange-600 animate-pulse">
                  {jobCategories.find((cat) => cat.id === selectedCategory)?.icon}{" "}
                  {jobCategories.find((cat) => cat.id === selectedCategory)?.name}
                </Badge>
              )}
              {locationFilters.countryName && (
                <Badge variant="secondary">
                  <MapPin className="w-3 h-3 mr-1" />
                  {locationFilters.countryName}
                  {locationFilters.cityName && ` • ${locationFilters.cityName}`}
                  {locationFilters.communeName && ` • ${locationFilters.communeName}`}
                </Badge>
              )}
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700">
                <X className="w-4 h-4 mr-1" />
                Effacer tous les filtres
              </Button>
            )}
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="w-12 h-12 mx-auto border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">Chargement des offres...</p>
              </div>
            ) : jobs.length === 0 ? (
              <Card className="text-center p-12 animate-fade-in">
                <CardContent>
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune offre trouvée</h3>
                  <p className="text-gray-600 mb-4">
                    Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
                  </p>
                  <Button
                    onClick={clearAllFilters}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            ) : (
              jobs.map((job, index) => (
                <Card
                  key={job.id}
                  className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group animate-fade-in-up ${
                    job.featured
                      ? "ring-2 ring-orange-200 bg-gradient-to-r from-orange-50 to-red-50"
                      : "bg-white/80 backdrop-blur-md"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                            {job.title}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          {job.featured && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Populaire
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="font-medium text-orange-600 mb-2 group-hover:text-orange-700 transition-colors">
                          {job.company}
                        </CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="secondary" className="group-hover:scale-105 transition-transform">
                          {job.type}
                        </Badge>
                        <div className="flex items-center">
                          {jobCategories.find((cat) => cat.id === job.category)?.icon}
                          <span className="ml-1 text-xs text-gray-500">
                            {jobCategories.find((cat) => cat.id === job.category)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-2 group-hover:text-gray-900 transition-colors">
                      {job.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Exigences :</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <li key={index} className="flex items-center group-hover:text-gray-700 transition-colors">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 group-hover:scale-125 transition-transform" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/offres/${job.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:scale-105 transition-transform group-hover:border-orange-500 group-hover:text-orange-600"
                          >
                            Voir détails
                          </Button>
                        </Link>
                        <Link href={`/offres/${job.id}`}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all"
                          >
                            Postuler
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center group hover:bg-orange-50 p-2 rounded transition-colors">
                  <span className="text-gray-600">Nouvelles offres aujourd'hui</span>
                  <Badge className="bg-green-500 hover:bg-green-600 group-hover:scale-105 transition-transform">
                    12
                  </Badge>
                </div>
                <div className="flex justify-between items-center group hover:bg-orange-50 p-2 rounded transition-colors">
                  <span className="text-gray-600">Total des offres actives</span>
                  <Badge className="bg-blue-500 hover:bg-blue-600 group-hover:scale-105 transition-transform">
                    {jobs.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center group hover:bg-orange-50 p-2 rounded transition-colors">
                  <span className="text-gray-600">Entreprises qui recrutent</span>
                  <Badge className="bg-purple-500 hover:bg-purple-600 group-hover:scale-105 transition-transform">
                    156
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card
              className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  Catégories populaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobCategories.slice(0, 4).map((category, index) => (
                    <div
                      key={category.id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category.id
                          ? `${category.bgColor} ring-2 ring-orange-500`
                          : `hover:${category.bgColor.replace("50", "100")}`
                      }`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-sm`}
                        >
                          {category.icon}
                        </div>
                        <span className="text-gray-700 font-medium">{category.name}</span>
                      </div>
                      <Badge
                        variant={selectedCategory === category.id ? "default" : "secondary"}
                        className="hover:scale-105 transition-transform"
                      >
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Alert */}
            <Card
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Alerte emploi
                </CardTitle>
                <CardDescription className="text-orange-100">Recevez les nouvelles offres par email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input
                    placeholder="Votre email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-orange-100 focus:bg-white/30 transition-all"
                  />
                  <Button
                    variant="secondary"
                    className="w-full bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-all"
                  >
                    S'abonner aux alertes
                  </Button>
                </div>
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
