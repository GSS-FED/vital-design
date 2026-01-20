import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'src/components/input/textInput/TextInput';
import { colors, shadows, styles } from 'src/constants';
import { SpinnerIcon } from 'src/icons/SpinnerIcon';

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
  style?: React.CSSProperties;
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

  return (
    <Container style={style}>
      {selectedLastMenu ? (
        <Wrapper>
          <PreviousButton onClick={handlePreviousClick}>
            <PreviousIcon>
              <ChevronLeftIcon />
            </PreviousIcon>
            {selectedLastMenu.displayName}
          </PreviousButton>
          {isEnableSearch && (
            <Search
              prefix={<MagnifyingGlassIcon />}
              placeholder={placeholder}
              onChange={(value) => {
                setSearchText((prev) => ({
                  ...prev,
                  subMenuSearchText: value,
                }));
                onSearch?.(value, selectedLastMenu);
              }}
            />
          )}
          {subMenu && (
            <SubMenu
              ref={scrollRef}
              onScroll={handleScroll}
              $isScrollAtTop={isScrollAtTop}
              $isScrollAtBottom={isScrollAtBottom}
            >
              <div key={selectedLastMenu.id}>
                {subMenu.map((item: TreeSelectDataNode<T>) => {
                  const { $id, displayName, suffixIcon, children } =
                    item;
                  const path = getNodePath(dataNodeMap, $id);
                  return (
                    <MenuItem
                      key={$id}
                      $isActive={checkIsPartialNodePath(path, value)}
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
                    >
                      <MenuItemName title={displayName}>
                        {displayName}
                      </MenuItemName>
                      {suffixIcon ? (
                        <SubMenuItemIcon>
                          {suffixIcon}
                        </SubMenuItemIcon>
                      ) : null}
                      {children !== undefined &&
                        children.length >= 0 && (
                          <MenuItemIcon>
                            <ChevronRightIcon
                              width={20}
                              height={20}
                            />
                          </MenuItemIcon>
                        )}
                    </MenuItem>
                  );
                })}
              </div>
              {isLoadingMore && skeleton}
              {shouldLoadMore && !isLoadingMore && (
                <LoadMoreSentinel ref={loadMoreRef} />
              )}
            </SubMenu>
          )}
        </Wrapper>
      ) : (
        <Wrapper>
          {isEnableSearch && (
            <Search
              prefix={<MagnifyingGlassIcon />}
              placeholder={placeholder}
              onChange={(value) => {
                setSearchText((prev) => ({
                  ...prev,
                  menuSearchText: value,
                }));
                onSearch?.(value);
              }}
            />
          )}
          <Menu
            ref={scrollRef}
            onScroll={handleScroll}
            $isScrollAtTop={isScrollAtTop}
            $isScrollAtBottom={isScrollAtBottom}
          >
            {isRootMenuSearching && (
              <Fragment>
                {/* XXX: 原本應該是給全域搜尋當作分類的 Label 使用，待調整 */}
                {isFilterEmpty && (
                  <MenuItemsLabel>{globalSearchLabel}</MenuItemsLabel>
                )}
                {filteredChildItem.length > 0 && (
                  <MenuItems>
                    {filteredChildItem.map((item) => {
                      const [_, child] = item;
                      const { displayName, $id, textColor } = child;
                      const path = getNodePath(dataNodeMap, $id);
                      return (
                        <MenuItem
                          key={`${$id}`}
                          $textColor={textColor}
                          $isActive={checkIsPartialNodePath(
                            path,
                            value,
                          )}
                          onClick={() => {
                            onChange(path);
                          }}
                        >
                          <MenuItemName title={displayName}>
                            {displayName}
                          </MenuItemName>
                        </MenuItem>
                      );
                    })}
                  </MenuItems>
                )}
                {filteredParentItems.map((parentItem, index) => {
                  const { label, data } = parentItem;
                  if (data.length <= 0) return null;
                  return (
                    <MenuItems key={index}>
                      <MenuItemsLabel>{label}</MenuItemsLabel>
                      {data.map((item) => {
                        const [_, child] = item;
                        const {
                          displayName,
                          $id,
                          textColor,
                          children,
                        } = child;
                        const path = getNodePath(dataNodeMap, $id);
                        return (
                          <MenuItem
                            key={$id}
                            $textColor={textColor}
                            $isEmpty={
                              Array.isArray(children) &&
                              children.length === 0
                            }
                            $isActive={checkIsPartialNodePath(
                              path,
                              value,
                            )}
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
                          >
                            <MenuItemName title={displayName}>
                              {displayName}
                            </MenuItemName>
                            <MenuItemIcon>
                              <ChevronRightIcon
                                width={20}
                                height={20}
                              />
                            </MenuItemIcon>
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
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
                    <MenuItems>
                      {itemData.map((item: TreeSelectDataNode<T>) => {
                        const {
                          $id,
                          textColor,
                          displayName,
                          children,
                        } = item;
                        const path = getNodePath(dataNodeMap, $id);
                        return (
                          <MenuItem
                            key={$id}
                            $textColor={textColor}
                            $isEmpty={
                              Array.isArray(children) &&
                              children.length === 0
                            }
                            $isActive={checkIsPartialNodePath(
                              path,
                              value,
                            )}
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
                          >
                            <MenuItemName title={displayName}>
                              {displayName}
                            </MenuItemName>
                            {children !== undefined &&
                              children.length >= 0 && (
                                <MenuItemIcon>
                                  <ChevronRightIcon
                                    width={20}
                                    height={20}
                                  />
                                </MenuItemIcon>
                              )}
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
                  </Fragment>
                );
              })}
            {isLoadingMore && (
              <div style={{ overflowAnchor: 'none' }}>{skeleton}</div>
            )}
            {shouldLoadMore && !isLoadingMore && (
              <LoadMoreSentinel ref={loadMoreRef} />
            )}
          </Menu>
        </Wrapper>
      )}
    </Container>
  );
}

const DefaultSkeleton = () => {
  return (
    <DefaultSkeletonContainer>
      <SpinnerIcon
        width={18}
        height={18}
        fill={colors.grayscale300}
      />
    </DefaultSkeletonContainer>
  );
};

TreeSelect.displayName = 'TreeSelect';

const Container = styled.div`
  --color: ${colors.grayscale800};
  --search-icon-color: ${colors.grayscale500};
  --font-size: 14px;
  --fadeHeight: 40px;

  ${styles.boxSizing}
  ${styles.typography}

  width: 194px;
  height: 300px;
  display: inline-block;
  position: relative;
  padding: 4px 4px 0;
  color: var(--color);
  font-size: var(--font-size);
  background: ${colors.white};
  box-shadow: ${shadows.EMPHASIS};
  border-radius: 4px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Search = styled(TextInput)`
  flex: 0 0 auto;
  width: auto;
  margin: 8px;
  border-radius: 4rem;
`;

const Menu = styled.div<{
  $isScrollAtTop?: boolean;
  $isScrollAtBottom?: boolean;
}>`
  flex: 1 1 auto;
  padding-bottom: 4px;
  overflow: auto;

  mask-image: linear-gradient(
      to top,
      transparent,
      transparent var(--fadeHeight),
      black var(--fadeHeight),
      black calc(100% - var(--fadeHeight)),
      transparent
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent var(--fadeHeight),
      black var(--fadeHeight),
      black calc(100% - var(--fadeHeight)),
      transparent
    );

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  ${({ $isScrollAtTop }) =>
    $isScrollAtTop &&
    css`
      mask-image: linear-gradient(
          to top,
          transparent,
          transparent var(--fadeHeight),
          black var(--fadeHeight),
          black calc(100% - var(--fadeHeight)),
          transparent
        ),
        linear-gradient(
          to bottom,
          black,
          black var(--fadeHeight),
          black var(--fadeHeight),
          black calc(100% - var(--fadeHeight)),
          transparent
        );
    `}
  ${({ $isScrollAtBottom }) =>
    $isScrollAtBottom &&
    css`
      mask-image: linear-gradient(
          to top,
          black,
          black var(--fadeHeight),
          black var(--fadeHeight),
          black calc(100% - var(--fadeHeight)),
          transparent
        ),
        linear-gradient(
          to bottom,
          transparent,
          transparent var(--fadeHeight),
          black var(--fadeHeight),
          black calc(100% - var(--fadeHeight)),
          transparent
        );
    `}
`;

const MenuItems = styled.div<{ $isEmpty?: boolean }>`
  ${styles.boxSizing}
  ${styles.typography}
  position: relative;
  margin: 8px 4px;
  padding-bottom: 8px;
  &::after {
    content: '';
    position: absolute;
    inset: auto 8px 0 8px;
    height: 1px;
    background: ${colors.grayscale300};
  }
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    &::after {
      content: none;
    }
  }

  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      color: ${colors.grayscale500};
      pointer-events: none;
    `}
`;
const MenuItemsLabel = styled.div`
  margin-bottom: 6px;
  padding: 0 10px;
  color: ${colors.grayscale500};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
`;
const MenuItem = styled.div<{
  $isEmpty?: boolean;
  $textColor?: string;
  $isActive?: boolean;
}>`
  ${styles.boxSizing}
  ${styles.typography}

  display: flex;
  align-items: center;
  padding: 6px 8px 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? colors.grayscale300 : colors.grayscale150};
  }

  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      color: ${colors.grayscale500};
      pointer-events: none;
    `};

  ${({ $textColor }) =>
    $textColor &&
    css`
      color: ${$textColor};
    `}
  ${({ $isActive }) =>
    $isActive &&
    css`
      background: ${colors.grayscale300};
    `}
`;
const MenuItemName = styled.div`
  flex: 1 1 auto;
  line-height: 1.43;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const MenuItemIcon = styled.div`
  display: flex;
`;

const SubMenu = styled(Menu)``;
const SubMenuItemIcon = styled(MenuItemIcon)`
  width: 14px;
  height: 14px;
`;
const PreviousButton = styled.div`
  ${styles.boxSizing}
  ${styles.typography}

  display: flex;
  align-items: center;
  margin-top: 6px;
  padding: 6px 12px;
  color: ${colors.grayscale500};
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: ${colors.grayscale100};
  }
`;
const PreviousIcon = styled.div`
  display: flex;
`;
const LoadMoreSentinel = styled.div`
  height: 1px;
  width: 100%;
  flex-shrink: 0;
  overflow-anchor: none;
`;
const DefaultSkeletonContainer = styled.div`
  padding: 6px 20px;
  margin: 6px;
  display: flex;
  justify-content: center;
`;
