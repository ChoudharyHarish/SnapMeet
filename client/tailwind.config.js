/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        accent: "var(--accent-color)",
        border: "var(--border-color)",
        hover: "var(--hover-bg)",
        error: "var(--error-color)",
        success: "var(--success-color)",
        notification: "var(--notification-color)",
      },
    },
  },
  plugins: [],
};
