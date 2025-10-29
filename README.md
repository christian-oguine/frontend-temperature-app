# 🌤️ TemperatureChecker

A clean and modern weather app built with **Nuxt 4**, **TailwindCSS**, and **Pinia**.

It allows users to:
- Search for a city and view current temperature & details  
- Toggle between °C and °F  
- Save favorite cities  
- Track recent search history  
- View data from a Node.js weather API 

---

## 🚀 Features

| Feature | Description |
|----------|-------------|
| **Weather Search** | Fetches live temperature, humidity, pressure, etc. |
| **Unit Toggle** | Switch between Metric (°C) and Imperial (°F). |
| **Favorites** | Add/remove cities from your favorites (stored in localStorage). |
| **Search History** | Automatically logs recent searches with timestamp and temperature. |
| **API Abstraction** | All network requests handled in `/utils/api.ts`, no hardcoded URLs. |
| **Modern UI** | Built with TailwindCSS |

---

## Tech Stack

- **Nuxt 4** 
- **Pinia** (state management)
- **TailwindCSS** (styling)
- **localStorage** (persistent favorites/history)
- **$fetch API** (HTTP client)
- **TypeScript**

---

## Project Structure

```
.
├─ components/
│  ├─ AppHeader.vue
│  └─ AppFooter.vue
├─ pages/
│  ├─ index.vue          # Main weather search page
│  ├─ favorites.vue      # List of favorite cities
│  └─ history.vue        # Search history
├─ stores/
│  ├─ favorites.ts       # Favorites (Pinia store)
│  └─ history.ts         # History (Pinia store)
├─ utils/
│  └─ api.ts             # API abstraction (getWeather)
├─ nuxt.config.ts
├─ package.json
└─ README.md
```

---

## Setup

Make sure dependencies are installed:

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

##  Environment Configuration

You can set environment variables via `.env` file (recommended):

```bash
# .env
API_BASE_URL=http://localhost:5000/api

---

##  Development Server

Run the app in development mode at **http://localhost:3000**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

---

##  Production Build

Build and preview the optimized production version:

```bash
npm run build
npm run preview
```

---

## Backend API

The frontend expects a weather API endpoint at:

```
GET /api/weather?city={city}&unit={metric|imperial}
```

Example response:
```json
{
  "city": "Ghent",
  "country": "BE",
  "temperature": { "current": 13.5, "min": 11.0, "max": 16.3 },
  "humidity": 82,
  "pressure": 1013,
  "wind": { "speed": 5.4, "deg": 240 },
  "weather": { "icon": "https://openweathermap.org/img/wn/04d@2x.png" }
}
```

> Make sure your backend allows CORS from `http://localhost:3000`.

---

## API Abstraction

All API calls are made through `/utils/api.ts`:

```ts
// utils/api.ts
export const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000/api'

export async function getWeather(city: string, unit: 'metric' | 'imperial') {
  return await $fetch(`${API_BASE_URL}/weather`, { query: { city, unit } })
}
```

Then used in `index.vue`:
```ts
import { getWeather } from '~/utils/api'

const res = await getWeather(city, unit.value)
```

---


Create a branch for API abstraction:

```bash
git checkout -b feature/api-abstraction
```

Commit changes:
```bash
git add .
git commit -m "refactor: abstract weather API to utils/api.ts"
git push -u origin feature/api-abstraction
```

---

## Troubleshooting

| Issue | Solution |
|-------|-----------|
| `CORS` error | Enable `Access-Control-Allow-Origin` on backend |
| API not found | Check `API_BASE` or server URL |
| Favorites/history not saved | Ensure browser allows `localStorage` |
| Nothing in history | Only successful searches are stored |

---

## 🧑‍💻 Author

**Christian Oguine**  
[GitHub Profile](https://github.com/christian-oguine)

---

