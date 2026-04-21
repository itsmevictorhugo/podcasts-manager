import * as http from "http";
import { getFilterEpisodes, getListEpisodes } from './controllers/podcasts-controller';

const server = http.createServer( async (request: http.IncomingMessage, response: http.ServerResponse) => {
  
  const [baseUrl, queryString] = request.url?.split("?") ?? ["", ""] 

  if(request.method === "GET" && baseUrl === "/api/list") {
    await getListEpisodes(request, response);
  }
  if(request.method === "GET" && baseUrl === "/api/episode"){
    await getFilterEpisodes(request, response);
  }
})

const port = process.env.PORT;

server.listen(process.env.PORT, () => {
  console.log(`Port: ${port} was opened`);
})

