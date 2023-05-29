import React, { useEffect, useState, useRef } from 'react'
import { Col, Row, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
import { useStore } from '@/models/data'
import { observer } from 'mobx-react'
import 'node_modules/video-react/dist/video-react.css'
import styled from 'styled-components'

const AvatarDragArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`

const AdjustPicturePosition = () => {
  const { dataStore } = useStore()
  const [ avatarSize, setAvatarSize ] = useState<number>(256)
  const [ playerWidth, setPlayerWidth ] = useState<number>(0)
  const [ playerHeight, setPlayerHeight ] = useState<number>(0)

  const onDrag = (e: DraggableEvent, ui: DraggableData) => {
    let x = ui.x / playerWidth
    let y = ui.y / playerHeight
    dataStore.setAvatarPosition([x, y])
  }

  useEffect(() => {
    let video = document.createElement('video')
    video.src = dataStore.videoBase64 ?? ''

    video.addEventListener('loadedmetadata', () => {
      if (!video.videoWidth) return
      let col = document.getElementById('col')
      setPlayerWidth(col?.clientWidth ?? 0)
      setPlayerHeight(col?.clientHeight ?? 0)
      let avatarSize = playerWidth / video.videoWidth * 256
      setAvatarSize(avatarSize)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStore.videoBase64])

  return (
    <Row>
      <Col span={24} style={{ position: 'relative'}} id="col">
        <Player
          muted
          fluid={true}
          src={dataStore.videoBase64 ?? undefined}
        >
        </Player>
        <AvatarDragArea>
          <Draggable
            bounds="parent"
            onDrag={onDrag} >
            <Avatar
              src={dataStore.avatarBase64 ?? undefined}
              icon={<UserOutlined />}
              size={avatarSize}
              shape={dataStore.avatarShape}
              draggable={false}
              style={{ pointerEvents: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            />
          </Draggable>
        </AvatarDragArea>
      </Col>
    </Row>
  )
}

export default observer(AdjustPicturePosition)