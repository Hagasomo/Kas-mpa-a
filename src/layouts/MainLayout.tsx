import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  MessageSquare, 
  Bell, 
  Mail, 
  User,
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { to: "/search", label: "Search", icon: <Search className="h-5 w-5" /> },
    { to: "/forum", label: "Forum", icon: <MessageSquare className="h-5 w-5" /> },
    { to: "/announcements", label: "Announcements", icon: <Bell className="h-5 w-5" /> },
    { to: "/messages", label: "Messages", icon: <Mail className="h-5 w-5" /> },
    { to: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header for Desktop */}
      <header className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300 hidden md:block",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="flex items-center gap-2 font-semibold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>Academia</span>
            </NavLink>
          </div>
          
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to}
                className={({ isActive }) => cn(
                  "flex h-10 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "text-primary underline underline-offset-4" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300 md:hidden",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}>
        <div className="container flex h-14 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>Academia</span>
          </NavLink>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[300px]">
                <div className="flex items-center justify-between mb-6">
                  <NavLink to="/" className="flex items-center gap-2 font-semibold">
                    <BookOpen className="h-5 w-5" />
                    <span>Academia</span>
                  </NavLink>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <NavLink 
                      key={link.to} 
                      to={link.to}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-md",
                        isActive 
                          ? "bg-muted text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-primary"
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto pt-4 border-t flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-30 w-full bg-background border-t md:hidden">
        <div className="grid grid-cols-6 h-14">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center text-xs font-medium",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.icon}
              <span className="mt-1">{link.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Add bottom padding for mobile to account for the bottom nav */}
      <div className="h-14 md:hidden" />
    </div>
  );
};

export default MainLayout;