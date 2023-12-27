import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiLockClosed } from "react-icons/hi2";
import { MdOutlineAlternateEmail } from "react-icons/md";
import EmptyLine from "../components/UserForm/EmptyLine";
import FormArticle from "../components/UserForm/FormArticle";
import FormDiv from "../components/UserForm/FormDiv";
import FormHeader from "../components/UserForm/FormHeader";
import FormInput from "../components/UserForm/FormInput";
import FormMain from "../components/UserForm/FormMain";
import FormPinIcon from "../components/UserForm/FormPinIcon";
import FormSection from "../components/UserForm/FormSection";
import FormSubmitBtn from "../components/UserForm/FormSubmitBtn";
import registerOptions from "./registerOptions";

const SignInPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    console.log(data);
    reset();
  };

  const onFormErrors = (errors) => {
    console.log(errors);
  };

  return (
    <FormSection>
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
            onFormErrors={onFormErrors}
            onFormSubmit={onFormSubmit}
          >
            <EmptyLine width={"w-[88%]"} />
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
            <EmptyLine width={"w-[88%]"} />
          </FormMain>
        </FormDiv>
      </FormArticle>
    </FormSection>
  );
};

export default SignInPage;
