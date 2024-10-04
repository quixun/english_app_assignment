import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

export const Header = () => {
  return (
    <Wrapper>
      <LeftSection>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <InputContainer>
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </InputContainer>
      </LeftSection>
      <RightSection>
        <LanguageSelect>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={10}
              inputProps={{
                name: "language",
                id: "uncontrolled-native",
              }}
            >
              <option value={10}>English</option>
              <option value={20}>Tiếng Việt</option>
            </NativeSelect>
          </FormControl>
        </LanguageSelect>
        <UserInfo>
          <Avatar
            src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-1/448603736_1025838262409247_9149332930088289070_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=nqqp3ziovCEQ7kNvgF9h8PQ&_nc_ht=scontent.fdad3-5.fna&_nc_gid=AaSO20hvlfS7A1FYitJWc8x&oh=00_AYDy5rR83LRjcNKoR47CZ1tGNM-CPWg_qY17b7Njr5jGJA&oe=66F85073"
            alt="User Avatar"
          />
          <UserDetails>
            <span>Xuan Phan</span>
            <span>admin</span>
          </UserDetails>
        </UserInfo>
      </RightSection>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: 70px;
  background-color: #fff;
  color: black;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: calc(100% - 280px);
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: width 0.3s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LanguageSelect = styled.div`
  width: 90px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 25px;
  overflow: hidden;
  height: 35px;
  margin-left: 30px;

  input {
    height: 100%;
    padding: 5px 10px;
    border: none;
    outline: none;
    flex: 1;
  }

  svg {
    padding: 0 8px;
    cursor: pointer;
    color: #555;

    &:hover {
      color: black;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    color: black;
    margin: 0;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;

  span:first-child {
    font-weight: bold;
  }

  span:last-child {
    color: gray;
    font-size: 14px;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
`;
