FROM node:14.1

ENV HOME=/home/app

RUN apt-get update && apt-get install htop

COPY package.json package-lock.json $HOME/store/

WORKDIR $HOME/store

RUN npm install --silent --progress=false

COPY . $HOME/store

CMD ["npm", "start"]
