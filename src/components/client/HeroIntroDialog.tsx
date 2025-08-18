'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function HeroIntroDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const shown = typeof window !== 'undefined' ? localStorage.getItem('heroIntroShown') : '1'
    if (!shown) {
      setOpen(true)
      localStorage.setItem('heroIntroShown', '1')
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-[min(96vw,1440px)] max-w-none sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] p-0 overflow-hidden border border-border/60 shadow-2xl sm:rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-background/85'>
        <div className='relative grid md:[grid-template-columns:1.1fr_1.4fr] md:min-h-[640px]'>
          <div className='relative hidden md:block bg-gradient-to-br from-accent via-secondary to-muted'>
            <div className='absolute inset-0 opacity-25'>
              <Image
                src='/images/rick-and-morty.png'
                alt='Rick and Morty'
                fill
                className='object-contain p-10'
                priority
              />
            </div>
          </div>
          <div className='p-6 sm:p-10 bg-background/95 flex flex-col justify-center'>
            <DialogHeader className='text-left space-y-3'>
              <span className='font-serif tracking-wide inline-flex w-fit items-center gap-2 rounded-full bg-secondary/70 px-3 py-1 text-xs text-secondary-foreground ring-1 ring-border/60'>
                Bienvenido
              </span>
              <DialogTitle className='text-3xl sm:text-4xl font-semibold leading-tight tracking-tight font-sans'>
                Explora el Multiverso de Rick and Morty
              </DialogTitle>
              <DialogDescription className='mt-3 text-lg text-muted-foreground max-w-prose font-serif'>
                Busca y filtra personajes por estado, especie y género. ¡Encuentra a tus favoritos y
                descubre nuevos!
              </DialogDescription>
            </DialogHeader>

            <div className='mt-8 flex flex-col sm:flex-row gap-3'>
              <Button
                size='lg'
                onClick={() => setOpen(false)}
                className='sm:w-auto w-full font-sans tracking-tight'
              >
                Empezar a explorar
              </Button>
            </div>
            <p className='mt-4 text-sm text-muted-foreground font-serif'>
              Consejo: usa el buscador y los filtros para afinar tus resultados.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
