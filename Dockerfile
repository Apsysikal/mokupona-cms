# Creating multi-stage build for production
FROM node:18-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG APP_KEYS
ENV APP_KEYS=${APP_KEYS}
ARG API_TOKEN_SALT
ENV API_TOKEN_SALT=${API_TOKEN_SALT}
ARG ADMIN_JWT_SECRET
ENV ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install --only=production
# ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:18-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
