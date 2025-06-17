"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Users, Target, Heart, Award, Globe, Zap, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AProposPage() {
  const stats = [
    { icon: Users, label: "Candidats inscrits", value: "12,000+", color: "text-blue-600" },
    { icon: Building, label: "Entreprises partenaires", value: "850+", color: "text-green-600" },
    { icon: Award, label: "Emplois pourvus", value: "5,200+", color: "text-purple-600" },
    { icon: Globe, label: "Pays couverts", value: "15", color: "text-orange-600" },
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "Nous visons l'excellence dans chaque interaction, offrant un service de qualité supérieure à nos utilisateurs.",
      color: "bg-blue-500",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Notre passion pour l'emploi en Afrique nous pousse à innover constamment pour mieux servir notre communauté.",
      color: "bg-red-500",
    },
    {
      icon: Shield,
      title: "Confiance",
      description:
        "La confiance est au cœur de notre plateforme. Nous garantissons la sécurité et la confidentialité de vos données.",
      color: "bg-green-500",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Nous utilisons les dernières technologies pour créer des solutions innovantes adaptées au marché africain.",
      color: "bg-yellow-500",
    },
  ]

  const team = [
    {
      name: "Amadou Diallo",
      role: "CEO & Fondateur",
      bio: "Expert en technologie avec 15 ans d'expérience dans le développement de plateformes digitales en Afrique.",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
    {
      name: "Fatima Kone",
      role: "Directrice Marketing",
      bio: "Spécialiste du marketing digital avec une expertise approfondie du marché de l'emploi africain.",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
    {
      name: "Ibrahim Sow",
      role: "CTO",
      bio: "Ingénieur logiciel passionné par l'innovation technologique et le développement de solutions scalables.",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
    {
      name: "Aïcha Traore",
      role: "Directrice RH",
      bio: "Experte en ressources humaines avec une connaissance approfondie des enjeux de l'emploi en Afrique.",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
  ]

  const milestones = [
    { year: "2020", title: "Création d'AfricaJobs", description: "Lancement de la plateforme avec 3 pays" },
    { year: "2021", title: "Expansion régionale", description: "Extension à 8 pays d'Afrique de l'Ouest" },
    { year: "2022", title: "10,000 utilisateurs", description: "Franchissement du cap des 10,000 utilisateurs actifs" },
    {
      year: "2023",
      title: "Partenariats stratégiques",
      description: "Signature de partenariats avec les grandes chaînes hôtelières",
    },
    {
      year: "2024",
      title: "Innovation IA",
      description: "Intégration de l'intelligence artificielle pour le matching",
    },
  ]

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
              <Link href="/offres" className="text-gray-600 hover:text-orange-600 transition-colors">
                Offres d'emploi
              </Link>
              <Link href="/candidats" className="text-gray-600 hover:text-orange-600 transition-colors">
                Profils candidats
              </Link>
              <Link href="/a-propos" className="text-orange-600 font-medium">
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

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Notre
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 ml-4">
                Mission
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Révolutionner le marché de l'emploi dans l'hôtellerie-restauration en Afrique en connectant les talents
              aux opportunités avec simplicité et efficacité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inscription">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all"
                >
                  Rejoignez-nous
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-white/20"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  AfricaJobs est né d'un constat simple : le secteur de l'hôtellerie-restauration en Afrique manquait
                  d'une plateforme dédiée pour connecter efficacement employeurs et candidats.
                </p>
                <p>
                  Fondée en 2020 par une équipe passionnée d'entrepreneurs africains, notre plateforme s'est rapidement
                  imposée comme la référence dans 15 pays du continent.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'avoir facilité plus de 5,200 embauches et d'accompagner
                  quotidiennement des milliers de professionnels dans leur recherche d'emploi.
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all">
                  Découvrir nos offres
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl transform rotate-3"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Équipe AfricaJobs"
                  className="relative rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-white/20 group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre Parcours</h2>
            <p className="text-xl text-gray-600">Les étapes clés de notre développement</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-white border-4 border-orange-500 rounded-full"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600">Les visionnaires derrière AfricaJobs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-white/20 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                    LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">Prêt à faire partie de l'aventure ?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Rejoignez des milliers de professionnels qui ont déjà trouvé leur voie avec AfricaJobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inscription?type=candidat">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-all"
                >
                  Je cherche un emploi
                </Button>
              </Link>
              <Link href="/inscription?type=employeur">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 hover:scale-105 transition-all"
                >
                  Je recrute
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
