
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
  sender: {
    name: string;
    avatar: string;
  };
}

interface Chat {
  id: string;
  userId: string;
  username: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const mockChats: Chat[] = [
  {
    id: '1',
    userId: '101',
    username: 'sarahj',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    lastMessage: "Hey, how's that project coming along?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    unreadCount: 2
  },
  {
    id: '2',
    userId: '102',
    username: 'mikec',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    lastMessage: 'Did you see the latest design?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    unreadCount: 0
  },
  {
    id: '3',
    userId: '103',
    username: 'emmaw',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    lastMessage: 'Thanks for your help yesterday!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    unreadCount: 0
  }
];

const mockMessages: Record<string, Message[]> = {
  '101': [
    {
      id: '1',
      senderId: '101',
      receiverId: 'me',
      content: "Hey, how's that project coming along?",
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      sender: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
      }
    },
    {
      id: '2',
      senderId: 'me',
      receiverId: '101',
      content: 'Working on it now! Should be done soon.',
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      read: true,
      sender: {
        name: 'Me',
        avatar: '/placeholder.svg'
      }
    }
  ],
  '102': [
    {
      id: '3',
      senderId: '102',
      receiverId: 'me',
      content: 'Did you see the latest design?',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      read: true,
      sender: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
      }
    }
  ],
  '103': [
    {
      id: '4',
      senderId: '103',
      receiverId: 'me',
      content: 'Thanks for your help yesterday!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      read: true,
      sender: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
      }
    }
  ]
};

const ChatListItem: React.FC<{ chat: Chat; onClick: () => void }> = ({ chat, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-3 hover:bg-hive-purple/10 rounded-md transition-colors ${chat.unreadCount > 0 ? 'bg-hive-purple/5' : ''}`}
  >
    <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
      <AvatarImage src={chat.avatar} alt={chat.name} />
      <AvatarFallback>{chat.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0 text-left">
      <div className="flex justify-between items-center">
        <p className="font-semibold truncate">{chat.name}</p>
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(chat.lastMessageTime), { addSuffix: false })}
        </span>
      </div>
      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
    </div>
    {chat.unreadCount > 0 && (
      <span className="ml-2 bg-hive-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
        {chat.unreadCount}
      </span>
    )}
  </button>
);

const MessageBubble: React.FC<{ message: Message; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => (
  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
    {!isCurrentUser && (
      <Avatar className="h-8 w-8 mr-2 mt-1">
        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
      </Avatar>
    )}
    <div
      className={`max-w-[75%] px-4 py-2 rounded-2xl ${
        isCurrentUser
          ? 'bg-hive-purple text-white rounded-tr-none'
          : 'bg-hive-gray/60 text-white rounded-tl-none'
      }`}
    >
      <p className="text-sm">{message.content}</p>
      <p className="text-xs mt-1 opacity-70 text-right">
        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: false })}
      </p>
    </div>
    {isCurrentUser && (
      <Avatar className="h-8 w-8 ml-2 mt-1">
        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
      </Avatar>
    )}
  </div>
);

const MessagePopover: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>(mockMessages);
  const { toast } = useToast();
  
  const unreadCount = mockChats.reduce((acc, chat) => acc + chat.unreadCount, 0);
  
  const handleChatSelect = (chat: Chat) => {
    setActiveChat(chat);
    // Mark messages as read (in a real app this would be an API call)
    const updatedChats = mockChats.map(c => 
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    // This is just for the demo, in a real app we would update the state properly
  };
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChat) return;
    
    // Create a new message
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: 'me',
      receiverId: activeChat.userId,
      content: messageText,
      createdAt: new Date().toISOString(),
      read: false,
      sender: {
        name: 'Me',
        avatar: '/placeholder.svg'
      }
    };
    
    // Update chat messages
    setChatMessages(prev => ({
      ...prev,
      [activeChat.userId]: [...(prev[activeChat.userId] || []), newMessage]
    }));
    
    setMessageText('');
    
    // Show a toast notification
    toast({
      title: "Message sent",
      description: `Your message to ${activeChat.name} has been sent.`
    });
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-hive-purple/20 hidden md:flex">
          <MessageSquare className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-hive-purple text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-hive-dark border-hive-gray/50" 
        align="end"
        side="bottom"
      >
        {!activeChat ? (
          <>
            <div className="flex justify-between items-center p-4">
              <h3 className="font-semibold">Messages</h3>
              <Button variant="ghost" size="sm" className="text-hive-purple text-xs hover:text-hive-light-purple">
                Mark all as read
              </Button>
            </div>
            <Separator className="bg-hive-gray/50" />
            <ScrollArea className="h-[350px]">
              {mockChats.map(chat => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  onClick={() => handleChatSelect(chat)}
                />
              ))}
            </ScrollArea>
          </>
        ) : (
          <>
            <div className="flex items-center p-3 bg-hive-dark border-b border-hive-gray/50">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 h-8 w-8"
                onClick={() => setActiveChat(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
                <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{activeChat.name}</p>
                <p className="text-xs text-gray-400">@{activeChat.username}</p>
              </div>
            </div>
            <ScrollArea className="h-[280px] p-3">
              {chatMessages[activeChat.userId]?.map(message => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === 'me'}
                />
              ))}
            </ScrollArea>
            <div className="p-3 border-t border-hive-gray/50 flex">
              <Input
                className="flex-1 bg-hive-gray/50 border-hive-gray/30 text-sm"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                className="ml-2 bg-hive-purple hover:bg-hive-dark-purple"
                size="icon"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default MessagePopover;
