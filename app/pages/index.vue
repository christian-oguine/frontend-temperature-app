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

        <!-- Search (visual only) -->
        <div class="mx-auto grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
          <div class="relative">
            <Icon name="ph:map-pin-duotone" size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              type="text"
              value="Ghent"
              
              class="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-3 text-sm focus:outline-none"
            />
          </div>
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-medium">
            <Icon name="ph:magnifying-glass-duotone" size="18" />
            Search
          </button>
        </div>

        <!-- Card -->
        <section class="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
          <!-- Header row -->
          <div class="flex items-start justify-between gap-4">
            <!-- Left: location block -->
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <Icon name="ph:map-pin-duotone" size="18" class="text-primary" />
                <h2 class="text-lg sm:text-xl font-semibold text-textPrimary truncate">Ghent</h2>
                <span class="text-textSecondary text-xs sm:text-sm inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-gray-200">
                  BE
                </span>
              </div>
              <!-- coordinates + tz as a subtle second line -->
              <div class="mt-1 flex items-center gap-2 text-xs sm:text-sm text-textSecondary">
                <Icon name="ph:map-trifold-duotone" size="14" class="opacity-70" />
                <span>51.05, 3.73</span>
              </div>
            </div>

            <!-- Right: unit toggle + fav + icon -->
            <div class="flex items-center gap-2">
              <div class="rounded-xl border border-gray-200 overflow-hidden flex">
                <button type="button" class="px-3 py-1 text-sm" :class="unit==='C' ? 'bg-primary text-white' : 'text-textSecondary'" @click="unit='C'">°C</button>
                <button type="button" class="px-3 py-1 text-sm" :class="unit==='F' ? 'bg-primary text-white' : 'text-textSecondary'" @click="unit='F'">°F</button>
              </div>

              <button
                type="button"
                class="rounded-full p-2 border border-gray-200 hover:bg-gray-50"
                :class="faved ? 'text-rose-600' : 'text-textSecondary'"
                @click="faved=!faved"
                aria-label="Add to favorites"
                title="Add to favorites"
              >
                <Icon name="ph:heart-duotone" size="18" />
              </button>

              <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="weather" class="h-8 w-8" />
            </div>
          </div>

          <!-- Primary reading -->
          <div class="mt-4 flex items-end gap-4">
            <div class="flex-1">
              <p class="text-textSecondary text-xs uppercase tracking-wide">Current temperature</p>
              <p class="text-4xl sm:text-5xl font-semibold leading-tight">
                <span v-show="unit==='C'">13.0°C</span>
                <span v-show="unit==='F'">55.4°F</span>
              </p>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm text-textSecondary">
              <div class="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1">
                <Icon name="ph:thermometer-simple-duotone" size="16" />
                <span v-show="unit==='C'">Feels like 12.5°C</span>
                <span v-show="unit==='F'">Feels like 54.5°F</span>
              </div>
              <div class="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1">
                <Icon name="ph:waves-duotone" size="16" /> Humidity 62%
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="mt-6">
            <div class="inline-flex rounded-xl border border-gray-200 overflow-hidden">
              <button class="px-4 py-2 text-sm" :class="tab==='overview' ? 'bg-gray-100 text-textPrimary' : 'text-textSecondary'" @click="tab='overview'">Overview</button>
              <button class="px-4 py-2 text-sm" :class="tab==='wind' ? 'bg-gray-100 text-textPrimary' : 'text-textSecondary'" @click="tab='wind'">Wind</button>
              <button class="px-4 py-2 text-sm" :class="tab==='atmo' ? 'bg-gray-100 text-textPrimary' : 'text-textSecondary'" @click="tab='atmo'">Atmosphere</button>
            </div>

            <!-- OVERVIEW -->
            <div v-show="tab==='overview'" class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <!-- Low / High -->
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-2">Today</p>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-textSecondary text-xs">Low</p>
                    <p class="font-medium">
                      <span v-show="unit==='C'">8.0°C</span>
                      <span v-show="unit==='F'">46.4°F</span>
                    </p>
                  </div>
                  <div class="h-10 w-px bg-gray-200"></div>
                  <div>
                    <p class="text-textSecondary text-xs">High</p>
                    <p class="font-medium">
                      <span v-show="unit==='C'">13.0°C</span>
                      <span v-show="unit==='F'">55.4°F</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Sunrise -->
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Sunrise</p>
                <p>07:23 (TZ +2)</p>
              </div>

              <!-- Sunset -->
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Sunset</p>
                <p>17:21 (TZ +2)</p>
              </div>

              <!-- (Coordinates card removed) -->
            </div>

            <!-- WIND -->
            <div v-show="tab==='wind'" class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Speed</p>
                <p>18 km/h</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Direction</p>
                <div class="flex items-center gap-2">
                  <div class="h-4 w-4 border border-gray-300 rounded-full flex items-center justify-center">
                    <Icon name="ph:arrow-up" size="12" style="transform: rotate(230deg);" />
                  </div>
                  <p>230°</p>
                </div>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Gust</p>
                <p>8.1 m/s</p>
              </div>
            </div>

            <!-- ATMOSPHERE -->
            <div v-show="tab==='atmo'" class="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Pressure</p>
                <p>1016 hPa</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Humidity</p>
                <p>62%</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Clouds</p>
                <p>48%</p>
              </div>
              <div class="rounded-xl border border-gray-200 p-3">
                <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Visibility</p>
                <p>9000 m</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const unit = ref<'metric' | 'imperial'>('imperial')

const {data, error} = await useFetch ("http://localhost:5000/api/weather", {
    method: "GET",
    query: {
        city: "Brugge",
        unit: unit.value
    }
});

onMounted(() => {
    console.log(data.value)
    console.log(error.value)
});


// UI-only state. All displayed numbers are hardcoded in the template.
const faved = ref(false)
const tab = ref<'overview' | 'wind' | 'atmo'>('overview')
</script>
