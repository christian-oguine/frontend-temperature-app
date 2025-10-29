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
