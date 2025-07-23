import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { Fragment, ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'src/components/input/textInput/TextInput';
import { colors, shadows, styles } from 'src/constants';

export interface TreeSelectData<T> {
  displayName: string;
  data?: T;
  id: string;
  children?: TreeSelectData<T>[];
  textColor?: string;
  suffixIcon?: ReactNode;
}

export interface TreeSelectRoot<T> {
  label?: string;
  data: TreeSelectData<T>[];
}

interface SearchText {
  menuSearchText: string;
  subMenuSearchText: string;
}

export type TreeSelectProps<T> = {
  data: TreeSelectRoot<T>[];
  onChange: (value: { id: string; data: T | null }) => void;
  placeholder?: string;
  globalSearchLabel?: string;
  style?: React.CSSProperties;
  isEnableSearch?: boolean;
};

// 找尋所有子項目
function findChild<T>(
  data: TreeSelectData<T>,
): [string, TreeSelectData<T>][] {
  const { id, children } = data;
  const target: [string, TreeSelectData<T>][] = [[id, data]];
  // 沒有 Children 代表是 Child
  if (!children) return target;
  if (children.length <= 0) return [];
  return children.flatMap((item) => {
    return findChild(item);
  });
}
// 找尋所有父項目
function findParent<T>(
  data: TreeSelectData<T>,
): [string, TreeSelectData<T>][] {
  const { id, children } = data;
  const target: [string, TreeSelectData<T>][] = [[id, data]];
  // 沒有 Children 代表是 Child
  if (!children) return [];
  return [
    ...target,
    ...children.flatMap((item) => {
      return findParent(item);
    }),
  ];
}

export default function TreeSelect<T>(props: TreeSelectProps<T>) {
  const {
    data,
    onChange,
    placeholder = '輸入關鍵字',
    globalSearchLabel,
    style,
    isEnableSearch = true,
  } = props;

  const [selectedMenu, setSelectedMenu] = useState<
    TreeSelectData<T>[]
  >([]);
  const [searchText, setSearchText] = useState<SearchText>({
    menuSearchText: '',
    subMenuSearchText: '',
  });
  const [refScrollInfo, setRefScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  const scrollRef = useRef(null);
  const isRootMenuSearching = searchText.menuSearchText !== '';
  const searchFilter = (
    data: TreeSelectData<T>[],
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
  const subMenu = (() => {
    if (selectedMenu.length <= 0) return;
    if (!selectedLastMenu || !selectedLastMenu.children) return;
    return searchFilter(
      selectedLastMenu.children,
      searchText.subMenuSearchText,
    );
  })();

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

  const allChildMap: Map<string, TreeSelectData<T>> = (() => {
    const allChildArray = data
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
    return data.map((item) => {
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

  return (
    <Container style={style}>
      {selectedLastMenu ? (
        <Wrapper>
          <PreviousButton
            onClick={() => {
              setSelectedMenu((prev) => [
                ...prev.slice(0, prev.length - 1),
              ]);
              setSearchText((prev) => ({
                ...prev,
                menuSearchText: '',
                subMenuSearchText: '',
              }));
              // HACK: 因觸發時為 `subMenu` 的 ref 不會為 `Menu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
              setTimeout(() => {
                handleScroll();
              }, 0);
            }}
          >
            <PreviousIcon>
              <ChevronLeftIcon />
            </PreviousIcon>
            {selectedLastMenu.displayName}
          </PreviousButton>
          {isEnableSearch && (
            <Search
              prefix={<MagnifyingGlassIcon />}
              placeholder={placeholder}
              onChange={(value) =>
                setSearchText((prev) => ({
                  ...prev,
                  subMenuSearchText: value,
                }))
              }
            />
          )}
          {subMenu && (
            <SubMenu
              ref={scrollRef}
              onScroll={handleScroll}
              $isScrollAtTop={isScrollAtTop}
              $isScrollAtBottom={isScrollAtBottom}
            >
              {subMenu.map((item: TreeSelectData<T>) => (
                <MenuItem
                  key={item.id}
                  onClick={() => {
                    if (item.children && item.children.length !== 0) {
                      setSelectedMenu((prev) => [...prev, item]);
                      // HACK: 因觸發時為 `Menu` 的 ref 不會為 `subMenu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
                      setTimeout(() => {
                        handleScroll();
                      }, 0);
                    } else {
                      onChange({
                        id: item.id,
                        data: item.data ?? null,
                      });
                    }
                  }}
                >
                  <MenuItemName title={item.displayName}>
                    {item.displayName}
                  </MenuItemName>
                  {item.suffixIcon ? (
                    <SubMenuItemIcon>
                      {item.suffixIcon}
                    </SubMenuItemIcon>
                  ) : null}
                  {item.children !== undefined &&
                    item.children.length >= 0 && (
                      <MenuItemIcon>
                        <ChevronRightIcon width={20} height={20} />
                      </MenuItemIcon>
                    )}
                </MenuItem>
              ))}
            </SubMenu>
          )}
        </Wrapper>
      ) : (
        <Wrapper>
          {isEnableSearch && (
            <Search
              prefix={<MagnifyingGlassIcon />}
              placeholder={placeholder}
              onChange={(value) =>
                setSearchText((prev) => ({
                  ...prev,
                  menuSearchText: value,
                }))
              }
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
                      const { displayName } = child;
                      return (
                        <MenuItem
                          key={`${child.id}`}
                          $textColor={child.textColor}
                          onClick={() =>
                            onChange({
                              id: child.id,
                              data: child.data ?? null,
                            })
                          }
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
                        const { displayName } = child;
                        return (
                          <MenuItem
                            key={child.id}
                            $textColor={child.textColor}
                            $isEmpty={
                              Array.isArray(child.children) &&
                              child.children.length === 0
                            }
                            onClick={() => {
                              if (
                                child.children &&
                                child.children.length !== 0
                              ) {
                                setSelectedMenu((prev) => [
                                  ...prev,
                                  child,
                                ]);
                                // HACK: 因觸發時為 `Menu` 的 ref 不會為 `subMenu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
                                setTimeout(() => {
                                  handleScroll();
                                }, 0);
                              } else {
                                onChange({
                                  id: child.id,
                                  data: child.data ?? null,
                                });
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
              data.map((items, index) => {
                const itemsData = searchFilter(
                  items.data,
                  searchText.menuSearchText,
                );
                if (itemsData.length === 0) return;
                return (
                  <Fragment key={`Fragment_${index}`}>
                    <MenuItems>
                      {itemsData.map((item: TreeSelectData<T>) => (
                        <MenuItem
                          key={item.id}
                          $textColor={item.textColor}
                          $isEmpty={
                            Array.isArray(item.children) &&
                            item.children.length === 0
                          }
                          onClick={() => {
                            if (
                              item.children &&
                              item.children.length !== 0
                            ) {
                              setSelectedMenu((prev) => [
                                ...prev,
                                item,
                              ]);
                              // HACK: 因觸發時為 `Menu` 的 ref 不會為 `subMenu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
                              setTimeout(() => {
                                handleScroll();
                              }, 0);
                            } else {
                              onChange({
                                id: item.id,
                                data: item.data ?? null,
                              });
                            }
                          }}
                        >
                          <MenuItemName title={item.displayName}>
                            {item.displayName}
                          </MenuItemName>
                          {item.children !== undefined &&
                            item.children.length >= 0 && (
                              <MenuItemIcon>
                                <ChevronRightIcon
                                  width={20}
                                  height={20}
                                />
                              </MenuItemIcon>
                            )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Fragment>
                );
              })}
          </Menu>
        </Wrapper>
      )}
    </Container>
  );
}
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
    background: ${colors.grayscale150};
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
