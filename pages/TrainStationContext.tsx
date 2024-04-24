// TrainStationContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TrainStation {
  name: string;
  locationX: string;
  locationY: string;
}

interface TrainStationContextType {
  trainStations: TrainStation[];
  loading: boolean;
  error: string | null;
}

const TrainStationContext = createContext<TrainStationContextType>({
  trainStations: [],
  loading: false,
  error: null,
});

export const useTrainStationContext = () => useContext(TrainStationContext);

export const TrainStationProvider: React.FC = ({ children }) => {
  const [trainStations, setTrainStations] = useState<TrainStation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainStations = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.irail.be/stations/?format=json&lang=en');
        if (!response.ok) {
          throw new Error('Failed to fetch train stations');
        }
        const data = await response.json();
        setTrainStations(data.station);
      } catch (error) {
        setError('Failed to fetch train stations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainStations();
  }, []);

  return (
    <TrainStationContext.Provider value={{ trainStations, loading, error }}>
      {children}
    </TrainStationContext.Provider>
  );
};
