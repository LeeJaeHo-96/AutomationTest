const { test } = require('@playwright/test');
const { LoginPage } = require('./LoginPage');


//봇 검사를 우회하기 위하여 로그인 로직 제외

/*test('로그인 상태 저장', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.ID, process.env.PW);
  
  await page.waitForLoadState('networkidle'); 
  
  // 상태 저장
  await page.context().storageState({ path: 'auth.json' });
});*/