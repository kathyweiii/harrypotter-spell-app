import Card from "./Card";
import React from "react";

export default function Content({ list }) {
  return (
    <div className="content">
      {list?.map((v, i) => (
        <div className="card" key={i}>
          <Card
            id={i}
            title={v.Name}
            type={v.Type}
            pronunciation={v.Pronunciation}
            description={v.Description}
            etymology={v.Etymology}
            // seen={v."Seen / Mentioned"}
            note={v.Notes}
            sound={v.Sound}
          />
        </div>
      ))}
    </div>
  );
}
