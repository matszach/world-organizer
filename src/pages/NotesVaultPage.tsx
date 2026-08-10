import Navbar from '../components/Navbar/Navbar'
import './NotesVaultPage.scss'

function NotesVaultPage() {
  return (
    <div className="app">
      <Navbar appTitle="notes-vault" showHomeButton />
      <main className="notes-vault-page">
        <h2 className="notes-vault-page__title">Notes Vault</h2>
        <p className="notes-vault-page__subtitle">
          Store campaign notes, ideas, and references in one place.
        </p>
      </main>
    </div>
  )
}

export default NotesVaultPage
