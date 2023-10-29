FROM node:18.14-slim
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm install --global pm2 && npm run build


EXPOSE 3000
CMD ["pm2-runtime", "start", "npm", "--", "start"]
