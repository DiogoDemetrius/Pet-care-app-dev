import React, { createContext, useContext, useState } from 'react';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  compatibility?: number;
  image?: string;
  gender?: string;
  birthdate?: string;
  chipNumber?: string;
  pedigree?: string;
  description?: string;
  displasiaCoxofemural?: string;
  temAncestralidade?: boolean;
}

interface PetsContextData {
  userPets: Pet[];
  recommendedMatches: Pet[];
  loading: boolean;
  fetchUserPets: () => void;
  fetchRecommendedMatches: () => void;
  getPetById: (id: number) => Promise<Pet | undefined>;
  deletePet: (id: number) => Promise<void>;
}

const PetsContext = createContext<PetsContextData>({} as PetsContextData);

export const PetsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userPets, setUserPets] = useState<Pet[]>([
    {
      id: 1,
      name: 'Rex',
      breed: 'Labrador',
      age: 3,
      image: 'https://place-puppy.com/300x300',
      gender: 'male',
      birthdate: '2020-01-01',
      displasiaCoxofemural: 'Normal',
      pedigree: 'ABC123',
      description: 'Cachorro brincalhão e amigável.',
      temAncestralidade: true,
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Golden Retriever',
      age: 2,
      image: 'https://place-puppy.com/301x301',
      gender: 'female',
      birthdate: '2021-05-10',
      displasiaCoxofemural: 'Leve',
      pedigree: 'XYZ789',
      description: 'Adora brincar na água.',
      temAncestralidade: false,
    },
  ]);
  const [recommendedMatches, setRecommendedMatches] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserPets = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const fetchRecommendedMatches = () => {
    setLoading(true);
    setTimeout(() => {
      setRecommendedMatches([
        {
          id: 3,
          name: 'Max',
          breed: 'Poodle',
          age: 4,
          compatibility: 85,
          image: 'https://place-puppy.com/302x302',
          gender: 'male',
          birthdate: '2019-03-15',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const getPetById = async (id: number) => {
    const pet = userPets.find((p) => p.id === id) || recommendedMatches.find((p) => p.id === id);
    return new Promise<Pet | undefined>((resolve) => setTimeout(() => resolve(pet), 200));
  };

  const deletePet = async (id: number) => {
    setUserPets((prev) => prev.filter((p) => p.id !== id));
    return new Promise<void>((resolve) => setTimeout(resolve, 200));
  };

  return (
    <PetsContext.Provider
      value={{
        userPets,
        recommendedMatches,
        loading,
        fetchUserPets,
        fetchRecommendedMatches,
        getPetById,
        deletePet,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = (): PetsContextData => {
  return useContext(PetsContext);
};