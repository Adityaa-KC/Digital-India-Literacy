import { Link, useLocation } from "wouter";
import { BookOpen, BarChart2, CheckCircle, Keyboard, Home, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/stats", label: "India Data", icon: BarChart2 },
    { href: "/glossary", label: "Glossary", icon: BookOpen },
    { href: "/quiz", label: "Safety Quiz", icon: CheckCircle },
    { href: "/typing", label: "Typing Practice", icon: Keyboard },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary text-white p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display text-foreground leading-none">
                Digital Saathi
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Literacy for Everyone
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer
                    ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  <link.icon className={`h-4 w-4 ${isActive(link.href) ? "text-primary" : ""}`} />
                  {link.label}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                      <div
                        className={`
                          p-4 rounded-xl text-lg font-medium transition-all flex items-center gap-4 cursor-pointer
                          ${
                            isActive(link.href)
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "hover:bg-muted"
                          }
                        `}
                      >
                        <link.icon className="h-6 w-6" />
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
