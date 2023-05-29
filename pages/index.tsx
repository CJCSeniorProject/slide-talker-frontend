import Head from 'next/head'
import Main from './main'

export default function Home() {
  return (
    <>
      <Head>
        <title>SlideTalker</title>
        <meta name="description" content="A slide show video generation web application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        <Main />
      </main>
    </>
  )
}
