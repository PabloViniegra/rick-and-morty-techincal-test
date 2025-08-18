'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Background({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className='min-h-screen w-full relative'>{children}</div>
  }

  return (
    <div className='min-h-screen w-full relative'>
      {theme === 'dark' ? (
        <div
          className='fixed inset-0 -z-10'
          style={{
            background: '#000000',
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
              radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
              radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
            `,
            backgroundSize: '20px 20px, 30px 30px, 25px 25px',
            backgroundPosition: '0 0, 10px 10px, 15px 5px',
          }}
        />
      ) : (
        <div
          className='fixed inset-0 -z-10'
          style={{
            background: '#f9fafb',
            backgroundImage: `
              linear-gradient(to right, #d1d5db 1px, transparent 1px),
              linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)',
            maskImage: 'radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)',
          }}
        />
      )}
      <div className='relative z-10'>{children}</div>
    </div>
  )
}
