import { useGetProductField } from "../../hook/useGetProductField";
import { useForm } from "react-hook-form";

const ProductListFilter = ({
  setFilter,
  setBrand,
  setProduct,
  setPrice,
  filter,
  priceI,
  brandI,
  productI,
}) => {
  const { handleSubmit, reset } = useForm();
  const { data: ProductField } = useGetProductField();
  const BrandFilter = Array.from(
    new Set(ProductField?.filter((item) => item != null))
  );

  const filterQuery = () => {
    setFilter(true);
  };

  const clearFilter = () => {
    setBrand(""); // Очищаем значения фильтров
    setProduct("");
    setPrice("");
    reset(); // Сбрасываем значения полей формы
    setFilter(false);
  };

  return (
    <form onSubmit={handleSubmit(filterQuery)} style={styles.form}>
      <select
        value={brandI}
        onChange={(e) => {
          setBrand(e.target.value);
          setProduct("");
          setPrice("");
        }}
        style={styles.input}
      >
        <option value="">Выберите бренд</option>
        {BrandFilter.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Введите наименование товара"
        value={productI}
        onChange={(e) => {
          setBrand("");
          setProduct(e.target.value);
          setPrice("");
        }}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Введите цену товара"
        value={priceI}
        onChange={(e) => {
          setBrand("");
          setProduct("");
          setPrice(e.target.value);
        }}
        style={styles.input}
      />
      {filter ? (
        <a onClick={clearFilter} style={styles.link}>
          Очистить фильтр
        </a>
      ) : (
        <button
          type="submit"
          style={
            priceI != "" || brandI != "" || productI != ""
              ? styles.buttonFilter
              : styles.buttonFilterDisabled
          }
          disabled={
            priceI != "" || brandI != "" || productI != "" ? false : true
          }
        >
          Применить фильтр
        </button>
      )}
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  buttonFilter: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonFilterDisabled: {
    padding: "8px 16px",
    backgroundColor: "gray",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  link: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s",
    "&:hover": {
      background: "#0056b3",
    },
  },
};

export default ProductListFilter;
