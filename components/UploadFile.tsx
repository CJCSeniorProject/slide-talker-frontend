import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { observer } from 'mobx-react'
import { dataStore } from '@/models/data'

const { Dragger } = Upload

const UploadFile = ({uploadType}: {uploadType: 'video'|'avatar'}) => {
  let dataStoreSetter: (file: File) => void
  let accept: string
  let uploadText: string
  let uploadHint: string

  if (uploadType === 'video') {
    dataStoreSetter = (file: File) => dataStore.setVideo(file)
    accept = 'video/mp4, video/quicktime'
    uploadText = '上傳影片檔案'
    uploadHint = 'Drag or click to upload video file'
  }
  else {
    dataStoreSetter = (file: File) => dataStore.setAvatar(file)
    accept = 'image/jpeg, image/png'
    uploadText = '上傳頭像檔案'
    uploadHint = 'Drag or click to upload avatar file'
  }

  const handleUpload = async (option: any) => {
    const file = option.file as File
    try {
      dataStoreSetter(file)
      option.onSuccess()
      message.success(`${file.name} file uploaded successfully`)
    }
    catch (err) {
      console.log(err)
      option.onError()
      message.error(`${file.name} file upload failed.`)
    }
  }

  const beforeUpload = (file: File) => {
    const maxMB = 100
    const isLtMB = file.size / 1024 / 1024 < maxMB
    if (!isLtMB) {
      message.error(`File must smaller than ${maxMB}MB!`)
    }
    return isLtMB
  }
  
  return (
    <Dragger
      name="file"
      maxCount={1}
      customRequest={handleUpload}
      accept={accept}
      beforeUpload={beforeUpload} >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{uploadText}</p>
      <p className="ant-upload-hint">{uploadHint}</p>
    </Dragger>
  )
}

export default observer(UploadFile)