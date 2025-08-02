'use client'

import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { useActionState, useEffect, useRef, useState } from 'react'
import { submitWord, SubmitWordState } from '../actions'

const initialState: SubmitWordState = {
  message: '',
}

export type Word = {
  word: string
  rank: number
}

export default function WordsSelector({
  initialWords,
}: {
  initialWords: Array<Word>
}) {
  useEffect(() => {
    authClient.getSession().then((res) => {
      const session = res.data
      if (session == null) {
        authClient.signIn.anonymous().then(() => {
          console.log('Signed in')
        })
      } else {
        console.log('Already signed in')
      }
    })
  }, [])

  const [guessed, setGuessed] = useState(
    initialWords.find((w) => w.rank == 1) != null,
  )
  const [words, setWords] = useState(initialWords)
  const [state, formAction, pending] = useActionState(submitWord, initialState)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (
      state.foundWord &&
      words.find((w) => w.word == state.foundWord) == null
    ) {
      setWords([
        ...words,
        { word: state.foundWord, rank: state.foundWordRank! },
      ])
      if (state.foundWordRank == 1) {
        setGuessed(true)
      }
    }
    inputRef.current?.focus()
  }, [state.foundWord])
  return (
    <main className="flex flex-col items-center pt-[10%] min-h-screen">
      <div className="md:w-[450px]">
        {guessed && (
          <div className="text-center mb-14">
            <h1 className="text-4xl">Вы отгадали слово дня 🎉</h1>
            <h1 className="text-2xl mt-2">Попыток: {words.length}</h1>
          </div>
        )}
        <form action={formAction}>
          <Input
            ref={inputRef}
            autoFocus
            disabled={pending}
            name="word"
            autoComplete="off"
            placeholder="введите слово"
            className="dark:bg-zinc-800 md:text-2xl md:px-4 md:py-6 mb-4 border-2"
          />
          <Input
            hidden
            readOnly
            name="date"
            type="date"
            value={new Date().toISOString().split('T')[0]}
          />
        </form>
        {pending && <p className="text-lg mb-4 px-3 py-2">Загрузка...</p>}
        {!pending && state.message && (
          <p className="text-lg mb-4 px-3 py-2 text-red-500">{state.message}</p>
        )}
        {!pending && state.foundWord && (
          <div
            className={cn(
              'bg-orange-500 text-lg font-bold px-3 py-2 mb-4 rounded-md flex justify-between',
              {
                'bg-green-600': state.foundWordRank! <= 100,
                'bg-red-700': state.foundWordRank! > 1500,
              },
            )}
          >
            <div>{state.foundWord}</div>
            <div className="font-bold">{state.foundWordRank}</div>
          </div>
        )}
        {words
          .sort((a, b) => a.rank - b.rank)
          .map((word) => (
            <div
              key={word.rank}
              className={cn(
                'text-lg bg-orange-500 font-bold px-3 py-2 mb-1.5 rounded-md flex justify-between',
                {
                  'bg-green-600': word.rank <= 100,
                  'bg-red-700': word.rank > 1500,
                },
              )}
            >
              <div>{word.word}</div>
              <div className="font-bold">{word.rank}</div>
            </div>
          ))}
      </div>
    </main>
  )
}
