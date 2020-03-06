FROM node:12.14
COPY . /app
WORKDIR /app
RUN npm set @sap:registry=https://npm.sap.com
RUN npm install
EXPOSE 4004
RUN npm run v2