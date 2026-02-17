
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.statistics.list.path, async (_req, res) => {
    const stats = await storage.getStatistics();
    res.json(stats);
  });

  app.get(api.glossary.list.path, async (_req, res) => {
    const terms = await storage.getGlossaryTerms();
    res.json(terms);
  });

  app.get(api.quiz.list.path, async (_req, res) => {
    const questions = await storage.getQuizQuestions();
    res.json(questions);
  });

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  // Check if data exists
  const stats = await storage.getStatistics();
  if (stats.length === 0) {
    await storage.seedStatistics([
      { title: "Internet Users", value: 820, label: "Million Users", category: "Access", year: 2023, source: "TRAI" },
      { title: "Urban Users", value: 490, label: "Million Users", category: "Demographics", year: 2023, source: "TRAI" },
      { title: "Rural Users", value: 330, label: "Million Users", category: "Demographics", year: 2023, source: "TRAI" },
      { title: "Smartphone Users", value: 650, label: "Million Users", category: "Devices", year: 2023, source: "Various" },
      { title: "UPI Transactions", value: 10000, label: "Billion INR", category: "Finance", year: 2023, source: "NPCI" },
    ]);
  }

  const terms = await storage.getGlossaryTerms();
  if (terms.length === 0) {
    await storage.seedGlossaryTerms([
      { term: "Browser", definition: "A software application used to access information on the World Wide Web (e.g., Chrome, Firefox).", category: "Internet" },
      { term: "URL", definition: "Uniform Resource Locator; the address of a webpage.", category: "Internet" },
      { term: "Phishing", definition: "A cybercrime where attackers trick you into revealing sensitive information like passwords.", category: "Security" },
      { term: "OTP", definition: "One-Time Password; a code sent to your mobile to verify your identity.", category: "Security" },
      { term: "UPI", definition: "Unified Payments Interface; a system that powers multiple bank accounts into a single mobile application.", category: "Finance" },
      { term: "Download", definition: "Copying data from one computer system to another, typically over the internet.", category: "Basics" },
      { term: "Upload", definition: "Transferring data from your computer to the internet.", category: "Basics" },
      { term: "WiFi", definition: "A facility allowing computers, smartphones, or other devices to connect to the internet or communicate with one another wirelessly within a particular area.", category: "Connectivity" },
    ]);
  }

  const questions = await storage.getQuizQuestions();
  if (questions.length === 0) {
    await storage.seedQuizQuestions([
      { 
        question: "What should you do if someone asks for your OTP over the phone?", 
        options: ["Give it to them", "Hang up and do not share", "Ask them to repeat the request", "Send it via SMS"], 
        correctAnswer: 1, 
        explanation: "Never share your OTP with anyone. Banks or officials will never ask for it." 
      },
      { 
        question: "Which of these is a strong password?", 
        options: ["password123", "myname", "P@ssw0rd!23", "12345678"], 
        correctAnswer: 2, 
        explanation: "Strong passwords include a mix of uppercase, lowercase, numbers, and symbols." 
      },
      { 
        question: "What is the full form of UPI?", 
        options: ["United Payment Interface", "Unified Payments Interface", "Universal Payment ID", "Unique Payment Identity"], 
        correctAnswer: 1, 
        explanation: "UPI stands for Unified Payments Interface." 
      },
       { 
        question: "Is it safe to click on links from unknown numbers on WhatsApp?", 
        options: ["Yes, always", "Only if it looks interesting", "No, it might be a scam", "Yes, if my friend sent it"], 
        correctAnswer: 2, 
        explanation: "Links from unknown sources often lead to phishing sites or malware." 
      },
    ]);
  }
}
