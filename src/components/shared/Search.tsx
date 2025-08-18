'use client'

import { Input } from '@/components/ui/input'
import { Search as SearchIcon, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setSearchValue(searchParams.get('name')?.toString() ?? '')
  }, [searchParams])

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('name', query)
      params.delete('page')
    } else {
      params.delete('name')
      params.delete('page')
    }
    const newUrl = `${pathname}?${params.toString()}`
    replace(newUrl)
  }, 400)

  const handleClear = () => {
    setSearchValue('')
    handleSearch('')
  }

  return (
    <div className='relative w-full max-w-sm items-center'>
      <Input
        id='search'
        type='text'
        placeholder='Search...'
        className='pl-10 pr-8 font-sans'
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
          handleSearch(e.target.value)
        }}
      />
      <span className='absolute start-0 inset-y-0 flex items-center justify-center px-2'>
        <SearchIcon className='size-6 text-muted-foreground' />
      </span>
      {searchValue && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute end-0 inset-y-0 flex items-center justify-center px-2 text-muted-foreground hover:text-foreground transition-colors'
          aria-label='Clear search'
        >
          <X className='size-5' />
        </button>
      )}
    </div>
  )
}
