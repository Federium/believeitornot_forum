import { createServerSupabase } from '../../../../lib/supabase/server'

export default async function ThreadPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabase()
  
  const { data: thread } = await supabase
    .from('threads')
    .select()
    .eq('id', params.id)
    .single()

  const { data: comments } = await supabase
    .from('comments')
    .select()
    .eq('thread_id', params.id)

  return (
    <div>
      <h2>{thread?.title}</h2>
      
      {/* Form commenti (client component) */}
      <CommentForm threadId={params.id} />
      
      <ul>
        {comments?.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}
