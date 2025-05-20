
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, Loader2 } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    displayName: 'John Doe',
    username: 'johndoe',
    bio: 'Software developer passionate about UI/UX design and emerging technologies.',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
  });
  
  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    pushNotifications: false,
    soundEffects: true,
    twoFactorAuth: false,
    privacyMode: false
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    }, 1500);
  };

  const handleToggleChange = (setting: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Setting updated",
      description: `${setting} has been ${preferences[setting] ? 'disabled' : 'enabled'}.`
    });
  };

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8 bg-hive-gray/30">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="hive-card">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} alt={profile.displayName} />
                  <AvatarFallback>{profile.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="w-full">Change Avatar</Button>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="flex-1 space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input 
                      id="displayName" 
                      value={profile.displayName}
                      onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                      className="bg-hive-gray/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={profile.username}
                      onChange={(e) => setProfile({...profile, username: e.target.value})}
                      className="bg-hive-gray/30"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-hive-gray/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="w-full rounded-md border border-hive-gray/50 bg-hive-gray/30 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-hive-purple"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-hive-purple hover:bg-hive-dark-purple"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <div className="hive-card">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-400">Toggle between light and dark themes</p>
                </div>
                <Switch 
                  checked={preferences.darkMode} 
                  onCheckedChange={() => handleToggleChange('darkMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  checked={preferences.twoFactorAuth} 
                  onCheckedChange={() => handleToggleChange('twoFactorAuth')}
                />
              </div>
              
              <div className="border-t border-hive-gray/30 pt-4">
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <div className="hive-card">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={preferences.emailNotifications} 
                  onCheckedChange={() => handleToggleChange('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-400">Receive notifications on your device</p>
                </div>
                <Switch 
                  checked={preferences.pushNotifications} 
                  onCheckedChange={() => handleToggleChange('pushNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Sound Effects</h3>
                  <p className="text-sm text-gray-400">Play sounds for notifications</p>
                </div>
                <Switch 
                  checked={preferences.soundEffects} 
                  onCheckedChange={() => handleToggleChange('soundEffects')}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <div className="hive-card">
            <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Privacy Mode</h3>
                  <p className="text-sm text-gray-400">Hide your online status and activity</p>
                </div>
                <Switch 
                  checked={preferences.privacyMode} 
                  onCheckedChange={() => handleToggleChange('privacyMode')}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-medium">Connected Accounts</h3>
                <div className="flex items-center justify-between p-3 bg-hive-gray/20 rounded-md">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </div>
                    <span className="font-medium">Twitter</span>
                  </div>
                  <div className="flex items-center text-green-500">
                    <CheckIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-hive-gray/20 rounded-md">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </div>
                    <span className="font-medium">Facebook</span>
                  </div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-medium">Login Activity</h3>
                <div className="text-sm text-gray-400">
                  <p>Last login: Today at 10:23 AM</p>
                  <p>Device: Chrome on Windows</p>
                  <Button size="sm" variant="link" className="p-0 h-auto text-hive-purple">View all activity</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
