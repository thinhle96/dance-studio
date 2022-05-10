FROM node:16.14.2-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
