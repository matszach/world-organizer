import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="home-page">
      <h1 className="home-page__title">world-organizer</h1>
      <p className="home-page__subtitle">Choose an app to launch.</p>
      <div className="home-page__apps">
        <Link className="home-page__app-link" to="/hex-map-maker">
          Hex Map Maker
        </Link>
      </div>
    </main>
  )
}

export default HomePage
