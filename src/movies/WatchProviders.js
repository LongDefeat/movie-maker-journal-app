import React, { useState, useEffect } from "react";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import axios from "axios";

const WatchProviders = ({ movieId, countryCode = "US" }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchWatchProviders = async () => {
      const response = await MovieDatabaseApi.getWatchProviders(
        movieId,
        countryCode
      );
      setProviders(
        response.data.results &&
          response.data.results[countryCode].flatrate.map(
            (providerInfo) => providerInfo.provider
          )
      );
    };
    fetchWatchProviders();
  }, [movieId, countryCode]);

  console.log("movieId prop:", movieId);
  console.log("countryCode prop:", countryCode);

  return (
    <div>
      <p>Watch Providers:</p>
      {providers.length > 0 ? (
        <ul>
          {providers.map((provider) => (
            <li key={provider.provider_id}>
              <img
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={`${provider.provider_name} logo`}
              />
              <a href={provider.url} target="_blank" rel="noreferrer">
                {provider.provider_name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No watch providers found.</p>
      )}
    </div>
  );
};

export default WatchProviders;
