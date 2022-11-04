import React, {  useState } from 'react';
import { Flex} from './StarWars.style'
import { QueryClient, QueryClientProvider } from 'react-query';
import VehicleTable from './utils/VehicleTable';
import FilmDetails from './components/FilmDetails';

const StarWars: React.FC = () =>{
  const client = new QueryClient()
  const storedFilm = localStorage.getItem("film");
  const jsonFilm = storedFilm && JSON.parse(storedFilm);
  const [filmData, setFilmData] = useState(jsonFilm);
  return (
    <QueryClientProvider client={client}>
      <Flex>
        <VehicleTable setFilmData={setFilmData} />
        <FilmDetails filmData={filmData} />
      </Flex>
    </QueryClientProvider>
   
  );
}

export default StarWars;
