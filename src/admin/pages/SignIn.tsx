import styled from "styled-components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hook/useAuth"; // Adjust the path as needed
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate

type SignInFormData = {
  user: string;
  password: string;
};

export const SignIn = () => {
  const { login, isAuthenticated } = useAuth(); // Get isAuthenticated from context
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]); // Add isAuthenticated and navigate as dependencies

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    login(data.user, data.password);
  };

  return (
    <Container>
      <HeadWrap>
        <H1Custom>Login to Account</H1Custom>
      </HeadWrap>

      <Label htmlFor="user">UserName</Label>
      <Controller
        name="user"
        control={control}
        defaultValue=""
        rules={{ required: "User name is required" }}
        render={({ field }) => <Input {...field} type="text" id="user" />}
      />
      {errors.user && <Error>{errors.user.message}</Error>}

      <LabelContainer>
        <Label htmlFor="password">Password</Label>
      </LabelContainer>

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <Input {...field} type="password" id="password" />
        )}
      />
      {errors.password && <Error>{errors.password.message}</Error>}
      <Button type="button" onClick={handleSubmit(onSubmit)}>
        Sign in
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 550px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  user-select: none;
`;

const HeadWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const H1Custom = styled.h1`
  padding-top: 20px;
  font-size: x-large;
  font-family: Nunito Sans;
`;
const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-top: 15px;
  font-weight: 400;
  font-family: Nunito Sans;
  color: #202224;
`;

const Input = styled.input`
  height: 35px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  outline: none;

  &:focus {
    border-color: #4880ff;
    box-shadow: 0 0 5px rgba(72, 128, 255, 0.5);
  }
`;

const Button = styled.button`
  margin-top: 50px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  background-color: #4880ff;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: #3a6bbf;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
