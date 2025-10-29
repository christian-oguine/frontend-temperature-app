<template>
  <div class="min-h-screen bg-background">
    <AppHeader />

    <main class="min-h-[calc(100vh-4rem)]">
      <!-- Center, same width as index -->
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <!-- Title row -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Icon name="ph:heart-duotone" size="20" class="text-rose-600" />
            <h1 class="text-2xl font-semibold text-textPrimary">Favorites</h1>
            <span class="text-xs text-textSecondary border border-gray-200 rounded-md px-2 py-0.5">
              {{ filtered.length }} item(s)
            </span>
          </div>

          <button
            v-if="list.length"
            class="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
            @click="clearAll"
          >
            Clear all
          </button>
        </div>

        <!-- Filter -->
        <div class="mb-5">
          <div class="relative">
            <Icon name="ph:magnifying-glass-duotone"
                  size="18"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              v-model="q"
              type="text"
              placeholder="Filter by city or country…"
              class="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        <!-- Empty -->
        <div v-if="!filtered.length"
             class="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
          <div class="mx-auto h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center mb-3">
            <Icon name="ph:heart-duotone" size="18" class="text-rose-600" />
          </div>
          <p class="text-textPrimary font-medium">No favourites yet.</p>
          <p class="text-textSecondary text-sm">Save a city from the dashboard using the heart button.</p>
        </div>

        <!-- List -->
        <ul v-else class="space-y-3">
          <li v-for="c in filtered" :key="c.id"
              class="rounded-lg border border-gray-200 bg-white p-5 hover:shadow-sm transition">
            <div class="flex items-center justify-between gap-4">
              <!-- Left -->
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <Icon name="ph:map-pin-duotone" size="18" class="text-primary" />
                  <h3 class="font-semibold text-textPrimary truncate">{{ c.city }}</h3>
                  <span class="text-xs text-textSecondary px-2 py-0.5 rounded-md border">{{ c.country }}</span>
                </div>
                <p class="text-xs text-textSecondary mt-1">
                  {{ c.lat ?? '—' }}, {{ c.lon ?? '—' }} · added {{ timeAgo(c.addedAt) }}
                </p>
              </div>

              <!-- Right (buttons with breathing room) -->
              <div class="flex items-center gap-3 shrink-0">
                <NuxtLink
                  :to="`/?city=${encodeURIComponent(c.city)}`"
                  class="inline-flex items-center gap-1 rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:opacity-95"
                  title="Open on dashboard"
                >
                  <Icon name="ph:arrow-up-right" size="16" />
                  Open
                </NuxtLink>

                <button
                  class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-textPrimary hover:bg-gray-50"
                  @click="remove(c.city, c.country)"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <AppFooter  />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import { useFavoritesStore } from '../../stores/favorites'

const fav = useFavoritesStore()
onMounted(() => fav.load())

const q = ref('')

const list = computed(() => fav.items)
const filtered = computed(() => {
  const n = q.value.trim().toLowerCase()
  if (!n) return list.value
  return list.value.filter(i =>
    i.city.toLowerCase().includes(n) || i.country.toLowerCase().includes(n)
  )
})

const remove = (city: string, country: string) => fav.remove(city, country)

function clearAll() {
  if (!list.value.length) return
  if (confirm('Remove all favourites?')) {
    if (typeof (fav as any).clear === 'function') (fav as any).clear()
    else { fav.items = []; (fav as any).save?.() }
  }
}

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24); return `${d}d ago`
}
</script>
