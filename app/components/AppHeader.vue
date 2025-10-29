<template>
    <div class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200">
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
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const favoritesCount = ref(3)
const navItems = [
  { label: 'Dashboard', to: '/', icon: 'ph:speedometer-duotone' },
  { label: 'History', to: '/', icon: 'ph:clock-counter-clockwise-duotone' }
]

function onFavoritesClick() { alert('Open Favorites') }
</script>

<style scoped>

</style>