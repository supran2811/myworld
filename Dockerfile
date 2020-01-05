
FROM node:8

RUN mkdir -p /myworld-server

WORKDIR /myworld-server

COPY  package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD npm run build && npm run start-prod
