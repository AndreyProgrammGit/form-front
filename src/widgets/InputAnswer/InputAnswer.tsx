`use client`;

import { TextField } from "@mui/material";
import React, { useState } from "react";

import "./InputAnswer.scss";
import { UseFormRegister } from "react-hook-form";

interface HellperObjInterface {
  register: UseFormRegister<any>;
  answerTextError: any;
}

interface InputAnswerProps extends HellperObjInterface {}

const InputAnswer = ({ hellperObj }: { hellperObj: InputAnswerProps }) => {
  const [answer, setAnswer] = useState("");
  const { register, answerTextError } = hellperObj;
  return (
    <>
      <div className="single-page-input">
        {answerTextError ? (
          <p style={{ color: "red" }}>
            Поле должно быть заполнено, содержать не меньше 2 и не больше 50
            символов
          </p>
        ) : null}
        <TextField
          {...register("answerText", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          id="filled-basic"
          label="asnwer"
          variant="filled"
        />
      </div>
    </>
  );
};

export default InputAnswer;
