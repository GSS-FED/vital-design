import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildReviewTree,
  reviewGroupingConfig,
  reviewTasks,
} from './components/data';
import { DataTable } from './components/data-table';

function renderTable(
  props: {
    grouping?: readonly string[];
  } = {},
) {
  return render(
    <DataTable groupingConfig={reviewGroupingConfig} {...props} />,
  );
}

function groupRows(title: string) {
  return screen.getAllByRole('row').filter((element) => {
    return (
      element.getAttribute('data-slot') === 'data-table-group-row' &&
      within(element).queryByRole('button', { name: title })
    );
  });
}

function groupRow(title: string) {
  const row = groupRows(title)[0];
  if (!row) throw new Error(`Missing group row ${title}`);
  return row;
}

/**
 * jsdom runs no exit animation, so Base UI unmounts a closed popover
 * a few frames after it reports closed.
 */
async function waitForPanelClosed() {
  await waitFor(() =>
    expect(
      screen.queryByRole('combobox', { name: '分群' }),
    ).not.toBeInTheDocument(),
  );
}

function fieldGrips() {
  return screen
    .getAllByRole('button', { name: /^調整.+的順序$/ })
    .map((grip) =>
      grip.getAttribute('aria-label')?.replace(/^調整|的順序$/g, ''),
    );
}

/** jsdom has no PointerEvent; React only needs the type, button and clientY. */
function pointer(
  target: Element | Document | Window,
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  clientY = 0,
) {
  fireEvent(
    target,
    new MouseEvent(type, { bubbles: true, button: 0, clientY }),
  );
}

function getRow(index: number) {
  const row = screen.getAllByRole('row')[index];
  if (!row) {
    throw new Error(`Expected row ${index} to exist`);
  }
  return row;
}

describe('DataTable', () => {
  it('shows a status tag and an avatar group overflow count', () => {
    renderTable();

    const firstRow = getRow(1);
    expect(
      within(firstRow).getByRole('button', { name: '狀態 待覆核' }),
    ).toBeInTheDocument();
    expect(within(firstRow).getByText('+1')).toBeInTheDocument();
    expect(
      within(firstRow).getByRole('group', {
        name: '林○方、張○安、陳○思、黃○鋪',
      }),
    ).toBeInTheDocument();
  });

  it('sorts by due date', async () => {
    renderTable();
    const user = userEvent.setup();

    expect(
      within(getRow(1)).getByText('溫室氣體盤查'),
    ).toBeInTheDocument();

    const dueHeader = screen.getByRole('columnheader', {
      name: '期限',
    });
    await user.click(within(dueHeader).getByRole('button'));

    expect(within(dueHeader).getByRole('button')).toHaveAttribute(
      'data-sort',
      'asc',
    );
    expect(
      within(getRow(1)).getByText('水資源管理'),
    ).toBeInTheDocument();
  });

  it('cycles a number column from ascending to descending to unsorted', async () => {
    renderTable();
    const user = userEvent.setup();
    const sort = within(
      screen.getByRole('columnheader', { name: '協作者' }),
    ).getByRole('button');

    const head = screen.getByRole('columnheader', { name: '協作者' });
    expect(head).toHaveAttribute('aria-sort', 'none');

    await user.click(sort);
    expect(sort).toHaveAttribute('data-sort', 'asc');
    expect(head).toHaveAttribute('aria-sort', 'ascending');
    expect(
      within(getRow(1)).getByText('水資源管理'),
    ).toBeInTheDocument();

    await user.click(sort);
    expect(sort).toHaveAttribute('data-sort', 'desc');
    expect(head).toHaveAttribute('aria-sort', 'descending');
    expect(
      within(getRow(1)).getByText('供應鏈問卷'),
    ).toBeInTheDocument();

    await user.click(sort);
    expect(sort).not.toHaveAttribute('data-sort');
    expect(
      within(getRow(1)).getByText('溫室氣體盤查'),
    ).toBeInTheDocument();
  });

  it('resizes a column from the keyboard', async () => {
    renderTable();
    const user = userEvent.setup();
    const table = screen.getByRole('table');
    const handle = screen.getByRole('separator', {
      name: '調整期限欄寬',
    });
    const before = Number.parseFloat(table.style.width);

    handle.focus();
    await user.keyboard('{ArrowRight}');

    expect(handle).toHaveAttribute('aria-valuenow', '128');
    expect(Number.parseFloat(table.style.width)).toBe(before + 8);
    expect(
      screen.queryByRole('separator', { name: /調整select/ }),
    ).not.toBeInTheDocument();
  });

  it('acts on the selected rows the search still shows', async () => {
    renderTable();
    const user = userEvent.setup();

    expect(
      screen.queryByRole('toolbar', { name: '已選取的任務' }),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
    );
    await user.click(
      screen.getByRole('checkbox', { name: '選取 水資源管理' }),
    );
    const bar = screen.getByRole('toolbar', { name: '已選取的任務' });
    expect(within(bar).getByRole('status')).toHaveTextContent(
      '已選擇 2 筆',
    );

    await user.type(
      screen.getByPlaceholderText('搜尋任務'),
      '水資源',
    );
    expect(within(bar).getByRole('status')).toHaveTextContent(
      '已選擇 1 筆',
    );
    expect(
      within(bar).queryByRole('button', { name: /全選/ }),
    ).not.toBeInTheDocument();

    await user.click(
      within(bar).getByRole('button', { name: '刪除' }),
    );
    await user.clear(screen.getByPlaceholderText('搜尋任務'));

    expect(screen.queryByText('水資源管理')).not.toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
    ).toBeChecked();
    // The search hid every selected row for a moment, so this is a new bar.
    const restored = screen.getByRole('toolbar', {
      name: '已選取的任務',
    });
    const remaining = reviewTasks.length - 1;
    await user.click(
      within(restored).getByRole('button', {
        name: `全選 ${remaining} 筆`,
      }),
    );
    expect(within(restored).getByRole('status')).toHaveTextContent(
      `已選擇 ${remaining} 筆`,
    );
    // 全選 is gone now; focus stays in the bar.
    expect(
      within(restored).getByRole('button', { name: '刪除' }),
    ).toHaveFocus();

    await user.click(
      within(restored).getByRole('button', { name: '取消選取' }),
    );
    expect(
      screen.queryByRole('toolbar', { name: '已選取的任務' }),
    ).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('搜尋任務')).toHaveFocus();
  });

  describe('selection bar exit', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    function stubAnimations(running: () => object[]) {
      class FakeCSSAnimation {}
      vi.stubGlobal('CSSAnimation', FakeCSSAnimation);
      // src/vitest-setup.ts gives jsdom an empty getAnimations.
      vi.spyOn(
        HTMLElement.prototype,
        'getAnimations',
      ).mockImplementation(() => running() as Animation[]);
      return FakeCSSAnimation;
    }

    it('waits for the exit animation before unmounting', async () => {
      const FakeCSSAnimation = stubAnimations(() => [
        new FakeCSSAnimation(),
      ]);
      renderTable();
      const user = userEvent.setup();
      await user.click(
        screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
      );
      const bar = screen.getByRole('toolbar', {
        name: '已選取的任務',
      });

      await user.click(
        within(bar).getByRole('button', { name: '取消選取' }),
      );
      expect(bar).toHaveAttribute('data-state', 'closed');
      expect(bar).toHaveTextContent('已選擇 1 筆');

      fireEvent.animationEnd(bar);
      expect(bar).not.toBeInTheDocument();
    });

    it('unmounts at once when only a transition is running', async () => {
      // Reduced motion: no exit animation, but the opacity change may
      // still start a CSS transition, which never fires animationend.
      stubAnimations(() => [{}]);
      renderTable();
      const user = userEvent.setup();
      await user.click(
        screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
      );
      const bar = screen.getByRole('toolbar', {
        name: '已選取的任務',
      });

      await user.click(
        within(bar).getByRole('button', { name: '取消選取' }),
      );
      expect(bar).not.toBeInTheDocument();
    });
  });

  it('edits a single title cell', async () => {
    renderTable();
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', { name: '溫室氣體盤查' }),
    );
    const input = screen.getByDisplayValue('溫室氣體盤查');
    await user.clear(input);
    await user.type(input, '溫室氣體盤查修訂');
    await user.keyboard('{Enter}');

    expect(
      screen.getByRole('button', { name: '溫室氣體盤查修訂' }),
    ).toBeInTheDocument();
  });

  it('gives editable cells a different background', () => {
    renderTable();
    const row = getRow(1);
    const cells = within(row).getAllByRole('cell');
    const status = cells.find((cell) =>
      within(cell).queryByRole('button', { name: '狀態 待覆核' }),
    );

    expect(
      within(row).getByRole('cell', { name: '溫室氣體盤查' }),
    ).toHaveClass('cursor-pointer', 'hover:bg-grayscale-opacity-200');
    expect(status).toHaveClass(
      'cursor-pointer',
      'hover:bg-grayscale-opacity-200',
    );
    expect(
      within(row).getByRole('cell', { name: '2026/03/18' }),
    ).not.toHaveClass('hover:bg-grayscale-opacity-200');
  });

  it('pins the actions menu to the right and deletes that row', async () => {
    renderTable();
    const user = userEvent.setup();
    const firstRow = getRow(1);
    const cell = within(firstRow).getByRole('cell', {
      name: '操作',
    });

    expect(cell).toHaveAttribute('data-pinned', 'right');
    expect(cell).toHaveClass('px-3');
    expect(cell).toHaveStyle({ position: 'sticky', right: '0px' });

    fireEvent.click(
      within(cell).getByRole('button', { name: '更多操作' }),
    );
    await user.click(
      await screen.findByRole('menuitem', { name: '刪除' }),
    );

    expect(
      screen.queryByText('溫室氣體盤查'),
    ).not.toBeInTheDocument();
  });

  it('switches grouping depth from the toolbar and keeps an empty project', async () => {
    renderTable();
    const user = userEvent.setup();
    const toolbar = screen.getByRole('toolbar');

    expect(
      screen.queryByRole('button', { name: '治理與揭露' }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      within(toolbar).getByRole('button', { name: '分群' }),
    );
    const groupField = screen.getByRole('combobox', { name: '分群' });
    const subgroupField = screen.getByRole('combobox', {
      name: '子分群',
    });
    expect(groupField).toHaveTextContent('無');
    expect(subgroupField).toBeDisabled();
    fireEvent.click(groupField);
    expect(
      await screen.findByRole('option', { name: '任務' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: '期限' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: '專案' }));
    await user.keyboard('{Escape}');
    await waitForPanelClosed();

    expect(
      screen.getByRole('button', { name: '環境盤查' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '社會參與' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '治理與揭露' }),
    ).toBeInTheDocument();
    expect(screen.getByText('溫室氣體盤查')).toBeInTheDocument();

    fireEvent.click(
      within(toolbar).getByRole('button', { name: '分群' }),
    );
    const subgroup = screen.getByRole('combobox', { name: '子分群' });
    fireEvent.click(subgroup);
    const subgroupList = screen.getAllByRole('listbox').at(-1);
    if (!subgroupList) throw new Error('missing subgroup list');
    expect(
      within(subgroupList).queryByRole('option', { name: '專案' }),
    ).not.toBeInTheDocument();
    expect(
      within(subgroupList).getByRole('option', { name: '任務' }),
    ).toBeInTheDocument();
    await user.click(
      within(subgroupList).getByRole('option', { name: '狀態' }),
    );
    expect(
      within(toolbar).getByRole('button', { name: '分群' }),
    ).toBeInTheDocument();

    const statusGroup = screen.getByRole('button', {
      name: '待填寫',
    });
    expect(statusGroup).toHaveStyle({ left: '40px' });
    expect(groupRow('待填寫')).toHaveStyle({
      top: '37px',
    });
    expect(screen.getByText('水資源管理')).toBeInTheDocument();
  });

  it('keeps the last status add row border and puts the gap below it', async () => {
    renderTable({ grouping: ['project', 'status'] });
    const user = userEvent.setup();

    const lastAdd = within(
      screen.getByRole('row', {
        name: '在環境盤查的已完成新增任務',
      }),
    )
      .getAllByRole('cell')
      .find((cell) => within(cell).queryByRole('button'));
    const earlierAdd = within(
      screen.getByRole('row', {
        name: '在環境盤查的待填寫新增任務',
      }),
    )
      .getAllByRole('cell')
      .find((cell) => within(cell).queryByRole('button'));
    const gaps = () =>
      screen
        .getAllByRole('row', { hidden: true })
        .filter(
          (row) =>
            row.getAttribute('data-slot') === 'data-table-group-gap',
        );

    expect(lastAdd).toHaveClass('border-b');
    expect(lastAdd).not.toHaveClass('pb-3');
    expect(earlierAdd).not.toHaveClass('pb-3');
    expect(gaps()).toHaveLength(2);

    await user.click(
      screen.getByRole('button', { name: '社會參與' }),
    );

    expect(
      within(
        screen.getByRole('row', {
          name: '在環境盤查的已完成新增任務',
        }),
      )
        .getAllByRole('cell')
        .find((cell) => within(cell).queryByRole('button')),
    ).toHaveClass('border-b');
    expect(gaps()).toHaveLength(1);

    await user.click(
      screen.getByRole('button', { name: '環境盤查' }),
    );
    expect(
      screen.queryByRole('button', {
        name: '在環境盤查的已完成新增任務',
      }),
    ).not.toBeInTheDocument();
    expect(gaps()).toHaveLength(0);
  });

  it('keeps a one-level add row against the next group header', () => {
    renderTable({ grouping: ['project'] });

    expect(
      within(
        screen.getByRole('row', { name: '在環境盤查新增任務' }),
      ).getByRole('cell'),
    ).toHaveClass('border-b-0');
    expect(
      within(
        screen.getByRole('row', { name: '在治理與揭露新增任務' }),
      ).getByRole('cell'),
    ).toHaveClass('border-b');
    expect(groupRow('社會參與')).toBeInTheDocument();
    expect(
      screen
        .queryAllByRole('row', { hidden: true })
        .some(
          (row) =>
            row.getAttribute('data-slot') === 'data-table-group-gap',
        ),
    ).toBe(false);
  });

  it('collapses a group without removing the other groups', async () => {
    renderTable({ grouping: ['project'] });
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', { name: '環境盤查' }),
    );

    expect(
      screen.queryByText('溫室氣體盤查'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('供應鏈問卷')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: '環境盤查' }),
    );
    expect(screen.getByText('溫室氣體盤查')).toBeInTheDocument();
  });

  it('selects rows from the pinned checkbox column', async () => {
    renderTable();
    const user = userEvent.setup();
    const all = screen.getByRole('checkbox', { name: '全選' });
    const first = screen.getByRole('checkbox', {
      name: '選取 溫室氣體盤查',
    });
    const cell = screen.getByRole('cell', {
      name: '選取 溫室氣體盤查',
    });

    expect(cell).toHaveAttribute('data-pinned', 'left');
    expect(cell).toHaveStyle({ position: 'sticky', left: '0px' });

    await user.click(all);
    expect(first).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 水資源管理' }),
    ).toBeChecked();

    await user.click(first);
    expect(first).not.toBeChecked();
    expect(all).not.toBeChecked();
    expect(all).toHaveAttribute('data-indeterminate');
    expect(
      screen.getByRole('row', { name: /水資源管理/ }),
    ).toHaveAttribute('data-state', 'selected');
  });

  it('indents task rows to the grouping level', () => {
    {
      const view = renderTable();
      expect(
        screen.getByRole('cell', { name: '選取 溫室氣體盤查' }),
      ).not.toHaveStyle({ paddingLeft: '24px' });
      view.unmount();
    }

    {
      const view = renderTable({ grouping: ['project'] });
      expect(
        screen.getByRole('cell', { name: '選取 溫室氣體盤查' }),
      ).not.toHaveStyle({ paddingLeft: '24px' });
      expect(
        screen.getByRole('button', { name: '在環境盤查新增任務' }),
      ).not.toHaveStyle({ paddingLeft: '36px' });
      view.unmount();
    }

    renderTable({ grouping: ['project', 'status'] });
    expect(
      screen.getByRole('cell', { name: '選取 溫室氣體盤查' }),
    ).toHaveStyle({
      borderLeftWidth: '1px',
      left: '40px',
    });
    expect(
      screen.getAllByRole('columnheader', { name: /全選/ })[0],
    ).toHaveStyle({ borderTopWidth: '1px' });
    expect(
      screen.getByRole('button', { name: '在治理與揭露新增任務' }),
    ).not.toHaveStyle({ paddingLeft: '36px' });
  });

  it('keeps a checkbox on task rows when the table is grouped', () => {
    renderTable({ grouping: ['project'] });

    expect(
      screen.getAllByRole('checkbox', { name: /全選/ }).length,
    ).toBeGreaterThan(1);
    expect(
      screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
    ).toBeInTheDocument();
    expect(
      within(groupRow('環境盤查')).queryByRole('checkbox'),
    ).not.toBeInTheDocument();
  });

  it('selects only the group whose checkbox was used', async () => {
    renderTable({ grouping: ['project'] });
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('checkbox', { name: '全選 環境盤查' }),
    );

    expect(
      screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 水資源管理' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 供應鏈問卷' }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '全選 社會參與' }),
    ).not.toBeChecked();
    expect(screen.getByText('溫室氣體盤查')).toBeInTheDocument();

    await user.click(
      screen.getByRole('checkbox', { name: '選取 水資源管理' }),
    );
    expect(
      screen.getByRole('checkbox', { name: '全選 環境盤查' }),
    ).toHaveAttribute('data-indeterminate');

    await user.click(
      screen.getByRole('checkbox', { name: '全選 社會參與' }),
    );
    expect(
      screen.getByRole('checkbox', { name: '選取 供應鏈問卷' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
    ).toBeChecked();
  });

  it('keeps a nested status select-all inside that status', async () => {
    renderTable({ grouping: ['project', 'status'] });
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('checkbox', { name: '全選 環境盤查 待填寫' }),
    );

    expect(
      screen.getByRole('checkbox', { name: '選取 水資源管理' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 生物多樣性' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 環境盤查' }),
    ).toHaveAttribute('data-indeterminate');
    expect(
      within(groupRow('待填寫')).queryByRole('checkbox'),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('checkbox', { name: '選取 環境盤查' }),
    );
    expect(
      screen.getByRole('checkbox', { name: '選取 水資源管理' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 溫室氣體盤查' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '全選 環境盤查 待覆核' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 供應鏈問卷' }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '選取 社會參與' }),
    ).not.toBeChecked();
    expect(
      within(groupRow('治理與揭露')).getByRole('checkbox', {
        name: '選取 治理與揭露',
      }),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('hides a column only after the field card is saved', async () => {
    renderTable();
    const user = userEvent.setup();
    const open = () =>
      fireEvent.click(
        screen.getByRole('button', { name: '顯示欄位' }),
      );

    open();
    const locked = screen.getByRole('checkbox', { name: '任務' });
    expect(locked).toHaveAttribute('aria-disabled', 'true');
    expect(locked).toBeChecked();

    await user.click(screen.getByRole('checkbox', { name: '備註' }));
    await user.click(screen.getByRole('button', { name: '取消' }));

    expect(
      screen.getByRole('columnheader', { name: '備註' }),
    ).toBeInTheDocument();

    open();
    await user.click(screen.getByRole('checkbox', { name: '備註' }));
    await user.click(screen.getByRole('button', { name: '儲存' }));

    expect(
      screen.queryByRole('columnheader', { name: '備註' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '任務' }),
    ).toBeInTheDocument();
  });

  it('reorders columns from the field card only after it is saved', async () => {
    renderTable();
    const user = userEvent.setup();
    const fieldNames = ['任務', '狀態', '協作者', '期限', '備註'];
    const headerOrder = () =>
      screen
        .getAllByRole('columnheader')
        .map((head) => head.getAttribute('aria-label'))
        .filter((name) => name !== null && fieldNames.includes(name));
    const moveDueUpTwice = async () => {
      fireEvent.click(
        screen.getByRole('button', { name: '顯示欄位' }),
      );
      screen.getByRole('button', { name: '調整期限的順序' }).focus();
      await user.keyboard('{ArrowUp}{ArrowUp}');
    };

    await moveDueUpTwice();
    await user.click(screen.getByRole('button', { name: '取消' }));
    expect(headerOrder()).toEqual(fieldNames);

    await moveDueUpTwice();
    await user.click(screen.getByRole('button', { name: '儲存' }));
    expect(headerOrder()).toEqual([
      '任務',
      '期限',
      '狀態',
      '協作者',
      '備註',
    ]);

    fireEvent.click(screen.getByRole('button', { name: '顯示欄位' }));
    expect(
      screen
        .getAllByRole('button', { name: /^調整.+的順序$/ })
        .map((grip) => grip.getAttribute('aria-label')),
    ).toEqual([
      '調整任務的順序',
      '調整期限的順序',
      '調整狀態的順序',
      '調整協作者的順序',
      '調整備註的順序',
    ]);
  });

  it('hides unchecked fields in the card and reorders among the rest', async () => {
    renderTable();
    const user = userEvent.setup();
    const grips = () =>
      screen
        .getAllByRole('button', { name: /^調整.+的順序$/ })
        .map((grip) =>
          grip
            .getAttribute('aria-label')
            ?.replace(/^調整|的順序$/g, ''),
        );

    fireEvent.click(screen.getByRole('button', { name: '顯示欄位' }));
    const toggle = screen.getByRole('switch', {
      name: '顯示未勾選項目',
    });
    expect(toggle).toBeChecked();
    await user.click(
      screen.getByRole('checkbox', { name: '協作者' }),
    );
    await user.click(toggle);

    expect(
      screen.queryByRole('checkbox', { name: '協作者' }),
    ).not.toBeInTheDocument();
    expect(grips()).toEqual(['任務', '狀態', '期限', '備註']);

    // One step down among the rows on screen, past 期限.
    screen.getByRole('button', { name: '調整狀態的順序' }).focus();
    await user.keyboard('{ArrowDown}');
    expect(grips()).toEqual(['任務', '期限', '狀態', '備註']);

    await user.click(toggle);
    expect(grips()).toEqual([
      '任務',
      '協作者',
      '期限',
      '狀態',
      '備註',
    ]);

    await user.click(screen.getByRole('button', { name: '儲存' }));
    expect(
      screen
        .getAllByRole('columnheader')
        .map((head) => head.getAttribute('aria-label'))
        .filter((name) => name !== null && name !== '全選'),
    ).toEqual(['任務', '期限', '狀態', '備註']);
  });

  it('keeps focus on a grip moved down twice from the keyboard', async () => {
    renderTable();
    const user = userEvent.setup();
    // Let the popover finish moving initial focus before taking it.
    await user.click(
      screen.getByRole('button', { name: '顯示欄位' }),
    );
    screen.getByRole('button', { name: '調整狀態的順序' }).focus();

    await user.keyboard('{ArrowDown}{ArrowDown}');

    expect(fieldGrips()).toEqual([
      '任務',
      '協作者',
      '期限',
      '狀態',
      '備註',
    ]);
    expect(
      screen.getByRole('button', { name: '調整狀態的順序' }),
    ).toHaveFocus();
  });

  it('ends a field drag when the pointer is released off the grip', () => {
    renderTable();
    fireEvent.click(screen.getByRole('button', { name: '顯示欄位' }));
    const grip = () =>
      screen.getByRole('button', { name: '調整任務的順序' });

    // jsdom lays every row out at 0, so any clientY above 0 is below
    // every row and 0 is above them.
    pointer(grip(), 'pointerdown');
    pointer(grip(), 'pointermove', 100);
    expect(fieldGrips()).toEqual([
      '狀態',
      '協作者',
      '期限',
      '備註',
      '任務',
    ]);

    pointer(document.body, 'pointerup');
    pointer(grip(), 'pointermove', 0);
    expect(fieldGrips()).toEqual([
      '狀態',
      '協作者',
      '期限',
      '備註',
      '任務',
    ]);
  });

  it('clears hideable fields and keeps the locked field', async () => {
    renderTable();
    const user = userEvent.setup();

    fireEvent.click(screen.getByRole('button', { name: '顯示欄位' }));
    await user.click(
      screen.getByRole('button', { name: '清除選取' }),
    );

    expect(
      screen.getByRole('checkbox', { name: '任務' }),
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: '狀態' }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('columnheader', { name: '狀態' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '儲存' }));

    expect(
      screen.getByRole('columnheader', { name: '任務' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: '狀態' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: '協作者' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: '期限' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: '備註' }),
    ).not.toBeInTheDocument();
  });

  it('adds a task from the bottom row and keeps it after leaving the title', async () => {
    renderTable();
    const user = userEvent.setup();

    expect(
      within(screen.getByRole('toolbar')).queryByRole('button', {
        name: /新增/,
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('row', { name: '新增任務' })).toHaveClass(
      'bottom-0',
    );

    await user.click(
      screen.getByRole('button', { name: '新增任務' }),
    );
    const title = await screen.findByPlaceholderText('輸入任務');
    expect(title).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(
      screen.getByRole('button', { name: '輸入任務' }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: '輸入任務' }),
    );
    await user.type(
      screen.getByPlaceholderText('輸入任務'),
      '盤查補件',
    );
    await user.keyboard('{Enter}');

    expect(
      within(screen.getByRole('row', { name: /盤查補件/ })).getByRole(
        'button',
        { name: '狀態 待填寫' },
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      within(screen.getByRole('toolbar')).getByRole('button', {
        name: '分群',
      }),
    );
    fireEvent.click(screen.getByRole('combobox', { name: '分群' }));
    await user.click(
      await screen.findByRole('option', { name: '專案' }),
    );

    const taskRow = screen.getByRole('row', { name: /盤查補件/ });
    const project = groupRow('環境盤查');
    const next = groupRow('社會參與');
    expect(
      project.compareDocumentPosition(taskRow) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      taskRow.compareDocumentPosition(next) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('adds a task inside each project, including an empty one', async () => {
    renderTable({ grouping: ['project'] });
    const user = userEvent.setup();

    expect(
      screen.getAllByRole('button', { name: /新增任務$/ }),
    ).toHaveLength(3);
    expect(
      screen.getByRole('row', { name: '在治理與揭露新增任務' }),
    ).not.toHaveClass('bottom-0');

    await user.click(
      screen.getByRole('button', { name: '在環境盤查新增任務' }),
    );
    await user.type(
      await screen.findByPlaceholderText('輸入任務'),
      '盤查補件',
    );
    await user.keyboard('{Enter}');

    const taskRow = screen.getByRole('row', { name: /盤查補件/ });
    const project = groupRow('環境盤查');
    const next = groupRow('社會參與');
    expect(
      project.compareDocumentPosition(taskRow) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      taskRow.compareDocumentPosition(next) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    await user.click(
      screen.getByRole('button', { name: '在治理與揭露新增任務' }),
    );
    await user.type(
      await screen.findByPlaceholderText('輸入任務'),
      '治理首次',
    );
    await user.keyboard('{Enter}');

    const governance = groupRow('治理與揭露');
    const created = screen.getByRole('row', { name: /治理首次/ });
    expect(
      governance.compareDocumentPosition(created) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      within(created).getByRole('button', { name: '狀態 待填寫' }),
    ).toBeInTheDocument();
  });

  it('adds a task inside a status group, and on an empty project', async () => {
    renderTable({ grouping: ['project', 'status'] });
    const user = userEvent.setup();

    expect(
      screen.queryByRole('button', { name: '在環境盤查新增任務' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: '在環境盤查的待覆核新增任務',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '在治理與揭露新增任務' }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('columnheader', { name: '任務' }),
    ).toHaveLength(5);

    await user.click(
      screen.getByRole('button', {
        name: '在環境盤查的待覆核新增任務',
      }),
    );
    await user.type(
      await screen.findByPlaceholderText('輸入任務'),
      '覆核補件',
    );
    await user.keyboard('{Enter}');

    const review = groupRow('待覆核');
    const done = groupRows('已完成').find(
      (row) =>
        review.compareDocumentPosition(row) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    );
    const created = screen.getByRole('row', { name: /覆核補件/ });
    if (!done) {
      throw new Error('expected a following 已完成 group');
    }
    expect(
      within(created).getByRole('button', { name: '狀態 待覆核' }),
    ).toBeInTheDocument();
    expect(
      review.compareDocumentPosition(created) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      created.compareDocumentPosition(done) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    await user.click(
      screen.getByRole('button', { name: '在治理與揭露新增任務' }),
    );
    await user.type(
      await screen.findByPlaceholderText('輸入任務'),
      '治理首次',
    );
    await user.keyboard('{Enter}');

    expect(
      screen.queryByRole('button', { name: '在治理與揭露新增任務' }),
    ).not.toBeInTheDocument();
    const governance = groupRow('治理與揭露');
    const status = groupRows('待填寫').find(
      (row) =>
        governance.compareDocumentPosition(row) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    );
    if (!status) {
      throw new Error('expected a 待填寫 group under 治理與揭露');
    }
    const task = screen.getByRole('row', { name: /治理首次/ });
    expect(
      screen.getByRole('button', {
        name: '在治理與揭露的待填寫新增任務',
      }),
    ).toBeInTheDocument();
    expect(
      governance.compareDocumentPosition(status) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      status.compareDocumentPosition(task) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('adds a row under collaborators without breaking the list', async () => {
    renderTable({ grouping: ['collaboratorIds'] });
    const user = userEvent.setup();

    const [addRow] = screen.getAllByRole('button', {
      name: /新增任務/,
    });
    if (!addRow) throw new Error('missing add row');
    await user.click(addRow);

    expect(
      await screen.findByPlaceholderText('輸入任務'),
    ).toBeInTheDocument();
  });

  it('keeps grouping and add row after the last grouped row is deleted', async () => {
    render(
      <DataTable
        data={reviewTasks.slice(0, 1)}
        grouping={['status']}
      />,
    );
    const user = userEvent.setup();

    fireEvent.click(screen.getByRole('button', { name: '更多操作' }));
    await user.click(
      await screen.findByRole('menuitem', { name: '刪除' }),
    );

    expect(
      screen.getByRole('button', { name: '分群' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '新增任務' }),
    ).toBeInTheDocument();
  });

  it('closes the grouping panel on the dismiss after a choice', async () => {
    renderTable();
    const user = userEvent.setup();

    fireEvent.click(screen.getByRole('button', { name: '分群' }));
    fireEvent.click(screen.getByRole('combobox', { name: '分群' }));
    await user.click(
      await screen.findByRole('option', { name: '專案' }),
    );
    await user.keyboard('{Escape}');

    await waitForPanelClosed();
  });

  it('stretches the table to the card when columns are narrower', () => {
    renderTable();
    expect(screen.getByRole('table')).toHaveStyle({
      minWidth: '100%',
    });
  });
});

describe('buildReviewTree', () => {
  it('keeps row order when nothing is grouped', () => {
    expect(
      buildReviewTree(reviewTasks, []).flatMap((node) =>
        node.kind === 'task' ? [node.task.title] : [],
      ),
    ).toEqual(reviewTasks.map((task) => task.title));
  });

  it('sorts tasks inside a project and leaves the empty project in place', () => {
    const sorted = [...reviewTasks].sort((a, b) =>
      a.due.localeCompare(b.due),
    );
    const tree = buildReviewTree(
      sorted,
      ['project'],
      reviewGroupingConfig,
    );
    const environment = tree[0];
    if (environment?.kind !== 'group') {
      throw new Error('expected the first node to be a group');
    }

    expect(
      tree.flatMap((node) =>
        node.kind === 'group' ? [`${node.title} ${node.count}`] : [],
      ),
    ).toEqual(['環境盤查 5', '社會參與 3', '治理與揭露 0']);
    expect(
      environment.subRows.flatMap((node) =>
        node.kind === 'task' ? [node.task.title] : [],
      ),
    ).toEqual([
      '水資源管理',
      '生物多樣性',
      '溫室氣體盤查',
      '能源管理',
      '廢棄物清運',
    ]);
  });

  it('nests status under project and skips statuses with no rows', () => {
    const tree = buildReviewTree(
      reviewTasks,
      ['project', 'status'],
      reviewGroupingConfig,
    );
    const environment = tree[0];
    const governance = tree[2];
    if (
      environment?.kind !== 'group' ||
      governance?.kind !== 'group'
    ) {
      throw new Error('expected project groups');
    }

    expect(
      environment.subRows.flatMap((node) =>
        node.kind === 'group' ? [`${node.title} ${node.count}`] : [],
      ),
    ).toEqual(['待填寫 2', '待覆核 2', '已完成 1']);
    expect(governance.subRows).toEqual([]);
    expect(environment).toMatchObject({
      depth: 0,
      leaf: false,
      values: { project: '環境盤查' },
    });
    expect(environment.subRows[0]).toMatchObject({
      depth: 1,
      leaf: true,
      values: { project: '環境盤查', status: 'todo' },
      title: '待填寫',
    });
    expect(governance).toMatchObject({
      leaf: false,
      values: { project: '治理與揭露' },
    });
  });

  it('nests every key in the list', () => {
    const tree = buildReviewTree(
      reviewTasks,
      ['project', 'due', 'status'],
      reviewGroupingConfig,
    );
    const environment = tree[0];
    const due =
      environment?.kind === 'group'
        ? environment.subRows[0]
        : undefined;
    const status = due?.kind === 'group' ? due.subRows[0] : undefined;
    if (due?.kind !== 'group' || status?.kind !== 'group') {
      throw new Error('expected project, due, then status');
    }

    expect(environment).toMatchObject({ depth: 0, leaf: false });
    expect(due).toMatchObject({
      depth: 1,
      leaf: false,
      title: '2026/03/18',
      values: { project: '環境盤查', due: '2026/03/18' },
    });
    expect(status).toMatchObject({
      depth: 2,
      leaf: true,
      title: '待覆核',
      values: {
        project: '環境盤查',
        due: '2026/03/18',
        status: 'review',
      },
    });
    expect(status.subRows[0]).toMatchObject({ kind: 'task' });
  });
});

describe('DataTable grouping keys', () => {
  it('opens on the sample grouping menu, with no groups yet', () => {
    render(<DataTable />);

    expect(
      screen.queryByRole('button', { name: '環境盤查' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '分群' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '子分群' }),
    ).not.toBeInTheDocument();
    expect(screen.getByText('溫室氣體盤查')).toBeInTheDocument();
  });

  it('uses the key list for the levels', () => {
    render(
      <DataTable
        grouping={['category', 'subcategory']}
        data={reviewTasks.slice(0, 2).map((task, index) => ({
          ...task,
          category: '環境',
          subcategory: index === 0 ? '盤查' : '水',
        }))}
      />,
    );

    expect(
      screen.getByRole('button', { name: '環境' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '盤查' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '水' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '環境盤查' }),
    ).not.toBeInTheDocument();
  });
});
