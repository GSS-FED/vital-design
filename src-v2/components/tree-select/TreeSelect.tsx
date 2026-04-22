import TextInput from '@/components/input/textInput/TextInput';
import masks from '@/constants/mask';
import { SpinnerIcon } from '@/icons/SpinnerIcon';
import { cn } from '@/utils/cn';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface TreeSelectData<T> {
  displayName: string;
  data?: T;
  id: string;
  children?: TreeSelectData<T>[];
  textColor?: string;
  suffixIcon?: ReactNode;
}

interface TreeSelectDataNode<T> extends TreeSelectData<T> {
  parentId?: string;
  $id: string;
  children?: TreeSelectDataNode<T>[];
}

export interface TreeSelectRoot<T> {
  label?: string;
  data: TreeSelectData<T>[];
}

interface TreeSelectRootNode<T> {
  label?: string;
  data: TreeSelectDataNode<T>[];
}

interface SearchText {
  menuSearchText: string;
  subMenuSearchText: string;
}

type NodeMap<T> = Record<
  TreeSelectDataNode<T>['id'],
  TreeSelectDataNode<T>
>;

export type TreeSelectProps<T> = {
  data: TreeSelectRoot<T>[];
  onChange: (value: TreeSelectData<T>[]) => void;
  onPathChange?: (path: TreeSelectData<T>[]) => void;
  value?: TreeSelectData<T>[];
  placeholder?: string;
  globalSearchLabel?: string;
  style?: CSSProperties;
  isEnableSearch?: boolean;
  onLoadMore?: (node?: TreeSelectData<T>) => void;
  isLoadingMore?: boolean;
  hasMore?: boolean | ((node?: TreeSelectData<T>) => boolean);
  skeleton?: ReactNode;
  onSearch?: (value: string, node?: TreeSelectData<T>) => void;
};

// 找尋所有子項目
function findChild<T>(
  data: TreeSelectDataNode<T>,
): [string, TreeSelectDataNode<T>][] {
  const { id, children } = data;
  const target: [string, TreeSelectDataNode<T>][] = [[id, data]];
  // 沒有 Children 代表是 Child
  if (!children) return target;
  if (children.length <= 0) return [];
  return children.flatMap((item) => {
    return findChild(item);
  });
}
// 找尋所有父項目
function findParent<T>(
  data: TreeSelectDataNode<T>,
): [string, TreeSelectDataNode<T>][] {
  const { id, children } = data;
  const target: [string, TreeSelectDataNode<T>][] = [[id, data]];
  // 沒有 Children 代表是 Child
  if (!children) return [];
  return [
    ...target,
    ...children.flatMap((item) => {
      return findParent(item);
    }),
  ];
}
function flattenTreeNode<T>(
  roots: TreeSelectRootNode<T>[],
  parentId?: string,
): NodeMap<T> {
  const allData = roots.flatMap((root) => root.data);
  const flatArray = allData.flatMap((node) => {
    const currentNode: TreeSelectDataNode<T> = {
      ...node,
      parentId,
    };

    // 如果有子節點，遞迴處理並合併結果
    if (node.children && node.children.length > 0) {
      // 將遞迴結果轉換為陣列再展開
      const childrenArray = Object.values(
        flattenTreeNode([{ data: node.children }], node.$id),
      );
      return [currentNode, ...childrenArray];
    }

    // 沒有子節點時只回傳當前節點
    return [currentNode];
  });

  return Object.fromEntries(
    flatArray.map((node) => [node.$id, node]),
  );
}
function getNodePath<T>(
  nodes: NodeMap<T>,
  nodeId: string,
): TreeSelectData<T>[] {
  const current = nodes[nodeId];

  if (!current) {
    return [];
  }
  const { $id, parentId, ...rest } = current;
  if (!parentId) {
    return [rest];
  }

  // 遞迴獲取父節點路徑，然後加上當前節點
  return [...getNodePath(nodes, parentId), rest];
}
function getMenuById<T>(
  nodes: NodeMap<T>,
  nodeId: string,
): TreeSelectDataNode<T>[] {
  const current = nodes[nodeId];

  if (!current) {
    return [];
  }
  if (!current.parentId) {
    return [current];
  }

  // 遞迴獲取父節點路徑，然後加上當前節點
  return [...getMenuById(nodes, current.parentId), current];
}
function addTreeSelectIds<T>(
  root: TreeSelectRoot<T>,
): TreeSelectRootNode<T> {
  const addIdsToData = (
    data: TreeSelectData<T>[],
  ): TreeSelectDataNode<T>[] => {
    return data.map((node) => ({
      ...node,
      $id: crypto.randomUUID(),
      children: node.children
        ? addIdsToData(node.children)
        : undefined,
    }));
  };

  return {
    label: root.label,
    data: addIdsToData(root.data),
  };
}
function checkIsPartialNodePath<T>(
  partialNodePath: TreeSelectData<T>[],
  nodePath: TreeSelectData<T>[],
) {
  if (partialNodePath.length > nodePath.length) return false;
  for (let i = 0; i < partialNodePath.length; i++) {
    if (!partialNodePath[i] || !nodePath[i]) return false;
    if (partialNodePath[i]?.id !== nodePath[i]?.id) return false;
  }
  return true;
}

function checkIsExistNodePath<T>(
  nodePath: TreeSelectData<T>[],
  targetNodePath: TreeSelectData<T>[],
) {
  if (nodePath.length !== targetNodePath.length) return false;
  for (let i = 0; i < nodePath.length; i++) {
    if (!nodePath[i] || !targetNodePath[i]) return false;
    if (nodePath[i]?.id !== targetNodePath[i]?.id) return false;
  }
  return true;
}
// 使用者沒辦法知道 $id ，這個 utils 透過 id 找到對應的 $id
function getNodeId<T>(nodes: NodeMap<T>, id: string): string | null {
  const entry = Object.entries(nodes).find(
    ([_, node]) => node.id === id,
  );
  return entry?.[0] ?? null;
}
function initializeMenu<T>(
  nodes: NodeMap<T>,
  value: TreeSelectData<T>[],
): TreeSelectDataNode<T>[] {
  if (value.length <= 0) return [];
  const lastNode = value[value.length - 1];
  if (!lastNode) return [];
  const nodeId = getNodeId(nodes, lastNode.id);
  if (!nodeId) return [];
  const menu = getMenuById(nodes, nodeId);
  const isExistNodePath = checkIsExistNodePath(value, menu);
  if (!isExistNodePath) return [];
  const lastNodeInMenu = menu[menu.length - 1];
  if (!lastNodeInMenu) return [];
  const initialMenu = getMenuById(nodes, lastNodeInMenu.$id);
  if (initialMenu.length <= 0) return [];
  return initialMenu.slice(0, initialMenu.length - 1);
}

// Helper function to get mask image based on scroll position
function getMaskImage(
  isScrollAtTop: boolean,
  isScrollAtBottom: boolean,
): string | undefined {
  if (isScrollAtTop) return masks.HIDE_TOP_MASK;
  if (isScrollAtBottom) return masks.HIDE_BOTTOM_MASK;
  return masks.FULL_MASK;
}

export default function TreeSelect<T>(props: TreeSelectProps<T>) {
  const {
    data,
    onChange,
    onPathChange,
    placeholder = '輸入關鍵字',
    globalSearchLabel,
    style,
    isEnableSearch = true,
    value = [],
    onLoadMore,
    isLoadingMore,
    hasMore = false,
    skeleton = <DefaultSkeleton />,
    onSearch,
  } = props;

  // 使用者傳入的 data id 如果重複可能會造成誤判，所以統一由元件產生 $id 建立 node
  const dataRootNode: TreeSelectRootNode<T>[] = useMemo(() => {
    return data.map((root) => addTreeSelectIds(root));
  }, [data]);
  // 建立一個 map 方便查詢 node， 要注意這裡的 key 是 $id
  const dataNodeMap: NodeMap<T> = useMemo(() => {
    return flattenTreeNode(dataRootNode);
  }, [dataRootNode]);
  const [selectedMenu, setSelectedMenu] = useState<
    TreeSelectDataNode<T>[]
  >(() => initializeMenu(dataNodeMap, value));
  const [searchText, setSearchText] = useState<SearchText>({
    menuSearchText: '',
    subMenuSearchText: '',
  });
  const [refScrollInfo, setRefScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollRef = useRef(null);

  const isRootMenuSearching = searchText.menuSearchText !== '';
  const searchFilter = (
    data: TreeSelectDataNode<T>[],
    searchText: string,
  ) => {
    if (!data) return [];
    return data.filter((item) => {
      if (searchText === '') return item;
      return item.displayName
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });
  };
  const selectedLastMenu = selectedMenu[selectedMenu.length - 1];

  const shouldLoadMore = useMemo(() => {
    if (typeof hasMore === 'function') {
      return hasMore(selectedLastMenu);
    }
    return hasMore;
  }, [hasMore, selectedLastMenu]);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node && onLoadMore && !isLoadingMore && shouldLoadMore) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              onLoadMore(selectedLastMenu);
            }
          },
          { threshold: 0.1 },
        );
        observerRef.current.observe(node);
      }
    },
    [onLoadMore, selectedLastMenu, isLoadingMore, shouldLoadMore],
  );
  const subMenu = (() => {
    if (selectedMenu.length <= 0) return;
    if (!selectedLastMenu) return;

    // 嘗試從最新的 dataNodeMap 中取得最新的 node，確保有更新 data 時能立即顯示
    const nodeId = getNodeId(dataNodeMap, selectedLastMenu.id);
    const latestNode = nodeId
      ? dataNodeMap[nodeId]
      : selectedLastMenu;

    if (!latestNode || !latestNode.children) return;
    return searchFilter(
      latestNode.children,
      searchText.subMenuSearchText,
    );
  })();
  const allChildMap: Map<string, TreeSelectDataNode<T>> = (() => {
    const allChildArray = dataRootNode
      .map((item) => item.data)
      .flatMap((item) =>
        item.flatMap((subItem) => findChild(subItem)),
      );
    return new Map(allChildArray);
  })();
  const filteredChildItem = [...allChildMap.entries()].filter(
    (item) => {
      const [_, child] = item;
      if (searchText.menuSearchText === '') return true;
      return child.displayName
        .toLowerCase()
        .includes(searchText.menuSearchText.toLowerCase());
    },
  );
  const allParentMapByLabel = (() => {
    return dataRootNode.map((item) => {
      const itemParent = item.data.flatMap((subItem) =>
        findParent(subItem),
      );
      const itemMap = new Map(itemParent);
      return { label: item.label ?? '', data: itemMap };
    });
  })();
  const filteredParentItems = allParentMapByLabel.map((item) => {
    const filteredData = [...item.data.entries()].filter((item) => {
      const [_, child] = item;
      if (searchText.menuSearchText === '') return true;
      return child.displayName
        .toLowerCase()
        .includes(searchText.menuSearchText.toLowerCase());
    });
    return {
      ...item,
      data: filteredData,
    };
  });
  const isFilterEmpty =
    filteredChildItem.length <= 0 &&
    filteredParentItems.flatMap((item) => item.data).length <= 0;
  const isScrollAtTop = refScrollInfo.scrollTop === 0;
  // NOTE: scrollTop 是一個非四捨五入的數字，而 scrollHeight 和 clientHeight 是四捨五入的，因此確定滾動區域是否滾動到底部的唯一方法是查看滾動量是否足夠接近某個閾值(這裡設置 1)
  const isScrollAtBottom =
    !isScrollAtTop &&
    Math.abs(
      refScrollInfo.scrollHeight -
        refScrollInfo.clientHeight -
        refScrollInfo.scrollTop,
    ) <= 1;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollRef.current;
    setRefScrollInfo({
      scrollTop: scrollTop,
      scrollHeight: scrollHeight,
      clientHeight: clientHeight,
    });
  };
  const handlePreviousClick = () => {
    const previousMenu = selectedMenu.slice(
      0,
      selectedMenu.length - 1,
    );
    const previousMenuId = previousMenu[previousMenu.length - 1]?.$id;
    const newMenu = previousMenuId
      ? getMenuById(dataNodeMap, previousMenuId)
      : [];
    setSelectedMenu(newMenu);
    onPathChange?.(newMenu);
    setSearchText((prev) => ({
      ...prev,
      menuSearchText: '',
      subMenuSearchText: '',
    }));
    // HACK: 因觸發時為 `subMenu` 的 ref 不會為 `Menu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
    setTimeout(() => {
      handleScroll();
    }, 0);
  };

  // 當 data 更新時，同步更新 selectedMenu 中的節點，以確保取得最新的 children
  useEffect(() => {
    setSelectedMenu((prev) => {
      if (prev.length === 0) return prev;

      const newMenu: TreeSelectDataNode<T>[] = [];
      for (const node of prev) {
        const nodeId = getNodeId(dataNodeMap, node.id);
        if (nodeId && dataNodeMap[nodeId]) {
          newMenu.push(dataNodeMap[nodeId]);
        } else {
          break;
        }
      }
      return newMenu;
    });
  }, [dataNodeMap]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const maskImage = getMaskImage(isScrollAtTop, isScrollAtBottom);

  return (
    <div
      style={style}
      className={cn(
        'box-border font-sans',
        'w-[194px] h-[300px] inline-block relative',
        'p-1 pb-0',
        'text-grayscale-800 text-sm',
        'bg-white shadow-emphasis rounded',
      )}
    >
      {selectedLastMenu ? (
        <div className="flex flex-col w-full h-full">
          {/* Previous Button */}
          <div
            onClick={handlePreviousClick}
            className={cn(
              'box-border font-sans',
              'flex items-center mt-1.5 py-1.5 px-3',
              'text-grayscale-500 text-xs font-medium rounded',
              'cursor-pointer transition-colors duration-200',
              'hover:bg-grayscale-100',
            )}
          >
            <div className="flex">
              <ChevronLeftIcon />
            </div>
            {selectedLastMenu.displayName}
          </div>
          {isEnableSearch && (
            <TextInput
              width="auto"
              prefix={<MagnifyingGlassIcon />}
              placeholder={placeholder}
              onChange={(value) => {
                setSearchText((prev) => ({
                  ...prev,
                  subMenuSearchText: value,
                }));
                onSearch?.(value, selectedLastMenu);
              }}
              className="flex-none mx-2 my-2 rounded-[4rem]"
            />
          )}
          {subMenu && (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className={cn(
                'flex-1 pb-1 overflow-auto',
                '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
              )}
              style={{
                maskImage,
                WebkitMaskImage: maskImage,
              }}
            >
              <div key={selectedLastMenu.id}>
                {subMenu.map((item: TreeSelectDataNode<T>) => {
                  const { $id, displayName, suffixIcon, children } =
                    item;
                  const path = getNodePath(dataNodeMap, $id);
                  return (
                    <div
                      key={$id}
                      onClick={() => {
                        if (children && children.length !== 0) {
                          const newMenu = getMenuById(
                            dataNodeMap,
                            $id,
                          );
                          setSelectedMenu(newMenu);
                          onPathChange?.(newMenu);
                          // HACK: 因觸發時為 `Menu` 的 ref 不會為 `subMenu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
                          setTimeout(() => {
                            handleScroll();
                          }, 0);
                        } else {
                          onChange(path);
                        }
                      }}
                      className={cn(
                        'box-border font-sans',
                        'flex items-center py-1.5 px-2 pl-4 rounded',
                        'cursor-pointer transition-colors duration-200',
                        checkIsPartialNodePath(path, value)
                          ? 'bg-grayscale-300 hover:bg-grayscale-300'
                          : 'hover:bg-grayscale-150',
                      )}
                    >
                      <div
                        title={displayName}
                        className="flex-1 leading-[1.43] text-ellipsis whitespace-nowrap overflow-hidden"
                      >
                        {displayName}
                      </div>
                      {suffixIcon ? (
                        <div className="flex w-3.5 h-3.5">
                          {suffixIcon}
                        </div>
                      ) : null}
                      {children !== undefined &&
                        children.length >= 0 && (
                          <div className="flex">
                            <ChevronRightIcon
                              width={20}
                              height={20}
                            />
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
              {isLoadingMore && skeleton}
              {shouldLoadMore && !isLoadingMore && (
                <div
                  ref={loadMoreRef}
                  className="h-px w-full flex-shrink-0"
                  style={{ overflowAnchor: 'none' }}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full">
          {isEnableSearch && (
            <TextInput
              width="auto"
              prefix={<MagnifyingGlassIcon />}
              placeholder={placeholder}
              onChange={(value) => {
                setSearchText((prev) => ({
                  ...prev,
                  menuSearchText: value,
                }));
                onSearch?.(value);
              }}
              className="flex-none mx-2 my-2 rounded-[4rem]"
            />
          )}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={cn(
              'flex-1 pb-1 overflow-auto',
              '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
            )}
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
            }}
          >
            {isRootMenuSearching && (
              <Fragment>
                {/* XXX: 原本應該是給全域搜尋當作分類的 Label 使用，待調整 */}
                {isFilterEmpty && (
                  <div className="mb-1.5 px-2.5 text-grayscale-500 text-xs font-medium leading-[1.3]">
                    {globalSearchLabel}
                  </div>
                )}
                {filteredChildItem.length > 0 && (
                  <div className="box-border font-sans relative my-2 mx-1 pb-2 after:content-[''] after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-grayscale-300 last:mb-0 last:pb-0 last:after:hidden">
                    {filteredChildItem.map((item) => {
                      const [_, child] = item;
                      const { displayName, $id, textColor } = child;
                      const path = getNodePath(dataNodeMap, $id);
                      return (
                        <div
                          key={`${$id}`}
                          onClick={() => {
                            onChange(path);
                          }}
                          style={{ color: textColor }}
                          className={cn(
                            'box-border font-sans',
                            'flex items-center py-1.5 px-2 pl-4 rounded',
                            'cursor-pointer transition-colors duration-200',
                            checkIsPartialNodePath(path, value)
                              ? 'bg-grayscale-300 hover:bg-grayscale-300'
                              : 'hover:bg-grayscale-150',
                          )}
                        >
                          <div
                            title={displayName}
                            className="flex-1 leading-[1.43] text-ellipsis whitespace-nowrap overflow-hidden"
                          >
                            {displayName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {filteredParentItems.map((parentItem, index) => {
                  const { label, data } = parentItem;
                  if (data.length <= 0) return null;
                  return (
                    <div
                      key={index}
                      className="box-border font-sans relative my-2 mx-1 pb-2 after:content-[''] after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-grayscale-300 last:mb-0 last:pb-0 last:after:hidden"
                    >
                      <div className="mb-1.5 px-2.5 text-grayscale-500 text-xs font-medium leading-[1.3]">
                        {label}
                      </div>
                      {data.map((item) => {
                        const [_, child] = item;
                        const {
                          displayName,
                          $id,
                          textColor,
                          children,
                        } = child;
                        const path = getNodePath(dataNodeMap, $id);
                        const isEmpty =
                          Array.isArray(children) &&
                          children.length === 0;
                        return (
                          <div
                            key={$id}
                            onClick={() => {
                              if (children && children.length !== 0) {
                                const newMenu = getMenuById(
                                  dataNodeMap,
                                  $id,
                                );
                                setSelectedMenu(newMenu);
                                onPathChange?.(newMenu);
                                // HACK: 因觸發時為 `Menu` 的 ref 不會為 `subMenu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
                                setTimeout(() => {
                                  handleScroll();
                                }, 0);
                              } else {
                                onChange(path);
                              }
                            }}
                            style={{ color: textColor }}
                            className={cn(
                              'box-border font-sans',
                              'flex items-center py-1.5 px-2 pl-4 rounded',
                              'cursor-pointer transition-colors duration-200',
                              checkIsPartialNodePath(path, value)
                                ? 'bg-grayscale-300 hover:bg-grayscale-300'
                                : 'hover:bg-grayscale-150',
                              isEmpty &&
                                'text-grayscale-500 pointer-events-none',
                            )}
                          >
                            <div
                              title={displayName}
                              className="flex-1 leading-[1.43] text-ellipsis whitespace-nowrap overflow-hidden"
                            >
                              {displayName}
                            </div>
                            <div className="flex">
                              <ChevronRightIcon
                                width={20}
                                height={20}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </Fragment>
            )}
            {!isRootMenuSearching &&
              dataRootNode.map((item, index) => {
                const itemData = searchFilter(
                  item.data,
                  searchText.menuSearchText,
                );
                if (itemData.length === 0) return;
                return (
                  <Fragment key={`Fragment_${index}`}>
                    <div className="box-border font-sans relative my-2 mx-1 pb-2 after:content-[''] after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-grayscale-300 last:mb-0 last:pb-0 last:after:hidden">
                      {itemData.map((item: TreeSelectDataNode<T>) => {
                        const {
                          $id,
                          textColor,
                          displayName,
                          children,
                        } = item;
                        const path = getNodePath(dataNodeMap, $id);
                        const isEmpty =
                          Array.isArray(children) &&
                          children.length === 0;
                        return (
                          <div
                            key={$id}
                            onClick={() => {
                              if (children && children.length !== 0) {
                                const newMenu = getMenuById(
                                  dataNodeMap,
                                  $id,
                                );
                                setSelectedMenu(newMenu);
                                onPathChange?.(newMenu);
                                // HACK: 因觸發時為 `Menu` 的 ref 不會為 `subMenu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
                                setTimeout(() => {
                                  handleScroll();
                                }, 0);
                              } else {
                                onChange(path);
                              }
                            }}
                            style={{ color: textColor }}
                            className={cn(
                              'box-border font-sans',
                              'flex items-center py-1.5 px-2 pl-4 rounded',
                              'cursor-pointer transition-colors duration-200',
                              checkIsPartialNodePath(path, value)
                                ? 'bg-grayscale-300 hover:bg-grayscale-300'
                                : 'hover:bg-grayscale-150',
                              isEmpty &&
                                'text-grayscale-500 pointer-events-none',
                            )}
                          >
                            <div
                              title={displayName}
                              className="flex-1 leading-[1.43] text-ellipsis whitespace-nowrap overflow-hidden"
                            >
                              {displayName}
                            </div>
                            {children !== undefined &&
                              children.length >= 0 && (
                                <div className="flex">
                                  <ChevronRightIcon
                                    width={20}
                                    height={20}
                                  />
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              })}
            {isLoadingMore && (
              <div style={{ overflowAnchor: 'none' }}>{skeleton}</div>
            )}
            {shouldLoadMore && !isLoadingMore && (
              <div
                ref={loadMoreRef}
                className="h-px w-full flex-shrink-0"
                style={{ overflowAnchor: 'none' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const DefaultSkeleton = () => {
  return (
    <div className="py-1.5 px-5 mx-1.5 flex justify-center text-grayscale-400">
      <SpinnerIcon width={18} height={18} />
    </div>
  );
};

TreeSelect.displayName = 'TreeSelect';
