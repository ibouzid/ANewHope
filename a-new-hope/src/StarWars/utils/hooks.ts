import { useQuery, useQueries, useQueryClient} from 'react-query';
import Axios from 'axios';

export const FetchData = async (url: string) => {
    return await Axios.get(url).then((data) => data.data)
}

export const useVehicles = () => {
    
  const queryClient = useQueryClient();
    return useQuery({ queryKey: ['vehicles'], 
                      queryFn: async () => await FetchData('https://swapi.dev/api/vehicles?format=json'), 
                      refetchOnWindowFocus: false,
                      staleTime: Infinity,
                      onSuccess: async (data) =>{
                        const vehicles = await Promise.all(data?.results?.map(async (vehicle: any) => {
                            const films = await Promise.all(vehicle?.films?.map(async (filmUrl: any) =>{
                                return await FetchData(filmUrl)
                            }))
                            //const resolvedFilms = await Promise.all(films).then(data=>data)
                           return  { ...vehicle, films: films}
                        }))
                        //const resolvedVehicles = await Promise.all(vehicles).then(data=>data)
                        queryClient.setQueryData(['vehicles'], {
                            ...data,
                            results: vehicles
                          });
                      } })
}

export const useFilms = (urls: string[]) => {
    const filmQueries = urls.map((url, index) => {
        return { queryKey: ['films', index], queryFn: () => Axios.get(url).then((data) => data.data), staleTime: Infinity }})
    return  useQueries(filmQueries)
}