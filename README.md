<br/>

<img alt="React" width="200px"  src="https://stutor.me/_nuxt/img/logo.d700cda.png"  />
  
## About Stutor

- 🔭 Peer to peer student tutoring

- 🌱 Stable coin integration for payments

- 👯 Demarcated for each school institution

## Tech Stack
 
- React Native Typescript
- Node JS back-end Typescript

## Docker from ghcr.io (GitHub Container Registry)
- `docker run -d -p 3000:3000 --env-file .env ghcr.io/tobiass1402/stutorserver-prod:master`
- `docker run -d -p 3000:3000 --env-file .env ghcr.io/tobiass1402/stutorserver-dev:master` 

## Docker from source
```
CONTAINER ID   IMAGE                             COMMAND                  CREATED         STATUS                       PORTS                                       NAMES
9a2cd7066319   tobiass1402/stutorserver:latest   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes                 0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   serene_matsumoto
d11172a0a555   87f6e08f631c                      "docker-entrypoint.s…"   5 minutes ago   Exited (143) 4 minutes ago                                               determined_pascal
```
### Docker dev setup

- `git clone https://github.com/TobiasS1402/StutorServer.git`
- `cd StutorServer && docker build -f Dockerfile-dev -t tobiass1402/stutorserver .`
- `docker run -d -p 3000:3000 --env-file .env tobiass1402/stutorserver:latest`

### Docker prod setup
- `git clone https://github.com/TobiasS1402/StutorServer.git`
- `cd StutorServer && docker build -f Dockerfile-prod -t tobiass1402/stutorserver .`
- `docker run -d -p 3000:3000 --env-file .env tobiass1402/stutorserver:latest`
## Overview

<img src="https://user-images.githubusercontent.com/25530395/147077611-18339087-608b-41ea-b044-d0b8f3259009.jpg" width="300">
<img src="https://user-images.githubusercontent.com/25530395/147077657-b83608fd-8670-4eba-a310-e2cafbc40f55.jpg" width="300">
<img src="https://user-images.githubusercontent.com/25530395/147077670-5588ded0-ae65-4480-a712-a463c06d51c0.jpg" width="300">
<img src="https://user-images.githubusercontent.com/25530395/147077683-0c617c22-eb3a-401e-860e-37f79d471534.jpg" width="300">
<img src="https://user-images.githubusercontent.com/25530395/147078003-117f4b29-da36-4a21-a1ef-efe679667e9d.jpg" width="300">
<img src="https://user-images.githubusercontent.com/25530395/147077914-0642aa7d-0282-4ac2-9228-9253e30803f4.jpg" width="300">
<img src="https://user-images.githubusercontent.com/25530395/147077924-159db018-54fc-499f-8928-8e0c3957b3b3.jpg" width="300">
<img src="https://user-images.githubusercontent.com/25530395/147078787-e492dd11-adc2-4e3b-bb77-13de9f258474.jpg" width="300">

## Azure Kubernetes Services setup for Stutor
```
tobias@Azure:~$ az network public-ip create \
> --resource-group stutor \
> --name stutor_public --sku Standard \
> --allocation-method static \
> --query publicIp.ipAddress -o tsv

az group show -n stutor -o tsv --query id

az aks show -n stutor -g stutor --query "identity.principalId" -o tsv

az role assignment create --assignee b99028c8-d2ba-46aa-b040-273a842f61cf --role "Network Contributer" --scope /subscriptions/1227e908-f876-403d-b7e5-a942b7d36810/resourceGroups/MC_stutor_stutor_westeurope

kubectl create namespace stutor

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install stutor-ingress ingress-nginx/ingress-nginx --namespace stutor --set controller.replicaCount=1 --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux --set controller.service.loadBalancerIP="20.86.195.116"

helm repo add jetstack https://charts.jetstack.io
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.8.0/cert-manager.crds.yaml
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.8.0

kubectl apply -f stutor.yaml
```
- Setup loosely based on: https://devopstales.github.io/cloud/aks-ingress-controller

## "Handmatig" interacteren met de API
- request token via `https://stutor.seijsener.space/v1/auth/login`
- pak het kopier token= `https://stutor.seijsener.space/v1/auth/callback?code=xxxxxxxxxxxxxx&token=xxxxxxxxxxxxxxxxxxxxxxxxx`
- zend een request naar API endpoint met `Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx` waar xxxxxxxxxxxxxx het token is
