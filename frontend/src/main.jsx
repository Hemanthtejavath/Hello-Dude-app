import { StrictMode } from "react";

//react router imports
import { createRoot } from "react-dom/client";
//react router imports
import { BrowserRouter } from "react-router-dom";
//tenstack query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "stream-chat-react/dist/css/v2/index.css";
import "./index.css";
import App from "./App.jsx";
//tanstack query client setup
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
