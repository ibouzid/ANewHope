import { useQuery, useQueryClient} from 'react-query';
import Axios from 'axios';

export const FetchData = async (url: string) => {
    return await Axios.get(url).then((data) => data.data)
}

export const useVehicles = () => {
    
  const queryClient = useQueryClient();
    return useQuery({ queryKey: ['vehicles'], 
                      queryFn: async () => FetchData('https://swapi.dev/api/vehicles?format=json'), 
                      refetchOnWindowFocus: false,
                      staleTime: Infinity,
                      onSuccess: async (data) =>{
                        const vehicles = await Promise.all(data?.results?.map(async (vehicle: any) => {
                            const films = await Promise.all(vehicle?.films?.map(async (filmUrl: any) =>{
                                return await FetchData(filmUrl)
                            }))
                           return  { ...vehicle, films: films}
                        }))
                        queryClient.setQueryData(['vehicles'], {
                            ...data,
                            results: vehicles
                          });
                      } })
}
