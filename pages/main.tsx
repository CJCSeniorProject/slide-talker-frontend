import React, { createContext, useState, useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { computed } from 'mobx'
import { Layout, Menu } from 'antd'
import { Button } from 'antd'
import { Row, Col } from 'antd'
import { Anchor } from 'antd'
import { Typography } from 'antd'
import { Input } from 'antd'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { AudioOutlined } from '@ant-design/icons'
import type { UploadChangeParam, UploadFile } from 'antd/es/upload'
import type { RcFile } from 'antd/es/upload'
import DragToUploadVideo from '@/components/DragToUploadVideo'
import AdjustPicturePosition from '@/components/AdjustPicturePosition'
import UploadAvatar from '@/components/UploadAvatar'
import fetchMock, { post } from 'fetch-mock'
import { dataStore } from '@/models/data'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text, Link } = Typography

export const Context = createContext({})

function Main() {
  const items = [
    {
      label: 'Slide Talker',
      key: 'slide_talker',
    }
  ]
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

  function sendEmail() {
    dataStore.sendEmail()
      .then(async (res) => {
      // console.log(res);
      // const data = await res.json();
      // console.log(JSON.stringify(data));
        message.success('生成完成後會寄到您的信箱')
      })
  }

  return (
    <Layout>
      <Header>
        <Menu mode="horizontal" items={items} theme="dark" selectable={false} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ textAlign: 'center', width: '100%', margin: '50px 0 80px' }}>
          <h1 style={{ margin: '50px 0' }}>只需 3 步就能夠創建演講簡報影片</h1>
          <Button type="primary" size="large" href="#slide-upload">開始創建</Button>
        </div>
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
            <Input placeholder="請輸入您的電子郵件" onChange={(e) => dataStore.setEmail(e.target.value)} />
            <Button
              type="primary"
              size="large"
              style={{ margin: '50px 0' }}
              onClick={sendEmail}>寄送電子郵件</Button>
          </Col>
        </Row>
      </Content>
      <Footer>2023 © NTOU Lab603</Footer>
    </Layout>
  )
}

export default observer(Main)