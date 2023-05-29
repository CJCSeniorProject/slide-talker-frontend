import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'
import { Row, Col } from 'antd'
import { Typography } from 'antd'
import UploadFile from '@/components/UploadFile'
import AdjustPicturePosition from '@/components/AdjustPicturePosition'
import { dataStore } from '@/models/data'
import BaseLayout from '@/layouts/BaseLayout'
import HeroSection from '@/components/HeroSection'
import styled from 'styled-components'

const { Text } = Typography

const GenVideoDiv = styled.div`
  height: 100vh;
  background: red;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GenVideoRow = styled(Row)`
  width: 100%;
`

const Main = () => {
  return (
    <BaseLayout>
      <HeroSection />
      <GenVideoDiv id="gen-video">
        <GenVideoRow gutter={20}>
          <Col span={16}>
            <AdjustPicturePosition />
          </Col>
          <Col span={8}>
            <Row gutter={16}>
              <Col span={12}>
                <UploadFile uploadType='video'/>
              </Col>
              <Col span={12}>
                <UploadFile uploadType='avatar'/>
              </Col>
            </Row>
            <Button
              type="primary"
              size="large"
              style={{ margin: '50px 0' }}
              onClick={() => dataStore.post()}>上傳資料</Button>
            <Text>{dataStore.code}</Text>
          </Col>
        </GenVideoRow>
      </GenVideoDiv>
    </BaseLayout>
  )
}

export default observer(Main)