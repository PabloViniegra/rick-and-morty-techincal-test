import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function EpisodeSkeleton() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto'>
      <Card className='relative w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
        <div className='absolute right-4 top-4 z-10 h-8 w-8 animate-pulse rounded-full bg-muted' />
        
        <CardHeader className='border-b bg-muted/50 p-6'>
          <div className='space-y-2'>
            <div className='h-8 w-3/4 animate-pulse rounded bg-muted' />
            <div className='flex items-center gap-4'>
              <div className='h-6 w-24 animate-pulse rounded bg-muted' />
              <div className='flex items-center'>
                <div className='mr-1 h-4 w-4 animate-pulse rounded-full bg-muted' />
                <div className='h-4 w-20 animate-pulse rounded bg-muted' />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-6'>
          <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-muted' />
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {[...Array(10)].map((_, i) => (
              <div key={i} className='flex flex-col items-center space-y-2 p-2'>
                <div className='h-16 w-16 animate-pulse rounded-full bg-muted' />
                <div className='h-4 w-16 animate-pulse rounded bg-muted' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
