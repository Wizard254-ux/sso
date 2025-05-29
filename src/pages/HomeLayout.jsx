import { IoSettingsOutline, IoSearchOutline, IoAnalytics, IoArrowUp } from "react-icons/io5";
import { BsGrid3X3GapFill, BsCameraVideo, BsChatText } from "react-icons/bs";
import { TbBellRinging2 } from "react-icons/tb";
import { GoPlus } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { RiBarChartBoxLine, RiListSettingsFill } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdOutlineCampaign } from 'react-icons/md';
import { CgWebsite } from "react-icons/cg";
import { LiaPagerSolid } from "react-icons/lia";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";



const HomeLayout = () => {

    const location = useLocation();

    const sidebarItems = [
        { icon: <CiGrid41 size={20} />, label: 'Dashboard', path: '/Dashboard' },
        { icon: <RiBarChartBoxLine size={20} />, label: 'Analytics', path: '/Analytics' },
        { icon: <FaRegAddressCard size={20} />, label: 'Contacts', path: '/Contacts' },
        { icon: <MdOutlineCampaign size={20} />, label: 'Campaigns', path: '/Campaigns' },
        { icon: <IoAnalytics size={20} />, label: 'Automation', path: '/Automation' },
        { icon: <CgWebsite size={20} />, label: 'Website', path: '/Website' },
        { icon: <LiaPagerSolid size={20} />, label: 'Content Studio', path: '/ContentStudio' },
        { icon: <RiListSettingsFill size={20} />, label: 'Integration', path: '/Integration' },
        { icon: <IoArrowUp size={20} />, label: 'Upgrade Plans', path: '/UpgradePlans' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-16 bg-white flex flex-col justify-between py-3">
                    <div className="flex-1 flex flex-col justify-between items-center">
                        {sidebarItems.map((item, idx) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <div key={idx} className="flex flex-col cursor-pointer items-center text-center text-xs">
                                    <Link
                                        to={item.path}
                                        className={`p-2 rounded ${isActive ? 'bg-sky-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        {item.icon}
                                    </Link>
                                    <span className={`text-[10px] ${isActive ? 'text-blue-700 font-semibold' : ''}`}>
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </aside>
                <div className="w-full p-4 overflow-auto">
                    <Outlet /> {/* Renders nested child routes */}
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
