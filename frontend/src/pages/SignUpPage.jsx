import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi2";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { NavLink, Navigate } from "react-router-dom";
import EmptyLine from "../components/UserForm/EmptyLine";
import FormArticle from "../components/UserForm/FormArticle";
import FormDiv from "../components/UserForm/FormDiv";
import FormHeader from "../components/UserForm/FormHeader";
import FormInput from "../components/UserForm/FormInput";
import FormMain from "../components/UserForm/FormMain";
import FormPinIcon from "../components/UserForm/FormPinIcon";
import FormSection from "../components/UserForm/FormSection";
import FormSubmitBtn from "../components/UserForm/FormSubmitBtn";
import useSignUp from "../hooks/useSignUp";
import registerOptions from "./registerOptions";

const SignUpPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode:"onChange",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signupUser, success, loading } = useSignUp();

  const [showPwd, setShowPwd] = useState(false);
  const toggleShowPwd = () => {
    setShowPwd((prev) => !prev);
  };

  const onFormSubmit = (data) => {
    // console.log(data);
    signupUser(data);
    reset();
  };

  return (
    <FormSection>
      {success && <Navigate to='/signin' />}
      <FormArticle>
        <FormDiv>
          <FormPinIcon />
          <FormHeader
            heading={"Create a free account"}
            subheader={"Already have an account?"}
            linkTo={"/signin"}
            linkToPage={"Log in"}
          />
          <FormMain
            handleSubmit={handleSubmit}
            onFormSubmit={onFormSubmit}
          >
            <FormInput
              Icon={<FaUser />}
              type={"text"}
              width={"w-[88%]"}
              placeholder={"Username"}
              error={errors?.userName?.message}
              register={{ ...register("userName", registerOptions.userName) }}
            />
            <EmptyLine width={"w-[85%]"} />
            <FormInput
              Icon={<MdOutlineAlternateEmail />}
              type={"text"}
              width={"w-[95%]"}
              placeholder={"Email"}
              error={errors?.email?.message}
              register={{ ...register("email", registerOptions.email) }}
            />
            <EmptyLine width={"w-[65%]"} />
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
            <FormInput
              Icon={<HiLockClosed />}
              type={"password"}
              width={"w-[70%]"}
              placeholder={"Confirm Password"}
              error={errors?.confirmPassword?.message}
              register={{
                ...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (val) => {
                    if (watch("password") !== val)
                      return "Password did not match.";
                  },
                }),
              }}
            />
            <FormSubmitBtn />
            {loading ? <span className="text-sm text-yellow-950/80">Saving User...</span> : ""}
            {success ? (
              <span className="text-sm text-yellow-950/80">
                <span className="font-medium">User Registered Successfully!!</span>
                <NavLink to='/signin' className='text-base font-semibold text-yellow-950 hover:underline px-2'>Login</NavLink>
              </span>
            ) : (
              ""
            )}
          </FormMain>
        </FormDiv>
      </FormArticle>
    </FormSection>
  );
};

export default SignUpPage;
