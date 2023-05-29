import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

function UploadAvatar(props: { uploadFile: (file: File) => void }) {

  const dummyRequest = (props: any) => {
    setTimeout(() => {
      props.onSuccess("ok");
    }, 1000);
  };

  const handleUpload = async (option: any) => {
    const file = option.file as File;
    try {
      props.uploadFile(file);
      option.onSuccess();
    }
    catch (error) {
      option.onError();
    }
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      console.log(info.file);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return <Upload
    accept="image/jpeg, image/png"
    name='file'
    maxCount={1}
    // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
    headers={{
      authorization: 'authorization-text'
    }}
    onChange={handleChange}
    customRequest={handleUpload} >
    <Button icon={<UploadOutlined />}>Click to Upload Avatar</Button>
  </Upload>
}

export default UploadAvatar;
