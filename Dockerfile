from node:19-buster-slim
workdir /app

copy package* .
run npm install
copy . .
cmd ["node", "app.js"]