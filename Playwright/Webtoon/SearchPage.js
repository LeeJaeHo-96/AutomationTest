class SearchPage{
    constructor(page)
    {
        this.page = page;
        this.searchInput = page.getByRole('textbox', { name: '제목, 작가명' });
        this.searchButton = page.getByRole('button', { name: '검색' });
    }
    async searchFor(keyword)
    {
        console.log(`- 검색어 입력: ${keyword}`);
            await this.searchInput.fill(keyword);
        console.log(`- 검색 버튼 클릭`);
            await this.searchButton.click();
    }
}

module.exports = { SearchPage };