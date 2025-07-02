import BooleanAnswer from "@/widgets/BooleanAnswer/BooleanAnswer";
import CheckboxAnswer from "@/widgets/CheckboxAnswer/CheckboxAnswer";
import InputAnswer from "@/widgets/InputAnswer/InputAnswer";
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

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

export const configAnswer = {
  text: (hellperObj: HellperObjInterface) => (
    <InputAnswer hellperObj={hellperObj} />
  ),
  boolean: (
    setValue: UseFormSetValue<any>,
    booleanValue: boolean,
    hellperObj: HellperObjInterface
  ) => (
    <BooleanAnswer
      setValue={setValue}
      value={booleanValue}
      hellperObj={hellperObj}
    />
  ),
  checkbox: (
    options: { value: string }[] | undefined | null,
    hellperObj: HellperObjInterface
  ) => <CheckboxAnswer options={options ?? []} hellperObj={hellperObj ?? {}} />,
};
