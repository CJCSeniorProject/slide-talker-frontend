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
import DragToUpload from '@/components/DragToUpload'
import AdjustPicturePosition from '@/components/AdjustPicturePosition'
import UploadAvatar from '@/components/UploadAvatar'
import fetchMock, { post } from 'fetch-mock'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text, Link } = Typography

export const Context = createContext({});

export default function Main() {
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
  ];

  let _video: File | null = null;
  let _avatar: File | null = null;
  let _videoBase64: string;
  let _avatarBase64: string;
  let _avatarShape: 'square' | 'circle' = 'square';
  let _avatarPosition: [number, number] = [0, 0];
  let _code: string = '';
  let _email: string = '';


  const mainContext = useLocalObservable(() => ({
    video: computed(() => _video),
    avatar: computed(() => _avatar),
    videoBase64: computed(() => _videoBase64),
    avatarBase64: computed(() => _avatarBase64),
    avatarShape: computed(() => _avatarShape),
    avatarPosition: computed(() => _avatarPosition),
    code: computed(() => _code),
    email: computed(() => _email),
  }));

  // const [video, setVideo] = useState<File | null>(null);
  // const [avatar, setAvatar] = useState<File | null>(null);
  // const [videoBase64, setVideoBase64] = useState<string>();
  // const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  // const [avatarShape, setAvatarShape] = useState<'circle' | 'square'>('square');
  // const [avatarPosition, setAvatarPosition] = useState<[number, number]>([0, 0]);
  // const [code, setCode] = useState<string>('');
  // const [email, setEmail] = useState<string>('');

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  function uploadVideo(file: File | null) {
    if (!file) {
      setVideoBase64(undefined);
      return;
    }
    setVideo(file);
    toBase64(file).then((res) => {
      console.log(res);
      setVideoBase64(res as string);
    })
  }

  function handleUploadAvatar(file: File | null) {
    if (!file) {
      setAvatarBase64(null);
      return;
    }
    setAvatar(file);
    toBase64(file).then((res) => {
      console.log(res);
      setAvatarBase64(res as string);
    })
  }

  function updateAvatarPosition(x: number, y: number) {
    setAvatarPosition([x, y]);
    console.log(x, y);
  }

  function postData() {
    const formData = new FormData();
    formData.append('avatar', avatar as Blob);
    formData.append('video', video as Blob);
    formData.append('x', avatarPosition[0].toString());
    formData.append('y', avatarPosition[1].toString());
    formData.append('shape', avatarShape);

    // 'http://localhost:8000/api/gen'
    fetch('http://localhost:8000/api/gen', {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      // console.log(res);
      const data = await res.json();
      // console.log(JSON.stringify(data));
      setCode(data.code);
    })

    // post(d).then(()=>set)
  }

  function postEmail() {
    const formData = new FormData();
    formData.append('email', email);

    fetch('http://localhost:8000/api/gen/' + code, {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      // console.log(res);
      // const data = await res.json();
      // console.log(JSON.stringify(data));
      message.success('生成完成後會寄到您的信箱');
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
              <DragToUpload
                fileType={['video/mp4']}
                uploadFile={uploadVideo} />
            </div>
            {/* TODO: record voice */}
            {/* <div id="slide-record" style={{ padding: '50px 30px', margin: '128px 0', height: '100vh' }}>
              <SlideShow />
              <RecordVoice />
            </div> */}
            <div id="slide-avator" style={{ padding: '50px 30px', margin: '128px 0', height: '100vh' }}>
              <Row gutter={20}>
                <Col span={12}>
                  <AdjustPicturePosition
                    avatarShape={avatarShape}
                    updateAvatarPosition={updateAvatarPosition}
                    avatarSrc={avatarBase64}
                    videoSrc={videoBase64} />
                </Col>
                <Col span={12}>
                  <UploadAvatar
                    uploadFile={handleUploadAvatar} />
                </Col>
              </Row>
            </div>
            <Button
              type="primary"
              size="large"
              style={{ margin: '50px 0' }}
              onClick={postData}>上傳資料</Button>
            <Text>{code}</Text>
            <Input placeholder="請輸入您的電子郵件" onChange={(e) => setEmail(e.target.value)} />
            <Button
              type="primary"
              size="large"
              style={{ margin: '50px 0' }}
              onClick={postEmail}>寄送電子郵件</Button>
          </Col>
        </Row>
      </Content>
      <Footer>2023 © NTOU Lab603</Footer>
    </Layout>
  )
}