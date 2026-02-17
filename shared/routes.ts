
import { z } from 'zod';
import { statistics, glossaryTerms, quizQuestions } from './schema';

export const api = {
  statistics: {
    list: {
      method: 'GET' as const,
      path: '/api/statistics' as const,
      responses: {
        200: z.array(z.custom<typeof statistics.$inferSelect>()),
      },
    },
  },
  glossary: {
    list: {
      method: 'GET' as const,
      path: '/api/glossary' as const,
      responses: {
        200: z.array(z.custom<typeof glossaryTerms.$inferSelect>()),
      },
    },
  },
  quiz: {
    list: {
      method: 'GET' as const,
      path: '/api/quiz' as const,
      responses: {
        200: z.array(z.custom<typeof quizQuestions.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
