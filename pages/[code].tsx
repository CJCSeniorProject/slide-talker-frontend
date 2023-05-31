import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import InputEmail from '@/components/InputEmail'
import BaseLayout from '@/layouts/BaseLayout'
import styled from 'styled-components'
import { useStore } from '@/models/data'

const { Text, Title, Link } = Typography

const Container = styled.div`
  height: calc(100vh - 131px - 128px);
  text-align: center;
  width: 100%;
`

const GenTitle = styled(Title)`
  margin: 128px 0;
`

const GenSubTitle = styled.h2`
  margin: 64px 0 16px;
`

const GenLink = styled.div`
  margin: 16px 0 64px !important;
`

const VideoProgress = () => {
  const router = useRouter()
  const { code } = router.query

  const { dataStore } = useStore()
  dataStore.setCode(code as string)

  const [ isGenReady, setIsGenReady ] = useState<boolean>(false)
  const [ genTitle, setGenTitle ] = useState<string>('正在查詢您的影片狀態...')
  const [ genSubTitle, setGenSubTitle ] = useState<string>('')
  const [ genLink, setGenLink ] = useState<JSX.Element>(<></>)
  const [ inputEmail, setInputEmail ] = useState<JSX.Element>(<></>)

  useEffect(() => {
    dataStore.getGenStatus().then(res => res.text())
      .then(res => {
        if (res === 'not ready') {
          setIsGenReady(false)
          setGenTitle('您的影片正在生成中！')
          setGenSubTitle('您可以保存本頁的連結，稍後再回來查看影片')
          setGenLink(
            <Text copyable>{`${process.env.NEXT_PUBLIC_HOST}/${code}`}</Text>
          )
          setInputEmail(<InputEmail />)
        } else {
          setIsGenReady(true)
          setGenTitle('您的影片已經生成完成！')
          setGenSubTitle('您可以點擊下方連結下載影片')
          setGenLink(
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/download/${code}`} target="_blank">
              {`${process.env.NEXT_PUBLIC_API_URL}/download/${code}`}
              {/* {res} */}
            </Link>
          )
          setInputEmail(<></>)
        }
      })
  }, [code])

  return (
    <BaseLayout>
      <Container>
        <GenTitle>{genTitle}</GenTitle>
        <GenSubTitle>{genSubTitle}</GenSubTitle>
        <GenLink>{genLink}</GenLink>
        {inputEmail}
      </Container>
    </BaseLayout>
  )
}

export default VideoProgress