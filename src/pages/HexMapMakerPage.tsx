import Navbar from '../components/Navbar/Navbar'
import ToolPanel from '../components/ToolPanel/ToolPanel'
import Workspace from '../components/Workspace/Workspace'

function HexMapMakerPage() {
  return (
    <div className="app">
      <Navbar appTitle="Hex Map Maker" showHomeButton />
      <div className="app__body">
        <ToolPanel />
        <Workspace />
      </div>
    </div>
  )
}

export default HexMapMakerPage
