import { Home, Compass, Bookmark, User, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SideBar(){
    return(
        <div className='sticky top-24 bg-white rounded-lg shadow p-4 space-y-2'>
            <nav className='space-y-1'>
                <Button variant="ghost" className='w-full justify-start gap-3'>
                    <Home className='h-5 w-5' />
                    <span>Home</span>
                </Button>
                <Button variant="ghost" className='w-full justify-start gap-3'>
                    <Compass className='h-5 w-5' />
                    <span>Explore</span>
                </Button>
                <Button variant="ghost" className='w-full justify-start gap-3'>
                    <Bookmark className='h-5 w-5' />
                    <span>Saved</span>
                </Button>
            </nav>
            <Separator />
            <nav className='space-y-1'>
                <Button variant="ghost" className="w-full justify-start gap-3">
                    <User className='h-5 w-5' />
                    <span>Profile</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                    <MessageCircle className='h-5 w-5' />
                    <span>Messages</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                    <Settings className='h-5 w-5' />
                    <span>Settings</span>
                </Button>
            </nav>
            <Separator />
            <div className='pt-4'>
                <h3 className='text-sm font-semibold text-gray-500 mb-2 px-3'>
                    CATEGORIES
                </h3>
                <nav className='space-y-1'>
                    <Button variant="ghost" className='w-full justify-start text-sm'>Mammals</Button>
                    <Button variant="ghost" className='w-full justify-start text-sm'>Birds</Button>
                    <Button variant="ghost" className='w-full justify-start text-sm'>Reptiles & Amphibians</Button>
                    <Button variant="ghost" className='w-full justify-start text-sm'>Marine Life</Button>
                    <Button variant="ghost" className='w-full justify-start text-sm'>Insects</Button>
                </nav>
            </div>
        </div>
    )
}