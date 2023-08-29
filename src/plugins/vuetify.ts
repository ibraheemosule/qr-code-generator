// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, ThemeDefinition } from "vuetify";

const customTheme: ThemeDefinition = {
  dark: false,
  colors: {
    pry: "#f8f9fa",
    sec: "#495057",
    ter: "#212529",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});
