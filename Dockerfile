#https://www.saasbase.dev/dockerfile-for-react-and-typescript/
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm i
EXPOSE echo ${PORT}
CMD [ "npm", "run" ]