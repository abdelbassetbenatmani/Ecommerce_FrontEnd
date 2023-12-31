import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import logo from "../../assets/logo.svg";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { AiFillGoogleSquare } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useRegister } from "../../hook/Auth/useRegister";
import { useDispatch } from "react-redux";
import { createGoogleUser } from "../../Redux/Slice/Auth/AuthThunk";
import { useGoogleLogin } from "@react-oauth/google";
export default function Registre() {
  const dispatch = useDispatch();
 
  const [
    name,
    email,
    password,
    confirmPassword,
    phone,
    changeName,
    changeEmail,
    changePassword,
    changeConfirmPassword,
    changePhone,
    hundelSubmit,
  ] = useRegister();

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    dispatch(createGoogleUser(accessToken));
   
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <div className="flex justify-center items-center min-h-screen mt-5">
      <Card color="transparent" shadow={false}>
        <Link to="/">
          <img
            src={logo}
            alt=""
            width={"100px"}
            className="text-center mx-auto"
          />
        </Link>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" value={name} onChange={changeName} />
            <Input
              size="lg"
              label="Email"
              value={email}
              onChange={changeEmail}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={changePassword}
            />
            <Input
              type="password"
              size="lg"
              label="Confirm Password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
            />
            <Input
              type="number"
              size="lg"
              label="Phone"
              value={phone}
              onChange={changePhone}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal">
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-500">
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-6 bg-gray-900 py-4 hover:opacity-80"
            onClick={hundelSubmit}
            fullWidth>
            Register
          </Button>
          <Typography color="gray" className=" font-normal text-center mt-3">
            OR.
          </Typography>
          <Button
            className="mt-6 bg-gray-900 py-4 flex justify-center items-center gap-2 capitalize font-semibold text-sm hover:opacity-80"
            fullWidth>
            <BiLogoFacebookSquare size={"1.5rem"} /> Login with Facebook
          </Button>
          <Button
            className="mt-6 bg-gray-900 py-4 flex justify-center items-center gap-2 capitalize font-semibold text-sm hover:opacity-80"
            fullWidth
            onClick={() => login()}>
            <AiFillGoogleSquare size={"1.5rem"} /> Login with Google
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="#"
              className=" text-gray-900 transition-colors hover:text-gray-700 font-bold">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}
