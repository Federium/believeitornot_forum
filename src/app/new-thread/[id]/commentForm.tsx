'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/client'

export default function CommentForm({ 
  threadId 
}: { 
  threadId: Promise<string> 
}) {
  // 1. Converti Promise in valore sincrono
  const resolvedThreadId = React.use(threadId)
  
  // 2. Resto del codice invariato
  const [content, setContent] = React.useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase
      .from('comments')
      .insert({ thread_id: resolvedThreadId, content })
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Invia</button>
    </form>
  )
}
