import { IncomingMessage, ServerResponse} from 'http';

export const getListEpisodes = async (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, {'content-type': "application/json"})
  response.end({
    name: "Victor Hugo",
  })
}