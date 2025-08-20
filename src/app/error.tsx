'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className='min-h-[calc(100vh-3.5rem)] w-full bg-background text-foreground'>
      <section className='mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16 text-center'>
        <div className='inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-mono font-medium text-muted-foreground'>
          ¡Wubba Lubba Dub-Dub! • Ocurrió un error
        </div>
        <h1 className='font-sans text-4xl font-bold tracking-tight sm:text-5xl'>
          Algo salió mal en esta dimensión
        </h1>
        <p className='max-w-prose text-md font-mono tracking-tight text-muted-foreground sm:text-base'>
          {error?.message ?? 'Se produjo un error inesperado.'}
        </p>
        {error?.digest && (
          <p className='text-xs font-serif text-muted-foreground/80'>Código: {error.digest}</p>
        )}
        <div className='relative mt-2 h-44 w-44 sm:h-52 sm:w-52'>
          <Image
            src='/images/rick-and-morty.png'
            alt='Rick and Morty error portal'
            fill
            sizes='(max-width: 640px) 11rem, 13rem'
            className='object-contain drop-shadow'
            priority
          />
        </div>
        <div className='flex items-center gap-3 pt-2'>
          <button
            onClick={() => reset()}
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-sans font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            Reintentar
          </button>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-sans font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  )
}
