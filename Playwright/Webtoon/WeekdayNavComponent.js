class WeekdayNavComponent {
  constructor(page)
  {
    this.page = page;
  }

  // 매개변수(dayName)를 받아 원하는 요일 탭을 유연하게 클릭하는 함수
  async selectDay(dayName)
  {
    const dayTab = this.page.getByRole('link', { name: dayName, exact: true });
    await dayTab.click();
  }
}
module.exports = { WeekdayNavComponent };