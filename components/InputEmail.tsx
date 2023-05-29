import React from 'react'
import { Button, Input, message } from 'antd'
import { dataStore } from '@/models/data'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Description = styled.p`
  margin: 16px 0;
`

const InputEmail = () => {
  const sendEmail = () => {
    dataStore.sendEmail()
      .then(async (res) => {
        message.success('生成完成後會寄到您的信箱')
      })
  }

  return (
    <div>
      <Description>您可以輸入您的電子郵件，當影片生成完成後會寄到您的信箱</Description>
      <Input
        placeholder="請輸入您的電子郵件"
        onChange={(e) => dataStore.setEmail(e.target.value)}
        style={{ width: '300px' }}
      />
      <br />
      <Button
        type="primary"
        size="large"
        style={{ margin: '16px 0' }}
        onClick={sendEmail}>寄送電子郵件</Button>
    </div>
  )
}

export default observer(InputEmail)