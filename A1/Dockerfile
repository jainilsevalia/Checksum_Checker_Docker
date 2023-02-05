FROM node:16
WORKDIR /home/A1
# COPY ./index.js ./package.json /
COPY . .
RUN npm install 
EXPOSE 8080
CMD ["npm","start" ]