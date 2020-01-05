# docker nodejs Demo


## 在Google Compute Engine (GCE) VM中安裝docker

開一開新的vm，OS選擇Ubuntu 16.04LTS


1. 先更新 apt-get

```
sudo apt-get update
```

2. 從docker.io 安裝 docker

```bat
sudo apt-get install docker.io
```

## 從本機端打包一個docker images 並 push 到 Google Container Registry (GCR)

1. 建立一個Docker image

```bat
docker build -t gcr.io/[your_gcp_project_id]/[your_image_name]:[tag_name] $PWD
```

例如：

```bat
docker build -t gcr.io/static-shine-235605/1on1-admin-api:1.0.0 $PWD
```

2. 上傳 Docker image 至 Google Container Registry (GCR)

* login

```bat
gcloud auth login
```

* 切換到所屬的project

```bat
gcloud config set project PROJECT_ID
```

* Push

> gcloud docker -- push gcr.io/[your_gcp_project_name]/[your_container_name]:[tag_name]

```bat
gcloud docker -- push gcr.io/static-shine-235605/1on1-admin-api:1.0.0
```


## 從 Google Container Registry (GCR) 把 docker image 拉進來

[Authentication methods](https://cloud.google.com/container-registry/docs/advanced-authentication)

1. 認證

```bat
gcloud auth configure-docker
```

2. 設定

```bat
  VERSION=2.0.0
  OS=linux  # or "darwin" for OSX, "windows" for Windows.
  ARCH=amd64  # or "386" for 32-bit OSs, "arm64" for ARM 64.

  curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v${VERSION}/docker-credential-gcr_${OS}_${ARCH}-${VERSION}.tar.gz" \
    | tar xz --to-stdout ./docker-credential-gcr \
    > /usr/bin/docker-credential-gcr && chmod +x /usr/bin/docker-credential-gcr
```

3. 使用gcloud 指令將GCR的image 拉進來

```bat
gcloud docker -- pull gcr.io/static-shine-235605/1on1-admin-api:1.0.0
```

## 設定nginx

1. 安裝 nginx

* 更新os

```bat
sudo apt-get update
```

* 安裝nginx

```bat
sudo apt-get install nginx -y
```

2. 確認nginx 狀態

```bat
ps auwx | grep nginx
```

3. nginx指向設定，修改設定檔

```
sudo vi /etc/nginx/sites-available/default
```

4. 修改設定如下：

```default
server_name yourdomain.com www.yourdomain.com;

location / {
    proxy_pass http://localhost:5000; #whatever port your app runs on
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

5. 確認nginx config

```bat
sudo nginx -t
```

6. Restart nginx

```bat
sudo service nginx restart
```

7. Stop nginx

```bat
service nginx stop
```

8. Start nginx

```bat
service nginx start
```


## 啟動docker 容器


1. Docker container running

```bat
docker run -p 8080:8080 --name 1on1-admin-api -d gcr.io/static-shine-235605/1on1-admin-api:1.0.0
```

## Enter the docker container

```bat
docker exec -it {docker container name} bash
```

### In Alpine linux like pm2-container

* Alpine uses ash and not bash.

```bat
docker exec -it {docker container name} ash
```


## Reference 

[Node.js Deployment](https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896)

[Node.js Deployment Video](https://www.youtube.com/watch?v=oykl1Ih9pMg&t=867s)

[ubuntu 18 部署 Nginx](https://ithelp.ithome.com.tw/articles/10228765)

[在 GCP 上建立 VM 架設 NIGNX Web server](https://titangene.github.io/article/gcp-vm-nignx-web-server.html)

[整合 Container Registry](https://ithelp.ithome.com.tw/articles/10220807)
