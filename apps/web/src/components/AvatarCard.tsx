import { Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import { CharacterType } from "../types/Character";

type AvatarCardProps = {
  character: CharacterType;
}

export const AvatarCard = ({ character }: AvatarCardProps) => {
  const shirtSrc = character.items.filter(item => item.type === 'shirt')?.[0]?.src;
  const pantsSrc = character.items.filter(item => item.type === 'pants')?.[0]?.src;
  const shoesSrc = character.items.filter(item => item.type === 'shoes')?.[0]?.src;
  return (
    <Card maxW='sm'>
      <CardBody>
        <div className="color-gradient">
          <div className="avatar-container">
            <img className="avatar-image" src={pantsSrc} alt="Pants tile" />
            <img className="avatar-image" src={shirtSrc} alt="Shirt tile" />
            <img className="avatar-image" src={shoesSrc} alt="Shoes tile" />
            <img className="avatar-image" src={`img/head${character.id}.png`} alt="Head tile" />
          </div>
        </div>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{character.name}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
};
