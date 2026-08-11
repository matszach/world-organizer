import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { APP_TEXT } from '../content/appText'
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
      <h1 className="home-page__title">{APP_TEXT.app.homeTitle}</h1>

      {!world ? (
        <form className="home-page__form" onSubmit={handleSubmit}>
          <label className="home-page__label" htmlFor="world-name">
            {APP_TEXT.homePage.nameYourWorld}
          </label>
          <div className="home-page__form-row">
            <input
              id="world-name"
              className="home-page__input"
              type="text"
              value={worldName}
              onChange={event => setWorldName(event.target.value)}
              placeholder={APP_TEXT.homePage.worldPlaceholder}
            />
            <button className="home-page__submit" type="submit" disabled={!worldName.trim()}>
              {APP_TEXT.homePage.createWorld}
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="home-page__subtitle">{APP_TEXT.homePage.welcomePrefix} {world.name}</p>
          <div className="home-page__apps">
            <Link className="home-page__app-link" to="/hex-map-maker">
              {APP_TEXT.homePage.hexMapMakerLink}
            </Link>
            <Link className="home-page__app-link" to="/notes-vault">
              {APP_TEXT.homePage.notesVaultLink}
            </Link>
          </div>
        </>
      )}
    </main>
  )
}

export default HomePage
