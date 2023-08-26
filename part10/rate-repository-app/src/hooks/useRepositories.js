import { useQuery } from '@apollo/client';
// import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  const repositories = data.repositories;

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://192.168.1.13:5000/api/repositories');
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  return { repositories, loading };
};

export default useRepositories;