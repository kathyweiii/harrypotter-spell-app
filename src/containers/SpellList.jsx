import React, { useState } from "react";
import Content from "../components/Content";
// import img from "../utils/img_cover.jpg";
// import data from "../utils/data";

export default function SpellList(spellList) {
  const listStart = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
  ];

  const [list, setList] = useState(spellList.spellList);
  // console.log("list: ", list);
  const handleListStart = (startWord) => {
    const tempList = [...spellList.spellList];
    const filterList = tempList.filter(
      (i) => i.Name.startsWith(startWord) || i.Name.startsWith("(" + startWord)
    );
    // console.log(filterList);
    setList(filterList);
  };
  return (
    <div className="spellList">
      <div className="cover-img"></div>
      <div className="button-list">
        {listStart.map((v) => (
          <button
            className="btn-start"
            key={v}
            onClick={() => handleListStart(v)}
          >
            {v}
          </button>
        ))}
      </div>
      <Content list={list}></Content>
    </div>
  );
}
