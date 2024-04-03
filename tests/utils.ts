import { type Page } from '@playwright/test';

//local and live server URLs
export const localHost = 'http://localhost:5173/'
export const baseURL = 'https://handy-notes-eight.vercel.app/'


//Helpers for testing
export const hydrateLocalStorage = async (page: Page, key: string, val: any) => {
  await page.evaluate((data) => {
    const [key, val] = data;
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
};

export const consumeLocalStorage = async (page: Page, key: string) => {
  return await page.evaluate((key) => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }, key);
}


//Data used for testing
export const notesData = [
  {
    id: 1,
    title: "Chicken Tortilla Soup",
    markdown: "To make Chicken tortilla soup...",
    tagIds: [1,2,4]
  },
  {
    id: 2,
    title: "Grilled Beef Sliders",
    markdown: "To make sliders...",
    tagIds: [1,2,5]
  },
  {
    id: 3,
    title: "Cardio fitness",
    markdown: "To run faster...",
    tagIds: [6,7,8]
  },
  {
    id: 4,
    title: "Bouldering",
    markdown: "To climb better...",
    tagIds: [5,6,7]
  }
]

export const tagsData = [
  {id: 1, label:"cooking"},
  {id: 2, label:"recipe"},
  {id: 3, label:"beef"},
  {id: 4, label:"chicken"},
  {id: 5, label:"climbing"},
  {id: 6, label:"gym"},
  {id: 7, label:"workout"},
  {id: 8, label:"running"},
]
