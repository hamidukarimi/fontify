import React from "react";
import { FaBars,  } from "react-icons/fa"; // FontAwesome icon
import { MdAlarm } from "react-icons/md"; // Material Design icon
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Header = () => {
  const [menusOpen, setMenusOpen] = useState(false);
  const toggleMenusOpen = () => setMenusOpen((prev) => !prev);


  return (
    <div className=" bg-transparent text-white flex items-center justify-between px-4 py-3 text-xl">
      <img src="./fontify.svg" alt="" />


       <ul className="hidden md:flex gap-4 text-xl">
        <a href="#">
          <li className="hover:text-[#5252F6] transition">Home</li>
        </a>
        <a href="#services">
          <li className="hover:text-[#5252F6] transition">Guidnes</li>
        </a>
        <a href="#skills">
          <li className="hover:text-[#5252F6] transition">Contact us</li>
        </a>
        <a href="#projects">
          <li className="hover:text-[#5252F6] transition">Register</li>
        </a>
      </ul>


      

      <FaBars onClick={toggleMenusOpen} />



      <AnimatePresence>
        {menusOpen && (
          <motion.div
            className="absolute top-16 right-0 rounded-lg p-5 text-xl font-bold flex flex-col gap-3 w-[220px] bg-[rgba(49,_53,_59,_0.85)]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeUp}
          >
            <Link to="/">
             <motion.p
                className="hover:text-[#5252F6] transition"
                variants={fadeUp}
              >
                Home
              </motion.p>
            </Link>
             <Link to="/">
             <motion.p
                className="hover:text-[#5252F6] transition"
                variants={fadeUp}
              >
                Guidnes
              </motion.p>
            </Link>
            <Link to="/contact">
             <motion.p
                className="hover:text-[#5252F6] transition"
                variants={fadeUp}
              >
                Contact us
              </motion.p>
            </Link>
            <Link to="/">
             <motion.p
                className="hover:text-[#5252F6] transition"
                variants={fadeUp}
              >
                Register
              </motion.p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
