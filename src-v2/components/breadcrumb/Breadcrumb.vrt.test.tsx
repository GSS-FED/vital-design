import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';
import { BreadcrumbDropdownExample } from './examples/BreadcrumbDropdownExample';

describe('Breadcrumb', () => {
  test('dropdown open', async () => {
    await render(<BreadcrumbDropdownExample />);
    await screen
      .getByRole('button', { name: 'Show hidden pages' })
      .click();
    await vi.waitFor(() => screen.getByRole('menu').element());
    await expect(await renderedRegion()).toMatchScreenshot(
      'breadcrumb-dropdown-open',
    );
  });

  test('one and two levels', async () => {
    await render(
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Projects</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#projects">
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>,
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'breadcrumb-layers',
    );
  });
});
