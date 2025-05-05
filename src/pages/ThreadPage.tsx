import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Flag, 
  ThumbsUp, 
  MoreVertical,
  SendHorizontal,
  Calendar
} from 'lucide-react';
import { forumThreads } from '@/data/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock thread replies
const mockReplies = [
  {
    id: 'r1',
    content: "I believe computational thinking is absolutely essential in today's education. It teaches logical problem-solving skills that are applicable across disciplines.",
    author: 'Dr. Maria Lopez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    authorTitle: 'Associate Professor, Computer Science',
    date: '2 hours ago',
    likes: 12,
    isTopAnswer: true
  },
  {
    id: 'r2',
    content: "While I agree it's important, we need to be careful not to prioritize computational thinking at the expense of creative and critical thinking skills. A balanced approach is key.",
    author: 'Prof. James Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    authorTitle: 'Department Chair, Education',
    date: '4 hours ago',
    likes: 8,
    isTopAnswer: false
  },
  {
    id: 'r3',
    content: "I've implemented computational thinking exercises in my humanities courses with great success. Students approached text analysis and historical pattern recognition with new perspectives.",
    author: 'Dr. Emily Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/women/56.jpg',
    authorTitle: 'Assistant Professor, English',
    date: '1 day ago',
    likes: 15,
    isTopAnswer: false
  },
  {
    id: 'r4',
    content: "My research suggests that early exposure to computational thinking concepts (even without computers) helps develop problem-solving frameworks that benefit students throughout their education.",
    author: 'Robert Green',
    authorAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    authorTitle: 'PhD Candidate, Cognitive Science',
    date: '2 days ago',
    likes: 7,
    isTopAnswer: false
  }
];

const ThreadPage = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [replyContent, setReplyContent] = useState('');
  const [userReplies, setUserReplies] = useState<Array<typeof mockReplies[0]>>([]);
  
  // Find the thread
  const thread = forumThreads.find(t => t.id === threadId);
  
  // Handle reply submission
  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;
    
    const newReply = {
      id: `user-reply-${Date.now()}`,
      content: replyContent,
      author: 'You',
      authorAvatar: 'https://randomuser.me/api/portraits/men/40.jpg',
      authorTitle: 'Graduate Student',
      date: 'Just now',
      likes: 0,
      isTopAnswer: false
    };
    
    setUserReplies([newReply, ...userReplies]);
    setReplyContent('');
  };
  
  // Combined replies
  const allReplies = [...userReplies, ...mockReplies];
  
  if (!thread) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Thread not found</h2>
        <p className="text-muted-foreground mt-2">The thread you're looking for might have been removed or doesn't exist</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/forum">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/forum">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Link>
        </Button>
      </div>
      
      {/* Thread Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{thread.category}</Badge>
          {thread.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold">{thread.title}</h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={thread.authorAvatar} alt={thread.author} />
              <AvatarFallback>{thread.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{thread.author}</div>
              <div className="text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 inline mr-1" />
                {thread.date}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Thread Content */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="prose max-w-none">
          <p>
            I've been following recent discussions on educational reform, and the topic of computational thinking as a fundamental skill has come up repeatedly. I'm particularly interested in whether computational thinking should be integrated across the curriculum rather than isolated to computer science courses.
          </p>
          <p className="mt-4">
            Some questions I'd like to explore:
          </p>
          <ul className="mt-2 space-y-1 list-disc pl-5">
            <li>How would you define computational thinking in a way that's accessible to educators across disciplines?</li>
            <li>What are some successful examples of integrating computational thinking into non-CS subjects?</li>
            <li>Are there potential drawbacks to emphasizing computational thinking in education?</li>
            <li>How might computational thinking skills be assessed in a holistic curriculum?</li>
          </ul>
          <p className="mt-4">
            I'd appreciate insights from both educators and researchers on this topic. Thank you!
          </p>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Helpful (24)
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Viewed {thread.views} times
          </div>
        </div>
      </div>
      
      {/* Reply Box */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-medium mb-4">Post a Reply</h3>
        <Textarea 
          placeholder="Share your thoughts on this topic..."
          className="min-h-[120px] mb-4"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitReply} disabled={!replyContent.trim()}>
            <SendHorizontal className="h-4 w-4 mr-2" />
            Post Reply
          </Button>
        </div>
      </div>
      
      {/* Replies */}
      <div>
        <h3 className="text-xl font-medium mb-6">{allReplies.length} Replies</h3>
        
        <div className="space-y-6">
          {allReplies.map((reply) => (
            <div 
              key={reply.id} 
              className="bg-card rounded-lg p-6 border relative"
            >
              {reply.isTopAnswer && (
                <Badge className="absolute -top-3 left-4">Top Answer</Badge>
              )}
              
              <div className="flex flex-wrap items-start gap-4 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                  <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{reply.author}</div>
                  <div className="text-sm text-muted-foreground">{reply.authorTitle}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {reply.date}
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p>{reply.content}</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Helpful ({reply.likes})
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;