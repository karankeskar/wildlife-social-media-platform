import {Camera, MapPin} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Card, CardContent} from '@/components/ui/card';
import { Textarea } from '../ui/textarea';
import {Avatar} from '../ui/avatar'

export default function CreatePost(){
    return(
        <Card>
            <CardContent className='pt-6'>
                <div className='flex gap-3'>
                    <Avatar className='h-10 w-10 bg-gray-300'>
                    </Avatar>
                    <Textarea placeholder='What wildlife did you see today?' className='min-h-[60px] resize-none'/>
                </div>
                <div className='flex items-center justify-center mt-4 pt-4 border-t'>
                    <div className='flex-gap-2'>
                        <Button variant="ghost" size="sm" className='gap-2'>
                            <Camera className='h-4 w-4'/>
                            Photo
                        </Button>
                        <Button variant="ghost" size="sm" className='gap-2'>
                            <MapPin className='h-4 w-4' />
                            Location
                        </Button>
                    </div>
                    <Button size="sm">Post</Button>
                </div>
            </CardContent>
        </Card>
    )
}