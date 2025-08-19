'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Laptop, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import Link from 'next/link'
import { GithubIcon } from '@/components/ui/github'
import { LinkedinIcon } from '@/components/ui/linkedin'
import { GalleryThumbnailsIcon } from '@/components/ui/gallery-thumbnails'

function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const current = (theme ?? resolvedTheme ?? 'system') as 'light' | 'dark' | 'system'

  const iconMap: Record<string, React.ReactNode> = {
    light: <Sun className='h-4 w-4' />,
    dark: <Moon className='h-4 w-4' />,
    system: <Laptop className='h-4 w-4' />,
  }

  const themes = [
    { value: 'light', label: 'Light', icon: iconMap.light },
    { value: 'dark', label: 'Dark', icon: iconMap.dark },
    { value: 'system', label: 'System', icon: iconMap.system },
  ]

  return (
    <Select value={current} onValueChange={v => setTheme(v)}>
      <SelectTrigger className='w-[120px] gap-2'>
        <span className='flex items-center gap-2'>
          {iconMap[current]}
          <span className='capitalize'>{current}</span>
        </span>
      </SelectTrigger>
      <SelectContent>
        {themes.map(({ value, label, icon }) => (
          <SelectItem key={value} value={value}>
            <div className='flex items-center gap-2'>
              {icon}
              <span>{label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function AppNavbar() {
  return (
    <nav className='sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded-full'
        >
          <Image
            src='/images/logo.png'
            alt='Logo'
            width={24}
            height={24}
            className='rounded-full'
          />
          <span className='font-serif uppercase text-sm tracking-tight font-medium'>
            Rick & Morty
          </span>
        </Link>
        <div className='flex items-center gap-8'>
          <ThemeSelector />
          <nav className='flex items-center gap-2'>
            <a
              href='https://portfolio-pablo-viniegra.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              aria-label='Portfolio'
            >
              <GalleryThumbnailsIcon size={16} />
            </a>
            <a
              href='https://github.com/PabloViniegra/rick-and-morty-techincal-test'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              aria-label='GitHub'
            >
              <GithubIcon size={16} />
            </a>
            <a
              href='https://www.linkedin.com/in/pablo-viniegra-picazo/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              aria-label='LinkedIn'
            >
              <LinkedinIcon size={16} />
            </a>
          </nav>
        </div>
      </div>
    </nav>
  )
}
