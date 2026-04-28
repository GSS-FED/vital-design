'use client';

import {
  Cascader,
  CascaderBackItem,
  CascaderContent,
  CascaderGroup,
  CascaderItem,
  CascaderItemIndicator,
  CascaderItemText,
  CascaderList,
  CascaderSearch,
  CascaderTrigger,
  CascaderValue,
} from '@/components/cascader/Cascader';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

type LocationItem = {
  hasChildren?: boolean;
  label: string;
  parentValue: string | null;
  value: string;
};

type SelectedLocation = {
  label: string;
  path: LocationItem[];
  value: string;
};

const items: LocationItem[] = [
  {
    label: 'Taiwan',
    parentValue: null,
    value: 'tw',
    hasChildren: true,
  },
  {
    label: 'Japan',
    parentValue: null,
    value: 'jp',
    hasChildren: true,
  },
  { label: 'Taipei', parentValue: 'tw', value: 'tpe' },
  { label: 'Kaohsiung', parentValue: 'tw', value: 'khh' },
  { label: 'Tokyo', parentValue: 'jp', value: 'tky' },
  { label: 'Osaka', parentValue: 'jp', value: 'osa' },
];

function getItems(parentValue: string | null, searchValue: string) {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  return items.filter((item) => {
    if (item.parentValue !== parentValue) return false;
    if (!normalizedSearchValue) return true;

    return item.label.toLowerCase().includes(normalizedSearchValue);
  });
}

export function CascaderPreview() {
  const [value, setValue] = useState<SelectedLocation | null>(null);
  const [pages, setPages] = useState<LocationItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const currentPage = pages[pages.length - 1] ?? null;
  const visibleItems = getItems(
    currentPage?.value ?? null,
    searchValue,
  );

  const openPage = (item: LocationItem) => {
    setPages((prev) => [...prev, item]);
    setSearchValue('');
  };

  const selectItem = (item: LocationItem) => {
    setValue({
      label: item.label,
      path: [...pages, item],
      value: item.value,
    });
    setPages([]);
    setSearchValue('');
  };

  return (
    <ComponentPreview>
      <Cascader
        pageKey={currentPage?.value}
        searchValue={searchValue}
        canGoBack={pages.length > 0}
        width="240px"
        onBack={() => {
          setPages((prev) => prev.slice(0, -1));
        }}
        onSearchValueChange={setSearchValue}
      >
        <CascaderTrigger
          clearable={value !== null}
          onClear={() => {
            setValue(null);
            setPages([]);
            setSearchValue('');
          }}
        >
          <CascaderValue placeholder="Select location">
            {value?.label}
          </CascaderValue>
        </CascaderTrigger>
        <CascaderContent>
          <CascaderBackItem>{currentPage?.label}</CascaderBackItem>
          <CascaderSearch placeholder="Search locations" />
          <CascaderList>
            <CascaderGroup>
              {visibleItems.map((item) => (
                <CascaderItem
                  key={item.value}
                  value={item.value}
                  closeOnSelect={!item.hasChildren}
                  onSelect={() => {
                    if (item.hasChildren) {
                      openPage(item);
                      return;
                    }

                    selectItem(item);
                  }}
                >
                  <CascaderItemText>{item.label}</CascaderItemText>
                  {item.hasChildren ? (
                    <CascaderItemIndicator />
                  ) : null}
                </CascaderItem>
              ))}
            </CascaderGroup>
          </CascaderList>
        </CascaderContent>
      </Cascader>
    </ComponentPreview>
  );
}
