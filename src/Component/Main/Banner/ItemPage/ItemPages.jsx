import "./ItemPages.css";
import { useEffect, useRef, useState } from "react";

const ItemPages = ({
  onMovePage,
  dataPages,
  statePage,
  previewState,
  statusBack,
}) => {
  const [resolutionPages, setResolutionPages] = useState({
    selectPage: {
      width: 0,
      height: 0,
    },
    smallPage: {
      width: 0,
      height: 0,
    },
  });
  const containerPagesRef = useRef(null);

  useEffect(() => {
    function resolutionPagesFunc() {
      let selectPageStyle = [...containerPagesRef.current.children].filter(
        (item) => item.className === "select_item_page"
      )[0];
      let smallPageStyle = [...containerPagesRef.current.children].filter(
        (item) => item.className === "item_page"
      )[0];
      setResolutionPages(() => {
        return {
          selectPage: {
            width: selectPageStyle.offsetWidth,
            height: selectPageStyle.offsetHeight,
          },
          smallPage: {
            width: smallPageStyle.offsetWidth,
            height: smallPageStyle.offsetHeight,
          },
        };
      });
    }
    setTimeout(() => {
      resolutionPagesFunc();
    }, 210);

    window.onresize = () => resolutionPagesFunc();
  }, []);

  useEffect(() => {
    if (statusBack) {
      containerPagesRef.current.style.transition = "";
      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.selectPage.width *
        (previewState === 1 ? previewState + 1 : previewState - 1)
      }px)`;
      setTimeout(() => {
        containerPagesRef.current.style.transition = "all 0.2s ease";
        containerPagesRef.current.style.transform = `translateX(-${
          resolutionPages.selectPage.width * previewState
        }px)`;
      }, 80);
    } else {
      containerPagesRef.current.style.transition = "all 0.2s ease";
      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.selectPage.width * previewState
      }px)`;
    }
  });
  useEffect(() => {
    for (const key in containerPagesRef.current.children) {
      if (containerPagesRef.current.children[key].className === "item_page") {
        containerPagesRef.current.children[
          key
        ].style.height = `${resolutionPages.smallPage.height}px`;
      }
    }
  }, [statePage]);

  function onMouseEnterPage(event, index) {
    if (event.type === "mouseenter") {
      event.target.style.height = `${resolutionPages.selectPage.height}px`;
      if (index - previewState > 0) {
        containerPagesRef.current.style.transform = `translateX(-${
          resolutionPages.selectPage.width * previewState + 50
        }px)`;
      } else {
        containerPagesRef.current.style.transform = `translateX(-${
          resolutionPages.selectPage.width * previewState - 50
        }px)`;
      }
    } else if (event.type === "mouseleave") {
      event.target.style.height = `${resolutionPages.smallPage.height}px`;
      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.selectPage.width * previewState
      }px)`;
    }
  }
  return (
    <div ref={containerPagesRef} className="container_pages">
      {dataPages.map((item, index) => {
        return (
          <div
            onClick={
              index !== previewState
                ? previewState > index
                  ? () => onMovePage(-1)
                  : () => onMovePage(1)
                : () => {}
            }
            key={item.id}
            style={{ backgroundColor: item.img }}
            className={
              previewState === index ? "select_item_page" : "item_page"
            }
            onMouseEnter={
              previewState === index
                ? () => {}
                : (e) => onMouseEnterPage(e, index)
            }
            onMouseLeave={
              previewState === index
                ? () => {}
                : (e) => onMouseEnterPage(e, index)
            }
          ></div>
        );
      })}
    </div>
  );
};

export default ItemPages;
