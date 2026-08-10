import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.scss'
import useUserStateStore from '../state/user-state-store'

function HomePage() {
  const [worldName, setWorldName] = useState('')
  const world = useUserStateStore(state => state.world)
  const createWorld = useUserStateStore(state => state.createWorld)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createWorld(worldName)
    setWorldName('')
  }

  return (
    <main className="home-page">
      <h1 className="home-page__title">world-organizer</h1>

      {!world ? (
        <form className="home-page__form" onSubmit={handleSubmit}>
          <label className="home-page__label" htmlFor="world-name">
            Name your world
          </label>
          <div className="home-page__form-row">
            <input
              id="world-name"
              className="home-page__input"
              type="text"
              value={worldName}
              onChange={event => setWorldName(event.target.value)}
              placeholder="My world"
            />
            <button className="home-page__submit" type="submit" disabled={!worldName.trim()}>
              Create world
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="home-page__subtitle">Welcome to {world.name}</p>
          <div className="home-page__apps">
            <Link className="home-page__app-link" to="/hex-map-maker">
              Hex Map Maker
            </Link>
            <Link className="home-page__app-link" to="/notes-vault">
              Notes Vault
            </Link>
          </div>
        </>
      )}
    </main>
  )
}

export default HomePage
