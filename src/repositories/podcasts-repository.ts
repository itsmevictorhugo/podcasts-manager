import Podcast from "../models/podcast-model";
import PodcastModel from "../models/podcast-model";
import podcastData from "../repositories/podcasts.json";

export const repositoryPodcast = async (podcastName?: string): Promise<Podcast[]> => {
  let jsonFile = podcastData as PodcastModel[];

  if(podcastName) {
    jsonFile = jsonFile.filter((podcast: PodcastModel) => podcast.podcastName === podcastName)
  }

  return jsonFile;
}