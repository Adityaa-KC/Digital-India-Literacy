import { useGlossary } from "@/hooks/use-content";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Search, Loader2, Book } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export default function Glossary() {
  const { data: terms, isLoading } = useGlossary();
  const [search, setSearch] = useState("");

  const filteredTerms = terms?.filter(term => 
    term.term.toLowerCase().includes(search.toLowerCase()) || 
    term.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader 
        title="Tech Glossary" 
        description="Simple explanations for common digital words."
        emoji="📖"
      />

      {/* Search Bar */}
      <div className="relative max-w-2xl mb-12">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <Input 
          className="pl-12 h-14 text-lg rounded-2xl shadow-sm border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-card"
          placeholder="Search for a word (e.g., Browser, Wifi)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredTerms?.map((term) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold font-display text-primary group-hover:text-blue-600 transition-colors">
                    {term.term}
                  </h3>
                  <span className="bg-muted px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {term.category}
                  </span>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {term.definition}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredTerms?.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              <Book className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl">No definitions found for "{search}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
