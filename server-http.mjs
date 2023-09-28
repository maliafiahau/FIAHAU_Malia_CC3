import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
    response.setHeader("Content-Type", "text/html");
    try {
        const contents = await fs.readFile("index.html", "utf8");
        const part = request.url.split("/");
        const part_1 = part[1];
        switch (part_1) {
            case "":
            case "index.html":
                response.writeHead(200);
                return response.end(contents);
            case "random.html":
                const nb = parseInt(part[2]);
                if (!isNaN(nb)) {
                    const nombre = randomNumber(nb);
                    response.writeHead(200);
                    return response.end(`<html><p>${nombre.join(` , `)}</p></html>`);
                }
            default:
                response.writeHead(404);
                return response.end(`<html><p>404: NOT FOUND</p></html>`);
            }
    } catch (error) {
        console.error(error);
        response.writeHead(500);
        return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
}
  
function randomNumber(cpt) {
    const randomNumbers = [];
    for (let i = 0 ; i < cpt ; i++) {
        randomNumbers.push(Math.floor(100 * Math.random()));
    }
    return randomNumbers;
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
