import { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Globe, 
  Users, 
  Settings, 
  Edit2,
  Bookmark,
  History,
  BookMarked,
  Award,
  Newspaper
} from 'lucide-react';
import { userData } from '@/data/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Mock publications data
const mockPublications = [
  {
    id: 'p1',
    title: 'Neural Network Approaches to Climate Modeling: A Comprehensive Review',
    journal: 'Journal of Computational Environmental Science',
    year: '2024',
    citation: 128,
    coAuthors: ['Dr. Robert Chen', 'Prof. Maria Santos', 'Dr. Kevin Li']
  },
  {
    id: 'p2',
    title: 'Predicting Extreme Weather Events Using Multimodal Deep Learning',
    journal: 'Environmental Data Science',
    year: '2023',
    citation: 85,
    coAuthors: ['Dr. Emily Wilson', 'Prof. James Harris']
  },
  {
    id: 'p3',
    title: 'Integrating Satellite Data with Machine Learning for Enhanced Climate Predictions',
    journal: 'Remote Sensing Applications',
    year: '2022',
    citation: 210,
    coAuthors: ['Dr. Lisa Martinez', 'Dr. Michael Davis', 'Prof. David Garcia']
  }
];

// Mock saved content
const mockSavedContent = [
  {
    id: 's1',
    title: 'The Ethics of Artificial Intelligence in Healthcare',
    type: 'article',
    author: 'Prof. James Norton',
    date: '3 days ago'
  },
  {
    id: 's2',
    title: 'Academic publishing: Open access vs. traditional journals',
    type: 'forum',
    author: 'Dr. Emily Carter',
    date: '1 week ago'
  },
  {
    id: 's3',
    title: 'Neuroscience of Learning: Why Spaced Repetition Works',
    type: 'article',
    author: 'Prof. Michael Chen',
    date: '2 weeks ago'
  }
];

// Mock activity history
const mockActivityHistory = [
  {
    id: 'a1',
    action: 'Commented on forum thread',
    item: 'Discussion: Is computational thinking a fundamental skill for modern education?',
    date: '2 hours ago'
  },
  {
    id: 'a2',
    action: 'Published new article',
    item: 'Neural Network Approaches to Climate Modeling: A Comprehensive Review',
    date: '3 days ago'
  },
  {
    id: 'a3',
    action: 'Replied to announcement',
    item: 'Important: Changes to Research Funding Application Process',
    date: '1 week ago'
  },
  {
    id: 'a4',
    action: 'Saved article',
    item: 'The Ethics of Artificial Intelligence in Healthcare',
    date: '1 week ago'
  }
];

const ProfilePage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 md:h-32 md:w-32">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.role}, {userData.department}</p>
            </div>
            <Button>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{userData.publications}</p>
              <p className="text-xs text-muted-foreground">Publications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{userData.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{userData.following}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Tabs */}
      <Tabs defaultValue="publications">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="publications">
            <BookOpen className="h-4 w-4 mr-2" />
            Publications
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved Content
          </TabsTrigger>
          <TabsTrigger value="activity">
            <History className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Publications Tab */}
        <TabsContent value="publications" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Publications</h2>
            <Button>
              <BookMarked className="h-4 w-4 mr-2" />
              Add Publication
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockPublications.map((publication) => (
              <Card key={publication.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{publication.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {publication.journal} • {publication.year}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Award className="h-4 w-4 mr-1" />
                      <span>{publication.citation} citations</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Co-authors: {publication.coAuthors.join(', ')}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">View Publication</Button>
                    <Button variant="ghost" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      DOI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Saved Content Tab */}
        <TabsContent value="saved" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Saved Content</h2>
            <Input placeholder="Search saved items..." className="max-w-xs" />
          </div>
          
          <div className="space-y-4">
            {mockSavedContent.map((item) => (
              <Card key={item.id}>
                <div className="p-4 flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                    {item.type === 'article' ? (
                      <Newspaper className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <Users className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{item.author}</span>
                      <span className="mx-2">•</span>
                      <span>{item.date}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">Activity History</h2>
          
          <div className="relative border-l pl-6 ml-3 space-y-6">
            {mockActivityHistory.map((activity, index) => (
              <div key={activity.id} className="relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[1.625rem] top-1.5" />
                <p className="text-sm text-muted-foreground">{activity.date}</p>
                <h3 className="font-medium mt-1">{activity.action}</h3>
                <p className="text-sm mt-1">{activity.item}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in browser
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle dark mode for the interface
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" value="English" disabled />
                  <p className="text-xs text-muted-foreground">
                    Additional languages coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your profile and content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-visibility">Profile Visibility</Label>
                    <Input id="profile-visibility" value="Public" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publication-visibility">Publications Visibility</Label>
                    <Input id="publication-visibility" value="Public" disabled />
                  </div>
                </div>
                <Button variant="outline">Manage Privacy Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;