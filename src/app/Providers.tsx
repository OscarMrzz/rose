
"use client";
import ConfiguracionSync from "@/components/ConfiguracionSync";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfiguracionSync />
      {children}
    </QueryClientProvider>
  );
}
