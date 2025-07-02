"use client";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useCreateQuestionMutation } from "@/lib/features/questionSlice";

import done from "./images/done_ic.svg";

import "./FormConstructorPage.scss";

interface MyForm {
  questionTitle: string;
  answerType: "text" | "boolean" | "checkbox";

  options?: { value: string }[];
}

const FormConstructorPage = () => {
  const [selectValue, setSelectValue] = useState<string>("text");
  const [title, setTitle] = useState<string>("");
  const [errorOptions, setErrorOptions] = useState<boolean>(false);
  const [createQuestion, result] = useCreateQuestionMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MyForm>({
    defaultValues: {
      questionTitle: "",
      answerType: "text",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "options",
  });

  const handleAddInput = () => {
    if (fields.length < 5) {
      setErrorOptions(false);
      append({ value: "" });
    }
  };

  const handleRemoveInput = (index: number) => {
    if (fields.length > 0 && index >= 0 && index < fields.length) {
      remove(index);
    }
  };

  const submit = async (data: MyForm) => {
    if (selectValue === "checkbox") {
      if (!data.options || data.options.length === 0) {
        setErrorOptions(true);
        return;
      }
    } else {
      delete data.options;
    }

    createQuestion(data);
    setErrorOptions(false);
    setTitle("");
    setSelectValue("text");
    remove();
  };

  return (
    <div className="constructor__wrapper">
      <div className="constructor__container">
        <div className="constructor__title">
          <h1>Заполните поля формы</h1>
        </div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="input-field">
            <label htmlFor="questionTitle">Введите вопрос</label>
            {errors.questionTitle && (
              <p style={{ color: "red" }}>{errors.questionTitle?.message}</p>
            )}
            <TextField
              {...register("questionTitle", {
                required: "Поле обязательно для заполнения",
                minLength: { value: 3, message: "Минимум 3 символа" },
                maxLength: { value: 50, message: "Максимум 50 символов" },
              })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#b45f25",
                  },
                  "&:hover fieldset": {
                    borderColor: "#b45f25",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#b45f25",
                  },
                },
                ".MuiFormLabel-root": {
                  color: "#b45f25",
                },
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="questionTitle"
              label="Заголовок вопроса"
              variant="outlined"
            />
          </div>
          <div className="select-field">
            <label htmlFor="answerTypeSelect">Выберите тип ответа</label>
            <InputLabel
              sx={{
                "&.MuiFormLabel-root": {
                  color: "#b45f25",
                },
              }}
              id="answerTypeSelectLabel"
            >
              Тип
            </InputLabel>
            <Select
              {...register("answerType", { required: true })}
              labelId="answerTypeSelectLabel"
              id="answerTypeSelect"
              value={selectValue}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 10,
                  },
                },
              }}
              label="Тип поля"
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
            >
              <MenuItem value={"text"}>Текст</MenuItem>
              <MenuItem value={"boolean"}>Булево</MenuItem>
              <MenuItem value={"checkbox"}>Множественный выбор</MenuItem>
            </Select>
          </div>
          {selectValue === "checkbox" ? (
            <div className="checkbox-field">
              <div className="checkbox-field__wrapper">
                {errorOptions && <p style={{ color: "red" }}>Добавьте поле</p>}

                {fields.map((field, index) => (
                  <React.Fragment key={Math.random()}>
                    {errors.options && (
                      <p key={Math.random()} style={{ color: "red" }}>
                        {errors.options?.[index]?.value?.message}
                      </p>
                    )}
                    <TextField
                      key={field.id}
                      {...register(`options.${index}.value`, {
                        required: "Поле обязательно для заполнения",
                        minLength: { value: 2, message: "Минимум 2 символа" },
                        maxLength: {
                          value: 50,
                          message: "Максимум 50 символов",
                        },
                      })}
                      id={`option-${index}`}
                      label={`Вариант ${index + 1}`}
                      variant="outlined"
                    />
                  </React.Fragment>
                ))}
              </div>
              <div className="checbox-filed__button">
                {fields.length < 5 ? (
                  <Button
                    variant="contained"
                    onClick={handleAddInput}
                    className="checkbox-add"
                  >
                    Добавить ещё
                  </Button>
                ) : null}
                {fields.length > 0 ? (
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveInput(fields.length - 1)}
                    className="checkbox-add"
                  >
                    Удалить последнее поле
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className="button-field">
            {result.isSuccess ? (
              <img src={done.src} alt="#" />
            ) : (
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Отправить
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormConstructorPage;
