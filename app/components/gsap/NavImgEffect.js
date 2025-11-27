"use client"
import React, { useRef } from "react";

const NavImgEffect = ({ children }) => {
  const navref = useRef(null);
  return React.cloneElement(children,{navref});
};

export default NavImgEffect;
