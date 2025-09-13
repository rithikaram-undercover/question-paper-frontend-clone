import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const QuestionUnitsSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { className } = useParams<{ className: string }>();

  const handleGoHome = () => {
    navigate('/');
  };

  const displayClassName = className 
    ? className.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Class 9';

  return (
    <header className="flex w-full items-center justify-between px-4 py-3 relative bg-white border-b border-[#cdd5df]">
      <Button
        variant="secondary"
        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg h-auto"
        onClick={handleGoHome}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#4b5565] text-[length:var(--text-14-semibold-font-size)] leading-[var(--text-14-semibold-line-height)] tracking-[var(--text-14-semibold-letter-spacing)] [font-style:var(--text-14-semibold-font-style)]">
          Go Home
        </span>
      </Button>

      <h1 className="font-text-14-bold font-[number:var(--text-14-bold-font-weight)] text-gray1000-black text-[length:var(--text-14-bold-font-size)] tracking-[var(--text-14-bold-letter-spacing)] leading-[var(--text-14-bold-line-height)] [font-style:var(--text-14-bold-font-style)]">
        {displayClassName}
      </h1>
    </header>
  );
};
