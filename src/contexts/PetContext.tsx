import React, { createContext, useContext, useState } from 'react';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  compatibility?: number; // Para recomendações
}

interface PetsContextData {
  userPets: Pet[];
  recommendedMatches: Pet[];
  loading: boolean;
  fetchUserPets: () => void;
  fetchRecommendedMatches: () => void;
}

const PetsContext = createContext<PetsContextData>({} as PetsContextData);

export const PetsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [recommendedMatches, setRecommendedMatches] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserPets = () => {
    setLoading(true);
    // Simulação de busca de pets do usuário
    setTimeout(() => {
      setUserPets([
        { id: 1, name: 'Rex', breed: 'Labrador', age: 3 },
        { id: 2, name: 'Luna', breed: 'Golden Retriever', age: 2 },
      ]);
      setLoading(false);
    }, 1000);
  };

  const fetchRecommendedMatches = () => {
    setLoading(true);
    // Simulação de busca de recomendações
    setTimeout(() => {
      setRecommendedMatches([
        { id: 3, name: 'Max', breed: 'Poodle', age: 4, compatibility: 85 },
        { id: 4, name: 'Bella', breed: 'Beagle', age: 3, compatibility: 90 },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <PetsContext.Provider
      value={{
        userPets,
        recommendedMatches,
        loading,
        fetchUserPets,
        fetchRecommendedMatches,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = (): PetsContextData => {
  return useContext(PetsContext);
};