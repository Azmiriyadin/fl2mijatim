
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

  console.log(`Creating fresh admin user: ${email}...`)
  
  const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { 
      role: 'superadmin',
      full_name: 'Admin Korwil Jatim'
    }
  })

  if (createError) {
    console.error('Error creating user:', createError)
  } else {
    console.log('Admin user created successfully:', user?.email)
  }
}

resetAdmin()
