import { repositoryPodcast } from "../repositories/podcasts-repository"

export const serviceListFilterEpisodes = async (podcastName: string) => {
  const data = await repositoryPodcast(podcastName);

  return data;
}