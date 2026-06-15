class SearchPage{
    constructor(page)
    {
        this.page = page;
        this.searchInput = page.getByRole('textbox', { name: '제목, 작가명' });
        this.searchButton = page.getByRole('button', { name: '검색' });
    }
    async searchFor(keword)
    {
            await this.searchInput.fill(keword);
            await this.searchButton.click();
    }
}

module.exports = { SearchPage };