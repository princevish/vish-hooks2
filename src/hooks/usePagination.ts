import { useMemo } from "react";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

const DEFAULT_START = 1;
const MAX_PAGINATION_ITEMS = 5;
const NEIGHBORHOOD = 2;
const MAX_SIBLINGS = 3;
const PREVIEW_ITEM_LAST_PAGE = 4;

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
}: PaginationProps) => {
  const DOTS = useMemo(() => "...", []);
  const totalPageCount = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [pageSize, totalCount]
  );

  const { hasPreviousPage, hasNextPage } = useMemo(() => {
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPageCount;

    return { hasPreviousPage, hasNextPage };
  }, [currentPage, totalPageCount]);

  const paginationRange = useMemo(() => {
    if (totalPageCount <= MAX_PAGINATION_ITEMS) {
      return range(DEFAULT_START, totalPageCount);
    }

    if (currentPage <= NEIGHBORHOOD) {
      return [...range(DEFAULT_START, MAX_SIBLINGS), DOTS, totalPageCount];
    }

    if (
      currentPage >= totalPageCount - DEFAULT_START ||
      totalPageCount - DEFAULT_START - currentPage <= NEIGHBORHOOD
    ) {
      return [
        ...range(totalPageCount - PREVIEW_ITEM_LAST_PAGE, totalPageCount),
      ];
    }

    return [
      ...range(currentPage - DEFAULT_START, currentPage + DEFAULT_START),
      DOTS,
      totalPageCount,
    ];
  }, [totalPageCount, currentPage, DOTS]);

  return [paginationRange, DOTS, hasPreviousPage, hasNextPage] as const;
};
