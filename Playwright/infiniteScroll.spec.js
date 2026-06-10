import {test, expect} from '@playwright/test';

test('무한 스크롤', async({page}) => {

    await page.goto('https://practice.expandtesting.com/infinite-scroll');

    const targetText = page.getByText(/Timestamp/);

    for(let i=0; i<0; i++) 
    {
        await page.press('body', 'End');
        
        await page.waitForTimeout(1000);
        
    }

    const finalCount = await targetText.count();

    console.log(`총 ${finalCount}개의 타임스탬프가 로드되었습니다.`);
});