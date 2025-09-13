import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, DownloadIcon, PrinterIcon, ShareIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const QuestionPaperPreview = (): JSX.Element => {
  const navigate = useNavigate();
  const { className } = useParams<{ className: string }>();

  const handleGoBack = () => {
    navigate(`/marks-setup/${className}`);
  };

  const displayClassName = className 
    ? className.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Class 9';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex w-full items-center justify-between px-4 py-3 bg-white border-b border-[#cdd5df]">
        <Button
          variant="secondary"
          className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg h-auto"
          onClick={handleGoBack}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#4b5565] text-[length:var(--text-14-semibold-font-size)] leading-[var(--text-14-semibold-line-height)] tracking-[var(--text-14-semibold-letter-spacing)] [font-style:var(--text-14-semibold-font-style)]">
            Go Back
          </span>
        </Button>

        <h1 className="font-text-14-bold font-[number:var(--text-14-bold-font-weight)] text-gray1000-black text-[length:var(--text-14-bold-font-size)] tracking-[var(--text-14-bold-letter-spacing)] leading-[var(--text-14-bold-line-height)] [font-style:var(--text-14-bold-font-style)]">
          Question Paper Preview
        </h1>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ShareIcon className="w-4 h-4" />
            Share
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <Button variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <PrinterIcon className="w-4 h-4" />
              Print
            </Button>
          </div>

          {/* Question Paper */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              {/* Header Section */}
              <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  NYRUTHI VIDHYA BHAVAN MATRIC HR SEC SCHOOL
                </h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-left">
                    <p className="font-semibold">Class: {displayClassName}</p>
                    <p className="font-semibold">Subject: Science</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Time: 3 Hours</p>
                    <p className="font-semibold">Max Marks: 70</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">QUARTERLY EXAMINATION - 2025</p>
                  <p className="text-sm text-gray-600 mt-2">Date: ___________</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-3">GENERAL INSTRUCTIONS:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All questions are compulsory.</li>
                  <li>The question paper consists of 4 sections.</li>
                  <li>Section A contains 15 questions of 1 mark each.</li>
                  <li>Section B contains 6 questions of 2 marks each.</li>
                  <li>Section C contains 6 questions of 3 marks each.</li>
                  <li>Section D contains 5 questions of 5 marks each.</li>
                  <li>There is no overall choice. However, internal choices have been provided.</li>
                </ul>
              </div>

              {/* Section A */}
              <div className="mb-8">
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <h3 className="font-bold text-lg text-blue-800">
                    SECTION - A (Choose the correct answer) [15 × 1 = 15 Marks]
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">1.</span>
                    <div>
                      <p>The SI unit of force is:</p>
                      <div className="ml-4 mt-1 space-y-1">
                        <p>(a) Kilogram</p>
                        <p>(b) Newton</p>
                        <p>(c) Joule</p>
                        <p>(d) Watt</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">2.</span>
                    <div>
                      <p>Which of the following is a scalar quantity?</p>
                      <div className="ml-4 mt-1 space-y-1">
                        <p>(a) Velocity</p>
                        <p>(b) Acceleration</p>
                        <p>(c) Speed</p>
                        <p>(d) Displacement</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">3.</span>
                    <div>
                      <p>The process of conversion of solid directly into gas is called:</p>
                      <div className="ml-4 mt-1 space-y-1">
                        <p>(a) Melting</p>
                        <p>(b) Evaporation</p>
                        <p>(c) Sublimation</p>
                        <p>(d) Condensation</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-500 py-4">
                    <p>... (Questions 4-15 continue in similar format) ...</p>
                  </div>
                </div>
              </div>

              {/* Section B */}
              <div className="mb-8">
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <h3 className="font-bold text-lg text-green-800">
                    SECTION - B (Answer any 6 out of 9 questions) [6 × 2 = 12 Marks]
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">16.</span>
                    <p>Define velocity. Write its SI unit.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">17.</span>
                    <p>State Newton's first law of motion.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">18.</span>
                    <p>What is the difference between mass and weight?</p>
                  </div>

                  <div className="text-center text-gray-500 py-4">
                    <p>... (Questions 19-24 continue in similar format) ...</p>
                  </div>
                </div>
              </div>

              {/* Section C */}
              <div className="mb-8">
                <div className="bg-orange-50 p-3 rounded-lg mb-4">
                  <h3 className="font-bold text-lg text-orange-800">
                    SECTION - C (Answer any 6 out of 9 questions) [6 × 3 = 18 Marks]
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">25.</span>
                    <p>Derive the equation v = u + at using velocity-time graph.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">26.</span>
                    <p>Explain the three laws of motion with examples.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">27.</span>
                    <p>What is universal law of gravitation? Write its mathematical expression.</p>
                  </div>

                  <div className="text-center text-gray-500 py-4">
                    <p>... (Questions 28-33 continue in similar format) ...</p>
                  </div>
                </div>
              </div>

              {/* Section D */}
              <div className="mb-8">
                <div className="bg-purple-50 p-3 rounded-lg mb-4">
                  <h3 className="font-bold text-lg text-purple-800">
                    SECTION - D (Answer all questions) [5 × 5 = 25 Marks]
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">34.</span>
                    <div>
                      <p className="mb-2">A car starts from rest and accelerates uniformly at 2 m/s² for 10 seconds.</p>
                      <div className="ml-4 space-y-1">
                        <p>(a) Calculate the final velocity of the car.</p>
                        <p>(b) Find the distance covered by the car.</p>
                        <p>(c) Draw the velocity-time graph for this motion.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[30px]">35.</span>
                    <div>
                      <p className="mb-2">Explain the concept of momentum and impulse.</p>
                      <div className="ml-4 space-y-1">
                        <p>(a) Define momentum and write its SI unit.</p>
                        <p>(b) State the law of conservation of momentum.</p>
                        <p>(c) Give two examples of conservation of momentum in daily life.</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-500 py-4">
                    <p>... (Questions 36-38 continue in similar format) ...</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-8 pt-6 border-t border-gray-300">
                <p className="text-sm text-gray-600">*** ALL THE BEST ***</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

     {/* Bottom Action Buttons */}
     <footer className="bg-white border-t border-[#cdd5df] shadow-[0px_-4px_6px_-2px_#10182812,0px_-12px_16px_-4px_#1018281f] p-4">
       <div className="max-w-4xl mx-auto">
         <div className="flex gap-3">
           <Button 
             variant="outline" 
             className="flex-1 flex items-center justify-center gap-2 h-12 border-[#cdd5df] rounded-lg"
           >
             <ShareIcon className="w-5 h-5" />
             <span className="font-text-16-medium font-[number:var(--text-16-medium-font-weight)] text-[#202939] text-[length:var(--text-16-medium-font-size)] tracking-[var(--text-16-medium-letter-spacing)] leading-[var(--text-16-medium-line-height)] [font-style:var(--text-16-medium-font-style)]">
               Share
             </span>
           </Button>
           
           <Button 
             variant="outline" 
             className="flex-1 flex items-center justify-center gap-2 h-12 border-[#cdd5df] rounded-lg"
           >
             <DownloadIcon className="w-5 h-5" />
             <span className="font-text-16-medium font-[number:var(--text-16-medium-font-weight)] text-[#202939] text-[length:var(--text-16-medium-font-size)] tracking-[var(--text-16-medium-letter-spacing)] leading-[var(--text-16-medium-line-height)] [font-style:var(--text-16-medium-font-style)]">
               Download
             </span>
           </Button>
           
           <Button 
             className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-[linear-gradient(180deg,rgba(46,144,250,1)_0%,rgba(21,112,239,1)_100%)] border-[1.5px] border-[#84caff]"
             onClick={handleGoBack}
           >
             <span className="font-text-16-medium font-[number:var(--text-16-medium-font-weight)] text-white text-[length:var(--text-16-medium-font-size)] tracking-[var(--text-16-medium-letter-spacing)] leading-[var(--text-16-medium-line-height)] [font-style:var(--text-16-medium-font-style)]">
               Edit Question Paper
             </span>
           </Button>
         </div>
       </div>
     </footer>
    </div>
  );
};