import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Profile } from '../../../types/profile'
type Profiles = Profile['public']['Tables']['profiles']['Row']

export default function AdminCard({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Profile>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [full_name, setFullName] = useState<Profiles['full_name']>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  console.log(user)

  console.log(username)

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, full_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setFullName(data.full_name)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="username">Username</label>
        <p>{username}</p>
      </div>
      <div>
        <label htmlFor="username">FullName</label>
        <p>{full_name}</p>
      </div>
    </div>
  )
}