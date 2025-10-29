import { defineStore } from 'pinia'

export interface HistoryEntry {
  id: string
  city: string
  country: string
  temp: number
  unit: 'metric' | 'imperial'
  visitedAt: number
}

const KEY = 'weather:history'

function makeId(city: string, country: string) {
  return `${city.trim().toLowerCase()}|${country.trim().toLowerCase()}`
}

export const useHistoryStore = defineStore('history', {
  state: () => ({
    items: [] as HistoryEntry[],
    loaded: false
  }),

  getters: {
    count: (s) => s.items.length
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

    add(entry: { city: string; country: string; temp: number; unit: 'metric' | 'imperial' }) {
      if (!entry.city || !entry.country) return

      const id = makeId(entry.city, entry.country)
      const existing = this.items.find(i => i.id === id)

      if (existing) {
        // Update existing entry
        existing.visitedAt = Date.now()
        existing.temp = entry.temp
        existing.unit = entry.unit

        // Move to top
        this.items = [
          existing,
          ...this.items.filter(i => i.id !== id)
        ]
      } else {
        this.items.unshift({
          id,
          city: entry.city,
          country: entry.country,
          temp: entry.temp,
          unit: entry.unit,
          visitedAt: Date.now()
        })

        // Keep only the last 20 items
        if (this.items.length > 20) {
          this.items = this.items.slice(0, 20)
        }
      }

      this.save()
    },

    remove(city: string, country: string) {
      const id = makeId(city, country)
      this.items = this.items.filter(i => i.id !== id)
      this.save()
    },

    /** Clear all history */
    clear() {
      this.items = []
      this.save()
    }
  }
})
