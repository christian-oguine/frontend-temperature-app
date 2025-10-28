<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Left: Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <Icon name="ph:cloud-sun-duotone" size="26" class="text-primary group-hover:scale-110 transition" />
            <span class="font-semibold text-lg text-textPrimary">TempChecker</span>
          </NuxtLink>

          <!-- Right: Nav + Favorites -->
          <nav class="flex items-center gap-2">
            <NuxtLink
              v-for="item in navItems"
              :key="item.label"
              :to="item.to"
              class="px-3 py-2 rounded-xl text-sm font-medium text-textSecondary hover:text-textPrimary hover:bg-gray-100 transition"
            >
              <span class="inline-flex items-center gap-2">
                <Icon :name="item.icon" size="18" />
                {{ item.label }}
              </span>
            </NuxtLink>

            <!-- Favorites button -->
            <button
              type="button"
              class="relative ml-2 inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 active:scale-[0.99] transition"
              @click="onFavoritesClick"
              aria-label="Open favorites"
            >
              <Icon name="ph:heart-duotone" size="18" class="text-rose-500" />
              <span>Favorites</span>
              <span
                class="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white shadow"
              >
                {{ favoritesCount }}
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="min-h-[calc(100vh-4rem)]">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">

        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-semibold text-textPrimary flex items-center justify-center gap-2">
            <Icon name="ph:thermometer-duotone" size="28" class="text-primary" />
            Check City Temperature
          </h1>
          <p class="text-textSecondary mt-1 text-sm">Enter a city name to check the temperature.</p>
        </div>

        <!-- Search Form -->
        <form @submit.prevent="onSubmit" class="mx-auto grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
          <div class="relative">
            <Icon name="ph:map-pin-duotone" size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              v-model.trim="query"
              type="text"
              placeholder="Enter a city (e.g., Brussels)"
              class="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              autocomplete="off"
                
            />
          </div>
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-medium hover:brightness-110 active:scale-[0.99] transition"
          >
            <Icon name="ph:magnifying-glass-duotone" size="18" />
            Search
          </button>
        </form>

        <!-- Result -->
        <div v-if="result" class="mt-6">
          <div class="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <Icon name="ph:map-pin-duotone" size="18" class="text-primary" />
                  <h2 class="text-lg sm:text-xl font-semibold text-textPrimary">{{ result.city }}</h2>
                </div>
                <p class="text-textSecondary text-sm mt-0.5">Last updated: just now (demo)</p>
              </div>
              <Icon name="ph:sun-duotone" size="32" class="opacity-80" />
            </div>

            <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="rounded-xl bg-background p-4 border border-gray-200">
                <p class="text-textSecondary text-xs uppercase tracking-wide">Celsius</p>
                <p class="text-3xl font-semibold mt-1">{{ result.celsius.toFixed(1) }}°C</p>
              </div>
              <div class="rounded-xl bg-background p-4 border border-gray-200">
                <p class="text-textSecondary text-xs uppercase tracking-wide">Fahrenheit</p>
                <p class="text-3xl font-semibold mt-1">{{ toF(result.celsius).toFixed(1) }}°F</p>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-2 text-sm text-textSecondary">
              <span class="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1">
                <Icon name="ph:thermometer-simple-duotone" size="16" /> Feels like {{ (result.celsius + 1.2).toFixed(1) }}°C (demo)
              </span>
              <span class="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1">
                <Icon name="ph:waves-duotone" size="16" /> Humidity {{ result.humidity }}% (demo)
              </span>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="mt-8">
          <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <Icon name="ph:cloud-sun-duotone" size="40" class="mx-auto opacity-70" />
            <p class="mt-3 text-textSecondary">Search a city to see its demo temperature.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const favoritesCount = ref(3) // demo data
const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'ph:speedometer-duotone' },
  { label: 'History', to: '/history', icon: 'ph:clock-counter-clockwise-duotone' }
]

function onFavoritesClick() {
  alert('Open Favorites (demo)')
}

// demo dataset (no API)
const demoTemps: Record<string, { c: number; humidity: number }> = {
  Brussels: { c: 18.6, humidity: 72 },
  Ghent: { c: 17.9, humidity: 68 },
  Antwerp: { c: 19.2, humidity: 70 },
  Lagos: { c: 30.4, humidity: 78 },
  Bruges: { c: 16.7, humidity: 74 }
}

const query = ref('Brussels')
const result = ref<null | { city: string; celsius: number; humidity: number }>(null)

function toF(c: number) {
  return c * 9/5 + 32
}

function onSubmit() {
  const city = (query.value || '').trim()
  if (!city) {
    result.value = null
    return
  }
  const hit = demoTemps[city as keyof typeof demoTemps]
  const celsius = hit?.c ?? (Math.random() * 15 + 10)
  const humidity = hit?.humidity ?? Math.floor(Math.random() * 40 + 40)
  result.value = { city, celsius, humidity }
}

// Prefill one result on mount
onSubmit()
</script>
