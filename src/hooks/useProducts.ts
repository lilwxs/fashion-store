import { IProduct } from '@/interfaces/products';
import { useGetProductsQuery } from '@/redux/services/productsAPI';
import useSWR, { SWRConfiguration } from 'swr';

// const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  // const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, config);
  // const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);
  const { data, isLoading, isError, error } = useGetProductsQuery(`${url}`);

  return {
    products: data || [],
    isLoading: (!error && !data) || isLoading,
    isError,
  };
};
