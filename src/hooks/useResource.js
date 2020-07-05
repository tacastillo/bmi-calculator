import { useState, useEffect } from 'react';

const useResource = (fhirClient, query) => {
  const [resource, setResource] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    fhirClient.request(query)
      .then((resource) => {
        setResource(resource);
        setLoading(false);
      })
      .catch((caughtError) => {
        setError(caughtError);
      });
  }, [fhirClient, query]);

  return {
    resource,
    loading,
    error
  };
};

export default useResource;