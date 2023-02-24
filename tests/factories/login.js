const sessionFactory = require('./sessionFactory');
const userFactory = require('./userFactory');

module.exports = async (page) => {
  console.log(page);
  await page.goto('http://localhost:3000/');

  const user = await userFactory();
  const { session, sig } = sessionFactory(user);

  await page.setCookie(
    { name: 'session', value: session },
    { name: 'session.sig', value: sig }
  );

  await page.goto('http://localhost:3000/');

  return page;
};
