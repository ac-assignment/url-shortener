# Base image
FROM node:16.14.0
WORKDIR /src
COPY . /src
RUN npm install

EXPOSE 3000
CMD npm run start
