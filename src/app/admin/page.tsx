'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import AdminCard from './components/AdminCard'

const Admin = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
  
    const handleLogin = async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      try {
        const { data, error } = await supabase.auth.signInWithPassword({email, password})
        if (error) {
          setError(error.message)
        }
      } catch (error) {
        setError((error as Error).message)
      }
    }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
                <form onSubmit={handleLogin}>
                <div>
                  <label>Email:</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <button type="submit">Login</button>
                </div>
                {error && <p>{error}</p>}
              </form>
      ) : (
        <>
        <AdminCard session={session}/>
        <button className='mt-6' onClick={handleLogout}>Logout</button>
      </>
      )}
    </div>
  )
}

export default Admin