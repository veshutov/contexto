import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'

export default function InfoIcon({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info className={className} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Как играть?</DialogTitle>
          <DialogDescription className="text-md">
            Каждый день загадывается секретное слово, ваша задача – угадать его.
            <br />
            <br />
            Слова были отсортированы алгоритмом искусственного интеллекта по
            степени схожести с секретным словом.
            <br />
            <br />
            После ввода слова вы увидите его позицию. Секретное слово – номер 1.
            У вас неограниченное количество попыток.
            <br />
            <br />
            Алгоритм проанализировал тысячи текстов. Он использует контекст, в
            котором используются слова, для вычисления степени их схожести.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
