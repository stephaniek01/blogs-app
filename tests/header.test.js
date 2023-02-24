const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();

  await page.goto('http://localhost:3000/');
});

afterEach(() => {
  browser.close();
});

test('Opens browser window', async () => {
  const text = await page.$eval('a.brand-logo', (element) => element.innerHTML);

  expect(text).toEqual('Blogster');
});

test('Clicking on the login button starts the oauth flow', async () => {
  const btn = await page.click('.right a');

  const url = page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test.only('logged in users should see the Logout button', async () => {
  const userId = '63bd0f76d2dd016f22eb77f0';
  const user = {
    _id: userId,
  };
  const { session, sig } = sessionFactory(user);

  await page.setCookie(
    { name: 'session', value: session },
    { name: 'session.sig', value: sig }
  );

  await page.goto('http://localhost:3000/');

  const logoutButtonQuerySelector = "a[href='/auth/logout']";

  const logOutText = await page.$eval(
    logoutButtonQuerySelector,
    (element) => element.innerHTML
  );

  expect(logOutText).toEqual('Logout');
});
