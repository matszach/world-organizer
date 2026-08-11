import './Navbar.scss'
import { Link } from 'react-router-dom'
import { APP_TEXT } from '../../content/appText'

interface NavbarProps {
  appTitle: string
  showHomeButton?: boolean
}

function Navbar({ appTitle, showHomeButton = false }: NavbarProps) {
  return (
    <nav className="navbar">
      <span className="navbar__title">{appTitle}</span>
      <div className="navbar__actions">
        {showHomeButton && (
          <Link className="navbar__btn navbar__btn--link" to="/">
            {APP_TEXT.navbar.backToHome}
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
