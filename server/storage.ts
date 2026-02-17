
import { db } from "./db";
import {
  statistics, glossaryTerms, quizQuestions,
  type Statistic, type GlossaryTerm, type QuizQuestion,
  type InsertStatistic, type InsertGlossaryTerm, type InsertQuizQuestion
} from "@shared/schema";

export interface IStorage {
  getStatistics(): Promise<Statistic[]>;
  seedStatistics(stats: InsertStatistic[]): Promise<void>;
  
  getGlossaryTerms(): Promise<GlossaryTerm[]>;
  seedGlossaryTerms(terms: InsertGlossaryTerm[]): Promise<void>;
  
  getQuizQuestions(): Promise<QuizQuestion[]>;
  seedQuizQuestions(questions: InsertQuizQuestion[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getStatistics(): Promise<Statistic[]> {
    return await db.select().from(statistics);
  }

  async seedStatistics(stats: InsertStatistic[]): Promise<void> {
    if (stats.length === 0) return;
    await db.insert(statistics).values(stats);
  }

  async getGlossaryTerms(): Promise<GlossaryTerm[]> {
    return await db.select().from(glossaryTerms);
  }

  async seedGlossaryTerms(terms: InsertGlossaryTerm[]): Promise<void> {
    if (terms.length === 0) return;
    await db.insert(glossaryTerms).values(terms);
  }

  async getQuizQuestions(): Promise<QuizQuestion[]> {
    return await db.select().from(quizQuestions);
  }

  async seedQuizQuestions(questions: InsertQuizQuestion[]): Promise<void> {
    if (questions.length === 0) return;
    await db.insert(quizQuestions).values(questions);
  }
}

export const storage = new DatabaseStorage();
