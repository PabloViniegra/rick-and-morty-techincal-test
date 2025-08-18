'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  next: string | null
  prev: string | null
  className?: string
  currentPage: number
  totalPages: number
}

export function Pagination({
  next,
  prev,
  currentPage,
  totalPages,
  className,
  ...props
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleNavigation = (url: string | null) => {
    if (!url) return
    const page = new URL(url).searchParams.get('page')
    if (page) {
      const params = new URLSearchParams(searchParams)
      params.set('page', page)
      const newUrl = `${pathname}?${params.toString()}`
      router.push(newUrl)
    }
  }

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page))
    const params = new URLSearchParams(searchParams)
    params.set('page', String(clamped))
    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl)
  }

  const getVisiblePages = (current: number, total: number) => {
    const pages: (number | string)[] = []
    const windowSize = 5
    const start = Math.max(1, current - 2)
    const end = Math.min(total, current + 2)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('…')
    }

    for (let p = start; p <= end; p++) pages.push(p)

    if (end < total) {
      if (end < total - 1) pages.push('…')
      pages.push(total)
    }

    if (total <= windowSize) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    return pages
  }

  return (
    <div className={`flex items-center justify-between ${className}`} {...props}>
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>
          Página {currentPage} de {totalPages}
        </p>
      </div>
      <div className='flex items-center space-x-1'>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => (prev ? handleNavigation(prev) : goToPage(currentPage - 1))}
          disabled={currentPage <= 1 && !prev}
        >
          <span className='sr-only'>Ir a la página anterior</span>
          <ChevronLeft className='h-4 w-4' />
        </Button>

        {getVisiblePages(currentPage, totalPages).map((p, idx) =>
          typeof p === 'number' ? (
            <Button
              key={`page-${p}`}
              variant={p === currentPage ? 'default' : 'outline'}
              className='h-8 w-8 p-0'
              onClick={() => goToPage(p)}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </Button>
          ) : (
            <span key={`ellipsis-${idx}`} className='px-2 text-sm select-none'>
              {p}
            </span>
          )
        )}

        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => (next ? handleNavigation(next) : goToPage(currentPage + 1))}
          disabled={currentPage >= totalPages && !next}
        >
          <span className='sr-only'>Ir a la página siguiente</span>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
