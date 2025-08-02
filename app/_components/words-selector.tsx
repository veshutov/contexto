'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import { useActionState, useEffect, useRef, useState } from 'react'
import { submitWord, SubmitWordState } from '../actions'
import Image from 'next/image'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.foundWord])
  return (
    <main className="flex flex-col items-center pt-[10%] px-6 md:px-0 min-h-screen">
      <div className="w-full flex justify-center mb-6">
          <div className="hidden md:block size-[40px] relative">
            <Image src="/icon.png" alt="Один контекст" fill />
          </div>
          <h1 className="text-center text-3xl font-bold md:ml-3">Один контекст</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Info className="cursor-pointer mt-2.5 ml-3" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-2">Как играть?</DialogTitle>
              <DialogDescription className="text-md">
                Каждый день загадывается секретное слово, ваша задача – угадать
                его.
                <br />
                <br />
                Слова были отсортированы алгоритмом искусственного интеллекта по
                степени схожести с секретным словом.
                <br />
                <br />
                После ввода слова вы увидите его позицию. Секретное слово –
                номер 1. У вас неограниченное количество попыток.
                <br />
                <br />
                Алгоритм проанализировал тысячи текстов. Он использует контекст,
                в котором используются слова, для вычисления степени их
                схожести.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full md:w-[450px]">
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
            className="dark:bg-zinc-800 text-2xl md:text-2xl px-4 py-6 mb-4 border"
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
