const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    supabaseUrl: process.env.PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.PUBLIC_SUPABASE_KEY,
}