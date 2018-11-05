FROM ubuntu:16.04

ENV PROJECT_ROOT=/home/ubuntu \
    PROJECT_SRC=src \
    PROJECT_UWSGI=uwsgi \
    PROJECT_ENV=production \
    DEBIAN_FRONTEND=noninteractive

# 필수 라이브러리 설치
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.6 python3.6-dev python3-pip

RUN ln -sfn /usr/bin/python3.6 /usr/bin/python3 && \
    ln -sfn /usr/bin/python3 /usr/bin/python && \
    ln -sfn /usr/bin/pip3 /usr/bin/pip

RUN apt-get install -y nginx \
    supervisor \
    locales && \
    pip3 install --upgrade pip && \
    pip install uwsgi

RUN locale-gen ko_KR.UTF-8
ENV LANG ko_KR.UTF-8
ENV LANGUAGE ko_KR.UTF-8
ENV LC_ALL ko_KR.UTF-8
    
# 프로젝트 구조 잡기
RUN mkdir ${PROJECT_ROOT}
WORKDIR ${PROJECT_ROOT}

RUN mkdir ${PROJECT_SRC} && \
    mkdir ${PROJECT_UWSGI}

# 웹 서버 설정
RUN echo "daemon off;" >> /etc/nginx/nginx.conf && \
    cd ${PROJECT_UWSGI}
COPY build/uwsgi_params build/uwsgi.ini ${PROJECT_UWSGI}/
COPY build/nginx.conf /etc/nginx/sites-available/default
COPY build/supervisor.conf /etc/supervisor/conf.d/

# 필요한 내용 복사 후 라이브러리 설치
COPY requirements.txt manage.py ${PROJECT_SRC}/

RUN cd ${PROJECT_SRC} && pip install -qq -r requirements.txt

COPY config ${PROJECT_SRC}/config
COPY apps ${PROJECT_SRC}/apps

EXPOSE 80
CMD ["supervisord", "-n"]