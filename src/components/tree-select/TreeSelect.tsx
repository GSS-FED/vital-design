import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { Fragment, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'src/components/input/textInput/TextInput';
import { colors, shadows, styles } from 'src/constants';

interface TreeSelectData {
  displayName: string;
  subjectId: string;
  children?: TreeSelectData[];
  textColor?: string;
  isManager?: boolean;
}

interface TreeSelectRoot {
  label?: string;
  data: TreeSelectData[];
}

interface SearchText {
  menuSearchText: string;
  subMenuSearchText: string;
}

export type TreeSelectProps = {
  data: TreeSelectRoot[];
  onChange: (value: TreeSelectData) => void;
  placeholder?: string;
  globalSearchLabel?: string;
  style?: React.CSSProperties;
};

// 找尋所有子項目
const findChild = (
  data: TreeSelectData,
): [string, TreeSelectData][] => {
  const { subjectId, children } = data;
  const target: [string, TreeSelectData][] = [[subjectId, data]];
  // 沒有 Children 代表是 Child
  if (!children) return target;
  // 有 Children 的則都是組織
  if (children.length <= 0) return [];
  return children.flatMap((item) => {
    return findChild(item);
  });
};
// 找尋所有父項目
const findParent = (
  data: TreeSelectData,
): [string, TreeSelectData][] => {
  const { subjectId, children } = data;
  const target: [string, TreeSelectData][] = [[subjectId, data]];
  // 沒有 Children 代表是 Child
  if (!children) return [];
  return [
    ...target,
    ...children.flatMap((item) => {
      return findParent(item);
    }),
  ];
};

export default function TreeSelect(props: TreeSelectProps) {
  const {
    data,
    onChange,
    placeholder = '輸入關鍵字',
    globalSearchLabel,
    style,
  } = props;

  const [selectedMenu, setSelectedMenu] = useState<TreeSelectData[]>(
    [],
  );
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
    data: TreeSelectData[],
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

  const allChildMap: Map<string, TreeSelectData> = (() => {
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
          {subMenu && (
            <SubMenu
              ref={scrollRef}
              onScroll={handleScroll}
              $isScrollAtTop={isScrollAtTop}
              $isScrollAtBottom={isScrollAtBottom}
            >
              {subMenu.map((item: TreeSelectData) => (
                <MenuItem
                  key={item.subjectId}
                  onClick={() => {
                    if (item.children && item.children.length !== 0) {
                      setSelectedMenu((prev) => [...prev, item]);
                      // HACK: 因觸發時為 `Menu` 的 ref 不會為 `subMenu`的 ref 而導致 scroll 資訊不正確，暫由 setTimeout 解決
                      setTimeout(() => {
                        handleScroll();
                      }, 0);
                    } else {
                      onChange(item);
                    }
                  }}
                >
                  <MenuItemName title={item.displayName}>
                    {item.displayName}
                  </MenuItemName>
                  {item.isManager && (
                    <SubMenuItemIcon>
                      <Crown />
                    </SubMenuItemIcon>
                  )}
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
                          key={`${child.subjectId}`}
                          $textColor={child.textColor}
                          onClick={() => onChange(child)}
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
                            key={child.subjectId}
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
                                onChange(child);
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
                const allUser = items.data.filter((item) => {
                  return item.subjectId === 'allMembers';
                })[0]?.children;
                const searchedAllUser = searchFilter(
                  allUser ?? [],
                  searchText.menuSearchText,
                );
                if (
                  itemsData.length === 0 &&
                  searchedAllUser.length === 0
                )
                  return;
                return (
                  <Fragment key={`Fragment_${index}`}>
                    <MenuItems>
                      {itemsData.map((item: TreeSelectData) => (
                        <MenuItem
                          key={item.subjectId}
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
                              onChange(item);
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

function Crown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34l-5.8 11.6L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7l-72-57.6L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0l4.4 23.9L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6l41.4-227.5 4.4-23.9c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-17.1 13.7-72 57.6c-15.9 12.7-39.5 7.5-48.6-10.7L314.8 117.7 309 106zM133.7 418.9L102.2 245.6l28.9 23.1c39.8 31.8 98.8 18.9 121.5-26.7L288 171.3l35.4 70.7c22.8 45.6 81.8 58.5 121.5 26.7l28.9-23.1L442.3 418.9c-1.4 7.6-8 13.1-15.7 13.1l-277.2 0c-7.7 0-14.4-5.5-15.7-13.1z" />
    </svg>
  );
}
