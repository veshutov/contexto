import { cn } from '@/lib/utils'

export default function GuessedWord({
  word,
  rank,
  className,
}: {
  word: string
  rank: number
  className?: string
}) {
  const { backgroundClass, fillWidth } = getStyleProps(rank)

  return (
    <div
      key={rank}
      className={cn(
        'text-lg font-bold px-3 py-2 mb-1.5 rounded-md flex justify-between relative overflow-hidden bg-zinc-800',
        className,
      )}
    >
      <div
        className={cn(`absolute inset-0 rounded-md`, backgroundClass)}
        style={{ width: `${fillWidth}%` }}
      />
      <div className="relative z-10">{word}</div>
      <div className="font-bold relative z-10">{rank}</div>
    </div>
  )
}

function getStyleProps(rank: number): {
  backgroundClass: string
  fillWidth: number
} {
  let backgroundClass: string

  if (rank <= 300) {
    backgroundClass = 'bg-green-600'
  } else if (rank <= 1500) {
    backgroundClass = 'bg-orange-500'
  } else {
    backgroundClass = 'bg-red-700'
  }

  const fillWidth = (Math.max(1800 - rank, 50) / 1800) * 100

  return { backgroundClass, fillWidth }
}
