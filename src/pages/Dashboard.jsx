import React, { useState } from 'react'
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineCampaign, MdPermIdentity } from 'react-icons/md';
import { GoPeople } from "react-icons/go";
import { FaRegCircleCheck } from "react-icons/fa6";
import { SlCloudUpload } from "react-icons/sl";
import { IoMdInformationCircleOutline } from "react-icons/io";



function Dashboard() {
    return (
        <div>
            <div className="rounded-lg bg-gradient-to-r from-[#1b3c8c] to-[#972bc4] p-4 flex items-center space-x-4 text-white">
                <div className="text-5xl bg-[#104e9c] rounded-full px-1 py-3">🎉</div>
                <div>
                    <h2 className="text-white font-semibold text-2xl">
                        Hello, BCG Technologies! We’re pleased to have you with us 🙌
                    </h2>
                    <p className="text-sm text-gray-200">
                        Complete the checklist below to maximize your Clikkle Campaign experience.
                    </p>
                </div>
            </div>
            <div className="rounded-lg py-[0.7rem] flex items-center ">
                <Stepper />
            </div>
        </div>
    )
}

export default Dashboard


// import {CheckCircle, Circle, User, Settings, Users} from 'lucide-react';

const steps = [
    { id: 1, label: 'Add Contacts', icon: <RiContactsBook3Line size={20} />, status: 'completed' },
    { id: 2, label: 'Create a Campaign', icon: <MdOutlineCampaign size={20} />, status: 'in-progress' },
    { id: 3, label: 'Automate your Workflow', icon: <MdPermIdentity size={20} />, status: 'pending' },
    { id: 4, label: 'Invite your Team', icon: <GoPeople size={20} />, status: 'pending' },
];

const Stepper = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const getStatusClass = (stepId) => {
        if (stepId < currentStep) return 'bg-green-200 text-green-500';
        if (stepId === currentStep) return 'bg-blue-100 text-blue-600';
        return 'bg-gray-100 text-gray-400';
    };

    const renderContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className='relative'>
                        {/* Heading */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Add Contacts</h2>
                            <p className="text-gray-500 mt-1">
                                Import your existing contacts from Clikkle Apps or upload them from your contact list.
                            </p>
                        </div>

                        {/* App Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="border rounded-md p-4 flex items-center justify-evenly text-center hover:shadow-sm transition">
                                <img src="/images/ClikkleFavicons/Clikkle Ads favicon.png" alt="Clikkle HR" className="w-8 h-8 mb-2" />
                                <p className="text-gray-800 font-medium">Clikkle HR</p>
                            </div>
                            <div className="border rounded-md p-4 flex items-center justify-evenly text-center hover:shadow-sm transition">
                                <img src="/images/ClikkleFavicons/Clikkle Mail-01.png" alt="Clikkle CRM" className="w-8 h-8 mb-2" />
                                <p className="text-gray-800 font-medium">Clikkle CRM</p>
                            </div>
                            <div className="border rounded-md p-4 flex items-center justify-evenly text-center hover:shadow-sm transition">
                                <img src="/images/ClikkleFavicons/Clikkle E-sign-favicon.png" alt="Clikkle E-sign" className="w-8 h-8 mb-2" />
                                <p className="text-gray-800 font-medium">Clikkle E-sign</p>
                            </div>
                            <div className="border rounded-md p-4 flex items-center justify-evenly text-center hover:shadow-sm transition">
                                <img src="/images/ClikkleFavicons/Clikkle Host-favicon.png" alt="Clikkle Host" className="w-8 h-8 mb-2" />
                                <p className="text-gray-800 font-medium">Clikkle Host</p>
                            </div>
                            <div className="border rounded-md p-4 flex items-center justify-evenly text-center hover:shadow-sm transition">
                                <img src="/images/ClikkleFavicons/Clikkle Launch favicon.png" alt="Clikkle Launch" className="w-8 h-8 mb-2" />
                                <p className="text-gray-800 font-medium">Clikkle Launch</p>
                            </div>
                            <div className="border rounded-md p-4 flex items-center justify-evenly text-center hover:shadow-sm transition">
                                <img src="/images/ClikkleFavicons/Clikkle Pitch-favicon.png" alt="Clikkle Pitch" className="w-8 h-8 mb-2" />
                                <p className="text-gray-800 font-medium">Clikkle Pitch</p>
                            </div>
                        </div>

                        {/* OR Divider */}
                        <div className="flex items-center my-5">
                            <hr className="flex-grow border-gray-200" />
                            <span className="mx-4 text-sm text-gray-400">OR</span>
                            <hr className="flex-grow border-gray-200" />
                        </div>

                        {/* Upload Box */}
                        <div className="border-2 border-dashed border-blue-300 rounded-md p-2 text-center bg-blue-50">
                            <div className="flex justify-center align-middle gap-5 mb-2">
                                <SlCloudUpload size={50} color='blue' />
                                <div className="">
                                    <p className="text-start font-semibold mb-1">Import Contacts</p>
                                    <p className="text-sm text-gray-500">
                                        Supported file formats include CSV, XLS, and XLSX, with a maximum file size of 25MB.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className=" bottom-4 right-4 flex gap-3">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                Previous
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                Next
                            </button>
                        </div> */}
                    </div>
                );
            case 2:
                return (
                    <div>
                        {/* Heading */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Create a campaign</h2>
                            <p className="text-gray-500 mt-1">
                                Craft and deliver impactful email and SMS campaigns to enhance audience engagement.
                            </p>
                        </div>

                        {/* Email Campaign Card */}
                        <div className="flex items-start border rounded-lg p-4 mb-4 shadow-sm hover:shadow transition">
                            <img src="/images/walkover/pana.png" alt="Email" className="w-28 h-auto mr-6" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                                <p className="text-gray-600 mb-4">
                                    Create personalized campaigns with merge tags and design innovative layouts using our drag-and-drop template editor.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <button className="text-sm text-blue-600 hover:underline font-medium">
                                        Learn more
                                    </button>
                                    <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SMS Campaign Card */}
                        <div className="flex items-start border rounded-lg p-4 shadow-sm hover:shadow transition">
                            <img src="/images/screen1.png" alt="SMS" className="w-28 h-auto mr-6" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">SMS</h3>
                                <p className="text-gray-600 mb-4">
                                    Enhance audience engagement and grow your business with SMS campaigns.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <button className="text-sm text-blue-600 hover:underline font-medium">
                                        Learn more
                                    </button>
                                    <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        {/* Section Heading */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Automate your workflow</h2>
                            <p className="text-gray-500 mt-1">
                                Schedule activities and tasks to keep your contacts engaged even when you’re away.
                            </p>
                        </div>

                        {/* Card: Pre-built templates */}
                        <div className="flex items-start border rounded-lg p-4 mb-6 shadow-sm hover:shadow transition">
                            <img src="/images/login-img01.png" alt="Pre-built templates" className="w-24 h-auto mr-6" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Pre-built templates</h3>
                                <p className="text-gray-600 mb-4">
                                    Choose from our pre-built templates to design a workflow tailored to any business need.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <button className="text-sm text-blue-600 hover:underline font-medium">
                                        Learn more
                                    </button>
                                    <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card: Start from scratch */}
                        <div className="flex items-start border rounded-lg p-4 shadow-sm hover:shadow transition">
                            <img src="/images/amico.png" alt="Start from scratch" className="w-24 h-auto mr-6" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Start from scratch</h3>
                                <p className="text-gray-600 mb-4">
                                    Build your workflow from scratch and set multiple business goals.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <IoMdInformationCircleOutline color='blue' />
                                    <button className="text-sm text-blue-600 hover:underline font-medium">
                                        Learn more
                                    </button>
                                </div>
                                <button className="bg-blue-600 text-white w-40 text-sm font-medium px-4 py-1.5 mt-2 rounded hover:bg-blue-700 transition">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        {/* Section Title */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Invite your team</h2>
                            <p className="text-gray-500 mt-1">
                                Invite your team members to get started with Clikkle Campaigns.
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your teammate’s email address"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your teammate’s name"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Role Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Role</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option disabled selected>Select a role for your teammate</option>
                                    <option>Admin</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end items-center space-x-6 mt-6">
                            <button className="text-sm font-medium text-blue-600 hover:underline">
                                Mark as complete
                            </button>
                            <button className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-blue-700 transition">
                                Invite
                            </button>
                        </div>
                    </div>
                );
            default:
                return <p className="text-gray-500">This section is under construction.</p>;
        }
    };

    return (
        <div className="flex w-full h-[65vh] gap-3">
            <div className=" border overflow-y-auto border-solid  shadow-sm rounded-md px-10 py-5 ">
                {/* Stepper */}
                <h2 className='mb-4 font-bold'>Get started with clickkle Campaigns</h2>
                <ol className="relative text-gray-500 py-5 dark:border-gray-700 dark:text-gray-400">
                    {steps.map((step, index) => (
                        <div className="">
                            <li className={`relative  pl-6 ${index !== steps.length - 1 ? 'border-s-2' : ''}`}
                                key={step.id} onClick={() => setCurrentStep(step.id)}>
                                <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${getStatusClass(step.id)}`}>
                                    {step.id < currentStep ? (
                                        <FaRegCircleCheck className="w-4 h-4 text-green-500" />
                                    ) : (step.icon)}
                                </span>
                                <p>Step {index + 1}</p>
                                <h3 className="font-medium leading-tight">{step.label}</h3>
                                <p className="text-sm">
                                    {step.id < currentStep
                                        ? 'Completed' : step.id === currentStep ? 'In-Progress' : 'Pending'}
                                </p>
                            </li>
                            <li className={`text-white ${index !== steps.length - 1 ? 'border-s-2' : ''}`}>.</li>
                        </div>
                    ))}
                </ol>
            </div>
            {/* Content Area */}
            <div className="flex-1 border overflow-y-auto rounded-md shadow-sm p-6 bg-gray-50">
                {renderContent()}
            </div>
        </div>
    );
};

