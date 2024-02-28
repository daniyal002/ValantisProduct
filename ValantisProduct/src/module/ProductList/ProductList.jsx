import React, { useEffect, useState } from "react";
import { useGetProductItem } from "./hook/useGetProductItem";
import ProductListTable from "./components/ProductListTable/ProductListTable";
import ProductListFilter from "./components/ProductListFilter/ProductListFilter";
import ProductListButtomPaginate from "./components/ProductListButtomPaginate/ProductListButtomPaginate";

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

const refeshData = () => mutate({ filterI, brandI, productI, priceI });

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
        refeshData={refeshData}
        error={error}
      />
      <ProductListTable
        productListItem={productListItem}
        isPending={isPending}
      />

      <div>
        {productItem && !isPending && (
          <ProductListButtomPaginate
            productItem={productItem}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
