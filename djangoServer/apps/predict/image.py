import re
import base64

# 이미지 처리 관련 기능 모듈
def convert_image(image_data):
    image_string = re.search('base64,(.*)', image_data).group(1)
    
    with open('output.png', 'wb') as output:
        output.write(base64.b64decode(image_string.encode('ascii')))