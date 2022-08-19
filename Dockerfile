FROM node:16
  

WORKDIR /app

RUN apt-get update && apt-get -y install libreoffice

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/index"]
