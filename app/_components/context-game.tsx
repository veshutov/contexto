'use client'

import { Input } from '@/components/ui/input'
import { USER_ID_COOKIE } from '@/lib/utils'
import Image from 'next/image'
import { useActionState, useEffect, useRef, useState } from 'react'
import { v7 as uuidv7 } from 'uuid'
import { SubmitWordState as SubmittedWordState, submitWord } from '../actions'
import GuessedWord from './guessed-word'
import InfoIcon from './info-icon'

const guessInitialState: SubmittedWordState = {
  message: '',
}

export type Word = {
  word: string
  rank: number
}

export default function ContextGame({
  gameDate,
  gameWon,
  initialWords,
}: {
  gameDate: string
  gameWon: boolean
  initialWords: Array<Word>
}) {
  useEffect(() => {
    if (!document.cookie.includes(USER_ID_COOKIE)) {
      document.cookie = `${USER_ID_COOKIE}=${uuidv7()}`
    }
  }, [])

  const [guessed, setGuessed] = useState(gameWon)
  const [words, setWords] = useState(initialWords)
  const [guess, submitWordFormAction, pending] = useActionState(
    submitWord,
    guessInitialState,
  )
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (guess.word && words.find((w) => w.word == guess.word?.word) == null) {
      setWords([...words, { word: guess.word.word, rank: guess.word.rank }])
      if (guess.word.rank == 1) {
        setGuessed(true)
      }
    }
    inputRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess.word])

  return (
    <main className="flex flex-col items-center pt-[10%] px-6 md:px-0">
      <div className="w-full flex justify-center mb-6">
        <div className="hidden md:block size-[40px] relative">
          <Image src="/icon-192x192.png" alt="Один контекст" fill />
        </div>
        <h1 className="text-center text-3xl font-bold md:ml-3">
          Один контекст
        </h1>
        <InfoIcon className="cursor-pointer mt-2 ml-3" />
      </div>
      <div className="w-full md:w-[450px]">
        {guessed && (
          <div className="text-center mb-10">
            <h1 className="text-3xl">Вы отгадали слово дня 🎉</h1>
            <h1 className="text-2xl mt-2">Попыток: {words.length}</h1>
          </div>
        )}
        <form action={submitWordFormAction}>
          <Input
            ref={inputRef}
            autoFocus
            name="word"
            autoComplete="off"
            placeholder="введите слово"
            className="dark:bg-zinc-800 text-2xl md:text-2xl px-4 py-6 mb-4 border"
          />
          <Input hidden readOnly name="date" type="date" value={gameDate} />
        </form>
        {pending && <p className="text-lg mb-4 px-3 py-2">Загрузка...</p>}
        {!pending && guess.message && (
          <p className="text-lg mb-4 px-3 py-2 text-red-500">{guess.message}</p>
        )}
        {!pending && guess.word && (
          <GuessedWord
            className="mb-4"
            word={guess.word.word}
            rank={guess.word.rank}
          />
        )}
        {words
          .sort((a, b) => a.rank - b.rank)
          .map((word) => (
            <GuessedWord key={word.rank} word={word.word} rank={word.rank} />
          ))}
      </div>
    </main>
  )
}
