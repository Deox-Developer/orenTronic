# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto que utiliza tu aplicación (si es necesario)
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["npm", "run", "dev"]