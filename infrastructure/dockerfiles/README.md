# In short
This directory represents the Dockerfiles that have been created from the source code, these dockerfiles are automatically generated on each **pull request/merge**. You can find the workflow files in `.github/workflows`.
- `publish-dev.yml` builds the dev containers (based on `Dockerfile-dev`) and uploads them to the ghcr.io registry.
- `publish-prod.yml` builds the prod containers (based on `Dockerfile-prod`) and uploads them to the ghcr.io registry.

## Build them yourself
### Docker dev 

- `git clone https://github.com/TobiasS1402/StutorServer.git`
- `cd StutorServer/infrastructure/dockerfiles && docker build -f Dockerfile-dev -t tobiass1402/stutorserver .`
- `docker run -d -p 3000:3000 --env-file .env tobiass1402/stutorserver:latest`

### Docker prod 
- `git clone https://github.com/TobiasS1402/StutorServer.git`
- `cd StutorServer/infrastructure/dockerfiles && docker build -f Dockerfile-prod -t tobiass1402/stutorserver .`
- `docker run -d -p 3000:3000 --env-file .env tobiass1402/stutorserver:latest`

## Grab them from the container registry
### Docker from ghcr.io (GitHub Container Registry)
- `docker run -d -p 3000:3000 --env-file .env ghcr.io/tobiass1402/stutorserver-prod:master`
- `docker run -d -p 3000:3000 --env-file .env ghcr.io/tobiass1402/stutorserver-dev:master`

## Docker from source
```
CONTAINER ID   IMAGE   COMMAND  CREATED  STATUS  PORTS  NAMES
9a2cd7066319 tobiass1402/stutorserver:latest "docker-entrypoint.s…" 2 minutes ago Up 2 minutes 0.0.0.0:3000->3000/tcp, :::3000->3000/tcp serene_matsumoto
```


