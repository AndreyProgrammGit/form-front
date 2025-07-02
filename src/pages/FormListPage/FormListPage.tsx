"use client";

import { useEffect, useState } from "react";
import { useGetListQuestionQuery } from "@/lib/features/questionSlice";
import Link from "next/link";

import "./FormListPage.scss";

interface Questions {
  id: number;
  questionTitle: string;
  answerType: "text" | "boolean" | "checkbox";
  options?: { value: string }[];
}

const FormListPage = () => {
  const [questions, setQuestion] = useState<Questions[]>([]);

  const { data, isLoading } = useGetListQuestionQuery({});

  useEffect(() => {
    if (data) {
      setQuestion(data);
      console.log(data);
      console.log(questions);
    }
  }, [data]);

  return (
    <div className="form-list__wraper">
      <div className="form-list__container">
        <ul className="list-container">
          {isLoading ? (
            <p>...Loading</p>
          ) : (
            questions?.map((item: Questions, index: number) => (
              <li key={index} className="list-container__item">
                <Link href={`form-list/${item.id}`}>{item.questionTitle}</Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FormListPage;
