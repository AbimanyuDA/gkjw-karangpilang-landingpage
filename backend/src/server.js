import { createApp } from './app.js'

const port = Number(process.env.PORT) || 4000

createApp().listen(port, () => {
  console.log(`API GKJW Karangpilang berjalan di http://localhost:${port}/api/content`)
})
