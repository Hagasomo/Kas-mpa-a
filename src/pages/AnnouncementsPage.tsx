import { useState } from 'react';
import { Bell, Calendar, Search, Filter, XCircle, CheckCircle2 } from 'lucide-react';
import { announcements, announcementCategories } from '@/data/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const AnnouncementsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [readStatus, setReadStatus] = useState<Record<string, boolean>>(
    announcements.reduce((acc, announcement) => ({
      ...acc,
      [announcement.id]: announcement.isRead
    }), {})
  );
  
  // Filter announcements based on search, category, and read status
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    const matchesReadStatus = 
      filter === 'all' || 
      (filter === 'read' && readStatus[announcement.id]) || 
      (filter === 'unread' && !readStatus[announcement.id]);
    
    return matchesSearch && matchesCategory && matchesReadStatus;
  });

  // Toggle read status
  const toggleReadStatus = (id: string) => {
    setReadStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Mark all as read
  const markAllAsRead = () => {
    const updatedStatus = { ...readStatus };
    announcements.forEach(announcement => {
      updatedStatus[announcement.id] = true;
    });
    setReadStatus(updatedStatus);
  };

  // Get priority badge variant
  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return { variant: 'destructive' as const, label: 'High Priority' };
      case 'medium':
        return { variant: 'default' as const, label: 'Medium Priority' };
      case 'low':
        return { variant: 'outline' as const, label: 'Low Priority' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">Important updates and notifications from the academic community</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search announcements..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {announcementCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filter} onValueChange={(value: 'all' | 'read' | 'unread') => setFilter(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Announcements List */}
      {filteredAnnouncements.length > 0 ? (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => {
            const isRead = readStatus[announcement.id];
            const priorityBadge = getPriorityBadge(announcement.priority);
            
            return (
              <div 
                key={announcement.id} 
                className={cn(
                  "p-4 rounded-lg border transition-colors",
                  isRead ? "bg-card" : "bg-muted/30 border-muted-foreground/20"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-full md:w-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={announcement.authorAvatar} alt={announcement.author} />
                        <AvatarFallback>{announcement.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{announcement.author}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {announcement.date}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="md:hidden"
                      onClick={() => toggleReadStatus(announcement.id)}
                    >
                      {isRead ? (
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <XCircle className="h-5 w-5 text-primary" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary">{announcement.category}</Badge>
                      <Badge variant={priorityBadge.variant}>{priorityBadge.label}</Badge>
                    </div>
                    <h3 className={cn(
                      "text-lg font-medium",
                      !isRead && "font-semibold"
                    )}>
                      {announcement.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground line-clamp-2">
                      {announcement.content}
                    </p>
                  </div>
                  
                  <div className="hidden md:block">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleReadStatus(announcement.id)}
                    >
                      {isRead ? (
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <XCircle className="h-5 w-5 text-primary" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No announcements found</h3>
          <p className="text-muted-foreground mt-2">
            {searchQuery ? 
              `No announcements matching "${searchQuery}" in ${selectedCategory === 'all' ? 'any category' : selectedCategory}` : 
              'No announcements in this category yet'
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
    </div>
  );
};

export default AnnouncementsPage;