"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Plus } from "lucide-react"
import { deleteExperience } from "@/app/actions/candidates"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { ExperienceForm } from "./ExperienceForm"

export type Experience = {
  id: string
  title: string
  company: string
  periodStart: string
  periodEnd: string
  description: string
  candidateId: string
}

type Props = {
  experiences: Experience[]
  onSave: (data: Omit<Experience, "id" | "candidateId">, id?: string) => Promise<void>
  refresh: () => void
}

export function ExperienceList({ experiences, onSave, refresh }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>()

  const handleDelete = (id: string) => {
    setDeletingId(id)
    startTransition(async () => {
      try {
        await deleteExperience(id)
        toast.success("Expérience supprimée")
        refresh()
      } catch {
        toast.error("Erreur lors de la suppression")
      } finally {
        setDeletingId(null)
      }
    })
  }

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingExperience(undefined)
    setIsFormOpen(true)
  }

  const handleSubmit = async (data: Omit<Experience, "id" | "candidateId">) => {
    try {
      await onSave(data, editingExperience?.id)
      setIsFormOpen(false)
      toast.success(editingExperience ? "Expérience modifiée" : "Expérience ajoutée")
      refresh()
    } catch (error) {
      toast.error(editingExperience ? "Erreur lors de la modification" : "Erreur lors de l'ajout")
    }
  }

  const formatPeriod = (start: string, end: string) => {
    if (end === "en cours") return `Depuis ${start}`
    return `${start} - ${end}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Expériences professionnelles</h2>
        <Button size="sm" variant="outline" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" /> Ajouter
        </Button>
      </div>
      
      <AnimatePresence>
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, type: "spring" }}
          >
            <Card className="p-4 flex flex-col md:flex-row md:items-center md:justify-between group">
              <div>
                <div className="font-semibold text-gray-900">{exp.title}</div>
                <div className="text-orange-600 font-medium">{exp.company}</div>
                <div className="text-sm text-gray-600">{formatPeriod(exp.periodStart, exp.periodEnd)}</div>
                <div className="text-sm text-gray-700 mt-1">{exp.description}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(exp)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => handleDelete(exp.id)} 
                  disabled={isPending && deletingId === exp.id}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <ExperienceForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        experience={editingExperience}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 