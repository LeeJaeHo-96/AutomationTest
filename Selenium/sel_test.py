from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument("--headless")            # 👈 모니터 없는 가상 서버 구동을 위한 필수 옵션
options.add_argument("--no-sandbox")           # 👈 리눅스 권한 에러 방지
options.add_argument("--disable-dev-shm-usage")   # 👈 메모리 부족으로 인한 브라우저 뻗음 방지

# 1. 크롬 드라이버 실행
driver = webdriver.Chrome(options=options)

try:
    # 2. 쇼핑몰 사이트 이동
    driver.get('https://www.saucedemo.com/')
    driver.implicitly_wait(5) # 요소가 로딩될 때까지 최대 5초 대기 (Playwright의 자동 대기 기능 대체)

    # 3. 로그인 정보 입력 (textbox 찾기)
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Username"]').send_keys('standard_user')
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Password"]').send_keys('secret_sauce')

    # 4. 로그인 버튼 클릭
    driver.find_element(By.ID, 'login-button').click()
    time.sleep(1) # 화면 전환 대기

    # 5. 'Add to cart' 버튼들 전부 다 찾기 (find_elements 사용)
    # class 이름이나 텍스트를 활용해 버튼 여러 개를 리스트로 긁어옵니다.
    add_to_cart_buttons = driver.find_elements(By.XPATH, "//button[text()='Add to cart']")

    # 6. 그 중 첫 번째(0번 인덱스) 버튼 클릭! (Playwright의 .first().click()과 동일)
    add_to_cart_buttons[0].click()
    
    print("셀레늄 테스트 성공: 첫 번째 상품 장바구니 담기 완료!")
    time.sleep(3) # 결과 눈으로 확인하기 위한 잠깐 대기

finally:
    # 7. 브라우저 종료
    driver.quit()