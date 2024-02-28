import React from "react";

const ProductListButtomPaginate = ({ productItem, paginate, currentPage }) => {
  return (
    <div style={styles.paginate}>
      {/* Создаем кнопки для каждой страницы */}

      {Array.from(
        { length: Math.ceil(productItem.length / 50) },
        (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={
              currentPage == index + 1
                ? styles.buttonPaginateActive
                : styles.buttonPaginate
            }
          >
            {index + 1}
          </button>
        )
      )}
    </div>
  );
};

const styles = {
  buttonPaginate: {
    background: "rgb(0, 123, 255)",
    color: "#fff",
    borderRadius: "5px",
    border: "1px solid rgb(0, 123, 255)",
    fontSize: "18px",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "0.5s",
  },
  buttonPaginateActive: {
    background: "#fff",
    color: "rgb(0, 123, 255)",
    borderRadius: "5px",
    border: "1px solid rgb(0, 123, 255)",
    fontSize: "18px",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "0.5s",
  },
  paginate: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "10px",
    marginTop: "20px",
  },
};
export default ProductListButtomPaginate;
