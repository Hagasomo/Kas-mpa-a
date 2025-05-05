import { useState, useEffect } from 'react';
import { Search, Users, FileText, MessageSquare, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { articles, forumThreads, userData, subjects, forumCategories } from '@/data/mock-data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'quantum computing', 
    'climate change', 
    'neuroscience',
    'research ethics'
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Generate search results based on query and active tab
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    
    if (activeTab === 'articles' || activeTab === 'all') {
      return articles.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.description.toLowerCase().includes(query) ||
        article.subject.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
      );
    }
    
    if (activeTab === 'forum' || activeTab === 'all') {
      return forumThreads.filter(thread => 
        thread.title.toLowerCase().includes(query) || 
        thread.category.toLowerCase().includes(query) ||
        thread.tags.some(tag => tag.toLowerCase().includes(query)) ||
        thread.author.toLowerCase().includes(query)
      );
    }
    
    if (activeTab === 'users' || activeTab === 'all') {
      // Simulate user search with the current user
      if (
        userData.name.toLowerCase().includes(query) ||
        userData.department.toLowerCase().includes(query) ||
        userData.role.toLowerCase().includes(query)
      ) {
        return [userData];
      }
    }
    
    return [];
  };

  // Generate auto-suggestions based on query
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const allKeywords = [
      ...subjects,
      ...forumCategories,
      ...articles.map(a => a.title),
      ...forumThreads.map(t => t.title),
      'research methods', 'academic writing', 'peer review', 'data analysis',
      'literature review', 'methodology', 'thesis', 'dissertation'
    ];
    
    const matchedSuggestions = allKeywords
      .filter(kw => kw.toLowerCase().includes(query))
      .slice(0, 5);
      
    setSuggestions(matchedSuggestions);
  }, [searchQuery]);

  // Handle search submission
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchPerformed(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSearching(false);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
      }
    }, 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch();
  };

  // Remove recent search
  const removeRecentSearch = (search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchPerformed(false);
    setSuggestions([]);
  };

  // Search results for current query and tab
  const searchResults = searchPerformed ? getSearchResults() : [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Search</h1>
        <p className="text-muted-foreground">Find articles, forums, and users across the platform</p>
      </div>

      {/* Search Box */}
      <div className="relative">
        <div className="flex">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for articles, forums, users..."
              className="pl-10 pr-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </Button>
            )}
          </div>
          <Button 
            className="ml-2" 
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isSearching}
          >
            {isSearching ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Searching...
              </>
            ) : 'Search'}
          </Button>
        </div>

        {/* Auto-suggestions */}
        {suggestions.length > 0 && !searchPerformed && (
          <div className="absolute z-10 mt-1 w-full bg-popover border rounded-md shadow-md">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-3 py-2 text-left"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    {suggestion}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recent Searches */}
      {!searchPerformed && recentSearches.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <div key={index} className="flex items-center bg-secondary rounded-full px-3 py-1.5">
                <button 
                  className="text-sm"
                  onClick={() => {
                    setSearchQuery(search);
                    handleSearch();
                  }}
                >
                  {search}
                </button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-1"
                  onClick={() => removeRecentSearch(search)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchPerformed && (
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {isSearching ? 'Searching...' : `Search Results for "${searchQuery}"`}
              </h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="articles">
                  <FileText className="h-4 w-4 mr-1" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="forum">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Forum
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="h-4 w-4 mr-1" />
                  Users
                </TabsTrigger>
              </TabsList>
            </div>

            {isSearching ? (
              <div className="mt-6 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg border">
                    <Skeleton className="w-16 h-16 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-6 space-y-8">
                  {searchResults.length > 0 ? (
                    <>
                      {/* Articles in All Tab */}
                      {articles.some(article => 
                        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        article.description.toLowerCase().includes(searchQuery.toLowerCase())
                      ) && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Articles</h3>
                            <Button variant="link" size="sm" asChild>
                              <TabsTrigger value="articles">View All</TabsTrigger>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            {articles
                              .filter(article => 
                                article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                article.description.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .slice(0, 2)
                              .map(article => (
                                <div key={article.id} className="flex items-start gap-4 p-4 rounded-lg border">
                                  <img 
                                    src={article.imageUrl} 
                                    alt={article.title}
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                  <div>
                                    <Badge className="mb-2">{article.subject}</Badge>
                                    <h4 className="font-medium">{article.title}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                      {article.description}
                                    </p>
                                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                      <span>{article.author}</span>
                                      <span className="mx-2">•</span>
                                      <span>{article.date}</span>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}

                      {/* Forum in All Tab */}
                      {forumThreads.some(thread => 
                        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                      ) && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Forum Threads</h3>
                            <Button variant="link" size="sm" asChild>
                              <TabsTrigger value="forum">View All</TabsTrigger>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            {forumThreads
                              .filter(thread => 
                                thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                              )
                              .slice(0, 2)
                              .map(thread => (
                                <div key={thread.id} className="p-4 rounded-lg border">
                                  <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline">{thread.category}</Badge>
                                    <div className="text-xs text-muted-foreground">
                                      {thread.replies} replies • {thread.views} views
                                    </div>
                                  </div>
                                  <h4 className="font-medium">{thread.title}</h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {thread.tags.map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex items-center mt-3 text-xs text-muted-foreground">
                                    <Avatar className="h-5 w-5 mr-2">
                                      <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                                      <AvatarFallback>{thread.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{thread.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{thread.date}</span>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}

                      {/* Users in All Tab */}
                      {userData.name.toLowerCase().includes(searchQuery.toLowerCase()) && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Users</h3>
                            <Button variant="link" size="sm" asChild>
                              <TabsTrigger value="users">View All</TabsTrigger>
                            </Button>
                          </div>
                          <div className="p-4 rounded-lg border flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={userData.avatar} alt={userData.name} />
                              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{userData.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {userData.role}, {userData.department}
                              </p>
                              <div className="flex gap-3 mt-1 text-xs">
                                <span>{userData.publications} publications</span>
                                <span>•</span>
                                <span>{userData.followers} followers</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                      <p className="text-sm mt-2">Try different keywords or browse categories instead</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="articles" className="mt-6">
                  <div className="space-y-4">
                    {articles.filter(article => 
                      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      article.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      article.author.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length > 0 ? (
                      articles
                        .filter(article => 
                          article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.author.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(article => (
                          <div key={article.id} className="flex items-start gap-4 p-4 rounded-lg border">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <Badge className="mb-2">{article.subject}</Badge>
                              <h4 className="font-medium">{article.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {article.description}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                <Avatar className="h-5 w-5 mr-2">
                                  <AvatarImage src={article.authorAvatar} alt={article.author} />
                                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{article.author}</span>
                                <span className="mx-2">•</span>
                                <span>{article.date}</span>
                                <span className="mx-2">•</span>
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="py-10 text-center">
                        <p className="text-muted-foreground">No articles found for "{searchQuery}"</p>
                        <p className="text-sm mt-2">Try different keywords or browse categories</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="forum" className="mt-6">
                  <div className="space-y-4">
                    {forumThreads.filter(thread => 
                      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      thread.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      thread.author.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length > 0 ? (
                      forumThreads
                        .filter(thread => 
                          thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          thread.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          thread.author.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(thread => (
                          <div key={thread.id} className="p-4 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="outline">{thread.category}</Badge>
                              <div className="text-xs text-muted-foreground">
                                {thread.replies} replies • {thread.views} views
                              </div>
                            </div>
                            <h4 className="font-medium">{thread.title}</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {thread.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Avatar className="h-5 w-5 mr-2">
                                  <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                                  <AvatarFallback>{thread.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{thread.author}</span>
                                <span className="mx-2">•</span>
                                <span>{thread.date}</span>
                              </div>
                              {thread.lastReply && (
                                <div className="text-xs">
                                  Last reply: {thread.lastReply.author}, {thread.lastReply.date}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="py-10 text-center">
                        <p className="text-muted-foreground">No forum posts found for "{searchQuery}"</p>
                        <p className="text-sm mt-2">Try different keywords or browse the forum categories</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="users" className="mt-6">
                  {userData.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   userData.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   userData.role.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                    <div className="p-4 rounded-lg border flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={userData.avatar} alt={userData.name} />
                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-lg">{userData.name}</h4>
                        <p className="text-muted-foreground">
                          {userData.role}, {userData.department}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span>{userData.publications} publications</span>
                          <span>•</span>
                          <span>{userData.followers} followers</span>
                          <span>•</span>
                          <span>{userData.following} following</span>
                        </div>
                      </div>
                      <Button className="ml-auto">View Profile</Button>
                    </div>
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-muted-foreground">No users found for "{searchQuery}"</p>
                      <p className="text-sm mt-2">Try searching for a name, department, or role</p>
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SearchPage;