import { createServerSupabase } from '../../../../lib/supabase/server'
import { redirect } from 'next/navigation'
import commentForm from './commentForm'

export default async function ThreadPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  // 1. Attendi i params
  const resolvedParams = await params

  // 2. Verifica ID
  if (!resolvedParams?.id) redirect('/')

  // 3. Crea client Supabase (async)
  const supabase = await createServerSupabase()

  // 4. Fetch dati con gestione errori
  const { data: thread, error } = await supabase
    .from('threads')
    .select()
    .eq('id', resolvedParams.id)
    .single()

  if (error || !thread) redirect('/')

  return (
    <div>
      <h2>{thread.title}</h2>

    </div>
  )
}




