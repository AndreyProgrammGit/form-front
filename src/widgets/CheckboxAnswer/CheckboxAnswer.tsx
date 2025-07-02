import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect } from "react";

import "./CheckboxAnswer.scss";
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";

interface HellperObjInterface {
  clearErrors: UseFormClearErrors<any>;
  register: UseFormRegister<any>;
  answerOptionsError: any;
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<any, "answerOptions">;
  remove: UseFieldArrayRemove;
}

const CheckboxAnswer = ({
  options,
  hellperObj,
}: {
  options: { value: string }[] | undefined | null;
  hellperObj: HellperObjInterface;
}) => {
  const { clearErrors, answerOptionsError, register, fields, append, remove } =
    hellperObj;

  useEffect(() => {
    remove();
    append(options);
  }, [options]);

  return (
    <>
      <div className="single-page-checkbox">
        {answerOptionsError ? (
          <p style={{ color: "red" }}>Выберите хотя бы одно зачение</p>
        ) : null}
        {fields?.map((item: any, index: any) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                onClick={() => {
                  clearErrors("answerOptions");
                }}
                {...register(`answerOptions.${index}.isChoose`)}
              />
            }
            label={item.value}
          />
        ))}
      </div>
    </>
  );
};

export default CheckboxAnswer;
