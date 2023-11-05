type AvatarProps = {
  headSrc: string;
  shirtSrc: string;
  pantsSrc: string;
  shoesSrc: string;
}

export const Avatar = ({ headSrc, shirtSrc, pantsSrc, shoesSrc }: AvatarProps) => (
  <div className="color-gradient">
    <div className="avatar-container">
      <img className="avatar-image" src={pantsSrc} alt="Pants tile" />
      <img className="avatar-image" src={shirtSrc} alt="Shirt tile" />
      <img className="avatar-image" src={shoesSrc} alt="Shoes tile" />
      <img className="avatar-image" src={headSrc} alt="Head tile" />
    </div>
  </div>
);