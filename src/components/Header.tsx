import { CombinedLoginLogoutButton } from "./LoginButtons";
import { Profile } from "./Profile";

export const Header = () => {
  return (
    <div id="header">
      <div id="logo-titles">
        <div id="top-component">
          <div id="titles">
            <h1>Alberta Paleontological Society</h1>
            <h2>
              The Meeting Place for Amateur and Professional Paleontologists
            </h2>
          </div>
        </div>
        <div id="other-logos">
          <img
            src="/aps-logo.gif"
            alt="Alberta Paleontological Society Logo"
            className="logo"
          />
          <img
            src="/CEGA_logo.png"
            alt="Canadian Energy Geoscience Association Logo"
            className="logo"
          />
          <img
            src="/MRU_logo1.png"
            alt="Mount Royal Univerity Logo"
            className="logo"
          />
        </div>
      </div>
      <div id="user-info">
        <Profile />
        <CombinedLoginLogoutButton />
      </div>
    </div>
  );
};
