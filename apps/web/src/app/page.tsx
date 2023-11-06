"use client";

import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { useShowOutfits } from '../hooks/useShowOutfits';
import { CharacterType } from '../types/Character';
import { AvatarCard } from '../components/AvatarCard';
import { useAuth } from '../hooks/useAuth';

export default function Web() {
  const {
    outfits
  } = useShowOutfits();
  const { profile, handleLogOut } = useAuth();

  const goToSignUpPage = () => {
    window.location.href = "/signup";
  }

  const goToLogInPage = () => {
    window.location.href = "/login";
  }
  const goToCreatenPage = () => {
    window.location.href = "/create-outfit";
  }

  return (
    <div>
      <Box display="flex" alignItems="center" flexDirection="column" marginBottom="4" gap="2">
        <Heading as="h1" size="xl">Listado de outfits{profile?.name ? ` de ${profile.name}` : ''}</Heading>
        <Divider maxWidth="600px" />
        <Box display="flex" justifyContent="center" gap="2">
          {
            !profile?.name ? (
              <>
                <Button
                  colorScheme='blue'
                  isLoading={false}
                  onClick={goToLogInPage}
                >
                  Ingresar
                </Button>
                <Button
                  colorScheme='blue'
                  isLoading={false}
                  onClick={goToSignUpPage}
                >
                  Registrarse
                </Button>
              </>
            ) : undefined
          }
          {
            profile?.name ? (
              <>
                <Button
                  colorScheme='blue'
                  isLoading={false}
                  onClick={goToCreatenPage}
                >
                  Crear o Editar Outfit
                </Button>
                <Button
                  colorScheme='red'
                  isLoading={false}
                  onClick={() => handleLogOut()}
                >
                  Salir
                </Button>
              </>
            ) : undefined
          }
        </Box>
        <Divider maxWidth="600px" />
      </Box>
      <Box display="flex" gap="4" justifyContent="center">
        {
          outfits?.length ? outfits.map((character: CharacterType) => (
            <AvatarCard key={character.id} character={character} />
          )) : undefined
        }
      </Box>
    </div>
  );
}
