import { SettingsIcon } from "lucide-react";
import React from "react";

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="flex w-full items-center justify-between px-2 py-0 relative bg-[#eef2f6] border border-solid border-[#cdd5df]">
      <div className="inline-flex items-center justify-center gap-1 p-2 relative flex-[0_0_auto]">
        <img
          className="relative w-8 h-8"
          alt="Document icon"
          src="/document-icon-v2-1.svg"
        />

        <div className="relative w-fit font-text-16-bold font-[number:var(--text-16-bold-font-weight)] text-[#121926] text-[length:var(--text-16-bold-font-size)] tracking-[var(--text-16-bold-letter-spacing)] leading-[var(--text-16-bold-line-height)] whitespace-nowrap [font-style:var(--text-16-bold-font-style)]">
          Examaker
        </div>
      </div>

      <div className="inline-flex items-center justify-center gap-1 px-2 py-3 relative flex-[0_0_auto]">
        <SettingsIcon className="relative w-6 h-6" />

        <div className="relative w-fit font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-gray-500 text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] whitespace-nowrap [font-style:var(--text-14-semibold-font-style)]">
          SettingsIcon
        </div>
      </div>
    </header>
  );
};
