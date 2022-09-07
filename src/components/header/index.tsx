import logo from "../../img/Mortal-Kombat-Logo.png";
import "./styles.css";

interface HeaderProps {
  isCharactersSelected: boolean;
}
const Header = ({ isCharactersSelected }: HeaderProps) => {
  return (
    <div className="header">
      <div className="wrapperLogo">
        <div className="logoContainer">
          <img src={logo} alt="Not availale" className="logo" />
        </div>
        <h2 className="headings">
          {" "}
          {isCharactersSelected
            ? "Your champions!"
            : "Select your squad to defend earthrealm"}
        </h2>
      </div>
    </div>
  );
};

export default Header;
