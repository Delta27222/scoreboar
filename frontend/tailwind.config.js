import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      united_kingdom: ['United Kingdom', 'sans-serif'],
    },
    screens: {
      'small': "350px",
      'small_p': "400px",
      'small_m': "450px",
      'small_g': "500px",
      'small_g2': "550px",
      'small_g3': "600px",
      'small_g4': "650px",
      'small_g5': "700px",
      'medium_p': "750px",
      'medium_m': "800px",
      'medium_g': "850px",
      'large_p': "900px",
      'large_m': "950px",
      'large_g': "1000px",
      'ultra_large_p': "1100px",
      'ultra_large_p2': "1150px",
      'ultra_large_m': "1200px",
      'ultra_large_m2': "1250px",
      'ultra_large_g': "1300px",
      'ultra_large_g2': "1350px",
      lg: "1024px",
      xl: "1280px",
      "ultra_large_sc": "1536px",
    },
    extend: {
      scale: {
        '50': '.5',
        '55': '.55',
        '60': '.6',
        '61': '.61',
        '62': '.62',
        '63': '.63',
        '64': '.64',
        '65': '.65',
        '66': '.66',
        '67': '.67',
        '68': '.68',
        '69': '.69',
        '70': '.7',
        '75': '.75',
        '80': '.8',
        '85': '.85',
        '120': '1.2',
        '125': '1.25',
        '130': '1.3',
        '140': '1.4',
      },
      colors: {
        'blue-back': '#233E47',
        'blue-back2': '#2C4B53',
        'green-primary': '#E7FF00',
        'pink-primary': '#FB035B',
        'white-primary': '#e9f9ff',
        'yellow-primary': '#CEC21A',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ['Inter Roman', 'sans-serif'],
      },
    },
  },
  plugins: [animations],
};