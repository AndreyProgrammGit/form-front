"use client";

import { useGetListQuestionByIdQuery } from "@/lib/features/questionSlice";

import { configAnswer } from "@/utils/confinAnswer";

import { Button, FormGroup } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import { useEffect, useState } from "react";

import "./FormListSinglePage.scss";
import {
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useCreateAnswerMutation } from "@/lib/features/answerSlice";

interface Question {
  questionTitle: string;
  answerType: "boolean" | "text" | "checkbox";
  id: number;
  options?: { value: string }[];
}

interface FormListSingleProps {
  pageId: string;
}

interface HellperObjInterface {
  clearErrors: UseFormClearErrors<any>;
  register: UseFormRegister<any>;
  answerOptionsError: any;
  answerBooleanError: any;
  answerTextError: any;
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<any, "answerOptions">;
  remove: UseFieldArrayRemove;
}

const FormListSinglePage = ({ pageId }: FormListSingleProps) => {
  const [question, setQuestion] = useState<Question>();

  const { data, isLoading } = useGetListQuestionByIdQuery(pageId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answerOptions",
  });

  const hellperObj = {
    clearErrors,
    answerOptionsError: errors.answerOptions,
    answerTextError: errors.answerText,
    answerBooleanError: errors.answerBoolean,
    register,
    fields,
    append,
    remove,
  };

  const [createAnswer, result] = useCreateAnswerMutation();

  useEffect(() => {
    if (data) {
      setQuestion(data[0]);
    }
  }, [data]);

  const booleanValue = watch("answerBoolean");

  const renderAnswerType = (
    options: { value: string }[] | undefined | null,
    setValue: UseFormSetValue<any>,
    booleanValue: boolean,
    hellperObj: HellperObjInterface
  ) => {
    switch (question?.answerType) {
      case "boolean":
        return configAnswer.boolean(setValue, booleanValue, hellperObj);
        break;
      case "text":
        return configAnswer.text(hellperObj);
        break;
      case "checkbox":
        return configAnswer.checkbox(options, hellperObj);
        break;
      default:
        return null;
    }
  };

  const submit = (data: any) => {
    if (booleanValue === undefined) {
      setError("answerBoolean", { message: "Выберите вариант" });
    }
    if ("answerText" in data || "answerBoolean" in data) {
      delete data.answerOptions;
    }

    if ("answerOptions" in data) {
      if (
        !data.answerOptions.some(
          (o: { isChoose: boolean }) => o.isChoose === true
        )
      ) {
        setError("answerOptions", {
          message: "Выберите хотя бы одно значение",
        });
        return;
      }
    }

    console.log(data);

    data["question"] = Number(pageId);
    createAnswer(data);
  };

  return (
    <div className="signle-page__wrapper">
      <div className="single-page__container">
        {!isLoading ? (
          <form onSubmit={handleSubmit(submit)}>
            <FormGroup className="single-page__form-group">
              <div className="single-prage__form-group-container">
                <h2>{question?.questionTitle}</h2>
                {renderAnswerType(
                  question?.options,
                  setValue,
                  booleanValue,
                  hellperObj
                )}

                {!result.isSuccess ? (
                  <div className="single-page__button-container">
                    <Button
                      type="submit"
                      className="single-page__button"
                      variant="contained"
                      endIcon={<DoubleArrowIcon />}
                    >
                      Send
                    </Button>
                  </div>
                ) : (
                  <div className="single-page__button-container">
                    <p className="single-page__sended">Отправлено</p>
                  </div>
                )}
              </div>
            </FormGroup>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default FormListSinglePage;
