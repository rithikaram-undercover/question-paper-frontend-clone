import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ExamFormSection } from "./sections/ExamFormSection/ExamFormSection";
import { ExamInfoSection } from "./sections/ExamInfoSection/ExamInfoSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { QuestionUnitsSection } from "./sections/QuestionUnitsSection/QuestionUnitsSection";

export const QuestionPaperSetup = (): JSX.Element => {
  const navigate = useNavigate();
  const { className } = useParams<{ className: string }>();

  const handleSetMarks = () => {
    navigate(`/marks-setup/${className}`);
  };

  return (
    <div className="flex flex-col items-center relative bg-white">
      <HeaderSection />
      <QuestionUnitsSection />
      <ExamInfoSection />
      <ExamFormSection />

      <footer className="flex flex-col w-full items-start fixed bottom-0 left-0 bg-transparent">
        <div className="flex flex-col items-center justify-center gap-2 p-4 relative self-stretch w-full flex-[0_0_auto] bg-white border-t [border-top-style:solid] border-slate-300 shadow-[0px_-4px_6px_-2px_#10182812,0px_-12px_16px_-4px_#1018281f]">
          <Button 
            className="flex min-h-12 items-center justify-center gap-2 px-5 py-2 relative self-stretch w-full flex-[0_0_auto] rounded-lg overflow-hidden border-[1.5px] border-solid border-[#84caff] bg-[linear-gradient(180deg,rgba(46,144,250,1)_0%,rgba(21,112,239,1)_100%)] h-auto"
            onClick={handleSetMarks}
          >
            <div className="w-fit font-[number:var(--text-16-semibold-font-weight)] text-white text-[length:var(--text-16-semibold-font-size)] leading-[var(--text-16-semibold-line-height)] whitespace-nowrap relative font-text-16-semibold tracking-[var(--text-16-semibold-letter-spacing)] [font-style:var(--text-16-semibold-font-style)]">
              Let&apos;s Set Marks
            </div>
            <ArrowRightIcon className="relative w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
};
