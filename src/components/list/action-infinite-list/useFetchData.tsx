import { useEffect, useState } from 'react';
import { Results, getData } from './ActionInfiniteList.data';

export const useFetchData = (pageSize: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [currentState, setCurrentState] = useState<Results>({
    items: [],
    totalCount: 1,
  });
  const [filterData, setFilterData] = useState<Results>({
    items: [],
    totalCount: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const loadNextPage = async () => {
    if (isNextPageLoading) return;
    setIsNextPageLoading(true);
    try {
      const fetchData = await getData(pageSize, currentPage);
      setCurrentState((prevState) => ({
        totalCount: fetchData.totalCount,
        items: [...prevState.items, ...fetchData.items],
      }));
      setFilterData((prevState) => ({
        totalCount: fetchData.totalCount,
        items: [...prevState.items, ...fetchData.items],
      }));
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsNextPageLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      try {
        const fetchData = await getData(pageSize, 1);
        setIsLoading(false);
        setCurrentState(fetchData);
        setFilterData(fetchData);
        setCurrentPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchDataAsync();
  }, [pageSize]);

  return {
    isLoading,
    isNextPageLoading,
    currentState,
    filterData,
    loadNextPage,
    setFilterData,
    setCurrentPage,
  };
};
