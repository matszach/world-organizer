import { useRef, useState, useCallback, useEffect } from 'react'
import './HexWorkspace.scss'
import { HexMouseHandler, Point } from './HexMouseHandler'
import usePreventDefault from '../../hooks/usePreventDefault'

function HexWorkspace() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const dragging = useRef(false)
  const lastPos = useRef<Point>({ x: 0, y: 0 })
  const preventDefault = usePreventDefault<React.MouseEvent<SVGSVGElement>>()

  useEffect(() => {
    if (containerRef.current) {
      setPan(HexMouseHandler.getInitialPan(containerRef.current))
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (HexMouseHandler.isRightMouseButtonDown(e)) {
      dragging.current = true
      lastPos.current = HexMouseHandler.getEventMousePos(e)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (dragging.current) {
      const newPos = HexMouseHandler.getEventMousePos(e)
      const diff = HexMouseHandler.getDiffPoint(lastPos.current, newPos)
      lastPos.current = newPos
      setPan(prev => HexMouseHandler.getSumPoint(prev, diff))
    }
  }, [])

  const stopDrag = useCallback(() => {
    dragging.current = false
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault()
    setZoom(prev => HexMouseHandler.getZoom(prev, e))
  }, [])

  return (
    <div className="hex-workspace" ref={containerRef}>
      <svg
        className="hex-workspace__svg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onWheel={handleWheel}
        onContextMenu={preventDefault}
      >
        <g transform={`translate(${pan.x}, ${pan.y})`}>
          <g transform={`scale(${zoom})`}>
            <rect
              x="-40"
              y="-40"
              width="80"
              height="80"
              fill="red"
              opacity={0.85}
              rx={4}
            />
            <text
              x="0"
              y="72"
              textAnchor="middle"
              className="hex-workspace__label"
            >
              Example Workspace
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default HexWorkspace
