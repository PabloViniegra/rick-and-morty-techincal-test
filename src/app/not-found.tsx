import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='min-h-[calc(100vh-3.5rem)] w-full bg-background text-foreground'>
      <section className='mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16 text-center'>
        <div className='inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-mono font-medium text-muted-foreground'>
          404 • Universo no encontrado
        </div>
        <h1 className='font-sans text-4xl font-bold tracking-tight sm:text-5xl'>
          Parece que tomaste el portal equivocado
        </h1>
        <p className='max-w-prose text-md font-serif tracking-tight text-muted-foreground sm:text-base'>
          Esta dimensión no contiene la página que buscas. Intenta regresar al universo principal
          antes de que aparezca un Meeseeks.
        </p>
        <div className='relative mt-2 h-48 w-48 sm:h-56 sm:w-56'>
          <Image
            src='/images/rick-and-morty.png'
            alt='Rick and Morty'
            fill
            sizes='(max-width: 640px) 12rem, 14rem'
            className='object-contain drop-shadow'
            priority
          />
        </div>
        <div className='flex items-center gap-3 pt-2'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium font-sans text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  )
}
