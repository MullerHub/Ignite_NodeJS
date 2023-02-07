FROM node:16-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

RUN npm rebuild bcrypt

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]