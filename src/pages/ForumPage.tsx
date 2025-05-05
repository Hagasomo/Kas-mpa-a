import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  MessageSquare, 
  Eye, 
  Flag, 
  Lock, 
  ArrowUp,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { forumThreads, forumCategories } from '@/data/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const ForumPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('new');
  const [createThreadOpen, setCreateThreadOpen] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('');
  const [newThreadTags, setNewThreadTags] = useState('');

  // Filter threads based on search, category, and sort
  const filteredThreads = forumThreads
    .filter(thread => {
      const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           thread.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || thread.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'new') {
        // Sort by date (newest first) - using the relative date for simplicity
        return a.date < b.date ? 1 : -1;
      } else if (sortOption === 'popular') {
        // Sort by views
        return b.views - a.views;
      } else if (sortOption === 'trending') {
        // Sort by replies and recency (simplified)
        return (b.replies * 2 + b.views) - (a.replies * 2 + a.views);
      }
      return 0;
    });

  // Sticky threads should always stay on top regardless of sorting
  const stickyThreads = filteredThreads.filter(thread => thread.isSticky);
  const regularThreads = filteredThreads.filter(thread => !thread.isSticky);
  
  const displayedThreads = [...stickyThreads, ...regularThreads];

  // Handle thread creation
  const handleCreateThread = () => {
    // In a real app, this would add the thread to the database
    // For now, we'll just close the dialog and show a success message
    setCreateThreadOpen(false);
    setNewThreadTitle('');
    setNewThreadContent('');
    setNewThreadCategory('');
    setNewThreadTags('');
    
    // You could add a toast notification here
    console.log('Thread created!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Forum</h1>
        <p className="text-muted-foreground">
          Join discussions, ask questions, and share insights with the academic community
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-auto flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search forum threads..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {forumCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                {sortOption === 'new' && 'Newest'}
                {sortOption === 'popular' && 'Popular'}
                {sortOption === 'trending' && 'Trending'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption('new')}>
                <Calendar className="h-4 w-4 mr-2" />
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('popular')}>
                <Eye className="h-4 w-4 mr-2" />
                Popular
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('trending')}>
                <ArrowUp className="h-4 w-4 mr-2" />
                Trending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={createThreadOpen} onOpenChange={setCreateThreadOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Thread
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Thread</DialogTitle>
                <DialogDescription>
                  Start a new discussion in the forum. Be sure to check if a similar topic already exists.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter a descriptive title"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Describe your topic in detail"
                    className="min-h-[120px]"
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newThreadCategory} onValueChange={setNewThreadCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {forumCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input 
                      id="tags" 
                      placeholder="e.g. research, methods"
                      value={newThreadTags}
                      onChange={(e) => setNewThreadTags(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateThreadOpen(false)}>Cancel</Button>
                <Button 
                  onClick={handleCreateThread}
                  disabled={!newThreadTitle || !newThreadContent || !newThreadCategory}
                >
                  Create Thread
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Forum Categories Tabs */}
      <Tabs defaultValue="all-threads">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="all-threads">All Threads</TabsTrigger>
          <TabsTrigger value="your-threads">Your Threads</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-threads" className="mt-6">
          {/* Thread List */}
          {displayedThreads.length > 0 ? (
            <div className="space-y-4">
              {displayedThreads.map((thread) => (
                <Link 
                  to={`/forum/${thread.id}`} 
                  key={thread.id}
                  className={cn(
                    "block p-4 rounded-lg border hover:border-primary/50 transition-colors",
                    thread.isSticky ? "bg-muted/50" : ""
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{thread.category}</Badge>
                        {thread.isSticky && (
                          <Badge variant="secondary">
                            <Flag className="h-3 w-3 mr-1" />
                            Sticky
                          </Badge>
                        )}
                        {thread.isLocked && (
                          <Badge variant="destructive">
                            <Lock className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-lg">{thread.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {thread.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{thread.replies}</span>
                        <Eye className="h-4 w-4 ml-2" />
                        <span>{thread.views}</span>
                      </div>
                      {thread.lastReply && (
                        <div className="text-xs mt-1">
                          Last reply: {thread.lastReply.date}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                        <AvatarFallback>{thread.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{thread.author}</span>
                      <span className="mx-2 text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{thread.date}</span>
                    </div>
                    {thread.lastReply && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span>Last reply by {thread.lastReply.author}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No threads found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery ? 
                  `No threads matching "${searchQuery}" in ${selectedCategory === 'all' ? 'any category' : selectedCategory}` : 
                  'No threads in this category yet'
                }
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="your-threads" className="mt-6">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No threads created yet</h3>
            <p className="text-muted-foreground mt-2">Start a new discussion to see it here</p>
            <Button className="mt-4" onClick={() => setCreateThreadOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Thread
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="announcements" className="mt-6">
          <div className="space-y-4">
            {forumThreads
              .filter(thread => thread.category === 'Announcements')
              .map((thread) => (
                <Link 
                  to={`/forum/${thread.id}`} 
                  key={thread.id}
                  className="block p-4 rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{thread.category}</Badge>
                        {thread.isLocked && (
                          <Badge variant="destructive">
                            <Lock className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-lg">{thread.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {thread.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{thread.replies}</span>
                        <Eye className="h-4 w-4 ml-2" />
                        <span>{thread.views}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                      <AvatarFallback>{thread.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{thread.author}</span>
                    <span className="mx-2 text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{thread.date}</span>
                  </div>
                </Link>
              ))
            }
          </div>
        </TabsContent>
        
        <TabsContent value="unanswered" className="mt-6">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No unanswered threads</h3>
            <p className="text-muted-foreground mt-2">All threads currently have responses</p>
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No saved threads</h3>
            <p className="text-muted-foreground mt-2">Threads you save will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumPage;