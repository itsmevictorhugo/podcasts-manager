import { IncomingMessage, ServerResponse} from 'http';

export const getListEpisodes = async (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, {'content-type': "application/json"})
  response.end(JSON.stringify([
    {
      podcastName: "Flow",
      episode: "FABIO AKITA - Flow #588",
      videoId: "4c7pbOxYn_A",
      categories: ["dev", "AI"]
    },
    {
      podcastName: "Inteligência Ltda",
      episode: "SUPERINTELIGÊNCIA ARTIFICIAL - AKITA, ROBERTA E CAVALLINI - Inteligência Ltda.Podcast #1583",
      videoId: "_Hl9wiLkns4",
      categories: ["dev", "AI"]
    }
  ]))
}