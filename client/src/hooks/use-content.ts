import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// ============================================
// DATA HOOKS
// ============================================

export function useStatistics() {
  return useQuery({
    queryKey: [api.statistics.list.path],
    queryFn: async () => {
      const res = await fetch(api.statistics.list.path);
      if (!res.ok) throw new Error("Failed to fetch statistics");
      return api.statistics.list.responses[200].parse(await res.json());
    },
  });
}

export function useGlossary() {
  return useQuery({
    queryKey: [api.glossary.list.path],
    queryFn: async () => {
      const res = await fetch(api.glossary.list.path);
      if (!res.ok) throw new Error("Failed to fetch glossary terms");
      return api.glossary.list.responses[200].parse(await res.json());
    },
  });
}

export function useQuiz() {
  return useQuery({
    queryKey: [api.quiz.list.path],
    queryFn: async () => {
      const res = await fetch(api.quiz.list.path);
      if (!res.ok) throw new Error("Failed to fetch quiz questions");
      // Since schema uses jsonb for options, we might need to cast or validate carefully
      // The shared schema handles this, but let's be safe
      return api.quiz.list.responses[200].parse(await res.json());
    },
  });
}
