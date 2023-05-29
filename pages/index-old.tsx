// import Head from 'next/head'
// import { Layout, Menu } from 'antd'
// import { Button } from 'antd'
// import { Row, Col } from 'antd'
// import { Anchor } from 'antd'
// import type { UploadProps } from 'antd'
// import { message, Upload } from 'antd'
// import { InboxOutlined } from '@ant-design/icons'
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// import { AudioOutlined } from '@ant-design/icons'
// import type { UploadChangeParam, UploadFile } from 'antd/es/upload'
// import type { RcFile } from 'antd/es/upload'
// import DragToUpload from '@/components/DragToUpload'

// import { useState, useEffect } from 'react'

// const { Header, Content, Footer } = Layout
// // const base_path = require('../next.config').basePath || ''

// function SlidesUpload() {
//   const { Dragger } = Upload
//   const props: UploadProps = {
//     name: 'file',
//     beforeUpload(file, FileList) {
//       const isPPT = file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
//       if (!isPPT) {
//         message.error('You can only upload PPT file!')
//       }
//       return isPPT
//     },
//     onChange(info) {
//       const { status } = info.file
//       if (status !== 'uploading') {
//         console.log(info.file, info.fileList)
//       }
//       if (status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully.`)
//       } else if (status === 'error') {
//         message.error(`${info.file.name} file upload failed.`)
//       }
//     }
//   }

//   return (
//     <>
//       <h2>上傳 PPT</h2>
//       <Dragger {...props}>
//         <p className="ant-upload-drag-icon">
//           <InboxOutlined />
//         </p>
//         <p className="ant-upload-text">Click or drag Slides to this area to upload</p>
//         <p className="ant-upload-hint">
//           Support ppt/pptx file only
//         </p>
//       </Dragger>
//     </>
//   )
// }

// function SlidesShow() {
//   return (
//     <div style={{
//       width: '100%',
//       height: '100%',
//       border: '1px solid #d9d9d9',
//     }}>
//       <p>Slides Show</p>
//     </div>
//   )
// }

// function RecordVoice() {
//   return (
//     <div style={{
//       fontSize: '50px',
//     }}>
//       <AudioOutlined />
//     </div>
//   )
// }

// function AvatarUpload() {
//   let loading = false
//   const beforeUpload = (file: RcFile) => {
//     const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
//     if (!isImage) {
//       message.error('You can only upload image file!')
//     }
//     return isImage
//   }
//   const onChange = (info: UploadChangeParam<UploadFile>) => {
//     const { status } = info.file
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList)
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`)
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`)
//     }
//   }

//   return (
//     <Upload
//       name='avatar'
//       listType='picture-card'
//       className='avatar-uploader'
//       showUploadList={false}
//       beforeUpload={beforeUpload}
//       onChange={onChange}
//     >
//       <div>
//         {loading ? <LoadingOutlined /> : <PlusOutlined />}
//         <div style={{ marginTop: 8 }}>Upload Avatar</div>
//       </div>
//     </Upload>
//   )
// }

// function AvatarSetting() {
//   return (
//     <div style={{
//       width: '100%',
//       height: '300px',
//       border: '1px solid #d9d9d9',
//     }}>
//       <p>Avatar Setting</p>
//     </div>
//   )
// }

// function useWindowSize() {
//   // Initialize state with undefined width/height so server and client renders match
//   // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
//   const [windowSize, setWindowSize] = useState({
//     width: 200,
//     height: 200,
//   });

//   useEffect(() => {
//     // only execute all the code below in client side
//     // Handler to call on window resize
//     function handleResize() {
//       // Set window width/height to state
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }
    
//     // Add event listener
//     window.addEventListener("resize", handleResize);
     
//     // Call handler right away so state gets updated with initial window size
//     handleResize();
    
//     // Remove event listener on cleanup
//     return () => window.removeEventListener("resize", handleResize);
//   }, []); // Empty array ensures that effect is only run on mount
//   return windowSize;
// }

// function VideoPreview() {
//   return (
//     <div style={{
//       width: '100%',
//       height: '300px',
//       border: '1px solid #d9d9d9',
//     }}>
//       <p>Video Preview</p>
//     </div>
//   )
// }

// function temp() {
   
//   const [video, setVideo] = useState<File | null>(null);
//   const [avatar, setAvatar] = useState<File | null>(null);
//   const [videoBase64, setVideoBase64] = useState<string>();
//   const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
//   const [avatarShape, setAvatarShape] = useState<'circle' | 'square'>('square');
//   const [avatarPosition, setAvatarPosition] = useState<[number, number]>([0, 0]);

//   const toBase64 = (file: File) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//   });

//   function uploadVideo(file: File | null) {
//     if (!file) {
//       setVideoBase64(undefined);
//       return;
//     }
//     setVideo(file);
//     toBase64(file).then((res) => {
//       console.log(res);
//       setVideoBase64(res as string);
//     })
//   }

//   function handleUploadAvatar(file: File | null) {
//     if (!file) {
//       setAvatarBase64(null);
//       return;
//     }
//     setAvatar(file);
//     toBase64(file).then((res) => {
//       console.log(res);
//       setAvatarBase64(res as string);
//     })
//   }

//   function updateAvatarPosition(x: number, y: number) {
//     setAvatarPosition([x, y]);
//     console.log(x, y);
//   }

//   function postData() {
//     const formData = new FormData();
//     formData.append('avatar', avatar as Blob);
//     formData.append('video', video as Blob);
//     formData.append('x', avatarPosition[0].toString());
//     formData.append('y', avatarPosition[1].toString());
//     axios.post('http://localhost:8000/api/gen', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }).then((res) => {
//       console.log(res);
//     });
//   }
// }

// function Main() {
//   const items = [
//     {
//       label: 'Slides Talker',
//       key: 'slides_talker',
//     }
//   ]

//   const anchorItems = [
//     {
//       key: 'slides-upload',
//       title: 'step 1',
//       href: '#slides-upload',
//     },
//     {
//       key: 'slides-record',
//       title: 'step 2',
//       href: '#slides-record',
//     },
//     {
//       key: 'slides-avator',
//       title: 'step 3',
//       href: '#slides-avator',
//     },
//   ]

//   if (typeof window !== 'undefined') {
//     const height = window.innerHeight / 2
//   }

//   return (
//     <Layout>
//       <Header>
//         <Menu mode="horizontal" items={items} theme="dark" selectable={false} />
//       </Header>
//       <Content style={{ padding: '0 50px' }}>
//         <div style={{ textAlign: 'center', width: '100%', margin: '50px 0 80px' }}>
//           <h1 style={{ margin: '50px 0' }}>只需 3 步就能夠創建演講簡報影片</h1>
//           <Button type="primary" size="large" href="#slides-upload">開始創建</Button>
//         </div>
//         <Row>
//           <Col span={2} style={{ display: 'fix', marginTop: '200px' }}>
//             <Anchor items={anchorItems} offsetTop={ useWindowSize().height / 2 - 60 }/>
//           </Col>
//           <Col span={22}>
//             <div id="slides-upload" style={{ padding: '30px', margin: '128px 0', height: '100vh' }}>
//               <SlidesUpload />
//             </div>
//             <div id="slides-record" style={{ padding: '50px 30px', margin: '128px 0', height: '100vh' }}>
//               <SlidesShow />
//               <RecordVoice />
//             </div>
//             <div id="slides-avator" style={{ padding: '50px 30px', margin: '128px 0', height: '100vh' }}>
//               <Row gutter={20}>
//                 <Col span={12}>
//                   <SlidesShow />                  
//                 </Col>
//                 <Col span={12}>
//                   <AvatarUpload />
//                   <AvatarSetting />
//                 </Col>
//               </Row>
//             </div>
//             <div id="slides-preview" style={{ padding: '50px 30px', margin: '128px 0' }}>
//               <VideoPreview />
//             </div>
//           </Col>
//         </Row>
//       </Content>
//       <Footer>2023 © NTOU Lab603</Footer>
//     </Layout>
//   )
// }

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>SlidesTalker</title>
//         <meta name="description" content="A slide show video generation web application" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="favicon.ico" />
//       </Head>
//       <main>
//         <Main />
//       </main>
//     </>
//   )
// }
