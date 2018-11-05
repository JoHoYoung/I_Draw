from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from scipy.misc import imsave, imread, imresize
from keras.models import model_from_json
import tensorflow as tf
import numpy as np
import json

from .image import convert_image
from .serializers import PredictSerializer


class PredictAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PredictSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        image = serializer.data.get('image')
        convert_image(image)
        
        # 이미지 불러오기
        x = imread('output.png', mode='L')
        x = np.invert(x)
        x = imresize(x,(28,28))
        x = x.reshape(1,28,28,1)

        # 예측 초기화
        json_file = open('apps/train/model/model.json', 'r')
        model_json = json_file.read()
        json_file.close()
        # JSON으로부터 모델 불러오기
        model = model_from_json(model_json)

        # 가중치를 모델에 가져오기
        model.load_weights('apps/train/model/model.h5')
        # 불러와진 모델을 컴파일하고 평가하기
        model.compile(
            loss='categorical_crossentropy',
            optimizer='adam',
            metrics=['accuracy']
        )
        # 그래프 가져오기
        graph = tf.get_default_graph()

        data = {
            'result': None
        }
        # 그래프로 통해 예측하기
        with graph.as_default():
            output = model.predict(x)
            number_label = np.argmax(output, axis=1)
            labels = ['rainbow', 'cat', 'airplane']
            data.update({
                'result': labels[number_label[0]]
            })

        return Response(data=data)