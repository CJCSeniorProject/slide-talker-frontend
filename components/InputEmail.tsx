import React from 'react'
import { Button } from 'antd'
import { Input } from 'antd'
import { message } from 'antd'
import { dataStore } from '@/models/data'

const InputEmail = () => {
  const sendEmail = () => {
    dataStore.sendEmail()
      .then(async (res) => {
      // console.log(res);
      // const data = await res.json();
      // console.log(JSON.stringify(data));
        message.success('生成完成後會寄到您的信箱')
      })
  }

  return (
    <div>
      <Input placeholder="請輸入您的電子郵件" onChange={(e) => dataStore.setEmail(e.target.value)} />
      <Button
        type="primary"
        size="large"
        style={{ margin: '50px 0' }}
        onClick={sendEmail}>寄送電子郵件</Button>
    </div>
  )
}

export default InputEmail