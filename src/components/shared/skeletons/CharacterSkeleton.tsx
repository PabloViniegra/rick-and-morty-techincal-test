import { Skeleton } from './Skeleton'

export default function CharacterSkeleton() {
  return (
    <div className='w-full max-w-3xl mx-auto p-4 md:p-6'>
      <div className='flex flex-col items-center space-y-6 w-full'>
        {/* Header */}
        <div className='w-full text-center space-y-2'>
          <Skeleton className='h-9 w-3/4 mx-auto' />
          <div className='flex items-center justify-center gap-2'>
            <Skeleton className='h-3 w-3 rounded-full' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>

        {/* Main content */}
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Left column - Image */}
          <div className='md:col-span-1'>
            <div className='relative aspect-square rounded-lg overflow-hidden bg-muted'>
              <Skeleton className='h-full w-full' />
            </div>
          </div>

          {/* Right column - Details */}
          <div className='md:col-span-2 space-y-4'>
            {/* Status */}
            <div>
              <Skeleton className='h-4 w-16 mb-1' />
              <Skeleton className='h-5 w-24' />
            </div>

            {/* Species */}
            <div>
              <Skeleton className='h-4 w-16 mb-1' />
              <Skeleton className='h-5 w-32' />
            </div>

            {/* Gender */}
            <div>
              <Skeleton className='h-4 w-16 mb-1' />
              <Skeleton className='h-5 w-24' />
            </div>

            {/* Origin */}
            <div>
              <Skeleton className='h-4 w-16 mb-1' />
              <Skeleton className='h-5 w-40' />
            </div>

            {/* Location */}
            <div>
              <Skeleton className='h-4 w-20 mb-1' />
              <Skeleton className='h-5 w-48' />
            </div>

            {/* Type (if exists) */}
            <div>
              <Skeleton className='h-4 w-12 mb-1' />
              <Skeleton className='h-5 w-24' />
            </div>
          </div>
        </div>

        {/* Episodes section */}
        <div className='w-full pt-4'>
          <Skeleton className='h-6 w-48 mb-4' />
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='aspect-square w-full rounded-lg' />
                <Skeleton className='h-4 w-3/4 mx-auto' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
