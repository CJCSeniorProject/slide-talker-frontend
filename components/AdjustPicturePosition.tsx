import React, { useRef } from 'react'
import { Col, Row, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Draggable from 'react-draggable'
import { Player, ControlBar } from 'video-react'
import 'video-react/dist/video-react.css'
import { dataStore } from '@/models/data'
import { observer } from 'mobx-react'

// TODO css
import 'node_modules/video-react/dist/video-react.css'

class AdjustPicturePosition extends React.Component<{}, {}> {
  onDrag = (e: any, ui: any) => {
    dataStore.setAvatarPosition([ui.x, ui.y])
  }

  render() {
    return (
      <Row style={{ padding: 24, height: 500, display: 'inline-block' }}>
        <Col span={24} style={{ backgroundColor: '#f0f2f5' }}>
          <Player
            autoPlay
            muted
            src={dataStore.videoBase64 ?? undefined}
            fluid={false}
            height={500} >
          </Player>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none'
            }}>
            <Draggable
              bounds="parent"
              onDrag={this.onDrag} >
              <Avatar
                src={dataStore.avatarBase64 ?? undefined}
                icon={<UserOutlined />}
                size={150}
                shape={dataStore.avatarShape}
                draggable={false}
                style={{ pointerEvents: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              />
            </Draggable>
          </div>
        </Col>
      </Row>
    )
  }
}

export default observer(AdjustPicturePosition)
