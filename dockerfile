FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN rm -rf node_modules

RUN rm -rf package-lock.json

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
