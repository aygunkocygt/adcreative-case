import { useMemo } from 'react';
import useSWR from 'swr';
import axiosInstance from '../utils/axios';
import {ApiResponse} from '../types/types'


export function useGetOption( searchTerm : string ): ApiResponse<any> {
  const URL = searchTerm ? `https://rickandmortyapi.com/api/character/?name=${searchTerm}` : '';

  const { data,isLoading, error, isValidating } = useSWR(URL, axiosInstance);
  console.log("data",data)

  const memoizedValue = useMemo(
    () => ({
      data,
      isLoading,
      error,
      isValidating,
    }),
    [data, error, isValidating, isLoading] // isLoading dependens olarak eklendi
  );

  return memoizedValue;
}
