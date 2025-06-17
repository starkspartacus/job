import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressHeaderProps {
  step: number
  progressValue: number
}

export function ProgressHeader({ step, progressValue }: ProgressHeaderProps) {
  return (
    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
      <CardTitle className="text-3xl font-bold text-center">Inscription</CardTitle>
      <CardDescription className="text-blue-100 text-center">Rejoignez AfricaJobs en quelques étapes</CardDescription>
      <Progress value={progressValue} className="w-full mt-4 h-2 bg-blue-300" />
      <p className="text-center text-sm mt-2">Étape {step} sur 3</p>
    </CardHeader>
  )
}
