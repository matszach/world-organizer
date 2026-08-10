import { useRef, useState, useCallback, useEffect } from 'react'
import './Workspace.scss'

interface PanState {
  x: number
  y: number
}

function Workspace() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pan, setPan] = useState<PanState>({ x: 0, y: 0 })
  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current
      setPan({ x: offsetWidth / 2, y: offsetHeight / 2 })
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 2) return
    dragging.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleContextMenu = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging.current) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }))
  }, [])

  const stopDrag = useCallback(() => {
    dragging.current = false
  }, [])

  return (
    <div className="workspace" ref={containerRef}>
      <svg
        className="workspace__svg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onContextMenu={handleContextMenu}
      >
        <g transform={`translate(${pan.x}, ${pan.y})`}>
          {/* Example content centred at origin */}
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
            className="workspace__label"
          >
            Example Workspace
          </text>
        </g>
      </svg>
    </div>
  )
}

export default Workspace
