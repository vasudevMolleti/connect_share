
import React, { useState } from 'react';
import PostCard from '@/components/post/PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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
}

const likedPosts: Post[] = [
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
    isLiked: true
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
    isLiked: true
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
    isLiked: true
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
    isSaved: true
  }
];

const LikedPostsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredPosts = likedPosts
    .filter(post => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.content.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query) ||
          post.author.username.toLowerCase().includes(query)
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
    <div className="pt-24 pb-12 px-4 md:px-8 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Liked Posts</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search posts..."
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
      
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">No liked posts found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            {searchQuery 
              ? "No posts match your search criteria. Try different keywords."
              : "When you like posts, they will appear here for you to find again easily."}
          </p>
          <Button className="bg-hive-purple hover:bg-hive-dark-purple">
            Discover Posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default LikedPostsPage;
