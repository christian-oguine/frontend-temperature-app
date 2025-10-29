import { defineStore } from 'pinia'

type Unit = 'metric' | 'imperial'

export interface FavoriteCity {
  id: string           
  city: string
  country: string
  lat?: number
  lon?: number
  addedAt: number
}

const KEY = 'weather:favorites'

function makeId(city: string, country: string) {
  return `${city.trim().toLowerCase()}|${country.trim().toLowerCase()}`
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as FavoriteCity[],
    loaded: false,
  }),

  getters: {
    // quick check if a city is favorited
    has: (s) => (city: string, country: string) =>
      s.items.some(i => i.id === makeId(city, country)),

    count: (s) => s.items.length,
  },

  actions: {
    load() {
      if (this.loaded) return
      const raw = localStorage.getItem(KEY)
      this.items = raw ? JSON.parse(raw) : []
      this.loaded = true
    },
    save() {
      localStorage.setItem(KEY, JSON.stringify(this.items))
    },

    add(payload: { city: string; country: string; lat?: number; lon?: number }) {
      const id = makeId(payload.city, payload.country)
      if (this.items.some(i => i.id === id)) return
      this.items.unshift({
        id,
        city: payload.city,
        country: payload.country,
        lat: payload.lat,
        lon: payload.lon,
        addedAt: Date.now(),
      })
      this.save()
    },

    remove(city: string, country: string) {
      const id = makeId(city, country)
      this.items = this.items.filter(i => i.id !== id)
      this.save()
    },

    toggle(payload: { city: string; country: string; lat?: number; lon?: number }) {
      if (this.has(payload.city, payload.country)) {
        this.remove(payload.city, payload.country)
      } else {
        this.add(payload)
      }
    },
  },
})
