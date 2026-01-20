import {Heart, MessageCircle, Share2, Bookmark, MapPin} from "lucide-react"; 
import {Button} from '@/components/ui/button';
import{Card, CardContent} from '@/components/ui/card';
import {Avatar} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';

export default function PostCard(){
    return(
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10 bg-gray-300">
                        <span className="text-lg"></span>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm"></p>
                        <p className="text-xs text-gray-500"></p>
                    </div>
                </div>
                <p className="mb-4"></p>
                <div className="mb-4 rounded-lg oveflow-hidden bg-gray-200 h-96 flex items-center justify-center">
                    <span className="text-6-xl"></span>
                </div>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4"></MapPin>
                        <span></span>
                    </div>
                    <Badge variant="secondary"></Badge>
                    <Badge variant="secondary"></Badge>
                    <Badge variant="secondary"></Badge>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Heart className="h-5 w-5"></Heart>
                            <span></span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="h-5 w-5"></MessageCircle>
                            <span></span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Share2 className="h-5 w-5"></Share2>
                            <span></span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Bookmark className="h-5 w-5"></Bookmark>
                            <span></span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}