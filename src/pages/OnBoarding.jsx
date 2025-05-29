import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideOne from "../components/slideOne/SlideOne";

import SlideThree from "../components/SlideThree/SlideThree";

import SlideFourth from "../components/SlideFourth/SlideFourth";
import SlideTow from "../components/SlideTwo/SlideTwo";
import axios from "axios";
import { env } from "../utilities/function";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";


const authServer = axios.create({
    baseURL: env("AUTHENTICATION_SERVER"),
    withCredentials: true,
});

// const accessToken = getCookie('accessToken');
const accessToken = localStorage.getItem("refreshToken");
authServer.defaults.withCredentials = false;
authServer.defaults.headers.Authorization = `Bearer ${accessToken}`;

const OnBoarding = ({ onStart, Onclose }) => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [display, setDisplay] = useState(false);
    const [organizationList, setOrganizationList] = useState([]);
    const navigate = useNavigate();

    const getOrganizationList = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            const response = await axios.get("http://localhost:8001/user/organizations", {
                headers: {
                    Authorization: `Bearer ${user.refreshToken}`,
                },
                withCredentials: true,
            });
            const data = response.data;
            if (data.success) {
                setOrganizationList(data.data);
                if (data.data.length > 0) {
                    navigate('/Organization');
                    setDisplay(false);
                } else {
                    setDisplay(true);
                }
            } else {
                setDisplay(true);
            }
        } catch (err) {
            console.error("Error fetching user:", err.response?.data || err.message);
            setDisplay(true);
        }
    };

    const getUserList = async () => {
        try {
            const response = await axios.get("http://localhost:9000/admin/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                },
                withCredentials: true, // Optional, if backend uses cookies
            });
            setOrganizationList(response.data.organizations)
        } catch (err) {
            console.error("Error fetching user:", err.response?.data || err.message);
        }
    };

    const paginate = (dir) => {
        setDirection(dir);
        setCurrent((prev) => (prev + dir + 4) % 4);
    };

    useEffect(() => {
        getOrganizationList();
        getUserList();
    }, [])

    const slides = [
        <SlideOne
            length={organizationList?.length || 0}
            current={current}
            goLeft={() => paginate(-1)}
            goRight={() => paginate(1)}
            OnGetStarted={onStart}
        />,
        <SlideTow
            length={organizationList?.length || 0}
            current={current}
            goLeft={() => paginate(-1)}
            goRight={() => paginate(1)}
            OnGetStarted={onStart}
        />,
        <SlideThree
            length={organizationList?.length || 0}
            current={current}
            goLeft={() => paginate(-1)}
            goRight={() => paginate(1)}
            OnGetStarted={onStart}
        />,
        <SlideFourth
            length={organizationList?.length || 0}
            current={current}
            goLeft={() => paginate(-1)}
            goRight={() => paginate(1)}
            OnGetStarted={onStart}
        />,
    ];

    return (
        <div className="relative overflow-hidden">
            {display ? (

                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 500, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                    >
                        {slides[current]}
                    </motion.div>
                </AnimatePresence>
            ) : (
                <Loading message='Loading' />
            )}
        </div>
    );
};

const variants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

export default OnBoarding;
