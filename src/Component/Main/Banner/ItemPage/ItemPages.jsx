import { Link } from "react-router";
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
    resolutionPagesFunc();

    window.addEventListener(
      "resize",
      () => {
        resolutionPagesFunc();
      },
      true
    );
  }, []);
  useEffect(() => {
    if (statusBack) {
      containerPagesRef.current.style.transition = "";
      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.smallPage.width *
          (previewState === 1 ? previewState + 1 : previewState - 1) -
        (containerPagesRef.current.offsetWidth -
          resolutionPages.selectPage.width) /
          2
      }px)`;
      setTimeout(() => {
        containerPagesRef.current.style.transition = "all 0.2s ease";
        containerPagesRef.current.style.transform = `translateX(-${
          resolutionPages.smallPage.width * previewState -
          (containerPagesRef.current.offsetWidth -
            resolutionPages.selectPage.width) /
            2
        }px)`;
      }, 100);
    } else {
      containerPagesRef.current.style.transition = "all 0.2s ease";
      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.smallPage.width * previewState -
        (containerPagesRef.current.offsetWidth -
          resolutionPages.selectPage.width) /
          2
      }px)`;
    }
  }, [statePage, previewState, statusBack, resolutionPages]);
  useEffect(() => {
    for (const key in containerPagesRef.current.children) {
      if (containerPagesRef.current.children[key].className === "item_page") {
        containerPagesRef.current.children[
          key
        ].style.height = `${resolutionPages.smallPage.height}px`;
      }
    }
  }, [statePage]);

  function onChangeMovePage(move) {
    onMovePage(move);
  }
  function onMouseEnterPage(event, index) {
    if (event.type === "mouseenter") {
      if (event.target.className === "item_page") {
        event.target.style.height = `${resolutionPages.selectPage.height}px`;
      } else if (event.target.parentElement.className === "item_page") {
        event.target.parentElement.style.height = `${resolutionPages.selectPage.height}px`;
      }

      if (index - previewState > 0) {
        containerPagesRef.current.style.transform = `translateX(-${
          resolutionPages.smallPage.width * previewState +
          50 -
          (containerPagesRef.current.offsetWidth -
            resolutionPages.selectPage.width) /
            2
        }px)`;
      } else {
        containerPagesRef.current.style.transform = `translateX(-${
          resolutionPages.smallPage.width * previewState -
          50 -
          (containerPagesRef.current.offsetWidth -
            resolutionPages.selectPage.width) /
            2
        }px)`;
      }
    } else if (event.type === "mouseleave") {
      if (event.target.className === "item_page") {
        event.target.style.height = `${resolutionPages.smallPage.height}px`;
      } else if (event.target.parentElement.className === "item_page") {
        event.target.parentElement.style.height = `${resolutionPages.smallPage.height}px`;
      }

      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.smallPage.width * previewState -
        (containerPagesRef.current.offsetWidth -
          resolutionPages.selectPage.width) /
          2
      }px)`;
    }
  }
  function resolutionPagesFunc() {
    let selectPageStyle = [...containerPagesRef.current.children].find(
      (item) => item.className === "select_item_page"
    );
    let smallPageStyle = [...containerPagesRef.current.children].find(
      (item) => item.className === "item_page"
    );
    if (!resolutionPages.selectPage.width) {
      containerPagesRef.current.style.transform = `translateX(-${
        smallPageStyle.offsetWidth * previewState -
        (containerPagesRef.current.offsetWidth - selectPageStyle.offsetWidth) /
          2
      }px)`;
    }
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
  return (
    <div ref={containerPagesRef} className="container_pages">
      {dataPages.map((item, index) => {
        return (
          <div
            key={index}
            style={
              resolutionPages.selectPage.width
                ? previewState === index
                  ? { animation: "select_page_item 0.2s ease forwards" }
                  : { animation: "small_page_item 0.2s ease forwards" }
                : previewState === index
                ? { animation: "select_page_item 0s ease forwards" }
                : { animation: "small_page_item 0s ease forwards" }
            }
            onClick={
              index !== previewState
                ? previewState > index
                  ? () => onChangeMovePage(-1)
                  : () => onChangeMovePage(1)
                : () => {}
            }
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
          >
            <div
              style={{ backgroundImage: `url(${item.img})` }}
              className="page"
            >
              <div className="container_content_page">
                <div className="container_text">
                  <h5>{item.text}</h5>
                  <Link to={item.path}>
                    <h6>Подробнее</h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemPages;
