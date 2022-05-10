FROM node:18-alpine3.14
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install -g npm@8.9.0
RUN npm install -g serve
RUN npm run build --force 
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm","start"]