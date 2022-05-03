FROM node:16.14.2

EXPOSE 8000

WORKDIR /usr/src/voodoo-code-challenge-ddd
COPY . .

RUN npm install --production

CMD ["npm", "run", "start"]
