
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg'
    },
    content: 'liked your post "Just launched my new project!"',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    read: false
  },
  {
    id: '2',
    type: 'comment',
    user: {
      id: '102',
      name: 'Mike Chen',
      avatar: '/placeholder.svg'
    },
    content: 'commented on your post: "This looks amazing!"',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false
  },
  {
    id: '3',
    type: 'follow',
    user: {
      id: '103',
      name: 'Emma Wilson',
      avatar: '/placeholder.svg'
    },
    content: 'started following you',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: true
  },
  {
    id: '4',
    type: 'mention',
    user: {
      id: '104',
      name: 'Alex Thompson',
      avatar: '/placeholder.svg'
    },
    content: 'mentioned you in a comment',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true
  }
];

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className={`flex items-start p-3 ${!notification.read ? 'bg-hive-purple/10' : ''}`}>
      <Avatar className="h-9 w-9 mr-3">
        <AvatarImage src={notification.user.avatar} />
        <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium">
            <span className="font-semibold">{notification.user.name}</span>{' '}
            <span className="text-gray-400">{notification.content}</span>
          </p>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-hive-purple flex-shrink-0 mt-1.5"></span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const NotificationPopover: React.FC = () => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-hive-purple text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-hive-dark border-hive-gray/50" align="end">
        <div className="flex justify-between items-center p-4">
          <h3 className="font-semibold">Notifications</h3>
          <Button variant="ghost" size="sm" className="text-hive-purple text-xs hover:text-hive-light-purple px-2">
            Mark all as read
          </Button>
        </div>
        <Separator className="bg-hive-gray/50" />
        <div className="max-h-80 overflow-y-auto">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <NotificationItem notification={notification} />
                {notification.id !== mockNotifications[mockNotifications.length - 1].id && (
                  <Separator className="bg-hive-gray/30" />
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="py-6 text-center text-sm text-gray-400">
              No notifications yet
            </div>
          )}
        </div>
        <Separator className="bg-hive-gray/50" />
        <div className="p-2 text-center">
          <Button variant="ghost" className="text-hive-purple text-sm w-full hover:text-hive-light-purple hover:bg-hive-purple/10">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
