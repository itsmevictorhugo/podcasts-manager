import { IncomingMessage, ServerResponse} from 'http';
import { serviceListEpisodes } from '../services/list-episodes-service';
import { serviceFilterEpisodes } from '../services/filter-episodes-service';
import { StatusCode } from '../utils/status-code';
import { ContentType } from '../utils/content-type';

export const getListEpisodes = async (request: IncomingMessage, response: ServerResponse) => {
  const content = await serviceListEpisodes();
  response.writeHead(StatusCode.OK, {'content-type': ContentType.JSON})
  response.end(JSON.stringify(content))
}

export const getFilterEpisodes = async (request: IncomingMessage, response: ServerResponse) => {
  const content = await serviceFilterEpisodes(request.url);
  response.writeHead(StatusCode.OK, {'content-type': ContentType.JSON})
  response.end(JSON.stringify(content))
}
