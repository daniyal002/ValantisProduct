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
        <div style={styles.productList}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Продукт</th>
                <th style={styles.th}>Цена</th>
                <th style={styles.th}>Бренд</th>
              </tr>
            </thead>
            <tbody>
              {productListItem.map((item, index) => (
                <tr style={styles.tr} key={index}>
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>{item.product}</td>
                  <td style={styles.td}>{item.price}</td>
                  <td style={styles.td}>{item.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const styles = {
  productList: {
    maxHeight: "600px",
    overflowY: "scroll",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  thead: {
    backgroundColor: "#f2f2f2",
    position: "sticky",
    top: "0",
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
