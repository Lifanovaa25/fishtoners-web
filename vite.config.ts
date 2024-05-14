import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths  from 'vite-tsconfig-paths'
import dotenv from 'dotenv'
import mkcert from 'vite-plugin-mkcert'
import svgr from "vite-plugin-svgr";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(), 
    mkcert(),
    svgr()
  ],
  define: {
    __SUPABASE_URL__: `"${process.env.SUPABASE_URL}"`,
    __SUPABASE_ANON_KEY__: `"${process.env.SUPABASE_ANON_KEY}"`,
    __BOT_LINK__: `"${process.env.BOT_LINK}"`,
    __START_APP__: `"${process.env.START_APP}"`
  },
})
