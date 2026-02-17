import { Link } from "wouter";
import { BarChart2, BookOpen, CheckCircle, Keyboard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  colorClass 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  href: string;
  colorClass: string;
}) {
  return (
    <Link href={href} className="block group h-full">
      <div className={`
        h-full bg-card border border-border rounded-2xl p-8 
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer
        relative overflow-hidden
      `}>
        <div className={`
          absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150
          ${colorClass.replace('text-', 'bg-')}
        `} />
        
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm
          bg-background border border-border/50 group-hover:scale-110 transition-transform duration-300
        `}>
          <Icon className={`h-8 w-8 ${colorClass}`} />
        </div>
        
        <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center font-bold text-primary mt-auto">
          Start Learning <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold mb-8 border border-secondary/20">
              <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
              Digital India Initiative
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-8 leading-tight">
              Digital Literacy <br/>
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                For Everyone
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Empowering every citizen with the skills to navigate the digital world safely and confidently. Simple tools, clear data, and easy learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 transition-all">
                  Take Safety Quiz
                </Button>
              </Link>
              <Link href="/glossary">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg font-bold border-2 hover:bg-muted/50">
                  Learn Terms
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3" />
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={BarChart2}
            title="India's Digital Growth"
            description="See how fast internet usage is growing across urban and rural India."
            href="/stats"
            colorClass="text-blue-600"
          />
          <FeatureCard
            icon={BookOpen}
            title="Tech Glossary"
            description="Simple definitions for common computer and internet words."
            href="/glossary"
            colorClass="text-green-600"
          />
          <FeatureCard
            icon={CheckCircle}
            title="Safety Quiz"
            description="Test your knowledge on how to stay safe online."
            href="/quiz"
            colorClass="text-secondary"
          />
          <FeatureCard
            icon={Keyboard}
            title="Typing Practice"
            description="Improve your typing speed with simple practice exercises."
            href="/typing"
            colorClass="text-purple-600"
          />
        </div>
      </section>
      
      {/* Accessible Info Section */}
      <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Why Digital Literacy?</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  In today's world, phones and computers are used for everything - from banking to booking train tickets.
                </p>
                <p>
                  <strong className="text-foreground">Digital Literacy</strong> means having the skills to use these tools effectively and safely.
                </p>
                <p>
                  We built this platform to be simple, clean, and easy to use for everyone, regardless of their background or location.
                </p>
              </div>
            </div>
            <div className="relative h-64 md:h-full bg-muted/50 rounded-2xl overflow-hidden flex items-center justify-center">
               {/* Use an icon illustration instead of a stock photo for cleaner look */}
               <div className="text-center p-8">
                 <div className="grid grid-cols-2 gap-4 opacity-50">
                    <div className="bg-background p-4 rounded-xl shadow-sm"><BarChart2 className="w-8 h-8 mx-auto text-primary"/></div>
                    <div className="bg-background p-4 rounded-xl shadow-sm"><Keyboard className="w-8 h-8 mx-auto text-secondary"/></div>
                    <div className="bg-background p-4 rounded-xl shadow-sm"><CheckCircle className="w-8 h-8 mx-auto text-green-500"/></div>
                    <div className="bg-background p-4 rounded-xl shadow-sm"><BookOpen className="w-8 h-8 mx-auto text-purple-500"/></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
