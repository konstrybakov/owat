import type { Config } from "tailwindcss"

export const generateScale = (name: string) => {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}-a${id})`],
    ]
  }).flat()

  return Object.fromEntries(scale)
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      colors: {
        sand: generateScale("sand"),
        tomato: generateScale("tomato"),
        grass: generateScale("grass"),
        yellow: generateScale("yellow"),
        amber: generateScale("amber"),
        sky: generateScale("sky"),
      },
    },
  },
  plugins: [],
}

export default config
