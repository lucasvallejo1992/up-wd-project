import { Box, Button } from "@chakra-ui/react";

type AvatarSelectorProps = {
  label: string;
  onPrevious: () => void;
  onNext: () => void;
}

export const AvatarSelector = ({ label, onPrevious, onNext }: AvatarSelectorProps) => (
  <Box display="flex" justifyContent="center">
    <Box width="300px" display="flex" justifyContent="space-between" alignItems="center"  flexDirection="row" gap="4" margin="4">
      <Button colorScheme='blue' onClick={onPrevious}>Anterior</Button>
      <p>{ label }</p>
      <Button colorScheme='blue' onClick={onNext}>Siguiente</Button>
    </Box>
  </Box>
);
