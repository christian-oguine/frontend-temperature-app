<template>
    <div class="bg-white border-t border-gray-200">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-textSecondary">
  <div>&copy; {{ year }} Temperature Checker App</div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <NuxtLink to="/favorites" class="hover:underline">Favorites</NuxtLink>
          <a
            href="https://github.com/christian-oguine"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
    
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>

</style>