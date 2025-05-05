import { useState, useEffect } from 'react';
import { Search, Filter, Star, BookmarkPlus, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { articles, subjects, ArticleType } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const HomePage = () => {
  const [displayedArticles, setDisplayedArticles] = useState<ArticleType[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();

  // Filter articles based on subject and search query
  const filteredArticles = articles.filter(article => {
    const matchesSubject = selectedSubject === 'all' || article.subject === selectedSubject;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Initial load and infinite scroll
  useEffect(() => {
    const loadArticles = () => {
      setIsLoading(true);
      // Simulate network request
      setTimeout(() => {
        const itemsPerPage = 4;
        const startIndex = 0;
        const endIndex = page * itemsPerPage;
        
        if (endIndex >= filteredArticles.length) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        
        setDisplayedArticles(filteredArticles.slice(startIndex, endIndex));
        setIsLoading(false);
      }, 800);
    };
    
    loadArticles();
  }, [page, selectedSubject, searchQuery, filteredArticles]);

  // Watch for scroll and load more
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);

  // Reset pagination when filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedSubject, searchQuery]);

  // Featured article - first article marked as featured
  const featuredArticle = articles.find(article => article.isFeatured);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Academic Feed</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && page === 1 && selectedSubject === 'all' && searchQuery === '' && (
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10" />
          <img 
            src={featuredArticle.imageUrl} 
            alt={featuredArticle.title}
            className="w-full h-[300px] sm:h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 text-white">
            <div className="mb-2 flex items-center">
              <span className="bg-primary/80 text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                Featured
              </span>
              <span className="ml-2 text-sm opacity-80">{featuredArticle.subject}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{featuredArticle.title}</h2>
            <p className="text-sm sm:text-base mb-4 opacity-90 max-w-2xl">{featuredArticle.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src={featuredArticle.authorAvatar}
                  alt={featuredArticle.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{featuredArticle.author}</p>
                  <p className="text-xs opacity-80">{featuredArticle.date} · {featuredArticle.readTime}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      {displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayedArticles.map((article) => (
            <div key={article.id} className="bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 text-primary"
                >
                  <Star className={cn("h-4 w-4", article.starred ? "fill-primary" : "")} />
                </Button>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-sm text-muted-foreground flex items-center">
                  <span className="bg-secondary px-2 py-1 rounded text-xs font-medium">
                    {article.subject}
                  </span>
                  <span className="ml-auto text-xs">{article.date} · {article.readTime}</span>
                </div>
                <h3 className="font-bold text-lg">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                <div className="flex items-center pt-2">
                  <img 
                    src={article.authorAvatar} 
                    alt={article.author} 
                    className="w-7 h-7 rounded-full mr-2 object-cover"
                  />
                  <span className="text-sm font-medium">{article.author}</span>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <BookmarkPlus className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-lg overflow-hidden border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                    <div className="flex items-center pt-2">
                      <Skeleton className="w-7 h-7 rounded-full mr-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-lg text-muted-foreground">No articles found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedSubject('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Load more indicator */}
      {hasMore && displayedArticles.length > 0 && (
        <div ref={ref} className="flex justify-center py-8">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              <span>Loading more articles...</span>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setPage(prevPage => prevPage + 1)}>
              Load More
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;