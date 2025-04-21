FROM node:23-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src/ .
EXPOSE 3003
CMD ["node", "app.js"]