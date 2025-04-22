import type { AppProps } from 'next/app';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Head from 'next/head';
import '@/index.css';

// Criando um cliente QueryClient para React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Load Progressive</title>
        <meta name="description" content="Seu aplicativo de acompanhamento de treinos progressivo." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        {/* <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link> */}
        {/* <meta name="theme-color" content="#5a3db8" /> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Component {...pageProps} />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
} 