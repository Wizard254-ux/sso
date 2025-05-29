import { HiOutlineCursorClick } from 'react-icons/hi';
import { LuMailOpen, LuMails } from 'react-icons/lu';
import { MdAdsClick, MdOutlineTouchApp } from 'react-icons/md';
import { PiTelegramLogo } from 'react-icons/pi';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, ResponsiveContainer, Cell
} from 'recharts';

const stats = [
    { icon: <PiTelegramLogo size={18} />, value: "235,690", label: "Emails Sent" },
    { icon: <LuMailOpen size={18} />, value: "19.89%", label: "Open Rate" },
    { icon: <HiOutlineCursorClick size={18} />, value: "1.3%", label: "CTR" },
    { icon: <MdAdsClick size={18} />, value: "6.7%", label: "CTOR" },
    { icon: <LuMails size={18} />, value: "2,656", label: "Emails Opened Unique" },
    { icon: <MdOutlineTouchApp size={18} />, value: "23,456", label: "Emails Clicked Unique" },
];

function Analytics() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>
            <DashboardCharts />
        </div>
    )
}

export default Analytics

const StatCard = ({ icon, value, label }) => {
    return (
        <div className="flex items-center border rounded-xl px-6 py-3 bg-white shadow-sm w-full">
            <div className="p-3 border rounded-xl mr-4 text-blue-600">
                {icon}
            </div>
            <div>
                <div className="text-base font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
            </div>
        </div>
    );
};


const chartColors = {
    openRate: '#00CFFF',
    ctor: '#B5E3F7',
    ctr: '#006DFF',
    emailsSent: '#00CFFF',
    emailsOpened: '#B5E3F7',
    opened: '#B5E3F7',
    openedUnique: '#87F1E4',
    linksClicked: '#32E7C8',
    clickedUnique: '#0BE0A5',
};

const data1 = [
    { name: 'Jan', open: 35, ctr: 0, ctor: 0 },
    { name: 'Feb', open: 33, ctr: 2, ctor: 5 },
    { name: 'Mar', open: 32, ctr: 9, ctor: 18 },
    { name: 'Apr', open: 32, ctr: 14, ctor: 22 },
    { name: 'May', open: 30, ctr: 11, ctor: 19 },
    { name: 'Jun', open: 29, ctr: 8, ctor: 16 },
    { name: 'Jul', open: 27, ctr: 6, ctor: 12 },
    { name: 'Aug', open: 26, ctr: 3, ctor: 7 },
    { name: 'Sep', open: 26, ctr: 1, ctor: 3 },
    { name: 'Oct', open: 27, ctr: 2, ctor: 4 },
    { name: 'Nov', open: 28, ctr: 3, ctor: 6 },
    { name: 'Dec', open: 29, ctr: 5, ctor: 8 },
];

const data2 = [
    { name: 'Jan', sent: 100, opened: 100 },
    { name: 'Feb', sent: 500, opened: 300 },
    { name: 'Mar', sent: 2000, opened: 900 },
    { name: 'Apr', sent: 6000, opened: 1200 },
    { name: 'May', sent: 10000, opened: 1100 },
    { name: 'Jun', sent: 12000, opened: 950 },
    { name: 'Jul', sent: 14000, opened: 970 },
    { name: 'Aug', sent: 16000, opened: 1000 },
    { name: 'Sep', sent: 17500, opened: 1100 },
    { name: 'Oct', sent: 18500, opened: 900 },
    { name: 'Nov', sent: 19500, opened: 920 },
    { name: 'Dec', sent: 20500, opened: 980 },
];

const data3 = [
    { name: 'Emails Sent', value: 1200, color: chartColors.emailsSent },
    { name: 'Opened', value: 520, color: chartColors.opened },
    { name: 'Opened Unique', value: 340, color: chartColors.openedUnique },
    { name: 'Links Clicked', value: 240, color: chartColors.linksClicked },
    { name: 'Clicked Unique', value: 120, color: chartColors.clickedUnique },
];

const DashboardCharts = () => {
    return (
        <div className="p-6 grid h-[70vh] grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chart 1 */}
            <div className="bg-white border p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Open Rate, CTR & CTOR by Date</h2>
                <ResponsiveContainer width="90%" height="90%">
                    <LineChart data={data1}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="open" name="Open Rate" stroke={chartColors.openRate} strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="ctor" name="CTOR" stroke={chartColors.ctor} strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="ctr" name="CTR" stroke={chartColors.ctr} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Chart 2 */}
            <div className="bg-white border p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Emails Sent & Unique Opens</h2>
                <ResponsiveContainer width="90%" height="90%">
                    <LineChart data={data2}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sent" name="Emails Sent" stroke={chartColors.emailsSent} strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="opened" name="Emails Opened Unique" stroke={chartColors.emailsOpened} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Chart 3 */}
            <div className="bg-white border p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Conversion Rates</h2>
                <ResponsiveContainer width="90%" height="90%">
                    <BarChart data={data3}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name="Conversion" fill="#00CFFF">
                            {data3.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
