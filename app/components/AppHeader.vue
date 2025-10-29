<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <Icon name="ph:cloud-sun-duotone" size="26" class="text-primary group-hover:scale-110 transition" />
          <span class="font-semibold text-lg text-textPrimary font-inter">TemperatureChecker</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:text-textPrimary hover:bg-gray-100 transition"
          >
            <span class="inline-flex items-center gap-2">
              <Icon :name="item.icon" size="18" />
              {{ item.label }}
            </span>
          </NuxtLink>

          <NuxtLink
            to="/favorites"
            class="relative ml-2 inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
            aria-label="Open favorites"
          >
            <Icon name="ph:heart-duotone" size="18" class="text-rose-500" />
            <span class="hidden sm:inline">Favorites</span>
            <span
              v-if="favoritesCount"
              class="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white shadow"
            >
              {{ favoritesCount }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Mobile actions -->
        <div class="flex items-center gap-2 sm:hidden">
          <!-- compact favorites icon -->
          <NuxtLink to="/favorites" class="inline-flex items-center p-2 rounded-md hover:bg-gray-100" aria-label="Favorites">
            <Icon name="ph:heart-duotone" size="18" class="text-rose-500" />
            <span v-if="favoritesCount" class="ml-1 inline-flex items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white">{{ favoritesCount }}</span>
          </NuxtLink>

          <!-- hamburger -->
          <button
            type="button"
            @click="menuOpen = !menuOpen"
            :aria-expanded="menuOpen.toString()"
            aria-controls="mobile-menu"
            class="inline-flex items-center justify-center p-2 rounded-md text-textSecondary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span class="sr-only">Open main menu</span>
            <Icon v-if="!menuOpen" name="ph:list-bold" size="20" />
            <Icon v-else name="ph:x-bold" size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu (stacked) -->
    <transition name="fade">
      <div v-if="menuOpen" id="mobile-menu" class="sm:hidden border-t border-gray-100 bg-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.label + '-mobile'"
              :to="item.to"
              @click="menuOpen = false"
              class="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:text-textPrimary hover:bg-gray-50"
            >
              <span class="inline-flex items-center gap-2">
                <Icon :name="item.icon" size="16" />
                {{ item.label }}
              </span>
            </NuxtLink>

            <NuxtLink to="/favorites" @click="menuOpen = false" class="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-textSecondary hover:text-textPrimary hover:bg-gray-50">
              <span class="inline-flex items-center gap-2">
                <Icon name="ph:heart-duotone" size="16" class="text-rose-500" />
                Favorites
                <span v-if="favoritesCount" class="ml-auto inline-flex items-center justify-center rounded-full bg-rose-500 px-2 text-xs font-bold text-white">{{ favoritesCount }}</span>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useFavoritesStore } from '../../stores/favorites'

const navItems = [
  { label: 'Dashboard', to: '/', icon: 'ph:speedometer-duotone' },
  { label: 'History', to: '/history', icon: 'ph:clock-counter-clockwise-duotone' }
]

const fav = useFavoritesStore()
onMounted(() => fav.load())

const favoritesCount = computed(() => fav.count)
const menuOpen = ref(false)
</script>
