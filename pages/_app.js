import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import QuizState from '@/context/QuizState';

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
})


export default function App({ Component, pageProps }) {
  return (
  
    <main className={inter.className}>
      <QuizState>
          <Component {...pageProps} />
      </QuizState>
    </main>
  
  )
}
