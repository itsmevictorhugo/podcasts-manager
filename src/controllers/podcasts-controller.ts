import { IncomingMessage, ServerResponse} from 'http';
import { serviceListEpisodes } from '../services/list-episodes-service';
import { serviceFilterEpisodes } from '../services/filter-episodes-service';
import { ContentType } from '../utils/content-type';
import { PodcastTransferModel } from '../models/podcast-transfer-model';

export const getListEpisodes = async (request: IncomingMessage, response: ServerResponse) => {
  const content: PodcastTransferModel = await serviceListEpisodes();
  response.writeHead(content.statusCode, {'content-type': ContentType.JSON})
  response.end(JSON.stringify(content.body))
}

export const getFilterEpisodes = async (request: IncomingMessage, response: ServerResponse) => {
  const content: PodcastTransferModel = await serviceFilterEpisodes(request.url);
  response.writeHead(content.statusCode, {'content-type': ContentType.JSON})
  response.write(JSON.stringify(content.body))
  response.end()
}
