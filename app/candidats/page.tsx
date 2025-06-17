"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Filter, Star, Eye, Heart, Users, X } from "lucide-react"
import Link from "next/link"
import { ContactModal } from "@/components/ui/contact-modal"
import { LocationFilter } from "@/components/ui/location-filter"
import { api, type Candidate } from "@/lib/api" // Importez l'API et le type Candidate

export default function CandidatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [experience, setExperience] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [locationFilters, setLocationFilters] = useState({
    country: "",
    city: "",
    commune: "",
    countryName: "",
    cityName: "",
    communeName: "",
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([]) // État pour stocker les candidats
  const [loading, setLoading] = useState(true) // État de chargement

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true)
      try {
        const fetchedCandidates = await api.candidates.getAll({
          searchTerm,
          experience,
          specialty,
          country: locationFilters.country,
          city: locationFilters.city,
          commune: locationFilters.commune,
        })
        setCandidates(fetchedCandidates)
      } catch (error) {
        console.error("Failed to fetch candidates:", error)
        // Gérer l'erreur (afficher un message à l'utilisateur)
      } finally {
        setLoading(false)
      }
    }
    fetchCandidates()
  }, [searchTerm, experience, specialty, locationFilters]) // Déclenche la recherche à chaque changement de filtre

  const clearAllFilters = () => {
    setSearchTerm("")
    setExperience("")
    setSpecialty("")
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
    searchTerm || experience || specialty || locationFilters.country || locationFilters.city || locationFilters.commune

  const filteredCandidates = candidates

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AfricaJobs</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/offres" className="text-gray-600 hover:text-blue-600 transition-colors">
                Offres d'emploi
              </Link>
              <Link href="/candidats" className="text-blue-600 font-medium">
                Profils candidats
              </Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-blue-600 transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
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
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all">
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
            Découvrez nos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 ml-3">
              talents
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez le candidat parfait parmi nos professionnels vérifiés de l'hôtellerie-restauration
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
          {/* Main Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative group">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <Input
                placeholder="Nom ou spécialité"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-gray-50 focus:bg-white transition-all"
              />
            </div>

            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger className="border-0 bg-gray-50 focus:bg-white transition-all">
                <SelectValue placeholder="Expérience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Toute expérience</SelectItem>
                <SelectItem value="1">1-2 ans</SelectItem>
                <SelectItem value="3">3-5 ans</SelectItem>
                <SelectItem value="5">5+ ans</SelectItem>
              </SelectContent>
            </Select>

            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="border-0 bg-gray-50 focus:bg-white transition-all">
                <SelectValue placeholder="Spécialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes spécialités</SelectItem>
                <SelectItem value="serveuse">Service</SelectItem>
                <SelectItem value="barman">Bar</SelectItem>
                <SelectItem value="cuisinier">Cuisine</SelectItem>
                <SelectItem value="dj">Animation</SelectItem>
                <SelectItem value="caissier">Caisse</SelectItem>
                <SelectItem value="securite">Sécurité</SelectItem>
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
                  <h4 className="font-medium text-gray-900 mb-3">Disponibilité</h4>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Disponibilité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immédiatement</SelectItem>
                        <SelectItem value="week">Dans la semaine</SelectItem>
                        <SelectItem value="month">Dans le mois</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Langues</h4>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Langues parlées" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="francais">Français</SelectItem>
                        <SelectItem value="anglais">Anglais</SelectItem>
                        <SelectItem value="arabe">Arabe</SelectItem>
                        <SelectItem value="locales">Langues locales</SelectItem>
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
                  : `${candidates.length} candidat${candidates.length > 1 ? "s" : ""} trouvé${candidates.length > 1 ? "s" : ""}`}
              </p>
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

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">Chargement des candidats...</p>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="col-span-full">
              <Card className="text-center p-12 animate-fade-in">
                <CardContent>
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun candidat trouvé</h3>
                  <p className="text-gray-600 mb-4">
                    Essayez de modifier vos critères de recherche ou explorez d'autres options.
                  </p>
                  <Button
                    onClick={clearAllFilters}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            candidates.map((candidate, index) => (
              <Card
                key={candidate.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-blue-400 group-hover:scale-105 transition-transform">
                      <AvatarImage alt={candidate.name} src={candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link href={`/candidats/${candidate.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {candidate.name}
                        </h3>
                      </Link>
                      <p className="text-blue-600 font-medium">{candidate.title}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {candidate.location}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>
                        {candidate.rating} ({candidate.reviews} avis)
                      </span>
                    </div>
                    {candidate.verified && <Badge className="bg-green-500 text-white">Vérifié</Badge>}
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    Expérience: {candidate.experience} dans le secteur. Compétences clés: {candidate.skills.join(", ")}.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Link href={`/candidats/${candidate.id}`} className="flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full hover:scale-105 transition-transform flex items-center justify-center group"
                      >
                        <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Voir profil
                      </Button>
                    </Link>
                    <ContactModal candidate={candidate} />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
