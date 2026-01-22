import { client } from './client'

export const sanityFetch = async ({ query, params = {} }: { query: string, params?: Record<string, any> }) => {
  return await client.fetch(query, params)
}
