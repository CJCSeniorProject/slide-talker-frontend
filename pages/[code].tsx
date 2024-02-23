import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import InputEmail from '@/components/InputEmail'
import BaseLayout from '@/layouts/BaseLayout'
import styled from 'styled-components'
import { useStore } from '@/models/data'
import { Player } from 'video-react'
import 'node_modules/video-react/dist/video-react.css'

const { Text, Title, Link } = Typography

const Container = styled.div`
  height: calc(100vh - 131px - 96px);
  text-align: center;
  width: 100%;
`

const GenTitle = styled(Title)`
  margin: 96px 0;
`

const GenSubTitle = styled.h2`
  margin: 32px 0 16px;
`

const GenLink = styled.div`
  margin: 16px 0 32px !important;
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
    dataStore.getGenStatus()
      .then(res => {
        if (res.status == 500) {
          setIsGenReady(false)
          setGenTitle('您的影片生成失敗！')
          setGenSubTitle('您可以回上一頁重新生成')
          setGenLink(<></>)
          setInputEmail(<></>)
        }
        else if (res.status == 499) {
          setIsGenReady(false)
          setGenTitle('您的影片正在生成中！')
          setGenSubTitle('您可以保存本頁的連結，稍後再回來查看影片')
          setGenLink(
            <Text copyable>{`${process.env.NEXT_PUBLIC_HOST}/${code}`}</Text>
          )
          setInputEmail(<InputEmail />)
        }
        else if (res.status == 200) {
          setIsGenReady(true)
          setGenTitle('您的影片已經生成完成！')
          setGenSubTitle('您可以點擊下方播放影片')
          setGenLink(
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{width: '600px'}}>
                <Player
                  muted
                  fluid={true}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/download/${code}`}
                ></Player>
              </div>
            </div>
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