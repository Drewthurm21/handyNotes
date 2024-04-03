import { test, expect, Page } from '@playwright/test';
import { localHost, hydrateLocalStorage, notesData, tagsData, consumeLocalStorage } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto(localHost);
  await page.waitForLoadState('domcontentloaded');
});

test.describe('Edit Tags modal renders properly.', () => {

  test('Edit Tags modal is hidden by default', async ({ page }) => {
    const editTagsModal = page.locator('.modal .show');
    expect(editTagsModal).not.toBe(null);
    expect(await editTagsModal.isVisible()).toBe(false);
  });

  test('Edit Tags modal becomes visible when edit tags button is clicked', async ({ page }) => {
    await openTagModal(page);

    const editTagsModal = page.locator('.modal .show');
    expect(editTagsModal).not.toBe(null);
  });

  test('Edit Tags modal renders base elements', async ({ page }) => {
    await openTagModal(page);

    const modalHeader = page.locator('.modal-header');
    const modalBody = page.locator('.modal-body');
    const modalContent = page.locator('.modal-content');
    const closeButton = page.locator('.btn-close');

    expect(modalHeader).not.toBe(null);
    expect(modalBody).not.toBe(null);
    expect(modalContent).not.toBe(null);
    expect(closeButton).not.toBe(null);
    expect(await modalHeader.textContent()).toBe('Edit tags');
  });
});

test.describe('Edit Tags modal functions correctly.', () => {

  test.beforeEach(async ({ page }) => {
    await hydrateLocalStorage(page, "TAGS", tagsData);
    await hydrateLocalStorage(page, "NOTES", notesData);

    //reload the page and open the modal
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await openTagModal(page);
  });

  test('Modal properly renders tags', async ({ page }) => {    
    const renderedTags = await page.locator('#tag-item').all()
    expect(renderedTags).toHaveLength(tagsData.length);
  });

  test('Modal properly deletes tags', async ({ page }) => {
    const deleteButtons = await page.locator('#delete-tag-btn').all();
    
    //delete 3 random tags and store their labels
    let deletedTags: string[] = [];
    let i = 0;
    do {
      let idx = Math.floor(Math.random() * deleteButtons.length - i);
      let tagToDelete: string = await page.locator('#tag-item').nth(idx).inputValue();
      deletedTags.push(tagToDelete);

      await deleteButtons[idx].click();
      
      //confirm the tag was removed from the modal
      const updatedTags = await page.locator('#tag-item').all();
      expect(updatedTags).toHaveLength(tagsData.length - ++i);
    } while (i < 3);

    //confirm the correct tags were removed from localStorage
    const storedTags = await consumeLocalStorage(page, "TAGS");
    for (let tag of deletedTags) {
      expect(storedTags).not.toContain(tag);
    }
  });

  test('Modal properly updates tags', async ({ page }) => {
    //update tags in the modal
    for (let i = 0; i < tagsData.length; i++) {
      await page.locator('#tag-item').nth(i).fill(tagsData[i].label + ' updated');
    }

    //confirm the tags were updated in localStorage
    const updatedTags = await consumeLocalStorage(page, "TAGS");
    for (let tag of updatedTags) {
      expect(tag.label).toMatch(/[\w] updated$/);
    }

    //confirm updated tags are re-rendered correctly
    await page.locator('.btn-close').click();
    await openTagModal(page);

    const tagsAfterReload = await page.locator('#tag-item').all();
    for (let i = 0; i < tagsData.length; i++) {
      expect(await tagsAfterReload[i].inputValue()).toBe(tagsData[i].label + ' updated');
    }
  });

});

const openTagModal = async (page: Page) => {
  const editTagsButton = page.locator('#edit-tags-button');
  await editTagsButton.click();
  await page.waitForSelector('.modal-body');
};