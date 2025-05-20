
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserPlus, Users, UserCheck, Clock, Shield, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends?: number;
  isOnline?: boolean;
  lastActive?: string;
  isFollowing?: boolean;
}

const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 12,
    isOnline: true,
    isFollowing: true
  },
  {
    id: "2",
    name: "Mike Chen",
    username: "mikec",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 8,
    isOnline: true,
    isFollowing: true
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 5,
    isOnline: false,
    lastActive: "2 hours ago",
    isFollowing: true
  },
  {
    id: "4",
    name: "Alex Thompson",
    username: "alext",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 3,
    isOnline: false,
    lastActive: "1 day ago",
    isFollowing: true
  }
];

const mockSuggestions: Friend[] = [
  {
    id: "5",
    name: "Priya Sharma",
    username: "priyas",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 15,
    isOnline: true,
    isFollowing: false
  },
  {
    id: "6",
    name: "David Kim",
    username: "davidk",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 7,
    isOnline: true,
    isFollowing: false
  },
  {
    id: "7",
    name: "Olivia Martinez",
    username: "oliviam",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 4,
    isOnline: false,
    lastActive: "3 hours ago",
    isFollowing: false
  }
];

const mockRequests: Friend[] = [
  {
    id: "8",
    name: "Daniel Brown",
    username: "danielb",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 6,
    isOnline: true,
    isFollowing: false
  },
  {
    id: "9",
    name: "Sophia Lee",
    username: "sophial",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    mutualFriends: 2,
    isOnline: false,
    lastActive: "5 hours ago",
    isFollowing: false
  }
];

const FriendCard: React.FC<{ friend: Friend; mode: 'friend' | 'suggestion' | 'request' }> = ({ friend, mode }) => {
  const { toast } = useToast();
  const [following, setFollowing] = useState(friend.isFollowing);
  const [hidden, setHidden] = useState(false);

  const handleAction = (action: string) => {
    if (action === 'follow') {
      setFollowing(true);
      toast({
        title: "Following",
        description: `You are now following ${friend.name}.`
      });
    } else if (action === 'unfollow') {
      setFollowing(false);
      toast({
        title: "Unfollowed",
        description: `You have unfollowed ${friend.name}.`
      });
    } else if (action === 'accept') {
      setFollowing(true);
      setHidden(true);
      toast({
        title: "Friend request accepted",
        description: `You and ${friend.name} are now friends.`
      });
    } else if (action === 'reject') {
      setHidden(true);
      toast({
        title: "Friend request rejected",
        description: `You have rejected ${friend.name}'s friend request.`
      });
    } else if (action === 'remove') {
      setHidden(true);
      toast({
        title: "Friend removed",
        description: `You have removed ${friend.name} from your friends.`
      });
    }
  };

  if (hidden) return null;

  return (
    <div className="bg-hive-dark border border-hive-gray/30 rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-start justify-between">
        <Avatar className="h-16 w-16">
          <AvatarImage src={friend.avatar} alt={friend.name} />
          <AvatarFallback>{friend.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex space-x-1">
          {mode === 'friend' && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full text-gray-400 hover:text-white"
              onClick={() => handleAction('remove')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex items-center">
          <h3 className="font-semibold text-lg">{friend.name}</h3>
          {friend.isOnline ? (
            <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
          ) : null}
        </div>
        <p className="text-gray-400 text-sm">@{friend.username}</p>
      </div>
      
      <div className="mt-2 text-sm text-gray-400">
        {friend.mutualFriends ? (
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{friend.mutualFriends} mutual friends</span>
          </div>
        ) : null}
        
        {!friend.isOnline && friend.lastActive ? (
          <div className="flex items-center mt-1">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>Active {friend.lastActive}</span>
          </div>
        ) : null}
      </div>
      
      <div className="mt-auto pt-4">
        {mode === 'friend' ? (
          <Button 
            variant={following ? "outline" : "default"} 
            className="w-full"
            onClick={() => handleAction(following ? 'unfollow' : 'follow')}
          >
            {following ? (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </>
            )}
          </Button>
        ) : mode === 'suggestion' ? (
          <Button 
            variant="default" 
            className="w-full bg-hive-purple hover:bg-hive-dark-purple"
            onClick={() => handleAction('follow')}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Follow
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              className="flex-1 bg-hive-purple hover:bg-hive-dark-purple"
              onClick={() => handleAction('accept')}
            >
              Accept
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleAction('reject')}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const FriendsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filterFriends = (friends: Friend[]) => {
    if (!searchQuery) return friends;
    return friends.filter(friend => 
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredFriends = filterFriends(mockFriends);
  const filteredSuggestions = filterFriends(mockSuggestions);
  const filteredRequests = filterFriends(mockRequests);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search friends..."
            className="pl-10 bg-hive-gray/50 border-hive-gray/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 bg-hive-gray/30">
          <TabsTrigger value="all">All Friends</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="requests">Friend Requests <span className="ml-1.5 py-0.5 px-1.5 rounded-full bg-hive-purple text-white text-xs">{mockRequests.length}</span></TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredFriends.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFriends.map(friend => (
                <FriendCard key={friend.id} friend={friend} mode="friend" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No friends found</h3>
              <p className="text-gray-400 mb-6">Try searching for another name or username</p>
              <Button className="bg-hive-purple hover:bg-hive-dark-purple">
                Find Friends
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="suggestions">
          {filteredSuggestions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSuggestions.map(friend => (
                <FriendCard key={friend.id} friend={friend} mode="suggestion" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <UserPlus className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No suggestions found</h3>
              <p className="text-gray-400">We'll notify you when we find people you might know</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requests">
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredRequests.map(friend => (
                <FriendCard key={friend.id} friend={friend} mode="request" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No pending requests</h3>
              <p className="text-gray-400">You don't have any friend requests right now</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FriendsPage;
