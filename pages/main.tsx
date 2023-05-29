import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Radio } from 'antd'
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
          <Col span={8} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Row gutter={16}>
              <Col span={12}>
                <UploadFile uploadType='video'/>
              </Col>
              <Col span={12}>
                <UploadFile uploadType='avatar'/>
              </Col>
            </Row>
            <Radio.Group
              onChange={
                (e) => {
                  dataStore.setAvatarShape(e.target.value)
                }
              }
              value={ dataStore.avatarShape }
              optionType="button"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <Radio value="circle">圓形</Radio>
              <Radio value="square">方形</Radio>
            </Radio.Group>
            <Button
              type="primary"
              size="large"
              style={{ width: '100%', textAlign: 'center' }}
              onClick={() => dataStore.post()}>上傳資料</Button>
          </Col>
        </GenVideoRow>
      </GenVideoDiv>
    </BaseLayout>
  )
}

export default observer(Main)