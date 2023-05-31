import React from 'react'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import InputEmail from '@/components/InputEmail'
import BaseLayout from '@/layouts/BaseLayout'
import styled from 'styled-components'
import { useStore } from '@/models/data'

const { Text, Title } = Typography

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

  return (
    <BaseLayout>
      <Container>
        <GenTitle>您的影片正在生成中！</GenTitle>
        <GenSubTitle>您可以保存本頁的連結，稍後再回來查看影片</GenSubTitle>
        <GenLink>
          <Text copyable>{`${process.env.NEXT_PUBLIC_HOST}/${code}`}</Text>
        </GenLink>
        <InputEmail />
      </Container>
    </BaseLayout>
  )
}

export default VideoProgress