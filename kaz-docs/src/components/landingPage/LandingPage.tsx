import React from "react";
// KazDocs Homepage (French, AI-focused) built with shadcn/ui + Tailwind

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AccueilForm from "../forms/acceul/AccueilForm";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 text-foreground">
      {/* Navigation placeholder - can be replaced with actual navigation component */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">KazDocs</div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Fonctionnalités</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">Comment ça marche</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
            <Button variant="outline" size="sm" className="ml-2">Se connecter</Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </header>
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-8">
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">IA • Vérification documentaire</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                L'Intelligence Artificielle au service de vos documents.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Notre IA analyse, extrait et compare les données de vos factures,
                devis et audits pour une précision inégalée. <span className="font-medium text-foreground">Gagnez des heures,
                pas des minutes.</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                Demander une Démo
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-primary/20 hover:bg-primary/5 transition-all">
                Explorer les fonctionnalités
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg p-5 bg-background shadow-sm border border-border/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 17h6"/><path d="M9 13h6"/></svg>
                  </div>
                  <p className="font-semibold">Extraction intelligente</p>
                </div>
                <p className="text-muted-foreground">Données prêtes à l'emploi en quelques secondes.</p>
              </div>
              <div className="rounded-lg p-5 bg-background shadow-sm border border-border/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h.01"/><path d="M15 15h.01"/><path d="m9.5 15 5-5"/></svg>
                  </div>
                  <p className="font-semibold">Comparaison automatisée</p>
                </div>
                <p className="text-muted-foreground">Détecte instantanément les incohérences.</p>
              </div>
            </div>
          </div>

          {/* Visual / Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Document stack background */}
              <div className="absolute -right-4 -bottom-4 w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-border/40"></div>
              <div className="absolute -left-4 -top-4 w-full h-full bg-gradient-to-tr from-primary/10 to-primary/5 rounded-2xl border border-border/40"></div>
              
              {/* Main illustration card */}
              <div className="relative w-full bg-gradient-to-br from-background to-muted/30 rounded-2xl p-8 shadow-xl border border-border/60 overflow-hidden">
                {/* Abstract data flow visualization */}
                <div className="relative z-10">
                  <svg viewBox="0 0 600 360" className="w-full h-64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#6366f1" stopOpacity="0.9" />
                        <stop offset="1" stopColor="#06b6d4" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="g2" x1="1" x2="0" y1="1" y2="0">
                        <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#3b82f6" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="2" dy="2" result="offsetblur" />
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.2" />
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background grid */}
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Document flow elements */}
                    <g filter="url(#shadow)">
                      <rect x="40" y="40" width="120" height="60" rx="8" fill="url(#g1)" opacity="0.7" />
                      <rect x="220" y="40" width="140" height="60" rx="8" fill="url(#g2)" opacity="0.7" />
                      <rect x="420" y="40" width="120" height="60" rx="8" fill="url(#g1)" opacity="0.7" />
                      
                      {/* Connection lines */}
                      <path d="M 160 70 L 220 70" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M 360 70 L 420 70" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                      
                      {/* Data points */}
                      <circle cx="190" cy="70" r="4" fill="#6366f1" />
                      <circle cx="390" cy="70" r="4" fill="#6366f1" />
                      
                      {/* Document data */}
                      <rect x="40" y="140" width="500" height="20" rx="4" fill="white" fillOpacity="0.3" />
                      <rect x="40" y="170" width="460" height="20" rx="4" fill="white" fillOpacity="0.3" />
                      <rect x="40" y="200" width="480" height="20" rx="4" fill="white" fillOpacity="0.3" />
                      <rect x="40" y="230" width="420" height="20" rx="4" fill="white" fillOpacity="0.3" />
                      
                      {/* Highlight points */}
                      <circle cx="480" cy="200" r="15" fill="#6366f1" fillOpacity="0.3" />
                      <circle cx="480" cy="200" r="6" fill="#6366f1" />
                      <circle cx="380" cy="230" r="15" fill="#06b6d4" fillOpacity="0.3" />
                      <circle cx="380" cy="230" r="6" fill="#06b6d4" />
                    </g>
                    
                    {/* Labels */}
                    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Documents</text>
                    <text x="290" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">IA Analyse</text>
                    <text x="480" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Résultats</text>
                  </svg>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10 mt-2">
                  <p className="text-center text-sm font-medium text-foreground">Flux d'analyse intelligent</p>
                  <p className="text-center text-xs text-muted-foreground mt-1">Extraction • Analyse • Comparaison • Vérification</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative py-24">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent -skew-y-3 z-0"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70 -translate-y-1/2 z-0"></div>
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-60 z-0"></div>
          
          {/* PROBLEM */}
          <section id="features" className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="col-span-1 md:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    Enjeux Business
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                    Les vérifications manuelles vous coûtent plus que vous ne le pensez
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Les processus manuels de vérification documentaire ne sont pas seulement chronophages — ils représentent un véritable frein à votre croissance et à votre rentabilité.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                      </div>
                      <div>
                        <p className="font-medium">Automatisation complète</p>
                        <p className="text-sm text-muted-foreground">De l'extraction à la vérification, sans intervention humaine</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                      </div>
                      <div>
                        <p className="font-medium">ROI mesurable</p>
                        <p className="text-sm text-muted-foreground">Réduction des coûts opérationnels de 40% en moyenne</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="default" className="group rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                      Découvrir notre solution
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-5">
                <div className="space-y-6">
                  <Card className="border-none bg-gradient-to-br from-background to-muted shadow-lg hover:shadow-xl transition-all overflow-hidden">
                    <div className="h-1.5 bg-destructive/80"></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-destructive/10 text-destructive shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Perte de temps critique</h3>
                          <p className="text-muted-foreground">Les vérifications manuelles mobilisent vos équipes sur des tâches à faible valeur ajoutée et ralentissent vos processus de décision.</p>
                          <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm font-medium">Gain de temps avec KazDocs</p>
                            <p className="text-sm font-bold text-primary">+70%</p>
                          </div>
                          <div className="mt-2 w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-gradient-to-br from-background to-muted shadow-lg hover:shadow-xl transition-all overflow-hidden">
                    <div className="h-1.5 bg-destructive/80"></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-destructive/10 text-destructive shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Risque d'erreurs coûteuses</h3>
                          <p className="text-muted-foreground">Les erreurs humaines dans la vérification documentaire peuvent entraîner des pertes financières importantes et des risques de conformité.</p>
                          <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm font-medium">Précision de KazDocs</p>
                            <p className="text-sm font-bold text-primary">99.2%</p>
                          </div>
                          <div className="mt-2 w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '99.2%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-gradient-to-br from-background to-muted shadow-lg hover:shadow-xl transition-all overflow-hidden">
                    <div className="h-1.5 bg-destructive/80"></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-destructive/10 text-destructive shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Difficulté de mise à l'échelle</h3>
                          <p className="text-muted-foreground">L'augmentation du volume documentaire exige des ressources supplémentaires, limitant votre capacité à gérer la croissance efficacement.</p>
                          <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm font-medium">Capacité de traitement</p>
                            <p className="text-sm font-bold text-primary">Illimitée</p>
                          </div>
                          <div className="mt-2 w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* SOLUTION */}
        <section className="py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Notre Solution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Découvrez la puissance de l'IA de KazDocs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Extraction, comparaison et workflows personnalisables — conçus pour vos besoins métier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-border/40 shadow-md hover:shadow-lg transition-all">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <CardContent className="p-8">
                <div className="mb-6 p-3 rounded-full bg-blue-500/10 w-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15v-2"/><path d="M12 15v-6"/><path d="M15 15v-4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Extraction Intelligente par IA</h3>
                <p className="text-muted-foreground">Notre technologie lit et comprend vos documents comme un humain, mais à la vitesse d'une machine. Reconnaissance de texte avancée et contextuelle.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                    Reconnaissance multi-formats
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                    Extraction structurée des données
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/40 shadow-md hover:shadow-lg transition-all">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-400"></div>
              <CardContent className="p-8">
                <div className="mb-6 p-3 rounded-full bg-purple-500/10 w-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Analyse Comparative Automatisée</h3>
                <p className="text-muted-foreground">Croisez les données et détectez immédiatement les incohérences entre vos documents. Identifiez les anomalies en quelques secondes.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                    Détection d'anomalies
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                    Rapports d'écarts automatisés
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/40 shadow-md hover:shadow-lg transition-all">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-400"></div>
              <CardContent className="p-8">
                <div className="mb-6 p-3 rounded-full bg-emerald-500/10 w-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Workflows 100% Personnalisables</h3>
                <p className="text-muted-foreground">Configurez vos règles métier — l'IA s'adapte à vous, pas l'inverse. Créez des processus sur mesure pour votre activité.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                    Règles métier personnalisées
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                    Intégration à vos outils existants
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-muted/30 rounded-3xl my-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                Processus Simplifié
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Opérationnel en 3 étapes simples
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Une expérience fluide pensée pour les équipes opérationnelles, sans formation technique requise.
              </p>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="relative">
                  <div className="bg-background rounded-xl shadow-lg p-8 relative z-10 border border-border/40 h-full flex flex-col">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6 shadow-md">
                      1
                    </div>
                    <h3 className="text-xl font-bold mb-4">Importez vos documents</h3>
                    <p className="text-muted-foreground flex-grow">Téléchargez vos documents en quelques secondes. Compatible avec tous les formats courants : PDF, images, documents scannés ou archives.</p>
                    <div className="mt-6 flex items-center text-sm text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      Glissez-déposez ou parcourez
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-background rounded-xl shadow-lg p-8 relative z-10 border border-border/40 h-full flex flex-col">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6 shadow-md">
                      2
                    </div>
                    <h3 className="text-xl font-bold mb-4">Laissez notre IA analyser</h3>
                    <p className="text-muted-foreground flex-grow">Notre intelligence artificielle identifie automatiquement le type de document, extrait les données pertinentes et les structure selon vos besoins.</p>
                    <div className="mt-6 flex items-center text-sm text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                      Traitement intelligent et contextuel
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-background rounded-xl shadow-lg p-8 relative z-10 border border-border/40 h-full flex flex-col">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6 shadow-md">
                      3
                    </div>
                    <h3 className="text-xl font-bold mb-4">Obtenez des résultats précis</h3>
                    <p className="text-muted-foreground flex-grow">Vérifiez, validez et exportez les données extraites. Identifiez instantanément les incohérences entre vos documents et prenez des décisions éclairées.</p>
                    <div className="mt-6 flex items-center text-sm text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Résultats prêts à l'emploi
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button className="rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                Découvrir notre démo
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA / FORM */}
        <section id="contact" className="py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Contactez-nous
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Passez à l'ère de la vérification intelligente
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Demandez une démo personnalisée ou laissez-nous vos informations — notre équipe vous répondra sous 48 heures avec une solution adaptée à vos besoins.
                </p>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Support dédié</h4>
                      <p className="text-sm text-muted-foreground">Une équipe d'experts à votre écoute pour répondre à toutes vos questions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z"/><path d="M7 22V11"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Démo personnalisée</h4>
                      <p className="text-sm text-muted-foreground">Voyez comment KazDocs peut s'adapter à vos processus spécifiques.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="overflow-hidden border-border/40 shadow-xl">
                  <div className="h-2 bg-gradient-to-r from-primary to-primary/60"></div>
                 <AccueilForm/>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-border/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="font-bold text-xl tracking-tight mb-4">KazDocs</div>
                <p className="text-sm text-muted-foreground max-w-md">
                  Solution d'intelligence artificielle pour l'extraction, l'analyse et la comparaison de données documentaires.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Liens rapides</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</a></li>
                  <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">Comment ça marche</a></li>
                  <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Légal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Mentions légales</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Politique de confidentialité</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">CGU</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} KazDocs — Tous droits réservés.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
