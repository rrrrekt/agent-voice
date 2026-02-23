FROM node:22-slim

RUN apt-get update && apt-get install -y ffmpeg --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY dist/ ./dist/

ENV PORT=3400
ENV NODE_ENV=production

EXPOSE 3400

CMD ["node", "dist/index.js"]
