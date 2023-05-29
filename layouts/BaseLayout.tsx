import React from 'react'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

type BaseLayoutProps = {
  children: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Layout>
      <Header>
        <Menu 
          mode="horizontal" 
          items={[
            {
              label: 'Slide Talker',
              key: 'slide_talker',
            }
          ]} 
          theme="dark" 
          selectable={false} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer>2023 © NTOU Lab603</Footer>
    </Layout>
  )
}

export default BaseLayout