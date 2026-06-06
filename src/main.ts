import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { createPinia } from "pinia";
import * as Sentry from "@sentry/vue";
import piniaPluginPersistedstate from "pinia-plugin-persistence";

const app = createApp(App);
Sentry.init({
  app,
  dsn: "https://dafb03ec6a2bf4f9399b8ab5d1feb6f0@o4510902012805120.ingest.us.sentry.io/4511516002091008",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/gabrielbolarinwa-horizons\.vercel\.app\/api/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.,
  // Logs
  enableLogs: true,
});

app.use(createPinia().use(piniaPluginPersistedstate));
app.mount("body");
