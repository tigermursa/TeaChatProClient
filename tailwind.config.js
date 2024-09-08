/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "welcome-background": "url('/welcomepagebg.webp')",
        "chat-background": "url('/chatpagebg.webp')",
        "profile-background": "url('/profile-cover-bg.webp')",
        "people-background": "url('/peoples-bg.webp')",
      },
      boxShadow: {
        "shadow-1": "0px 0px 60px 0px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        primary: "#8210ed",
        primaryDark: "#5f07b7",
        primaryLight: "#9642e5",
        primaryLightest: "#995bd3",
        secondary: "#13daf4",
        secondaryDark: "#075660",
        secondaryLight: "#40cbdd",
        textMain: "#727272",
        textDark: "#16171A",
      },
      // Adding the dark overlay
      backgroundColor: {
        "dark-overlay": "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
      },
    },
  },
  plugins: [],
};
