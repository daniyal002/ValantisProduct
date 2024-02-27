import { useMutation, useQuery } from "@tanstack/react-query";
import { baseApi } from "../../../helper/baseApi";
import { useState } from "react";

// export const useGetProductItem = (filter, brand, product, price) => {
//   const api = baseApi();
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["useGetProductItem"],
//     queryFn: async () => {
//       const ProductIds = await api.post("", {
//         action: filter ? "filter" : "get_ids",
//         params: filter ? { brand: brand, product: product, price: price } : {},
//       });

//       const ProductItems = await api.post("", {
//         action: "get_items",
//         params: { ids: ProductIds.data.result },
//       });
//       return ProductItems.data.result;
//     },
//   });
//   return { data, error, isLoading };
// };

export const useGetProductItem = () => {
  const api = baseApi();
  const [product, setProduct] = useState([]);
  const { mutate, error, isPaused, isPending } = useMutation({
    mutationFn: async ({ filterI, brandI, productI, priceI }) => {
      const ProductIds = await api.post("", {
        action: filterI ? "filter" : "get_ids",
        params: filterI
          ? {
              ...(priceI && { price: parseFloat(priceI) }), // Добавляем price только если priceI не пустой
              ...(productI && { product: productI }), // Добавляем product только если productI не пустой
              ...(brandI && { brand: brandI }), // Добавляем brand только если brandI не пустой
            }
          : { limit: 1000 },
      });

      const ProductItems = await api.post("", {
        action: "get_items",
        params: { ids: ProductIds.data.result },
      });
      return ProductItems.data.result;
    },
    onSuccess: (data) => {
      setProduct(data);
    },
  });

  return { mutate, product, error, isPending };
};
