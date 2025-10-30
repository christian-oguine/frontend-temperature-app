// utils/api.ts
export async function getWeather(
  city: string,
  unit: 'metric' | 'imperial' = 'metric'
) {
  const { public: { apiBaseUrl } } = useRuntimeConfig();
  const base = apiBaseUrl.replace(/\/$/, ''); // remove trailing slash if any

  // Backend (and OpenWeather) expect the query key to be "units"
  return await $fetch(`${base}/weather`, {
    query: { city, units: unit }
  });
}
