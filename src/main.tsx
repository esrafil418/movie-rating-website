// StrictMode removed because some third-party UI components use findDOMNode
// which triggers noisy deprecation warnings in React's StrictMode.
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
  </QueryClientProvider>
);

// Development: suppress noisy, non-critical warnings coming from
// third-party libs (semantic-ui-react's defaultProps deprecation) and
// browser font intervention messages. This keeps the console focused
// on real runtime errors. Remove or adjust in production.
if (import.meta.env.DEV) {
  const _consoleError = console.error.bind(console);
  const suppressed = [
    /Support for defaultProps will be removed from function components/, // semantic-ui-react warnings
    /Slow network is detected/, // browser font intervention messages
  ];

  console.error = (...args: unknown[]) => {
    try {
      const first = args[0];
      if (typeof first === "string" && suppressed.some((r) => r.test(first))) {
        return;
      }
    } catch {
      // fallthrough to original
    }
    _consoleError(...args);
  };
}
