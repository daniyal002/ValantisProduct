import React from "react";

const ProductListTable = ({ productListItem, isPending }) => {
  return (
    <>
      {isPending ? (
        <div style={styles.loading}>
          <img
            src="./icon/autorenew_black_36dp.svg"
            alt="Загрузка"
            style={styles.loadingImg}
          />
        </div>
      ) : (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Продукт</th>
              <th style={styles.th}>Бренд</th>
              <th style={styles.th}>Цена</th>
            </tr>
          </thead>
          <tbody>
            {productListItem.map((item, index) => (
              <tr style={styles.tr} key={index}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.product}</td>
                <td style={styles.td}>{item.brand}</td>
                <td style={styles.td}>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  thead: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    ":nthChild(even):": {
      backgroundColor: "#f2f2f2",
    },
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  loadingImg: {
    display: "block",
    margin: "0 auto",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  },
};

export default ProductListTable;
