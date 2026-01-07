
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function resetAdmin() {
  const email = 'admin.jatim@fl2mi.or.id'
  const password = 'KorwilJatim2026!Secure'
  const userId = 'dbf30764-7812-4bc9-bbd3-4190332f2430'

  console.log(`Targeting user ${email} (${userId})...`)
  
  const { data: { user }, error: updateError } = await supabase.auth.admin.updateUserById(
    userId,
    { password: password, email_confirm: true }
  )

  if (updateError) {
    console.error('Error updating password:', updateError)
  } else {
    console.log('Password updated successfully for user:', user?.email)
  }
}

resetAdmin()
