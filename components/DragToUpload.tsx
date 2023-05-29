import React from 'react';
import ReactDOM from 'react-dom/client';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

class DragToUpload extends React.Component<{
  fileType: Array<string>,
  uploadFile: (file: File) => void
}, {}> {
  handleUpload = async (option: any) => {
    const file = option.file as File;
    try {
      this.props.uploadFile(file);
      option.onSuccess();
    }
    catch (error) {
      option.onError();
    }
  };

  beforeUpload = (file: File) => {
    const isFileType = this.props.fileType.includes(file.type);
    if (!isFileType) {
      message.error(`You can only upload .${this.props.fileType} file!`);
    }
    const maxMB = 100;
    const isLtMB = file.size / 1024 / 1024 < maxMB;
    if (!isLtMB) {
      message.error(`File must smaller than ${maxMB}MB!`);
    }
    console.log(isFileType, isLtMB);
    return isFileType && isLtMB;
  };

  //   onChange = (info: any) => {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   };

  // onDrop = (e: any) => {
  //   console.log('Dropped files', e.dataTransfer.files);
  // };

  render() {
    const accept = this.props.fileType.join(", ");
    return (
      <Dragger
        name="file"
        maxCount={1}
        customRequest={this.handleUpload}
        // with accept option, type check in beforeUpload will not be called
        // TODO: use fileList to correct beforeUpload
        accept={accept}
        beforeUpload={this.beforeUpload}
      // action="https://httpbin.org/post"
      // onChange={this.onChange}
      // onDrop={this.onDrop}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">上傳{accept}檔案</p>
        <p className="ant-upload-hint">
          click or drag {accept} file to this area to upload
        </p>
      </Dragger>
    );
  }
}

export default DragToUpload;
