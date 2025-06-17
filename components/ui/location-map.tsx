"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Globe, Clock, Car, Bus } from "lucide-react"

interface LocationMapProps {
  company: {
    name: string
    address: string
    city: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
    phone?: string
    website?: string
    hours?: string
  }
  className?: string
}

export function LocationMap({ company, className = "" }: LocationMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null)

  // Coordonnées par défaut pour les principales villes africaines
  const defaultCoordinates = {
    Dakar: { lat: 14.6937, lng: -17.4441 },
    Abidjan: { lat: 5.36, lng: -4.0083 },
    Lomé: { lat: 6.1319, lng: 1.2228 },
    Cotonou: { lat: 6.3703, lng: 2.3912 },
    Ouagadougou: { lat: 12.3714, lng: -1.5197 },
    Bamako: { lat: 12.6392, lng: -8.0029 },
  }

  const coordinates = company.coordinates ||
    defaultCoordinates[company.city.split(",")[0] as keyof typeof defaultCoordinates] || { lat: 14.6937, lng: -17.4441 }

  const transportOptions = [
    { id: "car", name: "Voiture", icon: Car, color: "bg-blue-500", time: "15 min" },
    { id: "bus", name: "Bus", icon: Bus, color: "bg-green-500", time: "25 min" },
    { id: "walk", name: "À pied", icon: Navigation, color: "bg-orange-500", time: "45 min" },
  ]

  const nearbyPlaces = [
    { name: "Arrêt de bus Plateau", type: "Transport", distance: "200m", icon: Bus },
    { name: "Station Total", type: "Station-service", distance: "300m", icon: Car },
    { name: "Pharmacie du Centre", type: "Pharmacie", distance: "150m", icon: MapPin },
    { name: "Banque Atlantique", type: "Banque", distance: "100m", icon: MapPin },
  ]

  useEffect(() => {
    // Simulation du chargement de la carte
    const timer = setTimeout(() => setIsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    window.open(url, "_blank")
  }

  const handleViewOnMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Map Container */}
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-red-600" />
            Localisation de l'établissement
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            {/* Map Placeholder with Animation */}
            <div className="h-80 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
              {!isLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-600">Chargement de la carte...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Simulated Map Background */}
                  <div
                    className="absolute inset-0 opacity-80"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e5e7eb' fillOpacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Map Markers and Roads */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
                    {/* Roads */}
                    <path
                      d="M0 160 L400 160 M200 0 L200 320"
                      stroke="#cbd5e1"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                    <path
                      d="M50 100 L350 220 M350 100 L50 220"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                      strokeDasharray="5,3"
                    />

                    {/* Main Location Marker */}
                    <g transform="translate(200, 160)">
                      <circle cx="0" cy="0" r="20" fill="#ef4444" className="animate-pulse" opacity="0.3" />
                      <circle cx="0" cy="0" r="12" fill="#ef4444" className="animate-bounce" />
                      <path d="M-6 -2 L6 -2 L0 6 Z" fill="white" />
                    </g>

                    {/* Nearby Places */}
                    <circle cx="150" cy="120" r="4" fill="#3b82f6" className="animate-pulse" />
                    <circle cx="280" cy="200" r="4" fill="#10b981" className="animate-pulse" />
                    <circle cx="120" cy="220" r="4" fill="#f59e0b" className="animate-pulse" />
                    <circle cx="320" cy="100" r="4" fill="#8b5cf6" className="animate-pulse" />
                  </svg>

                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0 hover:scale-110 transition-transform">
                      +
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0 hover:scale-110 transition-transform">
                      -
                    </Button>
                  </div>

                  {/* Map Type Toggle */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="hover:scale-105 transition-transform cursor-pointer">
                      Satellite
                    </Badge>
                  </div>
                </>
              )}
            </div>

            {/* Company Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{company.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{company.address}</p>
                      <p className="text-sm text-gray-500">
                        {company.city}, {company.country}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={handleDirections}
                        className="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Itinéraire
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleViewOnMaps}
                        className="hover:scale-105 transition-transform"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transport Options */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="w-5 h-5 mr-2 text-blue-600" />
            Comment s'y rendre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {transportOptions.map((transport) => (
              <div
                key={transport.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedTransport === transport.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedTransport(transport.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${transport.color} flex items-center justify-center`}>
                    <transport.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{transport.name}</h4>
                    <p className="text-sm text-gray-600">~{transport.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedTransport && (
            <div className="p-4 bg-blue-50 rounded-lg animate-fade-in">
              <h4 className="font-medium text-blue-900 mb-2">
                Itinéraire recommandé en {transportOptions.find((t) => t.id === selectedTransport)?.name.toLowerCase()}
              </h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Départ depuis votre position
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                  Prendre la direction du centre-ville
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3" />
                  Arrivée à {company.name}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            Informations pratiques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {company.phone && (
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <Phone className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-gray-900">Téléphone</p>
                  <p className="text-sm text-gray-600">{company.phone}</p>
                </div>
              </div>
            )}

            {company.website && (
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <Globe className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-gray-900">Site web</p>
                  <p className="text-sm text-blue-600 hover:underline cursor-pointer">{company.website}</p>
                </div>
              </div>
            )}

            {company.hours && (
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <Clock className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-gray-900">Horaires</p>
                  <p className="text-sm text-gray-600">{company.hours}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Places */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-purple-600" />À proximité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nearbyPlaces.map((place, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <place.icon className="w-4 h-4 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                      {place.name}
                    </p>
                    <p className="text-sm text-gray-600">{place.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className="group-hover:scale-105 transition-transform">
                  {place.distance}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
