const { test, expect, devices } = require('@playwright/test');
const { WebtoonMainPage } = require('./WebtoonMainPage');

test.use({ ...devices['iPhone 13'] }); // 모바일 환경 설정

test.describe('웹툰 테스트', () => {

  test('네이버 웹툰 월~일 요일별 1위 웹툰 진입 검증', async ({ page }) => {
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
      console.log(`- 메인 1위 웹툰 확인: ${expectedTitle}`);

      await page.goBack();
    }

    console.log('\n[최종 성공] 요일별 1위 웹툰 진입 검증 완료!');


  });

  test('검색 기능 검증', async ({ page }) => {
    const webtoonMain = new WebtoonMainPage(page);

    console.log('1. 네이버 웹툰 홈 접속');
    await webtoonMain.goto();

    const searchKeyword = '악당들의';
    console.log(`2. 검색어 입력: ${searchKeyword}`);
    await webtoonMain.SearchFor(searchKeyword);

    // 검색 결과 페이지에서 첫 번째 웹툰 클릭하고 제목 받아오기
    const expectedTitle = await webtoonMain.ClickFirstWebtoonForSearch();
    console.log(`- 검색 결과 첫 번째 웹툰 확인: ${expectedTitle}`);

    expect(expectedTitle).toContain(searchKeyword); // 검색어가 제목에 포함되어 있는지 확인
  });

});