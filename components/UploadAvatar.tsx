import React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, message, Upload } from 'antd'
import { dataStore } from '@/models/data'
import { observer } from 'mobx-react'

function UploadAvatar() {
  const handleUpload = async (option: any) => {
    const file = option.file as File
    try {
      dataStore.setAvatar(file)
      option.onSuccess()
    }
    catch (error) {
      console.log(error)
      option.onError()
    }
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      console.log(info.file)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  return <Upload
    accept="image/jpeg, image/png"
    name='file'
    maxCount={1}
    headers={{
      authorization: 'authorization-text'
    }}
    onChange={handleChange}
    customRequest={handleUpload} >
    <Button icon={<UploadOutlined />}>Click to Upload Avatar</Button>
  </Upload>
}

export default observer(UploadAvatar)