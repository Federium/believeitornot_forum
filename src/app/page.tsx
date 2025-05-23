import { createServerSupabase } from '../../lib/supabase/server'

export default async function Home() {
  const supabase = createServerSupabase()
  const { data: threads } = await supabase
    .from('threads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main>
      <h1>strange forum</h1>
      <a href="/new-thread">Crea discussione</a>
      <ul>
        {threads?.map(threads => (
          <li key={threads.id}>
            <a href={`/new-thread/${threads.id}`}>{threads.title}</a>
            <a href={`/new-thread/${threads.date}`}> ---- [{threads.date}]</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
