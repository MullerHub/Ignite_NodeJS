FROM node:16

WORKDIR /usr/app

COPY package.json ./

RUN npm install

# RUN npm rebuild bcrypt

COPY . .

EXPOSE 3334

CMD ["npm", "run", "dev"]