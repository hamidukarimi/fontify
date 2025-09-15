import React from 'react'
import { motion } from "framer-motion";

import blue from "../assets/images/blue.png";
import orange from "../assets/images/orange.png";
import yellow from "../assets/images/yellow.png";
import purple from "../assets/images/purple.png";
import white from "../assets/images/white.png";
import green from "../assets/images/green.png";
const BulletsAnimation = () => {
  return (
    <div>
      <motion.img
        initial={{ translateY: 0 }}
        animate={{ translateY: 500, transition: { duration: 10, delay: 2 } }}
        className="absolute left-[2%] top-[5%]"
        src={blue}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[25%] bottom-[5%]"
        src={yellow}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[5%] top-[25%]"
        src={orange}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute right-[20%] top-[5%]"
        src={yellow}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute right-[5%] top-[25%]"
        src={orange}
        alt=""
      />
      <motion.img
        initial={{ translateY: 0 }}
        animate={{ translateY: 500, transition: { duration: 10, delay: 10 } }}
        className="absolute right-[15%] top-[5%]"
        src={white}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[10%] top-[10%]"
        src={purple}
        alt=""
      />
      <motion.img
        initial={{ translateY: 0 }}
        animate={{ translateY: 500, transition: { duration: 10, delay: 20 } }}
        className="absolute right-[3%] top-[5%]"
        src={green}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute right-[10%] top-[10%]"
        src={yellow}
        alt=""
      />
      <motion.img
        initial={{ translateY: 0 }}
        animate={{ translateY: 500, transition: { duration: 10, delay: 30 } }}
        className="absolute left-[7%] top-[15%]"
        src={green}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[15%] top-[15%]"
        src={white}
        alt=""
      />
      <motion.img
        initial={{ translateY: 0 }}
        animate={{ translateY: 500, transition: { duration: 10, delay: 40 } }}
        className="absolute left-[45%] top-[5%]"
        src={yellow}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[55%] top-[15%]"
        src={white}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[40%] top-[5%]"
        src={blue}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[70%] top-[5%]"
        src={purple}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[50%] top-[50%]"
        src={orange}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[70%] top-[90%]"
        src={blue}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[50%] top-[30%]"
        src={purple}
        alt=""
      />
      <motion.img
        initial={{ translateY: 0 }}
        animate={{ translateY: 500, transition: { duration: 10, delay: 50 } }}
        className="absolute right-[20%] top-[10%]"
        src={purple}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute right-[30%] top-[30%]"
        src={yellow}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[10%] bottom-[10%]"
        src={orange}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute left-[10%] bottom-[10%]"
        src={purple}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute right-[5%] bottom-[5%]"
        src={yellow}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        className="absolute right-[10%] bottom-[10%]"
        src={blue}
        alt=""
      />
    </div>
  );
};

export default BulletsAnimation;