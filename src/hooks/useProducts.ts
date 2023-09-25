import { IProduct } from '@/interfaces/products';
import useSWR, { SWRConfiguration } from 'swr';

const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  console.log('url', url);
  const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, config);
  // const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
