import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Один контекст',
    short_name: 'Один контекст',
    description:
      'Сможете ли вы угадать секретное слово, загаданное с помощью искусственного интеллекта? После каждой попытке будет видно, насколько вы близки к ответу.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#1d1d1d',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
