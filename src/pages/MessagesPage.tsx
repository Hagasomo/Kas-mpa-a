import { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  PlusCircle,
  Paperclip,
  Image,
  Smile,
  Clock
} from 'lucide-react';
import { messages } from '@/data/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock conversation data
const mockConversation = [
  {
    id: 'm1',
    sender: 'other',
    content: "I've reviewed your research proposal on neural networks for climate modeling. The approach is innovative, but I have some concerns about the data sources you've specified.",
    time: '10:23 AM',
    status: 'read'
  },
  {
    id: 'm2',
    sender: 'other',
    content: "Specifically, the satellite data resolution might not be sufficient for the detailed analysis you're proposing. Have you considered using the high-resolution dataset from the Climate Research Center?",
    time: '10:24 AM',
    status: 'read'
  },
  {
    id: 'm3',
    sender: 'me',
    content: "Thank you for the feedback, Dr. Johnson. I did look into the CRC dataset initially, but was concerned about the preprocessing required to make it compatible with my model architecture.",
    time: '10:30 AM',
    status: 'sent'
  },
  {
    id: 'm4',
    sender: 'me',
    content: "Do you think the benefits of higher resolution would outweigh the potential issues that might arise from the additional preprocessing steps?",
    time: '10:31 AM',
    status: 'sent'
  },
  {
    id: 'm5',
    sender: 'other',
    content: "Yes, I believe it would be worth it. The improved resolution will give your model more accurate boundary conditions, which is crucial for climate modeling.",
    time: '10:36 AM',
    status: 'read'
  },
  {
    id: 'm6',
    sender: 'other',
    content: "I can share some preprocessing scripts my research group has used successfully with that dataset if that would help.",
    time: '10:37 AM',
    status: 'delivered'
  }
];

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(messages[0]);
  const [chatMessages, setChatMessages] = useState(mockConversation);
  
  // Filter messages based on search
  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setNewMessage('');
    
    // Simulate message status change
    setTimeout(() => {
      setChatMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-170px)] md:h-[calc(100vh-150px)] flex flex-col">
      <div className="flex flex-col md:flex-row h-full border rounded-lg overflow-hidden">
        {/* Messages Sidebar */}
        <div className="w-full md:w-80 border-r flex flex-col bg-card">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Messages</h2>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-3 mx-4 my-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="all" className="m-0">
                {filteredMessages.length > 0 ? (
                  <div>
                    {filteredMessages.map((message) => (
                      <button
                        key={message.id}
                        className={cn(
                          "w-full flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors",
                          selectedChat?.id === message.id && "bg-muted"
                        )}
                        onClick={() => setSelectedChat(message)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={message.avatar} alt={message.name} />
                            <AvatarFallback>{message.name[0]}</AvatarFallback>
                          </Avatar>
                          {message.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <span className="font-medium truncate">{message.name}</span>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {message.lastMessage}
                          </p>
                        </div>
                        {message.unread > 0 && (
                          <Badge className="ml-2">{message.unread}</Badge>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No messages found
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                {filteredMessages.filter(m => m.unread > 0).length > 0 ? (
                  <div>
                    {filteredMessages
                      .filter(m => m.unread > 0)
                      .map((message) => (
                        <button
                          key={message.id}
                          className={cn(
                            "w-full flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors",
                            selectedChat?.id === message.id && "bg-muted"
                          )}
                          onClick={() => setSelectedChat(message)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={message.avatar} alt={message.name} />
                              <AvatarFallback>{message.name[0]}</AvatarFallback>
                            </Avatar>
                            {message.isOnline && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <span className="font-medium truncate">{message.name}</span>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {message.lastMessage}
                            </p>
                          </div>
                          <Badge className="ml-2">{message.unread}</Badge>
                        </button>
                      ))
                    }
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No unread messages
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="archived" className="m-0">
                <div className="p-4 text-center text-muted-foreground">
                  No archived messages
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
        
        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                    <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                  </Avatar>
                  {selectedChat.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.isOnline ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                    <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                    <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                    <DropdownMenuItem>Archive conversation</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Delete conversation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={cn(
                      "flex",
                      message.sender === 'me' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[75%] rounded-lg px-4 py-2",
                      message.sender === 'me' 
                        ? "bg-primary text-primary-foreground rounded-br-none" 
                        : "bg-muted rounded-bl-none"
                    )}>
                      <p>{message.content}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-1 text-xs",
                        message.sender === 'me' 
                          ? "text-primary-foreground/80 justify-end" 
                          : "text-muted-foreground"
                      )}>
                        <span>{message.time}</span>
                        {message.sender === 'me' && (
                          <span>
                            {message.status === 'sending' && 'Sending...'}
                            {message.status === 'sent' && 'Sent'}
                            {message.status === 'delivered' && 'Delivered'}
                            {message.status === 'read' && 'Read'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex items-end gap-2">
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>
                        <Image className="h-4 w-4 mr-2" />
                        Share Image
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Paperclip className="h-4 w-4 mr-2" />
                        Attach File
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule Message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </div>
                <Input 
                  placeholder="Type a message..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-card">
            <div className="text-center">
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a contact to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;