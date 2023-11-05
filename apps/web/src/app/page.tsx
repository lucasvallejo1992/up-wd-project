"use client";

import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { Avatar } from '../components/Avatar';
import { AvatarSelector } from '../components/AvatarSelector';
import { useState } from 'react';
import { useCreateOutfit } from '../hooks/useCreateOutfit';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [headNumber, setHeadNumber] = useState(1);
  const [shirtNumber, setShirtNumber] = useState(1);
  const [pantsNumber, setPantsNumber] = useState(1);
  const [shoesNumber, setShoesNumber] = useState(1);

  const {
    characters,
    shirts,
    pants,
    shoes,
    handleSelector,
    handleCreate
  } = useCreateOutfit();

  return (
    <div>
      <Box display="flex" alignItems="center" flexDirection="column" margin="4 0" gap="2">
        <Heading as='h1' size='xl'>Crear outfit</Heading>
        <Divider maxWidth="600px" />
      </Box>
      <Box display="flex" justifyContent="center">
        <Avatar
          headSrc={`img/head${headNumber}.png`}
          shirtSrc={`img/shirt${shirtNumber}.png`}
          pantsSrc={`img/pants${pantsNumber}.png`}
          shoesSrc={`img/shoes${shoesNumber}.png`}
        />
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column" marginTop="4" gap="2">
        <Heading as='h2' size='lg'>{ characters[headNumber - 1]?.name }</Heading>
        <Divider maxWidth="600px" />
      </Box>
      <AvatarSelector
        label="Personaje"
        onPrevious={() => setHeadNumber(prev => handleSelector(characters.length, prev, false))}
        onNext={() => setHeadNumber(prev => handleSelector(characters.length, prev))}
      />
      <AvatarSelector
        label="Remera"
        onPrevious={() => setShirtNumber(prev => handleSelector(shirts.length, prev, false))}
        onNext={() => setShirtNumber(prev => handleSelector(shirts.length, prev))}
      />
      <AvatarSelector
        label="Pantalon"
        onPrevious={() => setPantsNumber(prev => handleSelector(pants.length, prev, false))}
        onNext={() => setPantsNumber(prev => handleSelector(pants.length, prev))}
      />
      <AvatarSelector
        label="Zapatillas"
        onPrevious={() => setShoesNumber(prev => handleSelector(shoes.length, prev, false))}
        onNext={() => setShoesNumber(prev => handleSelector(shoes.length, prev))}
      />
      <Box display="flex" alignItems="center" flexDirection="column" gap="4">
        <Divider maxWidth="600px" />
        <Button
          colorScheme='blue'
          disabled={!characters.length}
          onClick={() => handleCreate(characters[headNumber - 1].id, [shirts[shirtNumber - 1].id, pants[pantsNumber - 1].id, shoes[shoesNumber - 1].id])}
        >
          Crear outfit
        </Button>
      </Box>
    </div>
  );
}
