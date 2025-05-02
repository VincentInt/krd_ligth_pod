import "./Banner.css";
import { useEffect, useState } from "react";
import ItemPages from "./ItemPage/ItemPages";
import StatePage from "./StatePage/StatePage";
import pages from "./data/dataPages";

const Banner = () => {
  const [dataPages, setDataPages] = useState([...pages]);

  const [statePage, setStatePage] = useState(0);
  const [previewState, setPreviewState] = useState(1);
  const [statusBack, setStatusBack] = useState(false);

  useEffect(() => {
    onEditDataPages();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      onMovePage(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [statePage]);

  function onMovePage(move) {
    setStatePage((prev) => {
      const clone = prev + move;
      if (clone < 0) return dataPages.length - 1;
      else if (clone === dataPages.length) return 0;
      return clone;
    });
    onEditDataPages(move);
  }
  function onEditDataPages(move = 0) {
    const nextMove = move + previewState;

    if (nextMove === 0) {
      setDataPages((prev) => [
        prev[prev.length - 1],
        ...prev.slice(0, prev.length - 1),
      ]);
      setStatusBack(true);
      setPreviewState(1);
    } else if (nextMove === dataPages.length - 1) {
      setDataPages((prev) => {
        return [...prev.slice(1, prev.length), prev[0]];
      });
      setStatusBack(true);
      setPreviewState(nextMove - 1);
    } else {
      setStatusBack(false);
      setPreviewState(nextMove);
    }
  }
  return (
    <section className="section_banner">
      <div>
        <div className="container_window_banner">
          <div className="box_shadow"></div>
          <div className="window_banner">
            <ItemPages
              onMovePage={onMovePage}
              dataPages={dataPages}
              statePage={statePage}
              previewState={previewState}
              statusBack={statusBack}
            />
          </div>
        </div>
        <div className="container_state_page">
          <StatePage dataPages={dataPages} statePage={statePage} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
