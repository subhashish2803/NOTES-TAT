import React, { useRef, useState, useEffect } from 'react'
import { Card, Button, Form, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import '../assets/css/chatApp.css'
import { Google } from 'react-bootstrap-icons'
import Loader from './Loader'

export default function Login() {
  useEffect(() => {
    document.title = 'Login | VISTOFY'
    return () => {
      document.title = 'NOTES-TAT | VISTOFY'
    }
  }, [])

  const [isDark, setIsDark] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => setIsDark(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [errorDef, setErrorDef] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setError('')
      setErrorDef('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      // navigate('/profile')
    } catch (err) {
      setError('Failed to log in')
      if (err.code === 'auth/user-not-found') setErrorDef('No user found with this email')
      else if (err.code === 'auth/wrong-password') setErrorDef('Wrong password')
      else if (err.code === 'auth/too-many-requests') setErrorDef('Too many requests. Try again later')
      else if (err.code === 'auth/invalid-email') setErrorDef('Invalid email')
      else if (err.code === 'auth/user-disabled') setErrorDef('User disabled')
      else setErrorDef(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('')
      setErrorDef('')
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [error, errorDef])

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const displayName = result.user.displayName || 'user'
      const firstName = displayName.split(" ")[0]
      const avatar = `https://api.dicebear.com/5.x/croodles/svg?seed=${firstName}&radius=50`

      if (result.user.photoURL !== avatar) {
        await updateProfile(result.user, { photoURL: avatar })
      }
    } catch (err) {
      console.error("Google sign-in error:", err)
      setError('Google sign-in failed')
      setErrorDef(err.message)
    }
  }

  if (loading) return <Loader />

  return (
    <Container className='d-flex align-items-center justify-content-center h-100' style={{ minHeight: '80vh' }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Card style={{
          borderRadius: '0.5rem',
          borderColor: 'var(--text-var)',
          borderWidth: '1px',
          borderStyle: 'dashed',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-dark)'
        }}>
          <Card.Body className='text-var'>
            <h1 className='text-center m-4'>Log In</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            {errorDef && <p style={{ color: '#ff5e5b' }}>{errorDef}</p>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-1 btn btn-primary' type='submit'>
                Log In
              </Button>
            </Form>

            <button
              className="btn w-100 mt-2"
              style={{ color: isDark ? 'var(--text-var)' : undefined }}
              onClick={signInWithGoogle}
            >
              <Google /> Sign In With Google
            </button>

            <div className='w-100 text-center mt-3'>
              <Link to='/forgot-password' style={{ color: '#ff5e5b' }}>Forgot Password</Link>
            </div>
          </Card.Body>
        </Card>

        <div className='w-100 text-center mt-2'>
          Need an account? <Link to='/signup' className='text-var'>Sign up</Link>
        </div>
      </div>
    </Container>
  )
}
