const DELAY_MS = 1000;

export type Option = {
  id: string | number;
  displayName: string;
  disabled?: boolean;
};

export type Results = {
  items: Option[];
  totalCount: number;
};

const list: Option[] = Array.from(Array(50)).map((_, index) => {
  return {
    id: index,
    value: `option ${index + 1}`,
    displayName: `option ${index + 1}`,
  };
});

export function getData(
  pageSize: number,
  page: number,
): Promise<Results> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      resolve({
        items: list.slice(startIndex, endIndex),
        totalCount: list.length,
      });
    }, DELAY_MS);
  });
}

export function searchData(keyword: string): Promise<Option[]> {
  const searchKeyword = keyword.toLowerCase();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        list.filter((item) =>
          item.displayName.toLowerCase().includes(searchKeyword),
        ),
      );
    }, DELAY_MS);
  });
}
