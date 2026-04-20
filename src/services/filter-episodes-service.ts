import { repositoryPodcast } from "../repositories/podcasts-repository"

export const serviceFilterEpisodes = async (podcastName: string) => {
  const data = await repositoryPodcast(podcastName);
  return data;
}