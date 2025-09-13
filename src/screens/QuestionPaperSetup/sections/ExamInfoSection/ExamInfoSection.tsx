import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ExamInfoSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start gap-2 pt-4 pb-0 px-4 w-full">
      <Card className="w-full rounded-xl border border-solid border-[#e3e8ef] shadow-[inset_0px_-4px_16px_#00000014] bg-[linear-gradient(90deg,rgba(245,250,255,1)_0%,rgba(209,233,255,1)_100%)] overflow-hidden">
        <CardContent className="flex flex-col items-start gap-2 p-4 relative">
          <h1 className="mt-[-1.00px] font-text-14-bold font-[number:var(--text-14-bold-font-weight)] text-gray1000-black text-[length:var(--text-14-bold-font-size)] tracking-[var(--text-14-bold-letter-spacing)] leading-[var(--text-14-bold-line-height)] [font-style:var(--text-14-bold-font-style)] self-stretch">
            NYRUTHI VIDHYA BHAVAN MATRIC HR SEC SCHOOL SAMPLE TEXT
          </h1>

          <p className="w-[215.38px] font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-gray-700 text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
            SCIENCE
          </p>

          <img
            className="absolute w-[190px] h-[190px] top-[23px] left-[185px]"
            alt="Exam paper"
            src="/exam-paper-2.svg"
          />
        </CardContent>
      </Card>
    </section>
  );
};
