"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  HelpCircle,
  Users,
  Briefcase,
  MessageSquare,
  Settings,
  CreditCard,
  Shield,
  ChevronDown,
  ChevronRight,
  Book,
  Video,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function AidePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    {
      icon: Users,
      title: "Pour les candidats",
      description: "Créer un profil, postuler, gérer ses candidatures",
      color: "bg-blue-500",
      articles: 12,
    },
    {
      icon: Briefcase,
      title: "Pour les employeurs",
      description: "Publier des offres, gérer les candidatures",
      color: "bg-green-500",
      articles: 8,
    },
    {
      icon: CreditCard,
      title: "Facturation & Paiements",
      description: "Tarifs, abonnements, factures",
      color: "bg-purple-500",
      articles: 6,
    },
    {
      icon: Shield,
      title: "Sécurité & Confidentialité",
      description: "Protection des données, sécurité du compte",
      color: "bg-red-500",
      articles: 5,
    },
    {
      icon: Settings,
      title: "Paramètres du compte",
      description: "Modifier son profil, notifications",
      color: "bg-orange-500",
      articles: 7,
    },
    {
      icon: MessageSquare,
      title: "Support technique",
      description: "Problèmes techniques, bugs",
      color: "bg-indigo-500",
      articles: 4,
    },
  ]

  const faqItems = [
    {
      category: "Général",
      question: "Comment créer un compte sur AfricaJobs ?",
      answer:
        "Cliquez sur 'S'inscrire' en haut de la page, choisissez votre type de compte (candidat ou employeur), remplissez le formulaire et validez votre email.",
    },
    {
      category: "Candidats",
      question: "Comment optimiser mon profil candidat ?",
      answer:
        "Complétez votre profil à 100% : ajoutez une photo professionnelle, détaillez vos expériences, listez vos compétences et obtenez des recommandations.",
    },
    {
      category: "Candidats",
      question: "Comment postuler à une offre d'emploi ?",
      answer:
        "Trouvez l'offre qui vous intéresse, cliquez sur 'Postuler', rédigez une lettre de motivation personnalisée et envoyez votre candidature.",
    },
    {
      category: "Employeurs",
      question: "Comment publier une offre d'emploi ?",
      answer:
        "Connectez-vous à votre espace employeur, cliquez sur 'Publier une offre', remplissez les détails du poste et publiez votre annonce.",
    },
    {
      category: "Employeurs",
      question: "Comment gérer les candidatures reçues ?",
      answer:
        "Dans votre espace employeur, section 'Candidatures', vous pouvez consulter, trier et répondre aux candidatures reçues.",
    },
    {
      category: "Facturation",
      question: "Quels sont vos tarifs ?",
      answer:
        "L'inscription est gratuite pour les candidats. Les employeurs bénéficient d'offres flexibles selon leurs besoins de recrutement.",
    },
    {
      category: "Technique",
      question: "J'ai oublié mon mot de passe, que faire ?",
      answer:
        "Cliquez sur 'Mot de passe oublié' sur la page de connexion, entrez votre email et suivez les instructions reçues par email.",
    },
    {
      category: "Sécurité",
      question: "Mes données sont-elles sécurisées ?",
      answer:
        "Oui, nous utilisons un chiffrement SSL et respectons les normes RGPD pour protéger vos données personnelles.",
    },
  ]

  const resources = [
    {
      icon: Video,
      title: "Tutoriels vidéo",
      description: "Apprenez à utiliser AfricaJobs en vidéo",
      count: "15 vidéos",
      color: "bg-red-500",
    },
    {
      icon: Book,
      title: "Guides complets",
      description: "Documentation détaillée étape par étape",
      count: "8 guides",
      color: "bg-blue-500",
    },
    {
      icon: FileText,
      title: "Articles de blog",
      description: "Conseils carrière et actualités emploi",
      count: "25+ articles",
      color: "bg-green-500",
    },
  ]

  const filteredFaq = faqItems.filter(
    (item) =>
      searchTerm === "" ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AfricaJobs</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/offres" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Offres d'emploi
              </Link>
              <Link href="/candidats" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Profils candidats
              </Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-indigo-600 transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
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
                <Button className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 hover:scale-105 transition-all">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Centre d'
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 ml-4">
                Aide
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Trouvez rapidement les réponses à vos questions et apprenez à tirer le meilleur parti d'AfricaJobs
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher dans l'aide..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 bg-white/80 backdrop-blur-md shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Parcourir par catégorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-white/20 cursor-pointer group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Badge variant="secondary">{category.articles} articles</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Questions Fréquentes</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaq.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20"
              >
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <h3 className="font-semibold text-gray-900">{item.question}</h3>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ressources utiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-white/20 cursor-pointer group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${resource.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <resource.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <Badge variant="secondary">{resource.count}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-0">
            <CardContent className="p-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Besoin d'aide supplémentaire ?</h3>
              <p className="text-indigo-100 mb-6">
                Notre équipe support est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-indigo-600 hover:bg-gray-100 hover:scale-105 transition-all"
                  >
                    Nous contacter
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-indigo-600 hover:scale-105 transition-all"
                >
                  Chat en direct
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
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
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
