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


## Enter the docker container

```bat
docker exec -it {docker container name} bash
```

### In Alpine linux like pm2-container

* Alpine uses ash and not bash.

```bat
docker exec -it {docker container name} ash
```
