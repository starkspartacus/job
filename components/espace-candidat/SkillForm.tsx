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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

const skillFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom de la compétence doit faire au moins 2 caractères.",
  }),
  level: z.number().min(0).max(100),
  category: z.string().optional(),
})

type SkillFormValues = z.infer<typeof skillFormSchema>

interface SkillFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  skill?: SkillFormValues
  onSubmit: (data: SkillFormValues) => void
}

export function SkillForm({
  open,
  onOpenChange,
  skill,
  onSubmit,
}: SkillFormProps) {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: skill || {
      name: "",
      level: 50,
      category: "",
    },
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{skill ? "Modifier la compétence" : "Ajouter une compétence"}</SheetTitle>
          <SheetDescription>
            Remplissez les informations ci-dessous pour {skill ? "modifier" : "ajouter"} une compétence.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la compétence</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Service client" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau de maîtrise</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-4">
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Débutant</span>
                        <span>Intermédiaire</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Évaluez votre niveau de maîtrise de cette compétence
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Compétences techniques" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optionnel - Catégorisez vos compétences pour une meilleure organisation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {skill ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 