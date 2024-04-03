import { test, expect } from '@playwright/test';
import { localHost } from './utils';

test.describe('Site loads base elements properly.' , () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(localHost);
  });

  test('Page title is correct', async ({ page }) => {
    expect(await page.title()).toBe('Handy Notes!');
  });

  test('Page has a header', async ({ page }) => {
    const homepageHeader = page.locator('#homepage-header');
    const textContent = await homepageHeader.textContent();
    expect(homepageHeader).not.toBe(null);
    expect(textContent).toMatch('Handy Notes!');
  });

  test('Page has a create button', async ({ page }) => {
    const createButton = page.locator('#new-note-button');
    const buttonText = await createButton.textContent();
    expect(createButton).not.toBe(null);
    expect(buttonText).toMatch('Create');
  });

  test('Page has an edit tags button', async ({ page }) => {
    const editTagsButton = page.locator('#edit-tags-button');
    const buttonText = await editTagsButton.textContent();
    expect(editTagsButton).not.toBe(null);
    expect(buttonText).toMatch('Edit Tags');
  });

  test('Page has a search input', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    expect(searchInput).not.toBe(null);
  });

  test('Page has a tag filter dropdown', async ({ page }) => {
    const tagFilterDropdown = page.locator('#tag-filter-dropdown');
    expect(tagFilterDropdown).not.toBe(null);
  });

  test('Page has a notes list', async ({ page }) => {
    const notesList = page.locator('#notes-list');
    expect(notesList).not.toBe(null);
  });
  
});