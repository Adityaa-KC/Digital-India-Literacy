import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
  emoji?: string;
}

export function PageHeader({ title, description, emoji }: PageHeaderProps) {
  return (
    <div className="mb-12 text-center md:text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4 flex items-center justify-center md:justify-start gap-3">
          {emoji && <span>{emoji}</span>}
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
