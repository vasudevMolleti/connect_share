
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import CreatePostCard from '@/components/post/CreatePostCard';
import PostCard from '@/components/post/PostCard';
import AuthModal from '@/components/auth/AuthModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockPosts = [
  {
    id: "1",
    author: {
      id: "101",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/placeholder.svg"
    },
    content: "Just launched my new project! Check it out and let me know what you think.",
    image: "https://source.unsplash.com/random/1080x720/?project",
    likes: 24,
    comments: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isLiked: false
  },
  {
    id: "2",
    author: {
      id: "102",
      name: "Alex Thompson",
      username: "alexthompson",
      avatar: "/placeholder.svg"
    },
    content: "Beautiful sunset at the beach today. Nature never fails to amaze me.",
    image: "https://source.unsplash.com/random/1080x720/?sunset,beach",
    likes: 57,
    comments: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isLiked: true
  },
  {
    id: "3",
    author: {
      id: "103",
      name: "Mike Chen",
      username: "mikechen",
      avatar: "/placeholder.svg"
    },
    content: "Working on a new feature for our app. Can't wait to share it with everyone!",
    likes: 12,
    comments: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: "4",
    author: {
      id: "104",
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg"
    },
    content: "Just finished reading this amazing book. Highly recommend it!",
    image: "https://source.unsplash.com/random/1080x720/?book",
    likes: 32,
    comments: 6,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isSaved: true
  }
];

const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const loadMorePosts = () => {
    if (loading) return;
    
    setLoading(true);
    // In a real app, this would call an API
    setTimeout(() => {
      const newPosts = [...posts];
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * mockPosts.length);
        const post = { ...mockPosts[randomIndex], id: `new-${Date.now()}-${i}` };
        newPosts.push(post);
      }
      setPosts(newPosts);
      setLoading(false);
      
      // Stop infinite scrolling after certain number of posts
      if (newPosts.length > 15) {
        setHasMore(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );
    
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, posts]);

  return (
    <div className="w-full py-6">
      <div className="w-full max-w-3xl mx-auto">
        <Tabs defaultValue="foryou" className="mb-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-hive-gray/50 border border-hive-gray/30">
              <TabsTrigger value="foryou" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">For You</TabsTrigger>
              <TabsTrigger value="following" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Following</TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Trending</TabsTrigger>
            </TabsList>
            <Button 
              onClick={openAuthModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Sign In
            </Button>
          </div>
          
          <TabsContent value="foryou" className="mt-4">
            <CreatePostCard />
            
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            
            <div ref={observerTarget} className="py-4 text-center">
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              )}
              {!hasMore && (
                <p className="text-sm text-gray-400">No more posts to load</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="following">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-emerald-500/20 rounded-full p-6 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Follow some users</h3>
              <p className="text-gray-400 text-center mb-6 max-w-md">
                When you follow people, you'll see their posts in your Following timeline.
              </p>
              <Button 
                onClick={openAuthModal}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Sign in to follow users
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-emerald-500/20 rounded-full p-6 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Trending content</h3>
              <p className="text-gray-400 text-center mb-6 max-w-md">
                Popular posts from the Connect Share community will appear here.
              </p>
              <Button 
                onClick={openAuthModal}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Sign in to see trends
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default HomePage;
