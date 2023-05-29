import Head from 'next/head'
import { Layout, Menu } from 'antd'
import { Typography } from 'antd'

import Main from './main'

export default function Home() {
  // fetchMock.post('http://localhost:8000/api/gen', () => {

  // }, {
  //   overwriteRoutes: true,
  // });

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
