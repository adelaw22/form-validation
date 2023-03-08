// using state management

import './App.css'
import { useState } from 'react'

function App() {
  // const initialState = { fullName: '', email: '', password: '' }
  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.fullName) {
      errors.fullName = 'Fullname is required!'
    }
    if (!values.email) {
      errors.email = 'Email is required!'
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters'
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters'
    }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setFormErrors(validate(formData))
  }

  console.log(formData)

  return (
    <div className="App">
      <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmitted ? (
          <div className="ui message success">Signed in successfully</div>
        ) : (
          <pre>{JSON.stringify(formData)}</pre>
        )}

        <div className="form-container mt-4">
          <form>
            <h4 className="mb-4 text-center">Sign Up</h4>
            <div className=" form_input">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
              />
              <p>{formErrors.fullName}</p>
            </div>

            <div className="form_input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
              />
              <p>{formErrors.email}</p>
            </div>

            <div className="form_input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
              />

              <p>{formErrors.password}</p>
            </div>

            <div className="form_btn mb-3">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
