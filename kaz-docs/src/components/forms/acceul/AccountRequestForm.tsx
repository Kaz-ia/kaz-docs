"use client"; 
import React, { useState } from 'react'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form" 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
name: z.string().min(1, "Nom requis"),
email: z.string().email("Format d'email invalide"),
company: z.string().optional(),
sector: z.string().optional(),
 subscription: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.endsWith('+')) {
          return 100000;
        }
        const parts = val.split('-');
        const num = parseInt(parts[parts.length - 1]);
        return isNaN(num) ? val : num;
      }
      return val;
    },
    z.number().min(1000, "Quantité requise") 
  ),message: z.string().optional(),
})

export default function AccueilForm() {
const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    isError: false,
  });

type FormData = z.infer<typeof formSchema>

    const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })
const handleSubscriptionChange = (value: string) => {
  let numValue;
  if (value === "10000+") {
    numValue = 100000;
  } else {
    const parts = value.split('-');
    numValue = parseInt(parts[parts.length - 1]);
  }
  setValue("subscription", numValue, { shouldValidate: true });
};
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
  
     const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
        sector: data.sector,
        subscription: data.subscription,
      }),
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));  
     if (!response.ok) {
        throw new Error("Échec de l'envoi");
      }
        setDialogContent({
        title: "Formulaire soumis",
        description: "Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.",
        isError: false,
      });
      setDialogOpen(true);
      reset();
    }catch (error) {
      setDialogContent({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer plus tard.",
        isError: true,
      });
      setDialogOpen(true);
      console.error("Error submitting form:", error);
    }
  finally {
      setIsLoading(false);
    }
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
  <Select
    onValueChange={handleSubscriptionChange}
  >
    <SelectTrigger id="subscription" className="h-11">
      <SelectValue placeholder="Page approximatives par an" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="0-1000">0 - 1 000 / an</SelectItem>
      <SelectItem value="1000-10000">1 000 - 10 000 / an</SelectItem>
      <SelectItem value="10000+">+10 000 / an</SelectItem>
    </SelectContent>
  </Select>
          {errors.subscription && <p className="text-red-500 text-sm">{errors.subscription.message}</p>}
</div>

        <div className="space-y-2">
          <Label htmlFor="message">Votre besoin</Label>
          <Textarea id="message" {...register("message")} placeholder="Décrivez brièvement votre besoin ou vos questions" className="min-h-[120px] resize-none" />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <div className="pt-2">
          <Button type="submit"
           disabled={!isValid || isLoading}
            className="w-full h-11 rounded-md font-medium shadow-md hover:shadow-lg transition-all">
           {isLoading ? "Envoi..." : "Demander une démo"} 
          </Button>
          <p className="mt-3 text-xs text-center text-muted-foreground">
            En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </form>
      
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogContent.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className={dialogContent.isError ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    
    </CardContent>
  )
}
 
 

