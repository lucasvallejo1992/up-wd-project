"use client";

import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export default function SignUp() {
  const { handleSignUp, goToHome } = useAuth();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');

  return (
    <div>
      <Box display="flex" alignItems="center" flexDirection="column" marginBottom="4" gap="2">
        <Heading as="h1" size="xl">Registrar jugador</Heading>
        <Divider maxWidth="600px" />
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <Box display="flex" flexDirection="column" gap="4" maxWidth="600px">
          <FormControl isInvalid={false}>
            <FormLabel>Nombre</FormLabel>
            <Input value={name} onChange={({currentTarget}) => setName(currentTarget.value)} placeholder='Nombre' />
            <FormErrorMessage>Por favor coloque un nombre</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={false}>
            <FormLabel>Pin</FormLabel>
            <Input value={pin} onChange={({currentTarget}) => setPin(currentTarget.value)} type='password' placeholder='****' />
            <FormErrorMessage>Por favor coloque un pin</FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme='blue'
            isLoading={false}
            onClick={() => handleSignUp(name, pin)}
          >
            Crear
          </Button>
          <Button
            colorScheme='blue'
            isLoading={false}
            onClick={() => goToHome()}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </div>
  );
}