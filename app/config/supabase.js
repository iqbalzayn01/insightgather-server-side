const {createClient} = require('@supabase/supabase-js');
const {supabaseUrl, supabaseKey} = require('./index')

const url = supabaseUrl ?? '';
const key = supabaseKey ?? '';

if(!url || !key) {
    console.error('FATAL ERROR: SUPABASE_URL or SUPABASE_KEY is not defined.')
}

const supabase = createClient(url, key)

export default supabase;