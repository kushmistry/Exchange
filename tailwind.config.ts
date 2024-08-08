import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customDarkBackground: "#0E0F14",
        btnLightGreen: "#132B24",
        btnTextDarkGreen: "#50C379",
        btnLightBlue: "#1B243A",
        btnTextDarkBlue: "#4D93FC",
        defaultTabColor: "#969FAF",
        seledtedTabColor: "#F4F4F6",
        lightRed: "#281118",
        darkRed: "#F7494D",
        darkGrey: "#202127",
        baseBackgroundL2: "rgb(32,33,39)",
        baseBackgroundL3: "rgb(32,33,39)",
        signupColor: "#D0D0D1",
        signupTextColor: "#595A67",
        linkColor: "#4F8EEE",
        redText: "#E44449",
      },
      backgroundColor: {
        modalColor: "#14151B",
        inputColor: "#0E0F14",
      },
      borderColor: {
        dividerColor: "#3f3f46",
        darkGreen: "#50C379",
        darkRed: "#F7494D",
        seledtedTabColor: "#4D93FC",
      },
    },
  },
  plugins: [],
};
export default config;
