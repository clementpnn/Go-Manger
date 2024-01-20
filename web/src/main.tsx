import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/styles/globals.css";
import MainContainer from "@/components/containers/mainContainer.tsx";
import router from "@/routes/routes";
import { Toaster } from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MainContainer>
      <RouterProvider router={router} />
    </MainContainer>
    <Toaster />
  </QueryClientProvider>
);
