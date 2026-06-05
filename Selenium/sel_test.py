import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# 1. 크롬 드라이버 자동 다운로드 및 설정
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

try:
    # 2. 구글 메인 페이지로 이동
    driver.get("https://www.google.com")
    print("브라우저가 성공적으로 열렸습니다!")
    
    # 3. 열린 화면을 5초 동안 유지하며 확인하기
    time.sleep(5)

finally:
    # 4. 테스트가 끝나면 브라우저를 안전하게 닫기
    driver.quit()
    print("브라우저가 안전하게 종료되었습니다.")