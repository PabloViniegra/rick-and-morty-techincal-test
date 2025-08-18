'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ALL_GENDERS, ALL_SPECIES, ALL_STATUS } from '@/lib/const'
import * as React from 'react'

export default function FilterPanel() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentStatus = searchParams.get('status') ?? ''
  const currentSpecies = searchParams.get('species') ?? ''
  const currentGender = searchParams.get('gender') ?? ''

  const statusValue = currentStatus || 'all'
  const speciesValue = currentSpecies || 'all'
  const genderValue = currentGender || 'all'

  const activeCount = React.useMemo(() => {
    let count = 0
    if (statusValue !== 'all' && statusValue) count += 1
    if (speciesValue !== 'all' && speciesValue) count += 1
    if (genderValue !== 'all' && genderValue) count += 1
    return count
  }, [statusValue, speciesValue, genderValue])

  const buildUrl = React.useCallback(
    (nextParams: URLSearchParams) => {
      nextParams.set('page', '1')
      const query = nextParams.toString()
      return `${pathname}${query ? `?${query}` : ''}`
    },
    [pathname]
  )

  const setParam = (key: 'status' | 'species' | 'gender', value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value && value !== 'all') params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(buildUrl(params))
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('status')
    params.delete('species')
    params.delete('gender')
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          className='group gap-2 rounded-lg border bg-card/60 px-3 py-2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/40 hover:bg-card'
        >
          <span className='font-medium font-sans tracking-tight'>Filtros</span>
          {activeCount > 0 && (
            <span className='ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-primary/10 px-2 text-xs font-medium text-primary'>
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-80 rounded-xl border bg-card/80 p-4 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/60'
        align='start'
      >
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-muted-foreground font-serif tracking-tight'>
              Status
            </label>
            <Select value={statusValue} onValueChange={val => setParam('status', val)}>
              <SelectTrigger className='rounded-md font-serif tracking-tight'>
                <SelectValue placeholder='Todos' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos</SelectItem>
                {ALL_STATUS.map(s => (
                  <SelectItem key={s} value={s.toLowerCase()}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-muted-foreground font-serif tracking-tight'>
              Especie
            </label>
            <Select value={speciesValue} onValueChange={val => setParam('species', val)}>
              <SelectTrigger className='rounded-md font-serif tracking-tight'>
                <SelectValue placeholder='Todas' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todas</SelectItem>
                {ALL_SPECIES.map(s => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-muted-foreground font-serif tracking-tight'>
              Género
            </label>
            <Select value={genderValue} onValueChange={val => setParam('gender', val)}>
              <SelectTrigger className='rounded-md font-serif tracking-tight'>
                <SelectValue placeholder='Todos' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos</SelectItem>
                {ALL_GENDERS.map(g => (
                  <SelectItem key={g} value={g.toLowerCase()}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='pt-2'>
            <Button
              variant='outline'
              className='w-full rounded-md border bg-background hover:bg-accent font-mono text-sm tracking-tight'
              onClick={clearFilters}
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
