
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Share, MoreHorizontal, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: {
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
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    // In a real app, this would call an API
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would call an API
  };

  return (
    <div className="hive-card mb-4 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link to={`/profile/${post.author.id}`} className="font-semibold hover:underline">
              {post.author.name}
            </Link>
            <p className="text-sm text-gray-400">@{post.author.username}</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
          <Button variant="ghost" size="icon" className="ml-1 text-gray-400 hover:text-white">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-white">{post.content}</p>
      </div>

      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-auto object-cover"
            loading="lazy" 
          />
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center text-sm ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
          onClick={handleLike}
        >
          <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-red-500' : ''}`} />
          <span>{likes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-sm text-gray-400 hover:text-white"
        >
          <MessageSquare className="h-5 w-5 mr-1" />
          <span>{post.comments}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-sm text-gray-400 hover:text-white"
        >
          <Share className="h-5 w-5 mr-1" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center text-sm ${isSaved ? 'text-hive-yellow' : 'text-gray-400 hover:text-white'}`}
          onClick={handleSave}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-hive-yellow' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
