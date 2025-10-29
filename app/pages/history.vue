<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <Icon name="ph:clock-counter-clockwise-duotone" size="22" class="text-primary" />
          <h1 class="text-2xl font-semibold text-gray-800">History</h1>
        </div>

        <button
          v-if="list.length"
          @click="clearAll"
          class="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-600"
        >
          Clear all
        </button>
      </div>

      <div v-if="!list.length" class="text-gray-500 text-center py-10">
        <p>No search history yet.</p>
      </div>

      <!-- Search filter -->
      <div v-else class="mb-5">
        <input
          v-model="filter"
          type="text"
          placeholder="Filter by city or country..."
          class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <!-- List of history items -->
      <ul v-if="filteredList.length" class="space-y-3">
        <li
          v-for="h in filteredList"
          :key="h.id"
          class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm hover:shadow-md transition"
        >
          <!-- Left info -->
          <div class="flex items-center gap-2">
            <Icon name="ph:map-pin-duotone" size="18" class="text-primary" />
            <div>
              <p class="font-medium text-gray-800">{{ h.city }}</p>
              <p class="text-xs text-gray-500">
                {{ h.country }} • {{ fmtTemp(h.temp, h.unit) }} • {{ timeAgo(h.visitedAt) }}
              </p>
            </div>
          </div>

          <!-- Right action -->
          <NuxtLink
            :to="`/?city=${encodeURIComponent(h.city)}&unit=${h.unit}`"
            class="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <Icon name="ph:arrow-square-out-duotone" size="16" /> Open
          </NuxtLink>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHistoryStore } from '../../stores/history'
import AppHeader from '../components/AppHeader.vue'

const history = useHistoryStore()
onMounted(() => history.load())

// Filter input
const filter = ref('')

// Computed filtered list
const list = computed(() => history.items)
const filteredList = computed(() => {
  const q = filter.value.trim().toLowerCase()
  if (!q) return list.value
  return list.value.filter(h =>
    h.city.toLowerCase().includes(q) || h.country.toLowerCase().includes(q)
  )
})


function fmtTemp(t: number, unit: string) {
  if (!t && t !== 0) return '—'
  const symbol = unit === 'imperial' ? '°F' : '°C'
  return `${t.toFixed(1)}${symbol}`
}

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

function clearAll() {
  history.items = []
  localStorage.removeItem('weather:history')
}
</script>
