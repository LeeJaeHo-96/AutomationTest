const { GnbComponent } = require('./GnbComponent');
const { WeekdayNavComponent } = require('./WeekdayNavComponent');

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
    const webtoonListSection = this.page.locator('.section_list_toon');

    const firstCard = webtoonListSection.getByRole('link').first(); 
  
    const rawText = await firstCard.textContent(); 
  
    const expectedTitle = rawText.split(' ')[0].trim(); 
  
    console.log(`1등 웹툰 제목: ${expectedTitle}`);

    await firstCard.click(); 
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
    const searchPage = new SearchPage(this.page);
    await searchPage.searchFor(keyword);
  }

  
}
module.exports = { WebtoonMainPage };