# Imagen base de Node.js LTS (versión ligera)
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias primero para aprovechar el caché de Docker
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Comando de inicio
CMD ["node", "index.js"]
