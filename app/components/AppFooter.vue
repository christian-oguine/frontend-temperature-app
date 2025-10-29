<template>
  <footer class="bg-white border-t border-gray-200">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-textSecondary">
      <div class="flex items-center gap-3">
        <div class="text-sm">
          &copy; {{ year }} <span class="font-semibold text-textPrimary">TemperatureChecker</span>
        </div>
        <span class="hidden sm:inline text-textSecondary"> | </span>
        <a
          href="https://github.com/christian-oguine"
          target="_blank"
          rel="noopener"
          class="text-textSecondary hover:underline"
        >
          Christian Oguine
        </a>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="px-3 py-1 rounded-md hover:bg-gray-50">Home</NuxtLink>
        <NuxtLink to="/favorites" class="px-3 py-1 rounded-md hover:bg-gray-50">Favorites</NuxtLink>

        <a
          href="https://github.com/christian-oguine/frontend-temperature-app"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
          aria-label="Open GitHub profile"
          title="View on GitHub"
        >
          <Icon name="ph:github-logo" size="16" />
          <span class="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
</style>