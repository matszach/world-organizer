import Navbar from '../components/Navbar/Navbar'
import HexToolPanel from '../components/HexToolPanel/HexToolPanel'
import HexWorkspace from '../components/HexWorkspace/HexWorkspace'

function HexMapMakerPage() {
  return (
    <div className="app">
      <Navbar appTitle="hex-map-maker" showHomeButton />
      <div className="app__body">
        <HexToolPanel />
        <HexWorkspace />
      </div>
    </div>
  )
}

export default HexMapMakerPage
