import { IoSettingsOutline, IoSearchOutline } from "react-icons/io5";
import { BsGrid3X3GapFill, BsCameraVideo, BsChatText } from "react-icons/bs";
import { TbBellRinging2 } from "react-icons/tb";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loading from "../components/Loading";
import { env } from "../utilities/function";
import { clearCookie } from "../utilities/cookies";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";


function Navbar() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState("system");

    const [isOpen, setIsOpen] = useState(false);

    const getButtonStyles = (option) => {
        const base =
            "flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none";
        const unselected = "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";

        const selectedStyles = {
            light: "bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900",
            dark: "bg-gray-800 text-white dark:bg-gray-700 dark:text-white",
            system: "bg-blue-100 text-blue-800 dark:bg-blue-300 dark:text-blue-900",
        };

        return theme === option ? `${base} ${selectedStyles[option]}` : `${base} ${unselected}`;
    };

    const SignOut = () => {
        clearCookie("accessToken");
        localStorage.removeItem("subscriptionId");
        localStorage.removeItem("org");
        localStorage.removeItem("user");

        const redirectTo =
            env("AUTHENTICATION_CLIENT") +
            "/logout?redirectto=" +
            encodeURIComponent(env("DOMAIN")) +
            "&&referrer=" +
            encodeURIComponent(env("DOMAIN"));

        // Redirect using window.location to go outside React routing
        window.location.href = redirectTo;
    };
    return (
        <div>
            <nav className="w-full bg-white border border-b-2 p-2 flex justify-between items-center">
                <img src="/images/logo.png" width={'50px'} onClick={() => navigate('/Dashboard')}
                    alt="Logo" className="cursor-pointer" />
                <div className="w-1/3 flex items-center justify-between">
                    <div className="flex cursor-pointer items-center bg-sky-100 text-blue-600 py-1 text-sm font-medium" style={{ borderRadius: '10px 5px 5px 10px' }}>
                        <div className="bg-sky-100 text-blue-600 ring-2 ring-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-1">
                            14
                        </div>
                        <span className='px-2'>days left</span>
                    </div>
                    <div onClick={() => navigate('/CreateOrganization')} className="p-1 cursor-pointer bg-sky-100 rounded">
                        <GoPlus color="blue" size={30} />
                    </div>
                    <IoSearchOutline size={30} className="cursor-pointer" />
                    <TbBellRinging2 size={30} className="cursor-pointer" />
                    <BsChatText size={25} className="cursor-pointer" />
                    <BsCameraVideo size={25} className="cursor-pointer" />
                    <BsGrid3X3GapFill size={25} className="cursor-pointer" />
                    <IoSettingsOutline size={25} className="cursor-pointer" />
                    <img src="/images/boticon.png" width={'50px'} onClick={() => setIsOpen(true)}
                        alt="analytics" className="rounded-full cursor-pointer" />
                </div>
            </nav>

            <div className="relative">
                {/* Overlay */}
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    />
                )}

                {/* Drawer */}
                <div id="drawer-example"
                    class={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-80 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    tabindex="-1" aria-labelledby="drawer-label">

                    {/* <!-- Close button --> */}
                    <button onClick={() => setIsOpen(false)} type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 start-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <IoMdClose size={20} />
                    </button>

                    {/* <!-- Profile --> */}
                    <div class="flex flex-col items-center">
                        <img class="w-22" src="/images/boticon.png" alt="Profile" />
                        <p class="mt-3 font-bold text-lg text-gray-900 dark:text-white">John Doe</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                    </div>

                    {/* <!-- Info Card --> */}
                    <div class="bg-sky-100 text-sky-800 p-4 mt-6 rounded-lg">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12.75a.75.75 0 00-1.5 0V10a.75.75 0 00.336.63l3 2a.75.75 0 10.828-1.26l-2.664-1.776V5.25z" />
                            </svg>
                            <span>You’ve used 80% of your free plan</span>
                        </div>
                        <div class="mt-4 flex justify-between items-center">
                            <div>
                                <p class="text-sm font-medium">Current Plan</p>
                                <p class="text-xs text-gray-600 dark:text-gray-300">Free Plan</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-blue-600 font-medium">Try other plans</p>
                                <button
                                    class="mt-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-xs focus:ring-2 focus:ring-blue-300">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Profile block --> */}
                    <div class="mt-6 space-y-4">
                        <div class="flex justify-between items-center px-2">
                            <div class="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 12a5 5 0 100-10 5 5 0 000 10zm0 1c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
                                </svg>
                                <span>My Profile</span>
                            </div>
                        </div>

                        <hr class="border-gray-300 dark:border-gray-600" />

                        <div class="flex items-center gap-2 px-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-600">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M8 9a3 3 0 016 0v1h2a1 1 0 110 2h-2v1a3 3 0 01-6 0v-1H4a1 1 0 110-2h4V9z" />
                            </svg>
                            <span>Add another account</span>
                        </div>
                    </div>

                    {/* <!-- Theme Toggle --> */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Theme
                        </label>
                        <div className="flex items-center gap-1">
                            <button onClick={() => setTheme("light")} className={getButtonStyles("light")}>
                                <FiSun className="w-5 h-5" />
                                Light
                            </button>
                            <button onClick={() => setTheme("dark")} className={getButtonStyles("dark")}>
                                <FiMoon className="w-5 h-5" />
                                Dark
                            </button>
                            <button onClick={() => setTheme("system")} className={getButtonStyles("system")}>
                                <FiMonitor className="w-5 h-5" />
                                System
                            </button>
                        </div>
                    </div>

                    {/* <!-- Color Options --> */}
                    <div class="mt-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Theme</label>
                        <div class="flex gap-2">
                            <div class="w-6 h-6 bg-blue-500 rounded-full cursor-pointer"></div>
                            <div class="w-6 h-6 bg-pink-500 rounded-full cursor-pointer"></div>
                            <div class="w-6 h-6 bg-green-500 rounded-full cursor-pointer"></div>
                            <div class="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>

                    {/* <!-- Need Help and Sign Out --> */}
                    <div class="mt-6 space-y-4">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Need help? Visit our support center.</p>
                        <div class="flex justify-between items-center text-sm text-red-600 cursor-pointer hover:text-red-700">
                            <div onClick={SignOut} className="flex items-center gap-2">
                                <GoSignOut size={20} color="red" />
                                <span>Sign out</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar