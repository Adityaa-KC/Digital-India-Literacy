
import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Statistics for the charts
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  value: integer("value").notNull(),
  label: text("label").notNull(), // e.g., "Users in Millions"
  category: text("category").notNull(), // e.g., "Internet Access", "Digital Payments"
  year: integer("year").notNull(),
  source: text("source"),
});

// Glossary terms for the learning tool
export const glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  category: text("category").notNull(), // e.g., "Hardware", "Internet", "Security"
});

// Quiz questions for the assessment tool
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of strings
  correctAnswer: integer("correct_answer").notNull(), // Index of correct option
  explanation: text("explanation"),
});

// === SCHEMAS ===

export const insertStatisticSchema = createInsertSchema(statistics).omit({ id: true });
export const insertGlossaryTermSchema = createInsertSchema(glossaryTerms).omit({ id: true });
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({ id: true });

// === EXPLICIT TYPES ===

export type Statistic = typeof statistics.$inferSelect;
export type InsertStatistic = z.infer<typeof insertStatisticSchema>;

export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type InsertGlossaryTerm = z.infer<typeof insertGlossaryTermSchema>;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
