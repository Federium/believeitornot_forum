'use client'

import { createClient } from '../../../lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewThread() {
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    
    const { error } = await supabase
      .from('threads')
      .insert({ title: formData.get('title') })
    
    if(!error) router.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="title" 
        placeholder="Titolo discussione" 
        required 
      />
      <button type="submit">Crea</button>
    </form>
  )
}
