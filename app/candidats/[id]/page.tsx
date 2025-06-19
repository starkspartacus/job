"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  Star,
  Heart,
  Share2,
  ArrowLeft,
  MessageSquare,
  Download,
  Eye,
  Award,
  GraduationCap,
  Languages,
  Clock,
  CheckCircle,
  Play,
  FileText,
  Users,
} from "lucide-react"
import Link from "next/link"
import { ContactModal } from "@/components/ui/contact-modal"
import { useParams } from "next/navigation"

export default function CandidateProfilePage() {
  const [isContacting, setIsContacting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [candidateData, setCandidateData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const params = useParams<{ id: string }>()
  const id = params?.id

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    fetch(`/api/candidats/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Candidat introuvable")
        return res.json()
      })
      .then((data) => {
        setCandidateData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-500">Chargement du profil...</span>
      </div>
    )
  }

  if (error || !candidateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-red-500">{error || "Erreur de chargement du profil."}</span>
      </div>
    )
  }

  const handleContact = () => {
    setIsContacting(true)
    setTimeout(() => setIsContacting(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/candidats" className="flex items-center space-x-2 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Retour aux candidats</span>
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
            {/* Profile Header */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20 animate-fade-in-up">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative">
                    <Avatar className="w-32 h-32 ring-4 ring-white shadow-2xl">
                      <AvatarImage src={candidateData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl">
                        {candidateData.name
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {candidateData.lastActive === "En ligne" && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    )}
                    {candidateData.verified && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{candidateData.name}</h1>
                      <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">
                        {candidateData.lastActive}
                      </Badge>
                    </div>
                    <p className="text-xl text-blue-600 font-medium mb-4">{candidateData.title}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {candidateData.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        {candidateData.age} ans
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-orange-500" />
                        {candidateData.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-purple-500" />
                        {candidateData.email}
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                        <span className="font-bold text-lg">{candidateData.rating}</span>
                        <span className="text-gray-500 ml-1">({candidateData.reviews} avis)</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="w-4 h-4 mr-1" />
                        {candidateData.profileViews} vues
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{candidateData.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{candidateData.responseRate}%</div>
                  <div className="text-sm text-gray-600">Taux de réponse</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{candidateData.responseTime}</div>
                  <div className="text-sm text-gray-600">Temps de réponse</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{candidateData.certifications.length}</div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Content */}
            <Card
              className="bg-white/80 backdrop-blur-md border-white/20 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Aperçu</TabsTrigger>
                    <TabsTrigger value="experience">Expérience</TabsTrigger>
                    <TabsTrigger value="skills">Compétences</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="reviews">Avis</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="overview" className="space-y-6">
                    {/* Languages */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Languages className="w-5 h-5 mr-2 text-blue-600" />
                        Langues parlées
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {candidateData.languages.map((language: any, index: any) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-900">{language.name}</span>
                              <span className="text-sm text-gray-600">{language.level}%</span>
                            </div>
                            <Progress value={language.level} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Education */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                        Formation
                      </h3>
                      <div className="space-y-4">
                        {candidateData.education.map((edu: any, index: any) => (
                          <div
                            key={edu.id}
                            className="border-l-2 border-green-200 pl-4 hover:border-green-400 transition-colors"
                          >
                            <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
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
                    </div>

                    <Separator />

                    {/* Certifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-purple-600" />
                        Certifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {candidateData.certifications.map((cert: any, index: any) => (
                          <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
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
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-6">
                    {candidateData.experiences.map((exp: any, index: any) => (
                      <div
                        key={exp.id}
                        className="border-l-4 border-blue-200 pl-6 hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                            <p className="text-blue-600 font-medium">{exp.company}</p>
                          </div>
                          {exp.current && <Badge className="bg-green-500 hover:bg-green-600">Actuel</Badge>}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {exp.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {exp.period}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                        {exp.achievements && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Réalisations :</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement: any, idx: any) => (
                                <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {candidateData.skills.map((skill: any, index: any) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{skill.name}</span>
                              {skill.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                            <span className="text-sm text-gray-600">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-3" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="portfolio" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {candidateData.portfolio.map((item: any, index: any) => (
                        <Card
                          key={index}
                          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                        >
                          <CardContent className="p-4">
                            {item.type === "video" && (
                              <div className="relative">
                                <img
                                  src={item.thumbnail || "/placeholder.svg"}
                                  alt={item.title}
                                  className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                  <Play className="w-8 h-8 text-white" />
                                </div>
                                <Badge className="absolute top-2 right-2 bg-black/70 text-white">{item.duration}</Badge>
                              </div>
                            )}
                            {item.type === "image" && (
                              <img
                                src={item.url || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                              />
                            )}
                            {item.type === "document" && (
                              <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <FileText className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h4>
                            {item.size && <p className="text-sm text-gray-500">{item.size}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-6">
                    {candidateData.reviews.map((review: any) => (
                      <Card key={review.id} className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                {review.author
                                  .split(" ")
                                  .map((n: any) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-medium text-gray-900">{review.author}</h4>
                                  <p className="text-sm text-gray-600">
                                    {review.role} - {review.company}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {review.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                              </div>
                              <div className="flex items-center mb-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-700 italic">"{review.comment}"</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24 bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">{candidateData.salaryExpectation}</div>
                    <div className="text-sm text-gray-600">Prétentions salariales</div>
                  </div>
                  <Separator />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disponibilité :</span>
                      <span className="font-medium text-green-600">{candidateData.availability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taux de réponse :</span>
                      <span className="font-medium">{candidateData.responseRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temps de réponse :</span>
                      <span className="font-medium">{candidateData.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Membre depuis :</span>
                      <span className="font-medium">{candidateData.joinDate.replace("Membre depuis ", "")}</span>
                    </div>
                  </div>
                  <Separator />
                  {!isContacting ? (
                    <div className="space-y-3">
                      <ContactModal
                        candidate={{
                          id: String(candidateData.id),
                          userId: candidateData.userId,
                          email: candidateData.email,
                          phone: candidateData.phone,
                          avatar: candidateData.avatar,
                          salaryExpectation: candidateData.salaryExpectation,
                          availability: candidateData.availability,
                          dateOfBirth: candidateData.dateOfBirth,
                          gender: candidateData.gender,
                          country: candidateData.country,
                          city: candidateData.city,
                          commune: candidateData.commune,
                          reviews: candidateData.reviews,
                          firstName: candidateData.firstName,
                          lastName: candidateData.lastName,
                          experienceLevel: candidateData.experienceLevel,
                          educationLevel: candidateData.educationLevel,
                          verified: candidateData.verified,
                          rating: candidateData.rating,
                          languages: candidateData.languages,
                          workAuthorization: candidateData.workAuthorization,
                          lastActive: candidateData.lastActive,
                          responseTime: candidateData.responseTime,
                          responseRate: candidateData.responseRate,
                        }}
                        trigger={
                          <Button
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all"
                            size="lg"
                          >
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Contacter
                          </Button>
                        }
                      />
                      <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger CV
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-3 animate-fade-in">
                      <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-medium text-green-600">Message envoyé !</p>
                      <p className="text-sm text-gray-600">Vous recevrez une réponse rapidement</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card
              className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vues du profil</span>
                  <span className="font-bold text-blue-600">{candidateData.profileViews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Note moyenne</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-bold">{candidateData.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avis reçus</span>
                  <span className="font-bold text-purple-600">{candidateData.reviews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profil vérifié</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </CardContent>
            </Card>

            {/* Similar Candidates */}
            <Card
              className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Candidats similaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Fatou Sow", title: "Serveuse", rating: 4.7, location: "Dakar" },
                  { name: "Aïcha Bah", title: "Caissière", rating: 4.5, location: "Thiès" },
                  { name: "Mariam Diop", title: "Serveuse", rating: 4.9, location: "Dakar" },
                ].map((candidate, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                        {candidate.name
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {candidate.name}
                      </h4>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                          {candidate.rating}
                        </div>
                        <span>•</span>
                        <span>{candidate.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                  Voir plus de candidats
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
