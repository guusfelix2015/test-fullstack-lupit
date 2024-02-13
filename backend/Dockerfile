FROM node:18
WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn prisma generate
RUN yarn run build
CMD ["node", "dist/main.js"]
