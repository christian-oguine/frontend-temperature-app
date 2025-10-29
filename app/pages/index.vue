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

        <!-- Search  -->
        <div class="mx-auto grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
          <div class="relative">
            <Icon name="ph:map-pin-duotone" size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              type="text"
              value="Ghent"
              readonly
              placeholder="Enter a city (e.g., Brussels)"
              class="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-3 text-sm focus:outline-none"
            />
          </div>
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-medium cursor-default">
            <Icon name="ph:magnifying-glass-duotone" size="18" />
            Search
          </button>
        </div>

       
        <section class="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
          <!-- Header row -->
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-2">
              <Icon name="ph:map-pin-duotone" size="18" class="text-primary" />
              <h2 class="text-lg sm:text-xl font-semibold text-textPrimary">Ghent</h2>
            </div>

            <div class="flex items-center gap-2">
              <!-- Unit toggle -->
              <div class="rounded-xl border border-gray-200 overflow-hidden flex">
                <button
                  type="button"
                  class="px-3 py-1 text-sm"
                  :class="unit==='C' ? 'bg-primary text-white' : 'text-textSecondary'"
                  @click="unit='C'"
                  aria-label="Show Celsius"
                >°C</button>
                <button
                  type="button"
                  class="px-3 py-1 text-sm"
                  :class="unit==='F' ? 'bg-primary text-white' : 'text-textSecondary'"
                  @click="unit='F'"
                  aria-label="Show Fahrenheit"
                >°F</button>
              </div>

              <!-- Favorite -->
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

              <!-- Weather icon -->
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

          <!-- Details grid -->
          <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <!-- Low / High -->
            <div class="rounded-xl border border-gray-200 p-3">
              <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Today</p>
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

            <!-- Wind -->
            <div class="rounded-xl border border-gray-200 p-3">
              <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Wind</p>
              <p>18 km/h • 230° • gust 8.1 m/s</p>
            </div>

            <!-- Pressure -->
            <div class="rounded-xl border border-gray-200 p-3">
              <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Pressure / Clouds</p>
              <p>1016 hPa • 48%</p>
            </div>

            <!-- Visibility -->
            <div class="rounded-xl border border-gray-200 p-3">
              <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Visibility</p>
              <p>9000 m</p>
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

            <!-- Coords -->
            <div class="rounded-xl border border-gray-200 p-3">
              <p class="uppercase text-xs tracking-wide text-textSecondary mb-1">Coordinates</p>
              <p>51.05, 3.73</p>
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

// UI state only (values are hardcoded in the template)
const unit = ref<'C' | 'F'>('C')
const faved = ref(false)
</script>
