import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";

import Home from "@/pages/Home";
import Statistics from "@/pages/Statistics";
import Glossary from "@/pages/Glossary";
import Quiz from "@/pages/Quiz";
import TypingPractice from "@/pages/TypingPractice";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/stats" component={Statistics} />
          <Route path="/glossary" component={Glossary} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/typing" component={TypingPractice} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <footer className="bg-card border-t border-border py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p className="font-display font-bold text-foreground text-lg mb-2">Digital Saathi</p>
          <p>Helping India become digitally literate, one step at a time.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
