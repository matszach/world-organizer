export interface Point {
  x: number
  y: number
}

export class HexMouseHandler {
  private static readonly MIN_ZOOM = 0.25
  private static readonly MAX_ZOOM = 4

  static getInitialPan({ offsetWidth, offsetHeight }: HTMLDivElement): Point {
    return { x: offsetWidth / 2, y: offsetHeight / 2 }
  }

  static isRightMouseButtonDown({ button }: { button: number }): boolean {
    return button === 2
  }

  static getEventMousePos({ clientX, clientY }: { clientX: number, clientY: number}): Point {
    return { x: clientX, y: clientY }
  }

  static getDiffPoint(from: Point, to: Point): Point {
    return {
      x: to.x - from.x,
      y: to.y - from.y,
    }
  }

  static getSumPoint(a: Point, b: Point): Point {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    }
  }

  static getZoom(
    currentZoom: number,
    { deltaY }: { deltaY: number },
  ): number {
    const factor = deltaY < 0 ? 1.2 : deltaY > 0 ? 0.8 : 1
    const nextZoom = currentZoom * factor

    return Math.min(this.MAX_ZOOM, Math.max(this.MIN_ZOOM, nextZoom))
  }

}
