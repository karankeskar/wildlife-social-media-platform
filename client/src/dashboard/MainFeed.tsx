import CreatePost  from './CreatePost'
import PostCard  from './PostCard'

export default function MainFeed(){
    return(
        <div className='space-y-6 pb-8'>
            <CreatePost />
            <div className='space-y-6'>
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
}