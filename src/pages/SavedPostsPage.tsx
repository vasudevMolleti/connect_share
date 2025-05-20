
import React, { useState } from 'react';
import PostCard from '@/components/post/PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bookmark, Filter, Folders } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked?: boolean;
  isSaved?: boolean;
  collection?: string;
}

interface Collection {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const savedPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '101',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
    },
    content: 'Just launched my new portfolio website after weeks of hard work! Check it out and let me know what you think 🚀 #webdev #portfolio',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    likes: 42,
    comments: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isLiked: false,
    isSaved: true,
    collection: 'Design Inspiration'
  },
  {
    id: '2',
    author: {
      id: '102',
      name: 'Mike Chen',
      username: 'mikec',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
    },
    content: 'Fascinating article about the future of AI in healthcare. The possibilities are both exciting and challenging. #AI #healthcare #technology',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    likes: 67,
    comments: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    isLiked: false,
    isSaved: true,
    collection: 'Tech Articles'
  },
  {
    id: '3',
    author: {
      id: '103',
      name: 'Emma Wilson',
      username: 'emmaw',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
    },
    content: 'What an amazing sunset over the mountains today. Nature never fails to inspire me. 🏔️ #nature #photography #sunset',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    likes: 128,
    comments: 24,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isLiked: true,
    isSaved: true,
    collection: 'Travel Ideas'
  },
  {
    id: '4',
    author: {
      id: '104',
      name: 'Alex Thompson',
      username: 'alext',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
    },
    content: 'Just finished reading "Atomic Habits" by James Clear. Highly recommend it if you want to build better habits and break bad ones. What are you reading these days? #books #atomichabits #personalgrowth',
    likes: 56,
    comments: 31,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isLiked: true,
    isSaved: true,
    collection: 'Reading List'
  }
];

const collections: Collection[] = [
  {
    id: 'all',
    name: 'All Saved',
    icon: <Bookmark className="h-4 w-4 mr-2" />,
    count: 4
  },
  {
    id: 'design',
    name: 'Design Inspiration',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 19c.32 0 .63-.05.93-.13A7 7 0 0 1 12 5.5h0m0 13.5c.32 0 .63-.05.93-.13A7 7 0 0 1 12 5.5h0m0 13.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"/><path d="M12 19c-2.48 0-4.5-2.02-4.5-4.5 0-.84.23-1.62.63-2.29a9.97 9.97 0 0 0-4.1 1.21a5 5 0 1 0 5.65 5.65c.57-1.7 1.42-3.26 2.49-4.67"/><path d="M12 5.5A4.5 4.5 0 0 0 7.5 10c0 .97.31 1.86.83 2.58A9.97 9.97 0 0 1 7.5 7c.6-.34 1.16-.55 1.75-.55C10.33 6.5 13.59 5.5 12 2v3.5Z"/></svg>,
    count: 1
  },
  {
    id: 'tech',
    name: 'Tech Articles',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>,
    count: 1
  },
  {
    id: 'travel',
    name: 'Travel Ideas',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M20 11c0 6-8 10-8 10s-8-4-8-10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="11" r="3"/></svg>,
    count: 1
  },
  {
    id: 'reading',
    name: 'Reading List',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 6a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V6z"/><path d="M10 2v20"/></svg>,
    count: 1
  }
];

const SavedPostsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeCollection, setActiveCollection] = useState('all');
  
  const filteredPosts = savedPosts
    .filter(post => {
      // Collection filter
      if (activeCollection !== 'all') {
        const collectionObj = collections.find(c => c.id === activeCollection);
        return post.collection === collectionObj?.name;
      }
      return true;
    })
    .filter(post => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.content.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query) ||
          post.author.username.toLowerCase().includes(query) ||
          (post.collection && post.collection.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter(post => {
      // Date filter
      if (filter === 'today') {
        const today = new Date();
        const postDate = new Date(post.createdAt);
        return today.toDateString() === postDate.toDateString();
      }
      if (filter === 'thisWeek') {
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const postDate = new Date(post.createdAt);
        return postDate >= oneWeekAgo;
      }
      if (filter === 'thisMonth') {
        const today = new Date();
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const postDate = new Date(post.createdAt);
        return postDate >= oneMonthAgo;
      }
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Saved Posts</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search saved posts..."
              className="pl-10 bg-hive-gray/50 border-hive-gray/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-3">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-hive-dark border-hive-gray/50">
              <DropdownMenuLabel>Filter by time</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-hive-gray/30" />
              <DropdownMenuItem 
                className={filter === 'all' ? 'bg-hive-purple/20 text-hive-purple' : ''}
                onClick={() => handleFilterChange('all')}
              >
                All time
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filter === 'today' ? 'bg-hive-purple/20 text-hive-purple' : ''}
                onClick={() => handleFilterChange('today')}
              >
                Today
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filter === 'thisWeek' ? 'bg-hive-purple/20 text-hive-purple' : ''}
                onClick={() => handleFilterChange('thisWeek')}
              >
                This week
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filter === 'thisMonth' ? 'bg-hive-purple/20 text-hive-purple' : ''}
                onClick={() => handleFilterChange('thisMonth')}
              >
                This month
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="mb-8 bg-hive-gray/30">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 hidden md:block">
              <div className="bg-hive-dark border border-hive-gray/30 rounded-xl p-4 sticky top-24">
                <h3 className="font-semibold mb-4">Collections</h3>
                <ul className="space-y-2">
                  {collections.map(collection => (
                    <li key={collection.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start py-2 ${activeCollection === collection.id ? 'bg-hive-purple/20 text-hive-purple' : 'hover:bg-hive-gray/30'}`}
                        onClick={() => setActiveCollection(collection.id)}
                      >
                        <div className="flex items-center">
                          {collection.icon}
                          <span>{collection.name}</span>
                        </div>
                        <span className="ml-auto text-xs bg-hive-gray/50 px-2 py-0.5 rounded-full">
                          {collection.count}
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-hive-gray/30">
                  <Button variant="outline" className="w-full">
                    <Folders className="h-4 w-4 mr-2" />
                    Create Collection
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-3">
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-hive-dark border border-hive-gray/30 rounded-xl">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mx-auto mb-6 text-gray-400"
                  >
                    <path d="M19 21v-2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2" />
                    <rect width="18" height="14" x="3" y="4" rx="2" />
                    <circle cx="12" cy="11" r="3" />
                    <path d="m3 7 8 5 8-5" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">No saved posts found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    {searchQuery 
                      ? "No posts match your search criteria. Try different keywords."
                      : activeCollection !== 'all'
                        ? `There are no saved posts in this collection yet.`
                        : "When you save posts, they will appear here for you to find again easily."}
                  </p>
                  <Button className="bg-hive-purple hover:bg-hive-dark-purple">
                    Discover Posts
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="collections">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {collections.slice(1).map(collection => (
              <div 
                key={collection.id}
                className="bg-hive-dark border border-hive-gray/30 rounded-xl p-5 hover:border-hive-purple/50 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-hive-gray/30 flex items-center justify-center">
                    {React.cloneElement(collection.icon as React.ReactElement, { className: "h-5 w-5" })}
                  </div>
                  <Button variant="ghost" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </div>
                <h3 className="font-semibold text-lg mb-1">{collection.name}</h3>
                <p className="text-gray-400 text-sm">{collection.count} post{collection.count !== 1 ? 's' : ''}</p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveCollection(collection.id)}
                  >
                    View Collection
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="bg-hive-gray/20 border border-dashed border-hive-gray/30 rounded-xl p-5 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-hive-gray/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Create Collection</h3>
              <p className="text-gray-400 text-sm mb-4">Organize your saved posts with custom collections</p>
              <Button className="bg-hive-purple hover:bg-hive-dark-purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                New Collection
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedPostsPage;
