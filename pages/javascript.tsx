import Link from 'next/link';
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

const useTrainStationContext = () => useContext(TrainStationContext);

const TrainStationProvider: React.FC = ({ children }) => {
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

const TrainStationTable: React.FC = () => {
  const { trainStations, loading, error } = useTrainStationContext();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter and sort train stations
  const filteredAndSortedStations = trainStations
    .filter(station => station.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Calculate indexes of the first and last items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedStations.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredAndSortedStations.length / itemsPerPage);

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className='container'>
      <div className='row mb-4 mt-4 d-l-block'>
        <div className='f-left'>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            className='custom-input'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='col-lg-auto f-right'>
          <button className='btn-sort btn' onClick={handleSort}>Sort {sortDirection === 'asc' ? 'Z to A' : 'A to Z'}</button>
        </div>
      </div>
      <div className="table-responsive mb-4">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((station, index) => (
              <tr key={index}>
                <td>
                  {/* Create a link to Google Maps using latitude and longitude */}
                  <Link className='link-map'
                    href={`https://www.google.com/maps/place/${station.locationX},${station.locationY}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {station.name}
                  </Link>
                </td>
                <td>{station.locationX}</td>
                <td>{station.locationY}</td>
                <td><input type="text" placeholder="Add note" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className='text-right pagination'>
        <button className='pagination-btn' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span className='pagination-btn' >{currentPage} of {totalPages}</span>
        <button className='pagination-btn' disabled={currentItems.length < itemsPerPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

const JavaScript: React.FC = () => {
  return (
    <TrainStationProvider>
      <div>
        <h1 className='text-center header mt-3'>Train Station App</h1>
        <TrainStationTable />
      </div>
      <div className='container'>
        <Link className='btn btn-back d-l-block mt-4 mb-4 text-center' href="/">Back to Home</Link>
      </div>
    </TrainStationProvider>
  );
};

export default JavaScript;
