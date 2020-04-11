FROM node:13.12.0-buster

ARG PORT=8080

EXPOSE $PORT
WORKDIR /super-mega-snake

COPY package.json /super-mega-snake
RUN npm install

COPY . /super-mega-snake

CMD ["npm", "start"]