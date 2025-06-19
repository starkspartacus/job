"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Experience } from "./ExperienceList"

const experienceFormSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit faire au moins 2 caractères.",
  }),
  company: z.string().min(2, {
    message: "Le nom de l'entreprise doit faire au moins 2 caractères.",
  }),
  periodStart: z.string().min(4, {
    message: "L'année de début est requise (ex: 2022).",
  }),
  periodEnd: z.string().min(4, {
    message: "L'année de fin est requise (ex: 2024 ou 'en cours').",
  }),
  description: z.string().min(10, {
    message: "La description doit faire au moins 10 caractères.",
  }),
})

type ExperienceFormValues = z.infer<typeof experienceFormSchema>

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  experience?: Experience
  onSubmit: (data: ExperienceFormValues) => void
}

export function ExperienceForm({ open, onOpenChange, experience, onSubmit }: Props) {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      title: experience?.title || "",
      company: experience?.company || "",
      periodStart: experience?.periodStart || "",
      periodEnd: experience?.periodEnd || "",
      description: experience?.description || "",
    },
  })

  React.useEffect(() => {
    if (experience) {
      form.reset({
        title: experience.title,
        company: experience.company,
        periodStart: experience.periodStart,
        periodEnd: experience.periodEnd,
        description: experience.description,
      })
    } else {
      form.reset({
        title: "",
        company: "",
        periodStart: "",
        periodEnd: "",
        description: "",
      })
    }
  }, [experience, form])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>{experience ? "Modifier l'expérience" : "Ajouter une expérience"}</SheetTitle>
          <SheetDescription>
            Renseignez les détails de votre expérience professionnelle.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du poste</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Serveuse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entreprise</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Restaurant Le Palmier" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="periodStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année de début</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2022" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="periodEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année de fin</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2024 ou 'en cours'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez vos responsabilités et réalisations..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {experience ? "Modifier" : "Ajouter"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
} 