import { withAuthenticationRequired } from "@auth0/auth0-react";

export const Restricted = withAuthenticationRequired(() => {
  return (
    <>
      <h2>Restricted</h2>
      <p>
        This is a restricted section of the website - you must be logged in to
        see this.
      </p>
    </>
  );
});
