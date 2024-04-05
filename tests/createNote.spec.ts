import { test, expect, Page } from '@playwright/test';
import { localHost, notesData, tagsData, createNewNote } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto(localHost + 'new');
  await page.waitForLoadState('domcontentloaded');
});

test.describe('New Note page renders base elements properly', () => {

  test('Page renders the proper header', async ({ page }) => {
    const header = await page.locator('#new-note-header');
    expect(await header.isVisible()).toBeTruthy();
  });

  test('Page renders title input with label', async ({ page }) => {
    const titleInput = page.locator(`input.form-control#title`);
    const titleLabel = page.locator(`label[for=title]`);

    expect(await titleLabel.isVisible()).toBeTruthy();
    expect(await titleLabel.textContent()).toBe('Title');
    expect(await titleInput.isVisible()).toBeTruthy();
    expect(await titleInput.inputValue()).toBe('');
  });

  test('Page renders tags input with label', async ({ page }) => {
    const tagsInput = page.locator('#react-select-19-input');
    const tagsLabel = page.locator(`label[for=tags]`);

    expect(await tagsLabel.isVisible()).toBeTruthy();
    expect(await tagsLabel.textContent()).toBe('Tags');
    expect(await tagsInput.isVisible()).toBeTruthy();
    expect(await tagsInput.inputValue()).toBe('');
  });

  test('Page renders markdown input', async ({ page }) => {
    const markdownInput = page.locator(`textarea#body`);
    expect(await markdownInput.isVisible()).toBeTruthy();
    expect(await markdownInput.inputValue()).toBe('');
  });

  test('Page renders save button', async ({ page }) => {
    const saveButton = page.locator(`button:has-text("Save")`);
    expect(await saveButton.isVisible()).toBeTruthy();
  });

  test('Page renders cancel button', async ({ page }) => {
    const cancelButton = page.locator(`button:has-text("Cancel")`);
    expect(await cancelButton.isVisible()).toBeTruthy();
  });

});