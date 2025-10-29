export const API_BASE_URL = 'http://localhost:5000/api'

export const API_ENDPOINTS = {
  weather: `${API_BASE_URL}/weather`
}


export async function getWeather(city: string, unit: 'metric' | 'imperial') {
  try {
    return await $fetch(API_ENDPOINTS.weather, {
      query: { city, unit }
    })
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}
