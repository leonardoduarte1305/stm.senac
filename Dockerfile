FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN ls -lhaF
RUN npm i
RUN npm run build

# Serve: Servindo a aplicação no Nginx
FROM nginx:latest
COPY --from=build /usr/local/app/dist/stm /usr/share/nginx/html
EXPOSE 80