FROM node:12.14
COPY . /app
WORKDIR /app
RUN npm set @sap:registry=https://npm.sap.com
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 4004
RUN npm run v2