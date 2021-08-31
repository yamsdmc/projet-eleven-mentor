FROM node:14
WORKDIR /src
COPY package.json ./
RUN npm install
COPY . ./
COPY ormconfig.docker.json ./ormconfig.json
CMD ["npm", "dev"]


