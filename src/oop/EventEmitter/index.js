class EventEmitter {
  constructor() {
    this._events = Object.create(null)
  }

  on(type, handler) {
    const matchEvents = this._events[type]

    if (!Array.isArray(matchEvents)) {
      this._events[type] = [handler]
    } else {
      this._events[type].push(handler)
    }
  }

  once(type, handler) {
    let fired = false

    const magic = () => {
      if (!fired) {
        fired = true
        handler.apply(this, arguments)
        this.off(type, magic)
      }
    }

    this.on(type, magic)
  }

  emit(type) {
    const args = [].slice.call(arguments, 1)
    const matchEvents = this._events[type]

    if (Array.isArray(matchEvents) && matchEvents.length > 0) {
      matchEvents.forEach(fn => fn(...args))
    } else {
      console.warn(`没有注册类型为 ${type} 的监听器`)
    }
  }

  off(type, handler) {
    if (typeof handler !== 'function') {
      this._events[type] = null
    } else {
      this._events[type].forEach((item, index) => {
        if (item === handler) {
          this._events[type].splice(index, 1)
        }
      })
    }
  }
}

const eventEmitter = new EventEmitter()
const handle1 = function() {
  console.log('hello')
}

const handle2 = function() {
  console.log(...arguments)
}

const handle3 = function() {
  console.log('world')
}

eventEmitter.on('hello', handle1)
eventEmitter.once('world', handle3)
eventEmitter.once('handle2', handle2)
eventEmitter.emit('hello')
eventEmitter.emit('hello')
eventEmitter.emit('world')
eventEmitter.emit('world')
eventEmitter.emit('handle2')
eventEmitter.emit('handle2', 1, 2, 3)
