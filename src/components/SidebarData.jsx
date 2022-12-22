import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Spell List",
    path: "/",
    icon: <AiIcons.AiOutlineUnorderedList />,
    cName: "nav-text",
  },
  {
    title: "Search Engine",
    path: "/searchEngine",
    icon: <AiIcons.AiOutlineSearch />,
    cName: "nav-text",
  },
  // {
  //   title: "Team",
  //   path: "/team",
  //   icon: <AiIcons.AiOutlineTeam />,
  //   cName: "nav-text",
  // },
];
