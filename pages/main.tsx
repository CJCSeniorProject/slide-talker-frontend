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

const { Text } = Typography

const Main = () => {
  return (
    <BaseLayout>
      <HeroSection />
      <div id="slide-avator" style={{ height: '100vh', background: 'red' }}>
        <Row gutter={20}>
          <Col span={16}>
            <AdjustPicturePosition />
          </Col>
          <Col span={8}>
            <Row>
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
        </Row>
      </div>
    </BaseLayout>
  )
}

export default observer(Main)