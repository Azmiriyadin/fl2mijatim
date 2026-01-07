
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

  console.log(`Checking user ${email}...`)
  
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
  
  if (listError) {
    console.error('Error listing users:', listError)
    return
  }

  const user = users.find(u => u.email === email)

  if (user) {
    console.log('User exists, updating password...')
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: password, email_confirm: true }
    )
    if (updateError) {
      console.error('Error updating password:', updateError)
    } else {
      console.log('Password updated successfully')
    }
  } else {
    console.log('User not found, creating user...')
    const { error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: 'SUPER_ADMIN' }
    })
    if (createError) {
      console.error('Error creating user:', createError)
    } else {
      console.log('User created successfully')
    }
  }
}

resetAdmin()
