const { GnbComponent } = require('./GnbComponent');
const { WeekdayNavComponent } = require('./WeekdayNavComponent');
const { SearchPage } = require('./SearchPage');

class WebtoonMainPage {
  constructor(page) {
    this.page = page;

    this.gnb = new GnbComponent(page);
    this.weekdayNav = new WeekdayNavComponent(page);

    // 메인 페이지 고유의 영역(웹툰 리스트) 변수 등록
    this.listContainer = page.locator('.section_weekday_list');
    this.firstWebtoonCard = this.listContainer.locator('.list_item').first();
  }

  async goto() {
    await this.page.goto('https://m.comic.naver.com/index');
    await this.page.waitForLoadState('load');
  }

  async clickWebtoonByIndex(index) {
    const webtoonList = this.page.locator('[class*="section_list_toon"]');

    await webtoonList.waitFor({ state: 'visible', timeout: 10000 });

    // 내부의 해당 인덱스의 링크 잡기
    const webtoon = webtoonList.getByRole('link').nth(index);

    // 텍스트 추출
    const titleText = webtoon.locator('.title');
    const rawText = await titleText.textContent();
    const expectedTitle = rawText ? rawText.trim() : "제목 없음";

    await webtoon.click();

    return expectedTitle;
  }

  async getWebtoonStats() {

    const scoreElement = this.page.locator('.score');
    const countElement = this.page.locator('.count_num');

    try {
      await scoreElement.first().waitFor({ state: 'visible', timeout: 2000 })

      const score = await scoreElement.first().textContent();
      const count = await countElement.first().textContent();

      return {
        score: score ? score.trim() : "평점 없음",
        count: count ? count.trim() : "관심수 없음"
      };
    }
    catch (error) {
      console.error('웹툰 통계 정보 로딩 실패:', error);
      return {
        score: "청유물 웹툰입니다. 로그인 후 확인해주세요!",
        count: "청유물 웹툰입니다. 로그인 후 확인해주세요!"
      };
    }
  }

  async clickDayOfTheWeek(day) {
    await this.page.getByRole('link', { name: '요일별' }).click();
    await this.weekdayNav.selectDay(day);
  }

  async SearchFor(keyword) {
    await this.gnb.ClickSearch();
    // 검색 페이지로 이동 후, 검색어 입력 및 검색 실행
    const _searchPage = new SearchPage(this.page);
    await _searchPage.searchFor(keyword);
  }

  async ClickFirstWebtoonForSearch() {
    const webtoonList = this.page.locator('[class*="toon_lst"]').first();

    await webtoonList.waitFor({ state: 'visible', timeout: 10000 });

    // 내부의 첫 번째 링크 잡기
    const firstWebtoon = webtoonList.getByRole('link').first();

    // 텍스트 추출
    const titleText = firstWebtoon.locator('.toon_name');
    const rawText = await titleText.textContent();
    const expectedTitle = rawText ? rawText.trim() : "제목 없음";

    await firstWebtoon.click();

    return expectedTitle;
  }


}
module.exports = { WebtoonMainPage };