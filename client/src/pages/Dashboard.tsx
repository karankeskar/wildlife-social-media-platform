import SideBar from "../components/dashboard/SideBar";
import MainFeed from "../components/dashboard/MainFeed";
// import SearchBar  from "../components/dashboard/SearchBar";

export default function Dashboard(){
    return(
        <div className="min-h-screen bg-gray-50">
            {/* <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <SearchBar />
                </div>
            </div> */}
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-6 pt-6">
                    <aside className="w-64 shrink-0 hidden lg:block">
                        <SideBar />
                    </aside>
                    <main className="flex-1 min-w-0">
                        <MainFeed />
                    </main>
                </div>
            </div>
        </div>
    )
}