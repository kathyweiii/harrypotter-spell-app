import React, { useState, useEffect } from "react";
import { MdCategory, MdDescription } from "react-icons/md";
import { BsVolumeUpFill } from "react-icons/bs";
import { VscSourceControl } from "react-icons/vsc";
import { BiMessageDetail } from "react-icons/bi";
import ReactAudioPlayer from "react-audio-player";
import useSound from "use-sound";
import { Button } from "semantic-ui-react";
// import * as soundMaterial from "../utils/sound";
import WingardiumLeviosa from "../utils/sound/Wingardium Leviosa.mp3";

function Card({
  title,
  type,
  description,
  seen,
  pronunciation,
  etymology,
  note,
  sound,
}) {
  const ifSection = (category) => {
    switch (category) {
      case "pronunciation":
        let divPro = (
          <div className="card-pronunciation">
            <div className="icon">
              <BsVolumeUpFill />
            </div>
            <div className="card-pronunciation-text">{pronunciation}</div>
          </div>
        );

        return pronunciation !== undefined ? divPro : null;

      case "description":
        let divDes = (
          <div className="card-desciption">
            <div className="icon">
              <MdDescription />
            </div>
            <div className="card-subtitle">Description</div>
            <div className="card-description-text">{description}</div>
          </div>
        );

        return description !== undefined ? divDes : null;

      case "etymology":
        let divEty = (
          <div className="card-etymology">
            <div className="icon">
              <VscSourceControl />
            </div>
            <div className="card-subtitle">Etymology</div>
            <div className="card-etymology-text">{etymology}</div>
          </div>
        );

        return etymology !== undefined ? divEty : null;

      case "note":
        let divNote = (
          <div className="card-note">
            <div className="icon">
              <BiMessageDetail />
            </div>
            <div className="card-subtitle">Note</div>
            <div className="card-note-text">{note}</div>
          </div>
        );
        return note !== undefined ? divNote : null;

      case "sound":
        const BoopButton = () => {
          let path = require("../" + sound);
          const [play] = useSound(path);
          return (
            <button class="ui circular icon button" onClick={play}>
              {/* <button onClick={play}> */}
              <BsVolumeUpFill />
            </button>
          );
        };

        return sound !== undefined ? BoopButton() : null;
    }

    // const useAudio = (url) => {
    //   const [audio] = useState(new Audio(url));
    //   const [playing, setPlaying] = useState(false);

    //   const toggle = () => setPlaying(!playing);

    //   useEffect(() => {
    //     playing ? audio.play() : audio.pause();
    //   }, [playing]);

    //   useEffect(() => {
    //     audio.addEventListener("ended", () => setPlaying(false));
    //     return () => {
    //       audio.removeEventListener("ended", () => setPlaying(false));
    //     };
    //   }, []);

    //   return [playing, toggle];
    // };
    // const Player = ({ url }) => {
    //   const [playing, toggle] = useAudio(url);

    //   return (
    //     <div>
    //       <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    //     </div>
    //   );
  };

  return (
    <div className="card-body">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {ifSection("sound")}
        <div className="card-type">
          <div className="icon">
            <MdCategory />
          </div>
          <div className="card-type-text">{type}</div>
        </div>
      </div>
      {ifSection("pronunciation")}
      {ifSection("description")}
      {ifSection("etymology")}
      {ifSection("note")}
    </div>
  );
}

export default Card;
