import { Camera, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '../ui/textarea';
import { Avatar } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePostForm } from '../form/create-post-form';
import { useState } from 'react';

export default function CreatePost() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent className='pt-6'>
        <Dialog open={open} onOpenChange={setOpen}>
          <div className='flex gap-3'>
            <Avatar className='h-10 w-10 bg-gray-300' />            
            <DialogTrigger asChild>
              <Textarea 
                placeholder='What wildlife did you see today?' 
                className='min-h-[60px] resize-none cursor-pointer'
                readOnly
              />
            </DialogTrigger>
          </div>
          
          <div className='flex items-center justify-between mt-4 pt-4 border-t'>
            <div className='flex gap-2'>
              <Button variant="ghost" size="sm" className='gap-2'>
                <Camera className='h-4 w-4'/>
                Photo
              </Button>
              <Button variant="ghost" size="sm" className='gap-2'>
                <MapPin className='h-4 w-4' />
                Location
              </Button>
            </div>            
            <DialogTrigger asChild>
              <Button size="sm">Post</Button>
            </DialogTrigger>
          </div>

          <DialogContent className="max-w-[90vh] max-h-[90vh] overflow-y-auto">
            <CreatePostForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}