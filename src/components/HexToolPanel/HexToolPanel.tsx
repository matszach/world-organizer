import './HexToolPanel.scss'
import { APP_TEXT } from '../../content/appText'

function HexToolPanel() {
  return (
    <aside className="hex-tool-panel">
      <p className="hex-tool-panel__placeholder">{APP_TEXT.hex.toolPanelPlaceholder}</p>
    </aside>
  )
}

export default HexToolPanel
