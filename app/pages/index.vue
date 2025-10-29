<template>
  <div class="min-h-screen bg-background">
    <AppHeader />

    <main class="min-h-[calc(100vh-4rem)]">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <!-- Title -->
        <div class="text-center mb-6">
          <h1 class="text-2xl sm:text-3xl font-semibold text-textPrimary flex items-center justify-center gap-2">
            <Icon name="ph:thermometer-duotone" size="28" class="text-primary" />
            Check City Temperature
          </h1>
          <p class="text-textSecondary mt-1 text-sm">Enter a city name to check the temperature.</p>
        </div>

        <!-- Search -->
        <div
          class="mx-auto grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
          <div class="relative">
            <Icon name="ph:map-pin-duotone" size="20"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              v-model="cityInput"
              type="text"
              class="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-3 text-sm focus:outline-none"
              placeholder="Ghent"
              @keyup.enter="fetchWeather"
            />
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-medium"
            @click="fetchWeather"
          >
            <Icon name="ph:magnifying-glass-duotone" size="18" />
            Search
          </button>
        </div>

        <!-- Card -->
        <section class="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
          <!-- Header row -->
          <div class="flex items-start justify-between gap-4">
            <!-- location block -->
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <Icon name="ph:map-pin-duotone" size="18" class="text-primary" />
                <h2 class="text-lg sm:text-xl font-semibold text-textPrimary truncate">
                  {{ data?.city || '—' }}
                </h2>
                <span
                  class="text-textSecondary text-xs sm:text-sm inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-gray-200">
                  {{ data?.country || '—' }}   
                </span>
                <img v-if="data?.weather?.icon" :src="data.weather.icon" alt="weather" class="h-8 w-8" />
              </div>
              <!-- coordinates -->
              <div class="mt-1 flex items-center gap-2 text-xs sm:text-sm text-textSecondary">
                <Icon name="ph:map-trifold-duotone" size="14" class="opacity-70" />
                <span class="ml-2">{{ data?.coordinates?.lat ?? '—' }}, {{ data?.coordinates?.lon ?? '—' }}</span>
              </div>
            </div>

            <!-- unit toggle + fav + icon -->
            <div class="flex items-center gap-2">
              <div class="rounded-xl border border-gray-200 overflow-hidden flex">
                <button type="button" class="px-3 py-1 text-sm"
                        :class="unit==='metric' ? 'bg-primary text-white' : 'text-textSecondary'"
                        @click="setUnit('metric')">°C</button>
                <button type="button" class="px-3 py-1 text-sm"
                        :class="unit==='imperial' ? 'bg-primary text-white' : 'text-textSecondary'"
                        @click="setUnit('imperial')">°F</button>
              </div>

        
              <button
                type="button"
                class="rounded-full p-2 border border-gray-200 hover:bg-gray-50"
                :class="isFaved ? 'text-rose-600' : 'text-textSecondary'"
                @click="toggleFavorite"
                :title="isFaved ? 'Remove from favourites' : 'Add to favourites'"
                aria-label="Toggle favourite"
              >
                <Icon name="ph:heart-duotone" size="18" />
              </button>


                <!-- favorite button -->

            </div>
          </div>

          <!-- Primary reading -->
          <div class="mt-4 flex items-end gap-4">
            <div class="flex-1">
              <p class="text-textSecondary text-xs uppercase tracking-wide">Current temperature</p>
              <p class="text-4xl sm:text-5xl font-semibold leading-tight">
                <span>{{ fmt(data?.temperature?.current) }}°{{ unitLabel }}</span>
              </p>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm text-textSecondary">
              <div class="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1">
                <Icon name="ph:thermometer-simple-duotone" size="16" />
                <span>Feels like {{ fmt(data?.temperature?.feels_like) }}°{{ unitLabel }}</span>
              </div>
              <div class="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1">
                <Icon name="ph:waves-duotone" size="16" />
                <span>Humidity {{ data?.humidity ?? '—' }}%</span>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="mt-6">
            <div class="inline-flex rounded-xl border border-gray-200 overflow-hidden">
              <button class="px-4 py-2 text-sm"
                      :class="tab==='overview' ? 'bg-gray-100 text-textPrimary' : 'text-textSecondary'"
                      @click="tab='overview'">Overview</button>
              <button class="px-4 py-2 text-sm"
                      :class="tab==='wind' ? 'bg-gray-100 text-textPrimary' : 'text-textSecondary'"
                      @click="tab='wind'">Wind</button>
              <button class="px-4 py-2 text-sm"
                      :class="tab==='atmo' ? 'bg-gray-100 text-textPrimary' : 'text-textSecondary'"
                      @click="tab='atmo'">Atmosphere</button>
            </div>

            <!-- OVERVIEW -->
            <div v-show="tab==='overview'" class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-2">Today</p>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-textSecondary text-xs">Low</p>
                    <p class="font-medium">{{ fmt(data?.temperature?.min) }}°{{ unitLabel }}</p>
                  </div>
                  <div class="h-10 w-px bg-gray-200"></div>
                  <div>
                    <p class="text-textSecondary text-xs">High</p>
                    <p class="font-medium">{{ fmt(data?.temperature?.max) }}°{{ unitLabel }}</p>
                  </div>
                </div>
              </div>

              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Sunrise</p>
                <p>{{ data?.sunrise || '—' }} (TZ {{ data?.timezone || '' }})</p>
              </div>

              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Sunset</p>
                <p>{{ data?.sunset || '—' }} (TZ {{ data?.timezone || '' }})</p>
              </div>
            </div>

            <!-- WIND -->
            <div v-show="tab==='wind'" class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Speed</p>
                <p>{{ data?.wind?.speed ?? '—' }}</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Direction</p>
                <div class="flex items-center gap-2">
                  <div class="h-4 w-4 border border-gray-300 rounded-full flex items-center justify-center">
                    <Icon name="ph:arrow-up" size="12" :style="{ transform: `rotate(${data?.wind?.deg ?? 0}deg)` }" />
                  </div>
                  <p>{{ data?.wind?.deg ?? '—' }}°</p>
                </div>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Gust</p>
                <p>{{ data?.wind?.gust ?? '—' }}</p>
              </div>
            </div>

            <!-- ATMOSPHERE -->
            <div v-show="tab==='atmo'" class="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Pressure</p>
                <p>{{ data?.pressure ?? '—' }} hPa</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Humidity</p>
                <p>{{ data?.humidity ?? '—' }}%</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Clouds</p>
                <p>{{ data?.clouds ?? '—' }}%</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Visibility</p>
                <p>{{ data?.visibility ?? '—' }} m</p>
              </div>
            </div>
          </div>

          <p v-if="pending" class="mt-4 text-sm text-textSecondary">Loading…</p>
          <p v-if="error" class="mt-4 text-sm text-red-600">
            Error: {{ error?.statusMessage || error?.message || 'Request failed' }}
          </p>
        </section>
      </div>
    </main>

    <AppFooter  />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFavoritesStore } from '../../stores/favorites'    
import AppHeader from '~/components/AppHeader.vue'            
import AppFooter from '~/components/AppFooter.vue'

/** UI state */
const cityInput = ref('Ghent')
const unit = ref<'metric' | 'imperial'>('metric')
const tab = ref<'overview' | 'wind' | 'atmo'>('overview')

/** Data state */
const data = ref<any>(null)
const error = ref<any>(null)
const pending = ref(false)

/** Favorites store */
const fav = useFavoritesStore()

/** Display helpers */
const unitLabel = computed(() => (unit.value === 'metric' ? 'C' : 'F'))
const fmt = (n: unknown) => (typeof n === 'number' ? n.toFixed(1) : '—')

/** Fetch weather by current input + unit */
async function fetchWeather() {
  const city = (cityInput.value || '').trim() || 'Ghent'
  pending.value = true
  error.value = null
  try {
    const res = await $fetch('http://localhost:5000/api/weather', {
      query: { city, unit: unit.value }
    })
    data.value = res
  } catch (e: any) {
    error.value = e
    data.value = null
  } finally {
    pending.value = false
  }
}

/** Toggle unit and refetch */
async function setUnit(newUnit: 'metric' | 'imperial') {
  if (unit.value === newUnit) return
  unit.value = newUnit
  await fetchWeather()
}

/** Favourite state for current result */
const isFaved = computed(() => {
  const c = data.value?.city
  const cc = data.value?.country
  return c && cc ? fav.has(c, cc) : false
})

/** Favourite click handler */
function toggleFavorite() {
  const r = data.value
  if (!r?.city || !r?.country) return
  fav.toggle({
    city: r.city,
    country: r.country,
    lat: r.coordinates?.lat,
    lon: r.coordinates?.lon
  })
}

/** Init */
onMounted(() => {
  fav.load()         
  fetchWeather()    
})
</script>