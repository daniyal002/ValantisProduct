import React, { useEffect, useState } from "react";
import { useGetProductItem } from "./hook/useGetProductItem";
import ProductListTable from "./components/ProductListTable/ProductListTable";
import ProductListFilter from "./components/ProductListFilter/ProductListFilter";

const ProductList = () => {
  const [productI, setProduct] = useState("");
  const [brandI, setBrand] = useState("");
  const [priceI, setPrice] = useState("");
  const [filterI, setFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [productListItem, setProductListItem] = useState([]);

  const {
    mutate,
    product: productItem,
    error,
    isPending,
  } = useGetProductItem();

  useEffect(() => {
    if (filterI == true) {
      mutate({ filterI, brandI, productI, priceI });
    } else if (filterI == false) {
      mutate({ filterI, brandI, productI, priceI });
    }
  }, [filterI]);

  useEffect(() => {
    console.log(`Ошибка при получении продуктов; Ошибка:${error}`);
  }, [error]);

  useEffect(() => {
    if (productItem) {
      paginate(1);
    }
  }, [productItem]);

  const paginate = (page) => {
    const startIndex = 50 * (page - 1);
    const endIndex = startIndex + 50;
    const newList = productItem.slice(startIndex, endIndex);
    setProductListItem(
      Object.values(
        newList.reduce((acc, product) => {
          acc[product.id] = acc[product.id] || product;
          return acc;
        }, {})
      )
    );
    setCurrentPage(page);
  };

  return (
    <div>
      <ProductListFilter
        setFilter={setFilter}
        setBrand={setBrand}
        brandI={brandI}
        setProduct={setProduct}
        productI={productI}
        setPrice={setPrice}
        priceI={priceI}
        filter={filterI}
      />
      <ProductListTable
        productListItem={productListItem}
        isPending={isPending}
      />

      <div>
        {productItem && !isPending && (
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
        )}
      </div>
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

export default ProductList;
