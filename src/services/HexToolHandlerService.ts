export interface PanState {
  x: number
  y: number
}

export interface Point {
  x: number
  y: number
}

export class HexToolHandlerService {
  private dragging = false
  private lastPos: Point = { x: 0, y: 0 }

  getInitialPan(offsetWidth: number, offsetHeight: number): PanState {
    return { x: offsetWidth / 2, y: offsetHeight / 2 }
  }

  startDrag(button: number, clientX: number, clientY: number): void {
    if (button !== 2) return
    this.dragging = true
    this.lastPos = { x: clientX, y: clientY }
  }

  moveDrag(clientX: number, clientY: number, pan: PanState): PanState {
    if (!this.dragging) return pan

    const dx = clientX - this.lastPos.x
    const dy = clientY - this.lastPos.y
    this.lastPos = { x: clientX, y: clientY }

    return { x: pan.x + dx, y: pan.y + dy }
  }

  stopDrag(): void {
    this.dragging = false
  }

  preventContextMenu(event: { preventDefault: () => void }): void {
    event.preventDefault()
  }
}
