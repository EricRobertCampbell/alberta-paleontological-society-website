import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated && user ? (
    <div id="profile">
      <img src={user.picture} alt={user.name} />
      <h4>{user.name}</h4>
    </div>
  ) : null;
};
