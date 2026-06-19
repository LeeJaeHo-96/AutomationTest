require('dotenv').config();

class LoginPage {
  constructor(page) {   
    this.page = page; 
  }

  async login(id, pw) {
    
    await this.page.goto('https://nid.naver.com/nidlogin.login');
    
    // 로케이터 적용
    await this.page.locator('#id').fill(id);
    await this.page.locator('#pw').fill(pw);
    await this.page.locator('#log\\.login').click();
  }
}

module.exports = { LoginPage };