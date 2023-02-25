import { useState } from "react";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { Router } from "../routing";

export const NavigationListExpandable = observer(({ node }: any) => {
  const [showInfo, setShowInfo] = useState(true);
  const router = useInjection(Router);
  return (
    <>
      <div
        className="navigation-item"
        style={{ backgroundColor: "#2e91fc" }}
        onClick={() => {
          setShowInfo(!showInfo);
        }}
      >
        {(showInfo && "[-]") || "[+]"}
        {node.model.text}
      </div>
      {node.children.map((node: any, i: number) => (
        <div
          className="navigation-item"
          style={{
            display: showInfo ? "block" : "none",
            backgroundColor: "#E4257D",
          }}
          key={i}
          onClick={() => {
            router.goToId(node.model.id);
          }}
        >
          {node.model.text}
        </div>
      ))}
    </>
  );
});
