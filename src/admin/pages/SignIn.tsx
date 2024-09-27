import styled from "styled-components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { EmptyLayout } from "../../layouts/EmptyLayout";
import { useNavigate } from "react-router-dom";

type SignInFormData = {
  email: string;
  password: string;
  remember: boolean;
};

export const SignIn = () => {
  const navigate = useNavigate();
  const userName = "xuanphan742@gmail.com";
  const password = "12345678";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    if (data.email === userName && data.password === password) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <EmptyLayout>
      <Container>
        <HeadWrap>
          <H1Custom>Login to Account</H1Custom>
          <SpanCustom>
            Please enter your email and password to continue
          </SpanCustom>
        </HeadWrap>

        <Label htmlFor="email">User name</Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "user name is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid user name format",
            },
          }}
          render={({ field }) => <Input {...field} type="text" id="email" />}
        />
        {errors.email && <Error>{errors.email.message}</Error>}

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

        <CheckboxContainer>
          <Controller
            name="remember"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <>
                <RememberPassInput
                  type="checkbox"
                  id="remember"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <RememberPassLabel htmlFor="remember">
                  Remember Password
                </RememberPassLabel>
              </>
            )}
          />
        </CheckboxContainer>
        <Button onClick={handleSubmit(onSubmit)}>Sign in</Button>
        <AccountMessage>
          Don’t have an account? <span>Create Account</span>
        </AccountMessage>
      </Container>
    </EmptyLayout>
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

const SpanCustom = styled.span`
  margin-bottom: 20px;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const RememberPassLabel = styled.label`
  margin-left: 5px;
`;

const RememberPassInput = styled.input`
  margin: 0;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
`;

const Button = styled.button`
  margin-top: 20px;
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

const AccountMessage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;

  span {
    text-decoration: underline;
    color: #4880ff;
  }
`;
