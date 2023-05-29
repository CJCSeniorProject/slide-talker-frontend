import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'
import { Row, Col } from 'antd'
import { Anchor } from 'antd'
import { Typography } from 'antd'
import DragToUploadVideo from '@/components/DragToUploadVideo'
import AdjustPicturePosition from '@/components/AdjustPicturePosition'
import UploadAvatar from '@/components/UploadAvatar'
import { dataStore } from '@/models/data'
import BaseLayout from '@/layouts/BaseLayout'
import HeroSection from '@/components/HeroSection'

const { Text } = Typography

const Main = () => {
  const anchorItems = [
    {
      key: 'slide-upload',
      title: 'step 1',
      href: '#slide-upload',
    },
    {
      key: 'slide-record',
      title: 'step 2',
      href: '#slide-record',
    },
    {
      key: 'slide-avator',
      title: 'step 3',
      href: '#slide-avator',
    },
  ]


  return (
    <BaseLayout>
      <HeroSection />
      <Row>
        <Col span={2} style={{ display: 'fix', marginTop: '200px' }}>
          {/* TODO css useWindowSize */}
          {/* <Anchor items={anchorItems} offsetTop={ useWindowSize().height / 2 - 60 }/> */}
          <Anchor items={anchorItems} />
        </Col>
        <Col span={22}>
          <div id="slide-upload" style={{ padding: '30px', margin: '128px 0', height: '100vh' }}>
            <DragToUploadVideo />
          </div>
          {/* TODO: record voice */}
          {/* <div id="slide-record" style={{ padding: '50px 30px', margin: '128px 0', height: '100vh' }}>
              <SlideShow />
              <RecordVoice />
            </div> */}
          <div id="slide-avator" style={{ padding: '50px 30px', margin: '128px 0', height: '100vh' }}>
            <Row gutter={20}>
              <Col span={12}>
                <AdjustPicturePosition />
              </Col>
              <Col span={12}>
                <UploadAvatar />
              </Col>
            </Row>
          </div>
          <Button
            type="primary"
            size="large"
            style={{ margin: '50px 0' }}
            onClick={() => dataStore.post()}>上傳資料</Button>
          <Text>{dataStore.code}</Text>
        </Col>
      </Row>
    </BaseLayout>
  )
}

export default observer(Main)