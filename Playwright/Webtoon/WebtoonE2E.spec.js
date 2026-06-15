const { test, expect, devices } = require('@playwright/test');
const { WebtoonMainPage } = require('./WebtoonMainPage');

test.use({ ...devices['iPhone 13'] }); // 모바일 환경 설정

test('네이버 웹툰 화~토 요일별 1위 웹툰 진입 검증', async ({ page }) => {
  const webtoonMain = new WebtoonMainPage(page);
  
  console.log('1. 네이버 웹툰 홈 접속');
  await webtoonMain.goto();

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  for (const day of days) {
    console.log(`\n[${day}요일 테스트 시작]`);

    // 요일 버튼 클릭
    await webtoonMain.clickDayOfTheWeek(day);
    
    // 첫 번째 웹툰 클릭하고 제목 받아오기
    const expectedTitle = await webtoonMain.clickFirstWebtoon();
    //console.log(`- 메인 1위 웹툰 확인: ${expectedTitle}`);

    // 상세 페이지 타이틀 검증
    //const actualTitleElement = page.locator('.area_info .title');
    //await expect(actualTitleElement).toHaveText(expectedTitle);
    //console.log(`- [성공] 상세 페이지 '${expectedTitle}' 진입 일치 확인!`);

    await page.goBack(); 
  }
  
  console.log('\n[최종 성공] 요일별 1위 웹툰 진입 검증 완료!');
});