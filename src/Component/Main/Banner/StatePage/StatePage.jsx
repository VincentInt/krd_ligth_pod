import "./StatePage.css";

const StatePage = ({ dataPages, statePage }) => {
  return (
    <div className="state_page">
      {dataPages.map((item, index) => {
        return (
          <div
            key={index}
            className={
              statePage === index
                ? "select_item_state_page"
                : statePage - 1 === index || statePage + 1 === index
                ? "medium_item_state_page"
                : "small_item_state_page"
            }
          ></div>
        );
      })}
    </div>
  );
};

export default StatePage;
