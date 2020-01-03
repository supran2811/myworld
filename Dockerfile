
FROM node:8

RUN mkdir -p /app

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD npm run build && npm run start-prod
