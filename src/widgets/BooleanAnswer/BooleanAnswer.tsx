import { Button } from "@mui/material";
import React from "react";
import "./BooleanAnswer.scss";

import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

interface HellperObjInterface {
  clearErrors: UseFormClearErrors<any>;
  answerBooleanError: any;
}
const BooleanAnswer = (prop: {
  setValue: UseFormSetValue<any>;
  value: boolean;
  hellperObj: HellperObjInterface;
}) => {
  const handleClick = (asnwer: any) => {
    clearErrors("answerBoolean");
    prop.setValue("answerBoolean", asnwer);
  };

  const { answerBooleanError, clearErrors } = prop.hellperObj;
  return (
    <>
      {answerBooleanError && (
        <p style={{ color: "red" }}>{answerBooleanError.message}</p>
      )}
      <div className="single-page-buttons__container">
        <Button
          onClick={() => handleClick(true)}
          variant={prop.value === true ? "contained" : "outlined"}
        >
          Да
        </Button>
        <Button
          onClick={() => handleClick(false)}
          variant={prop.value === false ? "contained" : "outlined"}
        >
          Нет
        </Button>
      </div>
    </>
  );
};

export default BooleanAnswer;
