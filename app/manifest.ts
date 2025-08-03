import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Один контекст',
    short_name: 'Один контекст',
    description:
      'Сможете ли вы угадать секретное слово, загаданное с помощью искусственного интеллекта? После каждой попытки будет видно, насколько вы близки к ответу.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#1d1d1d',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
