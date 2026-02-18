import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Avatar} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {Heart, MessageCircle, Bookmark, MapPin} from 'lucide-react';

interface Post{
    _id:string;
    userId:{
        _id:string;
        fullName:string;
        profile_picture?:string;
    };
    title:string;
    caption?:string;
    image:string;
    location?:string;
    country:string;
    category:string;
    hashtag?:string[];
    like_count:number;
    conservation_status?:string;
    createdAt:string;
}

interface PostCardProps{
    post:Post
}

export default function PostCard({post}:PostCardProps){
    return(
        <Card className='w-full max-w-2xl mx-auto'>
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <Avatar className='h-10 w-10 bg-gray-300'>
                    {post.userId.profile_picture ?(
                        <img src={post.userId.profile_picture} alt={post.userId.fullName} />
                    ):(
                        <div className="flex items-center justify-center h-full">
                            {post.userId.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </Avatar>
                <div className='flex-1'>
                    <p className='font-semibold'>{post.userId.fullName}</p>
                    {post.location && (
                        <p className='text-sm text-gray-500 flex items-center gap-1'>
                            <MapPin className='h-3 w-3' />
                            {post.location}, {post.country}
                        </p>
                    )}
                </div>
            </CardHeader>
        </Card>
    )
}