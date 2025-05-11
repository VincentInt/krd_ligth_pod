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
  const [stateClick, setStateClick] = useState(false);
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
    let timer = setTimeout(() => {}, 0);
    if (statusBack) {
      const prevBannerPageElem = [...containerPagesRef.current.children][
        previewState === 1 ? 2 : dataPages.length - 3
      ];
      containerPagesRef.current.style.transition = "";
      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.smallPage.width *
          (previewState === 1 ? previewState + 1 : previewState - 1) -
        (containerPagesRef.current.offsetWidth -
          resolutionPages.selectPage.width) /
          2
      }px)`;

      prevBannerPageElem.style.transition = "all 0s ease";
      prevBannerPageElem.classList.remove("item_page");
      prevBannerPageElem.classList.add("select_item_page");

      timer = setTimeout(() => {
        containerPagesRef.current.style.transition = "all 0.5s ease";
        containerPagesRef.current.style.transform = `translateX(-${
          resolutionPages.smallPage.width * previewState -
          (containerPagesRef.current.offsetWidth -
            resolutionPages.selectPage.width) /
            2
        }px)`;
      }, 10);
      setTimeout(() => {
        prevBannerPageElem.classList.remove("select_item_page");
        prevBannerPageElem.classList.add("item_page");
        prevBannerPageElem.style.transition = "all 0.5s ease";
      }, 200);
    } else {
      containerPagesRef.current.style.transition = "all 0.5s ease";
      containerPagesRef.current.style.transform = `translateX(-${
        resolutionPages.smallPage.width * previewState -
        (containerPagesRef.current.offsetWidth -
          resolutionPages.selectPage.width) /
          2
      }px)`;
    }
    return () => clearTimeout(timer);
  }, [statePage, previewState, statusBack, resolutionPages]);

  useEffect(() => {
    setStateClick(true);
    setTimeout(() => {
      setStateClick(false);
    }, 500);
  }, [statePage]);

  function onChangeMovePage(move) {
    if (!stateClick) {
      onMovePage(move);
    }
  }
  function onMouseEnterPage(event, index) {
    const coord = +[...containerPagesRef.current.style.transform]
      .filter((item) => item === "." || !isNaN(+item))
      .join("");

    if (event.type === "mouseenter") {
      if (event.target.className === "item_page") {
        event.target.style.height = `${resolutionPages.selectPage.height}px`;
      } else if (event.target.parentElement.className === "item_page") {
        event.target.parentElement.style.height = `${resolutionPages.selectPage.height}px`;
      }
      if (index - previewState > 0) {
        containerPagesRef.current.style.transform = `translateX(-${
          coord + 50
        }px)`;
      } else {
        containerPagesRef.current.style.transform = `translateX(-${
          coord - 50
        }px)`;
      }
    } else if (event.type === "mouseleave") {
      if (!stateClick) {
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
  }
  function resolutionPagesFunc() {
    const containerPages = containerPagesRef.current;
    if (containerPages) {
      let selectPageStyle = [...containerPages.children]?.find(
        (item) => item.className === "select_item_page"
      );
      let smallPageStyle = [...containerPages.children]?.find(
        (item) => item.className === "item_page"
      );
      if (!resolutionPages.selectPage.width) {
        containerPagesRef.current.style.transform = `translateX(-${
          smallPageStyle.offsetWidth * previewState -
          (containerPagesRef.current.offsetWidth -
            selectPageStyle.offsetWidth) /
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
  }
  return (
    <div ref={containerPagesRef} className="container_pages">
      {dataPages.map((item, index) => {
        return (
          <div
            key={index}
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
            <div className="page">
              <img className="img_page" src={item?.img} alt="img_banner_page" />
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
