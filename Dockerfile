# Use a specific version of node from the alpine family because of its smaller footprint
FROM node:20.11.1-alpine3.19

# Set working directory in the container
WORKDIR /app
# Install necessary build tools for cwebp-bin and any native dependencies
RUN apk add --no-cache --virtual .build-deps \
        python3 \
        make \
        g++ \
        gcc \
        libpng-dev \
        libjpeg-turbo-dev \
        autoconf \
        automake \
        libtool \
        nasm \
        tiff \
        jpeg \
        zlib \
        zlib-dev \
        file \
        pkgconf \
        binutils
# Copy package.json and yarn.lock files (or just package.json if you don't have a yarn.lock)
# Doing this before copying the entire project code allows Docker to cache installed dependencies.
COPY package.json ./
COPY yarn.lock ./


# Install dependencies in the container
RUN yarn install --frozen-lockfile

# Copy the rest of your source code to the container
COPY . .

# Build your Vite application. Vite uses 'vite build' for its build command.
RUN yarn build

RUN apk del .build-deps

# Expose the port your app will run on
EXPOSE 3000

# Set labels for Traefik
#LABEL traefik.enable="true" \
#    traefik.http.routers.front-app-https.rule="Host(`fishtoners.fi`)" \
#    traefik.http.routers.front-app-https.tls="true" \
#    traefik.http.routers.front-app-https.entrypoints="https" \
#    traefik.http.routers.front-app-https.tls.certresolver="le" \
#    traefik.http.middlewares.front-app-compress.compress="true" \
#    traefik.http.routers.front-app-https.middlewares="front-app-compress"

# Vite serves production files with a server like `serve`
# First, install a static file serving package globally in the image
RUN yarn global add serve

# The 'serve' command serves your static files from the 'dist' directory
CMD ["serve", "-s", "dist", "-l", "3000"]



# docker image build -t apashintsev/fishtoners-tma:latest .
# docker run -p 3010:80 -t -d --name bmadmin apashintsev/fishtoners-tma:latest
# docker push apashintsev/fishtoners-tma