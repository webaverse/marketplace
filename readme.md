- ethers
- axios
- web3modal
- react-router
- react-router-dom
- dotenv
- sass

## instalin' tailwind
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- make your `tailwind.config.js` look like: 
``` js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- Import tailwind styles in your index.css/main.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```