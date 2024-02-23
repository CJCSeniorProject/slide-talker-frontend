import { Button } from 'antd'
import styled from 'styled-components'

const HeroSectionDiv = styled.div`
  height: calc(100vh - 64px);
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin: 50px 0;
  font-size: 80px;
  color: #000;
`

const Body = styled.div`
  display: inline-block;
`

const StartButton = styled(Button)`
  font-size: 32px !important;
  height: 64px !important;
`
const HeroSection = () => { 
  const scrollToSlideUpload = () => {
    const slideUpload = document.getElementById('gen-video')
    if (slideUpload) {
      slideUpload.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <HeroSectionDiv>
      <Body>
        <Title>只需 1 步就能夠創建演講簡報影片</Title>
        <StartButton type="primary" size="large" onClick={scrollToSlideUpload}>開始創建</StartButton>
      </Body>
    </HeroSectionDiv>
  )
}

export default HeroSection