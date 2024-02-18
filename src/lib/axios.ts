import { env } from '@/src/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.SERVER_URL,
})

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 800)),
  )
  return config
})
