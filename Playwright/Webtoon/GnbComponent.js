class GnbComponent {
    constructor (page) 
    {
        this.page = page;
        this.button = page.getByRole('link', { name: '검색페이지 이동' });
    }

    async ClickSearch() 
    {
            await this.button.click();
    }
}

module.exports = { GnbComponent };