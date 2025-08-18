import { Skeleton } from './Skeleton'

export default function CharacterCardSkeleton() {
  return (
    <article className='rounded-lg border border-border bg-card text-foreground shadow-sm overflow-hidden'>
      <div className='relative aspect-[4/3] w-full bg-muted'>
        <div className='absolute left-2 top-2'>
          <Skeleton className='h-5 w-16 rounded-full bg-background/60' />
        </div>
      </div>

      <div className='p-3 sm:p-4'>
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='mt-2 h-4 w-1/2' />

        <div className='mt-3 grid grid-cols-2 gap-2'>
          <div>
            <Skeleton className='h-3 w-12' />
            <Skeleton className='mt-2 h-4 w-24' />
          </div>
          <div>
            <Skeleton className='h-3 w-14' />
            <Skeleton className='mt-2 h-4 w-28' />
          </div>
        </div>
      </div>
    </article>
  )
}
