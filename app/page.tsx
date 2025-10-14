"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Ghost,
  Calendar,
  MapPin,
  Music,
  Ticket,
  Users,
  Clock,
  Star,
  Sparkles,
  PartyPopper,
  Trophy,
  Zap,
  Heart,
  Menu,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function HalloweenPuno() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const prizes = [
    "Entrada VIP Gratis",
    "2x1 en Bebidas",
    "Meet & Greet DJs",
    "Merchandising",
    "Descuento 50%",
    "Barra Libre 1h",
    "Foto con DJs",
    "Entrada Premium",
  ]

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    const spins = 8 + Math.floor(Math.random() * 3)
    const randomDegree = Math.floor(Math.random() * 360)
    const totalRotation = rotation + spins * 360 + randomDegree

    setRotation(totalRotation)

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360
      const prizeIndex = Math.floor(((360 - normalizedRotation + 22.5) % 360) / (360 / prizes.length))
      setWinner(prizes[prizeIndex])
      setIsSpinning(false)
    }, 5000)
  }

  useEffect(() => {
    const eventDate = new Date("2025-10-31T20:00:00")

    const timer = setInterval(() => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Crear un elemento de cursor personalizado que parpadee
    const cursorGhost = document.createElement("div")
    cursorGhost.innerHTML = "👻"
    cursorGhost.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      font-size: 32px;
      transform: translate(-50%, -50%);
      animation: ghost-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      transition: transform 0.1s ease;
    `

    // Añadir la animación de parpadeo
    const style = document.createElement("style")
    style.textContent = `
      @keyframes ghost-pulse {
        0%, 100% {
          opacity: 1;
          filter: drop-shadow(0 0 10px rgba(255, 0, 102, 0.8));
        }
        50% {
          opacity: 0.5;
          filter: drop-shadow(0 0 5px rgba(255, 0, 102, 0.4));
        }
      }
    `
    document.head.appendChild(style)
    document.body.appendChild(cursorGhost)

    // Ocultar el cursor predeterminado
    document.body.style.cursor = "none"

    // Seguir el movimiento del mouse
    const moveCursor = (e: MouseEvent) => {
      cursorGhost.style.left = e.clientX + "px"
      cursorGhost.style.top = e.clientY + "px"
    }

    document.addEventListener("mousemove", moveCursor)

    // Limpiar al desmontar
    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.body.removeChild(cursorGhost)
      document.head.removeChild(style)
      document.body.style.cursor = "auto"
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-background/98 backdrop-blur-2xl border-b border-primary/20 shadow-2xl shadow-primary/10">
        <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Ghost className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
            </div>
            <span className="text-lg sm:text-2xl font-bold text-foreground tracking-tight">
              La Zona del <span className="text-primary">Pecado</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <button
              onClick={() => scrollToSection("evento")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide relative group"
            >
              EVENTO
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("programa")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide relative group"
            >
              PROGRAMA
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("ubicacion")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide relative group"
            >
              UBICACIÓN
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("ruleta")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide relative group"
            >
              SORTEO
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-2xl border-t border-primary/20 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("evento")}
                className="text-left text-base text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide py-2"
              >
                EVENTO
              </button>
              <button
                onClick={() => scrollToSection("programa")}
                className="text-left text-base text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide py-2"
              >
                PROGRAMA
              </button>
              <button
                onClick={() => scrollToSection("ubicacion")}
                className="text-left text-base text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide py-2"
              >
                UBICACIÓN
              </button>
              <button
                onClick={() => scrollToSection("ruleta")}
                className="text-left text-base text-muted-foreground hover:text-primary transition-colors font-semibold tracking-wide py-2"
              >
                SORTEO
              </button>
            </div>
          </div>
        )}
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20 px-4">
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-secondary/30 rounded-full blur-[150px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-primary/15 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Contador regresivo destacado */}
            <div className="mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4 rounded-full border border-primary/30 shadow-2xl shadow-primary/20 mb-6 sm:mb-8">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-foreground uppercase font-bold">
                  El evento comienza en
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
              </div>

              <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mb-8 sm:mb-12">
                <Card className="p-4 sm:p-8 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border-2 border-primary/40 backdrop-blur-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                  <div className="text-4xl sm:text-6xl md:text-7xl font-black text-primary mb-2 sm:mb-3 drop-shadow-[0_0_20px_rgba(255,0,102,0.5)]">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-[0.6rem] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                    Días
                  </div>
                </Card>
                <Card className="p-4 sm:p-8 bg-gradient-to-br from-secondary/30 via-secondary/10 to-transparent border-2 border-secondary/40 backdrop-blur-xl shadow-2xl shadow-secondary/30 hover:scale-105 transition-transform">
                  <div className="text-4xl sm:text-6xl md:text-7xl font-black text-primary mb-2 sm:mb-3 drop-shadow-[0_0_20px_rgba(255,0,102,0.5)]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[0.6rem] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                    Horas
                  </div>
                </Card>
                <Card className="p-4 sm:p-8 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border-2 border-primary/40 backdrop-blur-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                  <div className="text-4xl sm:text-6xl md:text-7xl font-black text-primary mb-2 sm:mb-3 drop-shadow-[0_0_20px_rgba(255,0,102,0.5)]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[0.6rem] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                    Min
                  </div>
                </Card>
                <Card className="p-4 sm:p-8 bg-gradient-to-br from-secondary/30 via-secondary/10 to-transparent border-2 border-secondary/40 backdrop-blur-xl shadow-2xl shadow-secondary/30 hover:scale-105 transition-transform">
                  <div className="text-4xl sm:text-6xl md:text-7xl font-black text-primary mb-2 sm:mb-3 drop-shadow-[0_0_20px_rgba(255,0,102,0.5)]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[0.6rem] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                    Seg
                  </div>
                </Card>
              </div>
            </div>

            {/* Título principal mejorado */}
            <div className="mb-6 sm:mb-10 inline-flex items-center gap-2 sm:gap-3 bg-card/60 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4 rounded-full border border-primary/20 shadow-xl">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-base tracking-[0.15em] sm:tracking-[0.25em] text-foreground uppercase font-bold">
                31 de Octubre 2025 • 8:00 PM
              </span>
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black mb-6 sm:mb-10 text-balance leading-[0.9] tracking-tight">
              LA ZONA
              <br />
              <span className="text-primary drop-shadow-[0_0_30px_rgba(255,0,102,0.8)]">DEL PECADO</span>
            </h1>

            <p className="text-lg sm:text-2xl md:text-3xl text-muted-foreground mb-10 sm:mb-14 max-w-4xl mx-auto text-pretty leading-relaxed font-light px-4">
              La celebración más espectacular de <span className="text-primary font-semibold">Puno</span>. Una noche
              épica de música, disfraces y experiencias inolvidables a orillas del Lago Titicaca.
            </p>

            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20 px-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("entradas")}
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 shadow-2xl shadow-primary/50 hover:shadow-[0_0_40px_rgba(255,0,102,0.6)] transition-all hover:scale-110 font-black tracking-wide"
              >
                COMPRAR ENTRADAS →
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("programa")}
                className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 border-2 border-primary/50 bg-transparent hover:bg-primary/10 hover:border-primary hover:scale-110 transition-all font-bold tracking-wide text-foreground"
              >
                VER PROGRAMA
              </Button>
            </div>

            {/* Stats mejorados */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <Card className="p-6 sm:p-8 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary/60 hover:bg-card/80 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all group">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 mx-auto group-hover:scale-125 transition-transform" />
                <div className="text-2xl sm:text-3xl font-black mb-2 text-primary">31 OCT</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-semibold">8:00 PM - 3:00 AM</div>
              </Card>

              <Card className="p-6 sm:p-8 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary/60 hover:bg-card/80 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all group">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 mx-auto group-hover:scale-125 transition-transform" />
                <div className="text-2xl sm:text-3xl font-black mb-2 text-primary">PUNO</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-semibold">Local Club del Tiro</div>
              </Card>

              <Card className="p-6 sm:p-8 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary/60 hover:bg-card/80 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all group">
                <Music className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 mx-auto group-hover:scale-125 transition-transform" />
                <div className="text-2xl sm:text-3xl font-black mb-2 text-primary">DJ</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-semibold">+ 2 Bandas en Vivo</div>
              </Card>

              <Card className="p-6 sm:p-8 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary/60 hover:bg-card/80 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all group">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 mx-auto group-hover:scale-125 transition-transform" />
                <div className="text-2xl sm:text-3xl font-black mb-2 text-primary">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-semibold">Asistentes</div>
              </Card>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="flex flex-col items-center gap-2">
            <div className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Descubre más</div>
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="ruleta"
        className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-card/30 to-background"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black mb-6 text-balance">
                RULETA DE <span className="text-primary">PREMIOS</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
                Todos los asistentes participan automáticamente. Gira la ruleta y gana increíbles premios durante la
                noche.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md aspect-square mb-10">
                  {/* Puntero mejorado */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20">
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-primary drop-shadow-[0_0_20px_rgba(255,0,102,0.8)]" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary/40 rounded-full blur-2xl" />
                    </div>
                  </div>

                  <div className="relative w-full h-full">
                    {/* Anillo de brillo exterior mejorado */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse" />
                    <div
                      className="absolute inset-4 rounded-full bg-primary/20 blur-2xl animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />

                    {/* Contenedor de la ruleta mejorado */}
                    <div
                      className="relative w-full h-full rounded-full border-[12px] border-primary shadow-[0_0_60px_rgba(255,0,102,0.6)] overflow-hidden bg-card"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isSpinning ? "transform 5s cubic-bezier(0.17, 0.67, 0.05, 1)" : "none",
                      }}
                    >
                      {prizes.map((prize, index) => {
                        const rotation = (360 / prizes.length) * index
                        const skewY = 90 - 360 / prizes.length
                        const isEven = index % 2 === 0

                        return (
                          <div
                            key={index}
                            className={`absolute w-1/2 h-1/2 origin-bottom-right ${
                              isEven
                                ? "bg-gradient-to-br from-primary via-primary to-primary/70"
                                : "bg-gradient-to-br from-secondary via-secondary to-secondary/70"
                            }`}
                            style={{
                              transform: `rotate(${rotation}deg) skewY(${skewY}deg)`,
                              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                            }}
                          >
                            <div
                              className="absolute top-[15%] left-[25%] text-sm font-black text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                              style={{
                                transform: `skewY(${-skewY}deg) rotate(${360 / prizes.length / 2}deg)`,
                                width: "100px",
                              }}
                            >
                              {prize}
                            </div>
                          </div>
                        )
                      })}

                      {/* Centro de la ruleta mejorado */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-card to-background border-4 border-primary flex items-center justify-center shadow-2xl">
                        <Ghost className="w-12 h-12 text-primary animate-pulse drop-shadow-[0_0_10px_rgba(255,0,102,0.8)]" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-2xl px-16 py-8 shadow-2xl shadow-primary/50 hover:shadow-[0_0_40px_rgba(255,0,102,0.8)] transition-all disabled:opacity-50 hover:scale-110 font-black tracking-wide"
                >
                  {isSpinning ? (
                    <span className="flex items-center gap-3">
                      <div className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      GIRANDO...
                    </span>
                  ) : (
                    "GIRAR RULETA"
                  )}
                </Button>

                {winner && (
                  <Card className="mt-8 p-10 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/30 border-3 border-primary animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-2xl shadow-primary/40 backdrop-blur-xl">
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <Sparkles className="w-16 h-16 text-primary animate-pulse drop-shadow-[0_0_20px_rgba(255,0,102,0.8)]" />
                        <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl" />
                      </div>
                      <h3 className="text-4xl font-black mb-3">¡FELICIDADES!</h3>
                      <p className="text-lg text-muted-foreground mb-4 font-semibold">Has ganado:</p>
                      <p className="text-5xl font-black text-primary mt-3 animate-pulse drop-shadow-[0_0_20px_rgba(255,0,102,0.6)]">
                        {winner}
                      </p>
                    </div>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card className="p-8 bg-card/60 backdrop-blur-xl border-2 border-primary/30 shadow-2xl">
                  <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
                    <Star className="w-8 h-8 text-primary" />
                    Premios Disponibles
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {prizes.map((prize, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-card/80 to-transparent border-2 border-primary/20 hover:border-primary/60 hover:bg-card transition-all hover:scale-105"
                      >
                        <div className="w-4 h-4 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,0,102,0.8)]" />
                        <span className="font-bold text-lg">{prize}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/40 shadow-xl backdrop-blur-xl">
                  <h4 className="font-black text-xl mb-5 flex items-center gap-3">
                    <Ticket className="w-6 h-6 text-primary" />
                    Cómo Participar
                  </h4>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Compra tu entrada para el evento</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Regístrate en la entrada con tu código QR</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Participa en los sorteos durante la noche</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Gana increíbles premios instantáneos</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-2 border-secondary/40 shadow-lg backdrop-blur-xl">
                  <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-3 font-semibold">
                    <PartyPopper className="w-6 h-6 text-primary" />
                    Se realizarán múltiples sorteos durante toda la noche
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evento" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black mb-6 text-balance">
                UNA EXPERIENCIA <span className="text-primary">ÚNICA</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Prepárate para vivir la noche más terrorífica y emocionante del año
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-10 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary transition-all group hover:shadow-2xl hover:shadow-primary/30 hover:scale-105">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 group-hover:bg-primary/30 transition-colors group-hover:scale-110 duration-300 mx-auto">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-black mb-5 text-center">Concurso de Disfraces</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  Premios increíbles para los mejores disfraces. Categorías: más terrorífico, más creativo, y mejor
                  grupo.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-bold text-lg">
                  <Star className="w-6 h-6" />
                  <span>Premios hasta S/ 500</span>
                </div>
              </Card>

              <Card className="p-10 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary transition-all group hover:shadow-2xl hover:shadow-primary/30 hover:scale-105">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 group-hover:bg-primary/30 transition-colors group-hover:scale-110 duration-300 mx-auto">
                  <Zap className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-black mb-5 text-center">Música en Vivo</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  DJs locales e internacionales. Música electrónica, rock, y los mejores éxitos para bailar toda la
                  noche.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-bold text-lg">
                  <Sparkles className="w-6 h-6" />
                  <span>5 DJs + 2 Bandas</span>
                </div>
              </Card>

              <Card className="p-10 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary transition-all group hover:shadow-2xl hover:shadow-primary/30 hover:scale-105">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 group-hover:bg-primary/30 transition-colors group-hover:scale-110 duration-300 mx-auto">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-black mb-5 text-center">Experiencias VIP</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  Acceso exclusivo a zonas VIP, bebidas premium, y la mejor vista del evento. Cupos limitados.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-bold text-lg">
                  <PartyPopper className="w-6 h-6" />
                  <span>Solo 50 pases VIP</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="programa" className="py-24 relative bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center text-balance">
              Programa de la <span className="text-primary">Noche</span>
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto text-pretty">
              Una noche llena de sorpresas, música y entretenimiento sin parar
            </p>

            <div className="space-y-6">
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <div className="text-3xl font-bold text-primary">8:00</div>
                      <div className="text-xs text-muted-foreground">PM</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Users className="w-6 h-6 text-primary" />
                      Apertura de Puertas
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Recepción de invitados, registro de participantes del concurso de disfraces y bienvenida con
                      música ambiental de Halloween.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover:border-secondary/50 transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex flex-col items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <div className="text-3xl font-bold text-secondary">9:00</div>
                      <div className="text-xs text-muted-foreground">PM</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Music className="w-6 h-6 text-secondary" />
                      DJ Set Opening - DJ Phantom
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Inicio oficial con el mejor DJ local. Música electrónica, house y los mejores remixes para
                      calentar la pista.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <div className="text-3xl font-bold text-primary">10:30</div>
                      <div className="text-xs text-muted-foreground">PM</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Ghost className="w-6 h-6 text-primary" />
                      Concurso de Disfraces
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Desfile de participantes en el escenario principal. Categorías: Más Terrorífico, Más Creativo,
                      Mejor Grupo. Premios de hasta S/ 500.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover:border-secondary/50 transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex flex-col items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <div className="text-3xl font-bold text-secondary">11:30</div>
                      <div className="text-xs text-muted-foreground">PM</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Music className="w-6 h-6 text-secondary" />
                      Banda en Vivo - Los Espectros
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Rock alternativo y covers de clásicos. Una hora de música en vivo con la mejor banda de Puno.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <div className="text-3xl font-bold text-primary">12:30</div>
                      <div className="text-xs text-muted-foreground">AM</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-primary" />
                      DJ Internacional - DJ Shadow
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      El momento más esperado de la noche. DJ invitado especial desde Lima con los mejores beats de EDM
                      y techno.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover:border-secondary/50 transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex flex-col items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <div className="text-3xl font-bold text-secondary">2:00</div>
                      <div className="text-xs text-muted-foreground">AM</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <PartyPopper className="w-6 h-6 text-secondary" />
                      Cierre Épico
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Última hora con los mejores éxitos de la noche. Sorpresas finales y despedida hasta el próximo
                      año.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Card className="inline-block p-6 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 inline mr-2" />
                  El programa puede estar sujeto a cambios. Mantente atento a nuestras redes sociales para
                  actualizaciones.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="ubicacion" className="py-24 relative bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 flex items-center justify-center gap-3">
              <MapPin className="w-8 h-8 text-secondary" />
              Ubicación del Evento
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Local club del tiro de Puno</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Jr. Pineda Arce Nro 159, Club del tiro Puno
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Fecha y Hora</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Viernes 31 de Octubre, 2025
                      <br />
                      Apertura de puertas: 8:00 PM
                      <br />
                      Evento hasta: 4:00 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Capacidad</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Aforo limitado a 500 personas
                      <br />
                      ¡Asegura tu entrada anticipada!
                    </p>
                  </div>
                </div>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Cómo llegar
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• A 5 minutos caminando de la Plaza de Armas</li>
                    <li>• Estacionamiento disponible en Jr. Deustua</li>
                    <li>• Acceso directo desde Av. El Sol</li>
                  </ul>
                </Card>
              </div>

              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-border shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14693.754058343819!2d-70.0377951!3d-15.837223!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69003a5bebd7%3A0xf33cfdf0e93a059e!2sClub%20Deportivo%20Sociedad%20de%20Tiro%20Manuel%20Pino%20Nro%2018!5e1!3m2!1ses!2spe!4v1760098120987!5m2!1ses!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="entradas" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black mb-6 text-balance">
                ASEGURA TU <span className="text-primary">ENTRADA</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
                Las entradas se están agotando rápidamente. No te quedes fuera del evento más esperado de Puno.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-10 bg-card/60 backdrop-blur-xl border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/20 hover:scale-105">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-3 uppercase tracking-[0.2em] font-bold">
                    Entrada Preventa
                  </div>
                  <div className="text-6xl font-black mb-4 text-primary">S/ 7</div>
                  <div className="text-base text-muted-foreground line-through mb-8">S/ 10</div>
                  <ul className="space-y-4 text-sm text-left mb-10">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Acceso al evento completo</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Participación en concursos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Música en vivo</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-card hover:bg-primary/20 text-foreground border-2 border-primary/50 hover:border-primary font-bold text-lg py-6">
                    COMPRAR
                  </Button>
                </div>
              </Card>

              <Card className="p-10 bg-gradient-to-b from-primary/30 via-primary/20 to-card/60 backdrop-blur-xl border-3 border-primary relative overflow-hidden hover:shadow-[0_0_60px_rgba(255,0,102,0.4)] transition-all scale-110 shadow-2xl shadow-primary/30">
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground text-xs font-black px-4 py-2 rounded-full shadow-lg">
                  MÁS POPULAR
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-3 uppercase tracking-[0.2em] font-bold">
                    Entrada Popular
                  </div>
                  <div className="text-6xl font-black mb-4 text-primary drop-shadow-[0_0_20px_rgba(255,0,102,0.6)]">
                    S/ 10
                  </div>
                  <div className="text-base text-muted-foreground line-through mb-8">S/ 15</div>
                  <ul className="space-y-4 text-sm text-left mb-10">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Todo lo de Preventa</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">1 bebida de cortesía</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Acceso prioritario</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Zona de descanso</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-black text-lg py-6 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60">
                    COMPRAR AHORA
                  </Button>
                </div>
              </Card>

              <Card className="p-10 bg-card/60 backdrop-blur-xl border-2 border-secondary/30 hover:border-secondary/60 transition-all hover:shadow-2xl hover:shadow-secondary/20 hover:scale-105">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-3 uppercase tracking-[0.2em] font-bold">
                    Venta en Puerta
                  </div>
                  <div className="text-6xl font-black mb-4 text-primary">S/ 15</div>
                  <div className="text-base text-muted-foreground line-through mb-8">S/ 20</div>
                  <ul className="space-y-4 text-sm text-left mb-10">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Acceso al evento completo</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Participación en concursos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Musicas en vivo </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold">Acceso prioritario</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg py-6 border-2 border-secondary">
                    COMPRAR
                  </Button>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block p-6 bg-primary/10 border-2 border-primary/30 backdrop-blur-xl">
                <p className="text-sm text-muted-foreground font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Descuento válido solo para compras anticipadas • Cupos limitados
                  <Sparkles className="w-5 h-5 text-primary" />
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-primary/20 py-16 bg-card/30 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Ghost className="w-10 h-10 text-primary" />
                  <span className="text-2xl font-black">
                    Halloween <span className="text-primary">Puno</span>
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  La celebración de Halloween más espectacular de Puno. Una noche épica que no olvidarás.
                </p>
                <div className="flex gap-4">
                  <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                    Facebook
                  </Button>
                  <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                    Instagram
                  </Button>
                  <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                    TikTok
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-black text-lg mb-4">Enlaces</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <button
                      onClick={() => scrollToSection("evento")}
                      className="hover:text-primary transition-colors font-semibold"
                    >
                      Evento
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("programa")}
                      className="hover:text-primary transition-colors font-semibold"
                    >
                      Programa
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("ubicacion")}
                      className="hover:text-primary transition-colors font-semibold"
                    >
                      Ubicación
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("entradas")}
                      className="hover:text-primary transition-colors font-semibold"
                    >
                      Entradas
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-lg mb-4">Contacto</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="font-semibold">info@halloweenpuno.com</li>
                  <li className="font-semibold">+51 951 234 567</li>
                  <li className="font-semibold">Puno, Perú</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground font-semibold">
                © 2025 Halloween Puno. Todos los derechos reservados.
              </div>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <button className="hover:text-primary transition-colors font-semibold">Términos</button>
                <button className="hover:text-primary transition-colors font-semibold">Privacidad</button>
                <button className="hover:text-primary transition-colors font-semibold">Cookies</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
