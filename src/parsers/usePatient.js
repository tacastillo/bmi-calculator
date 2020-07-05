import useResource from "../hooks/useResource";

const usePatient = (client) => {
  const { resource, loading } = useResource(client, `Patient/${client.patient.id}`);

  if (loading) {
    return { loading };
  }

  const name = {
    fullName: `${resource.name[0].given.join(' ')} ${resource.name[0].family}`,
    lastName: resource.name[0].family,
    firstName: resource.name[0].given[0]
  };

  const gender = resource.gender;

  return {
    resource,
    gender,
    loading,
    ...name,
  };
};

export default usePatient;