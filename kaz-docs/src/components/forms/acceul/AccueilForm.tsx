"use client"; 
import React from 'react'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form" 

const formSchema = z.object({
name: z.string().min(1, "Nom requis"),
email: z.string().email("Format d'email invalide"),
company: z.string().min(1, "Nom de l'entreprise requis"),
sector: z.string().min(1, "Secteur requis"),
subscription: z.string().min(1, "Quantité requise"),
message: z.string().min(1, "Message requis"),
})

export default function AccueilForm() {


type FormData = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data)
  }
  return (
  <CardContent className="p-8">
      <h3 className="text-xl font-bold mb-6">Demande d'information</h3>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" {...register("name")} placeholder="Ex: Ahmed Ben Ali" className="h-11" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email professionnel</Label>
            <Input id="email" type="email" {...register("email")} placeholder="exemple@entreprise.com" className="h-11" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="company">Société</Label>
            <Input id="company" {...register("company")} placeholder="Nom de votre société" className="h-11" />
            {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Secteur d'activité</Label>
            <Input id="sector" {...register("sector")} placeholder="Ex: Commerce, Audit, Banque" className="h-11" />
            {errors.sector && <p className="text-red-500 text-sm">{errors.sector.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subscription">Volume estimé (pages/an)</Label>
          <Input id="subscription" {...register("subscription")} placeholder="Ex: 1000" className="h-11" />
          {errors.subscription && <p className="text-red-500 text-sm">{errors.subscription.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Votre besoin</Label>
          <Textarea id="message" {...register("message")} placeholder="Décrivez brièvement votre besoin ou vos questions" className="min-h-[120px] resize-none" />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={!isValid} className="w-full h-11 rounded-md font-medium shadow-md hover:shadow-lg transition-all">
            Demander une démo
          </Button>
          <p className="mt-3 text-xs text-center text-muted-foreground">
            En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </form>
    </CardContent>
  )
}
 
 

