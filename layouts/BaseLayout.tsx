import React from 'react'
import { Layout, Menu } from 'antd'
import Link from 'next/link'

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
              label: <Link href="/">Slide Talker</Link>,
              key: 'slide_talker',
              // href: '/',
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