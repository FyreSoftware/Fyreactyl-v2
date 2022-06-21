import Link from "next/link";
import MenuWithAvatar from "./MenuWithAvatar";
import { FilterVintage } from "@mui/icons-material";
import { styledToolbar } from "../../lib/styles/styles";
import { Button, Toolbar, Grid, Avatar } from "@mui/material";

const optionsMenu = [
  {
    text: "Source Code",
    href: "https://github.com/huyenNguyen20",
  },
  {
    text: "My Account",
    href: "/profile",
  },
  {
    text: "Log out",
    href: `/logout`,
  },
];

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styledToolbar}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item sm={11} xs={9} style={{ textAlign: "left" }}>
            {user ? null : (
              <Link href="/">
                <Avatar>
                  <FilterVintage />
                </Avatar>
              </Link>
            )}
          </Grid>
          <Grid item sm={1} xs={3} style={{ textAlign: "right" }}>
            {user ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <MenuWithAvatar
                  options={optionsMenu}
                  src={user.avatarUrl}
                  alt={user.displayName}
                  isAdmin={user.isAdmin}
                />
              </div>
            ) : (
              <div>
                <Button variant="contained" color="primary" href="/signup">
                  Sign up
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

export default Header;
