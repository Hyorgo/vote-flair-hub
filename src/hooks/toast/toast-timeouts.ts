import { TOAST_REMOVE_DELAY } from "./toast-state"

class ToastTimeoutManager {
  private timeouts: Map<string, ReturnType<typeof setTimeout>>

  constructor() {
    this.timeouts = new Map()
  }

  addToRemoveQueue(toastId: string, dispatch: Function) {
    if (this.timeouts.has(toastId)) {
      return
    }

    const timeout = setTimeout(() => {
      this.timeouts.delete(toastId)
      dispatch({
        type: "REMOVE_TOAST",
        toastId: toastId,
      })
    }, TOAST_REMOVE_DELAY)

    this.timeouts.set(toastId, timeout)
  }

  clearTimeout(toastId: string) {
    const timeout = this.timeouts.get(toastId)
    if (timeout) {
      clearTimeout(timeout)
      this.timeouts.delete(toastId)
    }
  }

  clearAll() {
    this.timeouts.forEach((timeout) => clearTimeout(timeout))
    this.timeouts.clear()
  }
}

export const toastTimeouts = new ToastTimeoutManager()