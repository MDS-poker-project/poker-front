FROM node:24.0.1-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
ENV VITE_ORIGIN=${VITE_ORIGIN}
CMD ["npm", "run", "dev"]