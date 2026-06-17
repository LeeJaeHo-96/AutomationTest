const { GnbComponent } = require('./GnbComponent');
const { WeekdayNavComponent } = require('./WeekdayNavComponent');
const { SearchPage } = require('./SearchPage');

class WebtoonMainPage {
  constructor(page)
  {
    this.page = page;
    
    // 💡 [핵심] 조립하기: 메인 페이지 클래스가 각 영역의 클래스를 품도록 만듭니다.
    this.gnb = new GnbComponent(page);
    this.weekdayNav = new WeekdayNavComponent(page);

    // 메인 페이지 고유의 영역(웹툰 리스트) 변수 등록
    this.listContainer = page.locator('.section_weekday_list');
    this.firstWebtoonCard = this.listContainer.locator('.list_item').first();
  }

  async goto()
  {
    await this.page.goto('https://m.comic.naver.com/index');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickFirstWebtoon()
  {
    const webtoonList = this.page.locator('[class*="section_list_toon"]');
  
    await webtoonList.waitFor({ state: 'visible', timeout: 10000 });

    // 내부의 첫 번째 링크 잡기
    const firstWebtoon = webtoonList.getByRole('link').first();

    // 텍스트 추출
    const titleText = firstWebtoon.locator('.title');
    const rawText = await titleText.textContent();
    const expectedTitle = rawText ? rawText.trim() : "제목 없음";

    // 이미 로케이터가 잡혀있으므로 바로 클릭
    await firstWebtoon.click(); 
  
    return expectedTitle;
  }

  async clickDayOfTheWeek(day)
  {
    await this.page.getByRole('link', { name: '요일별' }).click();
    await this.weekdayNav.selectDay(day);
  }

  async SearchFor(keyword)
  {
    await this.gnb.ClickSearch();
    // 검색 페이지로 이동 후, 검색어 입력 및 검색 실행
    const _searchPage = new SearchPage(this.page);
    await _searchPage.searchFor(keyword);
  }

  async ClickFirstWebtoonForSearch()
  {
    const webtoonList = this.page.locator('[class*="toon_lst"]').first();

    await webtoonList.waitFor({ state: 'visible', timeout: 10000 });

    // 내부의 첫 번째 링크 잡기
    const firstWebtoon = webtoonList.getByRole('link').first();

    // 텍스트 추출
    const titleText = firstWebtoon.locator('.toon_name');
    const rawText = await titleText.textContent();
    const expectedTitle = rawText ? rawText.trim() : "제목 없음";

    // 이미 로케이터가 잡혀있으므로 바로 클릭
    await firstWebtoon.click(); 
  
    return expectedTitle;
  }

  
}
module.exports = { WebtoonMainPage };