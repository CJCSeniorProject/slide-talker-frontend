import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { observer } from 'mobx-react'
import { dataStore } from '@/models/data'

const { Dragger } = Upload

const DragToUploadVideo = () => {
  const handleUpload = async (option: any) => {
    const file = option.file as File
    try {
      dataStore.setVideo(file)
      option.onSuccess()
    }
    catch (error) {
      console.log(error)
      option.onError()
    }
  }

  const beforeUpload = (file: File) => {
    const isMp4 = file.type === 'video/mp4'
    if (!isMp4) {
      message.error('You can only upload MP4 file!')
    }
    const maxMB = 100
    const isLtMB = file.size / 1024 / 1024 < maxMB
    if (!isLtMB) {
      message.error(`File must smaller than ${maxMB}MB!`)
    }
    console.log(isMp4, isLtMB)
    return isMp4 && isLtMB
  }
  
  return (
    <Dragger
      name="file"
      maxCount={1}
      customRequest={handleUpload}
      // TODO: use fileList to correct beforeUpload
      accept={'video/mp4, video/quicktime'}
      beforeUpload={beforeUpload}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">上傳影片檔案</p>
      <p className="ant-upload-hint">
          click or drag video file to this area to upload
      </p>

    </Dragger>
  )
}

export default observer(DragToUploadVideo)