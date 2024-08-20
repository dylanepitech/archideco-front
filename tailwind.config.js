/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-emerald": "#639d87",
        "green-duck": "#1E4347",
      },
      width: {
        100: "20rem", // 400px
        0.5: "0.8px",
        0.8: "1px",
      },
      maxWidth: {
        110: "26rem", // 400px
      },
      height: {
        100: "30rem",
      },
      minHeight: {
        100: "30rem",
      },
      maxHeight: {
        100: "30rem",
      },
    },
  },
  plugins: [require("rippleui")],
};
