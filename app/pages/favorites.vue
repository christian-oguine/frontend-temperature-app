<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
    <AppHeader />

    <div class="mt-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold flex items-center gap-3">
          <span class="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-rose-50 text-rose-600">
            <Icon name="ph:heart-duotone" size="20" />
          </span>
          <span>Favorites</span>
        </h1>
        <p class="text-textSecondary mt-1">Saved locations for quick access</p>
      </div>

      <div class="flex items-center gap-3">
        <p class="text-sm text-textSecondary">{{ list.length }} saved</p>
        <button
          v-if="list.length"
          @click="clearAll"
          class="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm hover:shadow"
        >
          <Icon name="ph:trash" size="16" /> Clear all
        </button>
      </div>
    </div>

    <div class="mt-6">
      <div v-if="!list.length" class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <Icon name="ph:heart-break" size="48" class="mx-auto text-rose-400 opacity-80" />
        <p class="mt-4 text-lg font-medium">No favorites yet</p>
        <p class="mt-2 text-textSecondary">Save cities while browsing to see them here for easy access.</p>
      </div>

      <ul v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="c in list" :key="c.id" class="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon name="ph:map-pin" size="18" class="text-primary" />
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold truncate">{{ c.city }}</h3>
                    <span class="text-xs text-textSecondary inline-flex items-center gap-1 px-2 py-0.5 rounded-md border">{{ c.country }}</span>
                  </div>
                  <p class="text-xs text-textSecondary mt-1 truncate">{{ c.lat ?? '—' }}, {{ c.lon ?? '—' }}</p>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <NuxtLink :to="`/?city=${encodeURIComponent(c.city)}&unit=${unit}`" class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border hover:bg-gray-50">
                <Icon name="ph:arrow-right" size="14" /> Open
              </NuxtLink>
              <button @click="remove(c.city, c.country)" class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border hover:bg-gray-50">
                <Icon name="ph:trash" size="14" /> Remove
              </button>
            </div>
          </div>
          <div class="absolute top-3 right-3">
            <button @click="toggle(c.city, c.country)" class="p-1 rounded-full bg-white/80 hover:bg-white">
              <Icon :name="'ph:heart-fill'" size="16" class="text-rose-500" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useFavoritesStore } from '../../stores/favorites' // or '../../stores/favorites' if you prefer
const fav = useFavoritesStore()
onMounted(() => fav.load())

// show all items newest-first (already unshifted in store)
const list = computed(() => fav.items)
const remove = (city: string, country: string) => fav.remove(city, country)
const clearAll = () => fav.clear?.() ?? (fav.items = [], fav['save']?.())

// unit to open with – keep it simple (you can add a toggle here if you want)
const unit = ref<'metric' | 'imperial'>('metric')

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}
</script>
