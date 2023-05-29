import React, { createContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { computed, makeAutoObservable } from 'mobx'

class Data {
  constructor() {
    makeAutoObservable(this)
  }

  count = 0

  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}