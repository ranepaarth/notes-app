import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiLockClosed } from "react-icons/hi2";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Navigate } from "react-router-dom";
import EmptyLine from "../components/UserForm/EmptyLine";
import FormArticle from "../components/UserForm/FormArticle";
import FormDiv from "../components/UserForm/FormDiv";
import FormHeader from "../components/UserForm/FormHeader";
import FormInput from "../components/UserForm/FormInput";
import FormMain from "../components/UserForm/FormMain";
import FormPinIcon from "../components/UserForm/FormPinIcon";
import FormSection from "../components/UserForm/FormSection";
import FormSubmitBtn from "../components/UserForm/FormSubmitBtn";
import useAuth from "../hooks/useAuth";
import useLoginUser from "../hooks/useLogin";
import registerOptions from "./registerOptions";

const SignInPage = () => {
  const {user} = useAuth()
  const { login, serverError, loading } = useLoginUser();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode:"onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPwd, setShowPwd] = useState(false);

  const toggleShowPwd = () => {
    setShowPwd((prev) => !prev);
  };
  const onFormSubmit = (data) => {
    login(data);
    reset();
  };

  return (
    <FormSection>
      {user && <Navigate to='/mynotes'/>}
      <FormArticle>
        <FormDiv>
          <FormPinIcon />
          <FormHeader
            heading={"Log in to your account"}
            subheader={`Don't have an account?`}
            linkTo={"/signup"}
            linkToPage={"Create new account"}
          />
          <FormMain
            handleSubmit={handleSubmit}
            onFormSubmit={onFormSubmit}
          >
            <span className="flex items-center text-sm bg-yellow-950/10 h-8 px-2 font-medium text-yellow-950 divide-x divide-yellow-950/40">
              <span className="px-2">test3@test.com</span>
              <span className="px-2">Test@123</span>
            </span>
            <FormInput
              Icon={<MdOutlineAlternateEmail />}
              type={"text"}
              width={"w-[95%]"}
              placeholder={"Email"}
              error={errors?.email?.message}
              register={{ ...register("email", registerOptions.email) }}
            />
            <EmptyLine width={"w-[97%]"} />
            <EmptyLine width={"w-[75%]"} />
            <FormInput
              Icon={<HiLockClosed />}
              type={showPwd ? "text" : "password"}
              width={"w-full"}
              placeholder={"Password"}
              error={errors?.password?.message}
              register={{ ...register("password", registerOptions.password) }}
              toggleShowPwd={toggleShowPwd}
              showPwd={showPwd}
            />
            <FormSubmitBtn />
            {serverError ? (
              <span className="text-lg md:text-sm text-red-600 font-medium bg-red-500/30 px-4 py-1 rounded border border-red-700">
                {serverError}
              </span>
            ) : (
              <EmptyLine width={"w-[88%]"} />
            )}
            {
              loading ? <h3 className="font-semibold text-yellow-950 text-sm">Logging in...</h3>:""
            }
          </FormMain>
        </FormDiv>
      </FormArticle>
    </FormSection>
  );
};

export default SignInPage;
