import { useQuery } from "@tanstack/react-query";
import { baseApi } from "../../../helper/baseApi";

export const useGetProductField = () => {
  const api = baseApi();
  const { data, error, isLoading } = useQuery({
    queryKey: ["useGetProductField"],
    queryFn: async () => {
      const ProductFields = await api.post("", {
        action: "get_fields",
        params: { field: "brand" },
      });
      return ProductFields.data.result;
    },
  });
  return { data, error, isLoading };
};
