import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Menu fixed="top" size="huge">
      {/* Left side of Navbar  */}

      <Menu.Item as={Link} to="/" style={{ fontSize: "1.5rem" }}>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/rated" style={{ fontSize: "1.5rem" }}>
        Rated
      </Menu.Item>
      {/* Right side of Navbar */}
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/auth" style={{ fontSize: "1.5rem" }}>
          Auth
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
