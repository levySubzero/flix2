import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import useShow from '@/hooks/useShow';
import Dropdown from '@/components/Dropdown';
import useEpisodeList from '@/hooks/useEpisodeList';
import EpisodeList from './EpisodeList';
import { EpisodeInterface, SeriesInterface } from '@/types';
import useSeries from '@/hooks/useSeries';
import axios from 'axios';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModalSeries: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { showId } = useInfoModalSeriesStore();
  const [options, setOptions] = useState<SeriesInterface[]>([]);
  const [episodes, setEpisodes] = useState<EpisodeInterface[]>([]);
  const [seasonId, setSeasonId] = useState('');
  const { data = {} } = useShow(showId);
  const [currentSeason, setcurrentSeason] = useState<SeriesInterface>();
  const { data: seasons = [] } = useSeries(showId as string);

  // const { data: episodes = [] } = useEpisodeList(seasons[0].id as string);
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setEpisodes([]);
      setOptions([]);
      setSeasonId('')
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  useEffect(() => {
    setOptions(seasons);
    for (let i = 0; i < 1; i++) {
      const season = seasons[i];
      setcurrentSeason(season);
      console.log('id', season.id)
      setEpisodes(season.episodes)
      // axios.get(`/api/episodes/${season.id}`)
      // .then((response) => setEpisodes(season.episodes))
      // .catch((error) => console.error('Error fetching data:', error));
    }
  }, [seasons]);

  const handleSeasonChange = (value: string) => {
    const seasonId: string = value
    setSeasonId(seasonId);
    axios.get(`/api/episodes/${seasonId}`)
      .then((response) => setEpisodes(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }

  if (!visible) {
    return null;
  }
  

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-screen mx-auto my-auto max-w-5xl rounded-md overflow-hidden">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
        
          <div className="relative h-96">
          <video poster={currentSeason?.thumbnailUrl} autoPlay muted loop src={currentSeason?.trailerUrl} className="w-full brightness-[60%] object-cover h-full" />
            <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <AiOutlineClose className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {currentSeason?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={currentSeason?.id as string} />
                <FavoriteButton movieId={currentSeason?.id as string} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-1 ">
                <div className="flex flex-col items-start gap-2 mb-8">
                  <div className="flex flex-row text-left gap-2 mb-8">
                    <p className="text-green-400 font-semibold text-lg">
                      {currentSeason?.year}
                    </p>
                    <p className="text-white">
                      {/* {currentSeason?.episodes.length} */}
                    </p>
                  </div>
                  <p className="text-white mt-[-20px]">
                    {data?.genre}
                  </p>
                  <div className="">
                    <p className="text-white">
                      {currentSeason?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 mt-20 flex flex-col justify-center align-center">
                <div className="flex flex-col ml-20 flex items-start justify-end gap-2 mb-8">
                  <p className="text-white">
                    <span className="text-gray-400">Cast:  </span>{currentSeason?.cast}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Genres:  </span>{data?.subGenres}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">The film is:  </span>{data?.shortDesc}
                  </p>
                </div>    
                <div className="ml-8">
                  <div className="ml-8">
                    <Dropdown 
                      id="seasons" 
                      label="Select Season" 
                      value={seasonId}
                      series={options}
                      onChange={(e: any) => handleSeasonChange(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
             
            </div>
          </div>
          {episodes.length > 0 &&<div className="mx-3">
            <EpisodeList title="Episodes" data={episodes} />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default InfoModalSeries;
