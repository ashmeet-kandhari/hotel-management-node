import NodeCache from 'node-cache'

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 5 * 60 })

export const set = (cacheKey, value) => {
  cache.set(cacheKey, value)
}

export const get = cacheKey => {
  return cache.get(cacheKey)
}
