import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const validatePassword = (username: string, password: string) => {
  const expected = username.slice(-1).repeat(3)
  return password === expected
}

function Popup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && validatePassword(username, password)) {
      sessionStorage.setItem('authenticated', 'true')
      navigate('/')
    } else {
      setShowPopup(true)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      {showPopup && (
        <Popup
          message="Wrong password"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  )
}

export default Login