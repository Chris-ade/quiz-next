import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
}

const UserAvatar = ({ name = "JD" }: UserAvatarProps): React.ReactNode => {
  const fullName = name.trim().split(" ");
  const initals = fullName.map((name) => name.charAt(0).toUpperCase()).join("");

  return (
    <Avatar>
      <AvatarFallback>{initals}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
