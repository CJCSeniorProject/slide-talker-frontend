import React from 'react'
import { Col, Row, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
import { dataStore } from '@/models/data'
import { observer } from 'mobx-react'
import 'node_modules/video-react/dist/video-react.css'
import styled from 'styled-components'

const AdjustPicturePosition = () => {
  const onDrag = (e: DraggableEvent, ui: DraggableData) => {
    dataStore.setAvatarPosition([ui.x, ui.y])
  }

  const AvatarDragArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  `
  return (
    <Row>
      <Col span={24} style={{ position: 'relative'}}>
        <Player
          autoPlay
          muted
          src={dataStore.videoBase64 ?? undefined}
          fluid={true}
        >
        </Player>
        <AvatarDragArea>
          <Draggable
            bounds="parent"
            onDrag={onDrag} >
            <Avatar
              src={dataStore.avatarBase64 ?? undefined}
              icon={<UserOutlined />}
              size={256}
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