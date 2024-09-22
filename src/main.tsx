import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { App } from "./App.tsx"
import "./index.css"

// WARNING: functional components are used only in:
// - shadcn/ui downloaded components
// - shadcn/ui ThemeProvider (just like in docs example)

// ADDITIONALLY DONE:
// 1. Special behavior of "delete" button on mobile devices
// 2. Synchronization with Local Storage
// 3. Written using TypeScript

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
)
