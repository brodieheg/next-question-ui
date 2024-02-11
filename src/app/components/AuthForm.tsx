"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";
import useLoadUser from "../hooks/useLoadUser";
import { signup, signin } from "../store/slices/slices/authSlice";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const AuthForm = ({ type = "signin" }) => {
  const loadUser = useLoadUser();
  const state = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const dispatch: AppDispatch = useDispatch();

  const handleFormSubmit = async (data: {}) => {
    const action: Function = type === "signin" ? signin : signup;
    await dispatch(action(data));

    loadUser();
    router.push("/");
  };

  return (
    <SignUpStyles>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            {...register("email", { required: true })}
            name="email"
          ></input>
          {errors.email?.message}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            {...register("password", { required: true })}
            name="password"
          ></input>
          {errors.password?.message}
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </SignUpStyles>
  );
};

const SignUpStyles = styled.div`
  margin-top: 40px;
`;

export default AuthForm;
