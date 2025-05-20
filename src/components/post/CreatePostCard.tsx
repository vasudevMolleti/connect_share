
import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Smile, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreatePostCard = () => {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && !imagePreview) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });
      setContent('');
      setImagePreview(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="hive-card mb-4">
      <div className="flex space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's happening?"
            className="w-full resize-none border-none bg-hive-dark focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
            value={content}
            onChange={handleContentChange}
            rows={3}
          />
          
          {imagePreview && (
            <div className="relative mt-3 rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-64 w-auto rounded-lg" 
              />
              <Button
                onClick={removeImage}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-hive-gray/50">
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={handleImageClick} 
                className="text-hive-purple hover:text-hive-light-purple hover:bg-hive-dark-purple/20"
              >
                <Image className="h-5 w-5" />
              </Button>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-hive-purple hover:text-hive-light-purple hover:bg-hive-dark-purple/20"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={(!content.trim() && !imagePreview) || isSubmitting}
              className="bg-hive-purple hover:bg-hive-dark-purple text-white font-medium px-4 py-1 rounded-full"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
