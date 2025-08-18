import { Skeleton } from './Skeleton'

export default function CharacterSkeleton() {
  return (
    <div className='max-w-4xl mx-auto p-4 md:p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
        {/* Image skeleton */}
        <div className='relative aspect-square rounded-lg overflow-hidden bg-muted'>
          <div className='absolute bottom-4 left-4 h-6 w-24 rounded-full bg-background/80' />
        </div>

        {/* Content skeleton */}
        <div className='space-y-6'>
          <div>
            <Skeleton className='h-9 w-3/4' />
            <div className='mt-3 flex items-center gap-2'>
              <Skeleton className='h-3 w-3 rounded-full' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>

          <div className='space-y-4'>
            {/* Gender */}
            <div>
              <Skeleton className='h-4 w-14 mb-1' />
              <Skeleton className='h-5 w-20' />
            </div>
            
            {/* Origin */}
            <div>
              <Skeleton className='h-4 w-16 mb-1' />
              <Skeleton className='h-5 w-40' />
            </div>
            
            {/* Location */}
            <div>
              <Skeleton className='h-4 w-36 mb-1' />
              <Skeleton className='h-5 w-48' />
            </div>

            {/* Type (optional) */}
            <div>
              <Skeleton className='h-4 w-12 mb-1' />
              <Skeleton className='h-5 w-24' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
