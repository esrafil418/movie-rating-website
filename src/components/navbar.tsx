import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Menu fixed="top" size="huge">
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/auth">
          {" "}
          Auth{" "}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
