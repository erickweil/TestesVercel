FROM node:20-alpine

WORKDIR /node-app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Primeiro instala as dependências
COPY package.json package-lock.json ./
RUN npm ci

# Depois copia o projeto (Isto torna mais rápido o build devido ao cache)
COPY . .

# Ponto de partida
CMD ["node","server.js"]

# ==================================================
# Para executar:
# docker build -t nodejs-simples .
# docker run -d -p 3000:3000 nodejs-simples