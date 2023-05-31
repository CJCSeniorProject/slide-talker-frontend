import { createContext, useContext } from 'react'
import * as Router from 'next/router'
import { makeAutoObservable } from 'mobx'
import { toBase64 } from '@/apis/file'

class Data {
  video: File | null = null
  avatar: File | null = null
  videoBase64: string | null = null
  avatarBase64: string | null = null
  avatarShape: 'square' | 'circle' = 'square'
  avatarPosition: [number, number] = [0, 0]
  code: string | null = null
  email: string | null= null

  constructor() {
    makeAutoObservable(this)
  }

  setVideo(video: File) {
    this.video = video
    toBase64(video).then((base64) => {
      this.videoBase64 = base64 as string
    })
  }

  setAvatar(avatar: File) {
    this.avatar = avatar
    toBase64(avatar).then((base64) => {
      this.avatarBase64 = base64 as string
    })
  }

  setAvatarShape(shape: 'square' | 'circle') {
    this.avatarShape = shape
  }

  setAvatarPosition(position: [number, number]) {
    this.avatarPosition = position
  }

  setCode(code: string) {
    this.code = code
  }

  setEmail(email: string) {
    this.email = email
  }

  post() {
    const formData = new FormData()
    formData.append('avatar', this.avatar as Blob)
    formData.append('video', this.video as Blob)
    formData.append('x', this.avatarPosition[0].toString())
    formData.append('y', this.avatarPosition[1].toString())
    formData.append('shape', this.avatarShape)

    fetch('http://localhost:8000/api/gen', {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      const data = await res.json()
      Router.default.push('/' + data.code)
    }).catch((err) => {
      console.log(err)
    })
  }

  sendEmail() {
    const formData = new FormData()
    formData.append('email', this.email as string)

    return fetch('http://localhost:8000/api/gen/' + this.code, {
      method: 'POST',
      body: formData,
    })
  }

  getGenStatus() {
    return fetch('http://localhost:8000/api/gen/' + this.code)
  }
}

export const dataStore = new Data()

export const storeContext = createContext({
  dataStore,
})

export const useStore = () => {
  return useContext(storeContext)
}