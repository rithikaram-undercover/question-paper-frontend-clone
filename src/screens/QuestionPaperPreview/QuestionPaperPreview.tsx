import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, DownloadIcon, ShareIcon, EditIcon, SaveIcon, XIcon, PlusIcon } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface Question {
  id: string;
  text: string;
  options?: string[];
  marks: number;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
  totalMarks: number;
  color: string;
}

export const QuestionPaperPreview = (): JSX.Element => {
  const navigate = useNavigate();
  const { className } = useParams<{ className: string }>();
  const [isEditing, setIsEditing] = useState(false);
  
  // Paper header state
  const [schoolName, setSchoolName] = useState("NYRUTHI VIDHYA BHAVAN MATRIC HR SEC SCHOOL");
  const [examName, setExamName] = useState("QUARTERLY EXAMINATION - 2025");
  const [subject, setSubject] = useState("Science");
  const [time, setTime] = useState("3 Hours");
  const [maxMarks, setMaxMarks] = useState("70");

  // Sections state
  const [sections, setSections] = useState<Section[]>([
    {
      id: "section-a",
      title: "SECTION - A",
      subtitle: "Choose the correct answer",
      totalMarks: 15,
      color: "blue",
      questions: [
        {
          id: "q1",
          text: "The SI unit of force is:",
          options: ["Kilogram", "Newton", "Joule", "Watt"],
          marks: 1
        },
        {
          id: "q2", 
          text: "Which of the following is a scalar quantity?",
          options: ["Velocity", "Acceleration", "Speed", "Displacement"],
          marks: 1
        },
        {
          id: "q3",
          text: "The process of conversion of solid directly into gas is called:",
          options: ["Melting", "Evaporation", "Sublimation", "Condensation"],
          marks: 1
        }
      ]
    },
    {
      id: "section-b",
      title: "SECTION - B", 
      subtitle: "Answer any 6 out of 9 questions",
      totalMarks: 12,
      color: "green",
      questions: [
        {
          id: "q16",
          text: "Define velocity. Write its SI unit.",
          marks: 2
        },
        {
          id: "q17",
          text: "State Newton's first law of motion.",
          marks: 2
        },
        {
          id: "q18",
          text: "What is the difference between mass and weight?",
          marks: 2
        }
      ]
    },
    {
      id: "section-c",
      title: "SECTION - C",
      subtitle: "Answer any 6 out of 9 questions", 
      totalMarks: 18,
      color: "orange",
      questions: [
        {
          id: "q25",
          text: "Derive the equation v = u + at using velocity-time graph.",
          marks: 3
        },
        {
          id: "q26",
          text: "Explain the three laws of motion with examples.",
          marks: 3
        },
        {
          id: "q27",
          text: "What is universal law of gravitation? Write its mathematical expression.",
          marks: 3
        }
      ]
    },
    {
      id: "section-d",
      title: "SECTION - D",
      subtitle: "Answer all questions",
      totalMarks: 25,
      color: "purple", 
      questions: [
        {
          id: "q34",
          text: "A car starts from rest and accelerates uniformly at 2 m/s² for 10 seconds.\n(a) Calculate the final velocity of the car.\n(b) Find the distance covered by the car.\n(c) Draw the velocity-time graph for this motion.",
          marks: 5
        },
        {
          id: "q35",
          text: "Explain the concept of momentum and impulse.\n(a) Define momentum and write its SI unit.\n(b) State the law of conservation of momentum.\n(c) Give two examples of conservation of momentum in daily life.",
          marks: 5
        }
      ]
    }
  ]);

  const handleGoBack = () => {
    navigate(`/marks-setup/${className}`);
  };

  const displayClassName = className 
    ? className.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Class 9';

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const updateQuestion = (sectionId: string, questionId: string, newText: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            questions: section.questions.map(q => 
              q.id === questionId ? { ...q, text: newText } : q
            )
          }
        : section
    ));
  };

  const updateQuestionOption = (sectionId: string, questionId: string, optionIndex: number, newOption: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            questions: section.questions.map(q => 
              q.id === questionId && q.options
                ? { 
                    ...q, 
                    options: q.options.map((opt, idx) => idx === optionIndex ? newOption : opt)
                  }
                : q
            )
          }
        : section
    ));
  };

  const addQuestion = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const newQuestion: Question = {
      id: `q${Date.now()}`,
      text: "Enter your question here...",
      marks: section.questions[0]?.marks || 1,
      ...(section.questions[0]?.options && { options: ["Option A", "Option B", "Option C", "Option D"] })
    };

    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, questions: [...s.questions, newQuestion] }
        : s
    ));
  };

  const removeQuestion = (sectionId: string, questionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            questions: section.questions.filter(q => q.id !== questionId)
          }
        : section
    ));
  };

  const getSectionColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-800",
      green: "bg-green-50 text-green-800", 
      orange: "bg-orange-50 text-orange-800",
      purple: "bg-purple-50 text-purple-800"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 text-gray-800";
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('question-paper-content');
    if (!element) return;

    try {
      // Create canvas from the question paper content
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 10; // 10mm top margin
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20); // Account for margins
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }
      
      // Generate filename
      const filename = `${subject}_${displayClassName}_Question_Paper.pdf`;
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  if (isEditing) {
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
            Edit Question Paper
          </h1>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleEditToggle}
          >
            <XIcon className="w-4 h-4" />
            Cancel
          </Button>
        </header>

        {/* Main Content - Editable */}
        <main className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                {/* Editable Header Section */}
                <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700">School Name</Label>
                    <Input
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="text-center text-xl font-bold mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-left space-y-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Class</Label>
                        <Input value={displayClassName} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Subject</Label>
                        <Input
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Time</Label>
                        <Input
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Max Marks</Label>
                        <Input
                          value={maxMarks}
                          onChange={(e) => setMaxMarks(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Label className="text-sm font-medium text-gray-700">Examination Name</Label>
                    <Input
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      className="text-center text-lg font-semibold mt-1"
                    />
                  </div>
                </div>

                {/* Editable Sections */}
                {sections.map((section, sectionIndex) => (
                  <div key={section.id} className="mb-8">
                    <div className={`p-3 rounded-lg mb-4 ${getSectionColorClasses(section.color)}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">
                          {section.title} ({section.subtitle}) [{section.questions.length} × {section.questions[0]?.marks || 1} = {section.totalMarks} Marks]
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addQuestion(section.id)}
                          className="flex items-center gap-1"
                        >
                          <PlusIcon className="w-4 h-4" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {section.questions.map((question, questionIndex) => (
                        <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-start gap-3">
                            <span className="font-semibold min-w-[40px] mt-2">
                              {sectionIndex === 0 ? questionIndex + 1 : 
                               sectionIndex === 1 ? questionIndex + 16 :
                               sectionIndex === 2 ? questionIndex + 25 :
                               questionIndex + 34}.
                            </span>
                            <div className="flex-1 space-y-3">
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Question Text</Label>
                                <textarea
                                  value={question.text}
                                  onChange={(e) => updateQuestion(section.id, question.id, e.target.value)}
                                  className="w-full mt-1 p-2 border border-gray-300 rounded-md resize-none"
                                  rows={3}
                                />
                              </div>
                              
                              {question.options && (
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Options</Label>
                                  <div className="space-y-2 mt-1">
                                    {question.options.map((option, optionIndex) => (
                                      <div key={optionIndex} className="flex items-center gap-2">
                                        <span className="font-medium">({String.fromCharCode(97 + optionIndex)})</span>
                                        <Input
                                          value={option}
                                          onChange={(e) => updateQuestionOption(section.id, question.id, optionIndex, e.target.value)}
                                          className="flex-1"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeQuestion(section.id, question.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <XIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Bottom Action Buttons - Edit Mode */}
        <footer className="bg-white border-t border-[#cdd5df] shadow-[0px_-4px_6px_-2px_#10182812,0px_-12px_16px_-4px_#1018281f] p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2 h-12 border-[#cdd5df] rounded-lg"
                onClick={handleEditToggle}
              >
                <XIcon className="w-5 h-5" />
                <span className="font-text-16-medium font-[number:var(--text-16-medium-font-weight)] text-[#202939] text-[length:var(--text-16-medium-font-size)] tracking-[var(--text-16-medium-letter-spacing)] leading-[var(--text-16-medium-line-height)] [font-style:var(--text-16-medium-font-style)]">
                  Cancel
                </span>
              </Button>
              
              <Button 
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-[linear-gradient(180deg,rgba(46,144,250,1)_0%,rgba(21,112,239,1)_100%)] border-[1.5px] border-[#84caff]"
                onClick={handleEditToggle}
              >
                <SaveIcon className="w-5 h-5" />
                <span className="font-text-16-medium font-[number:var(--text-16-medium-font-weight)] text-white text-[length:var(--text-16-medium-font-size)] tracking-[var(--text-16-medium-letter-spacing)] leading-[var(--text-16-medium-line-height)] [font-style:var(--text-16-medium-font-style)]">
                  Save Changes
                </span>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Preview Mode (existing code)
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

        <div className="w-[100px]"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Question Paper */}
          <Card className="bg-white shadow-lg" id="question-paper-content">
            <CardContent className="p-8">
              {/* Header Section */}
              <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {schoolName}
                </h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-left">
                    <p className="font-semibold">Class: {displayClassName}</p>
                    <p className="font-semibold">Subject: {subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Time: {time}</p>
                    <p className="font-semibold">Max Marks: {maxMarks}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{examName}</p>
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

              {/* Sections */}
              {sections.map((section, sectionIndex) => (
                <div key={section.id} className="mb-8">
                  <div className={`p-3 rounded-lg mb-4 ${getSectionColorClasses(section.color)}`}>
                    <h3 className="font-bold text-lg">
                      {section.title} ({section.subtitle}) [{section.questions.length} × {section.questions[0]?.marks || 1} = {section.totalMarks} Marks]
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {section.questions.map((question, questionIndex) => (
                      <div key={question.id} className="flex gap-3">
                        <span className="font-semibold min-w-[30px]">
                          {sectionIndex === 0 ? questionIndex + 1 : 
                           sectionIndex === 1 ? questionIndex + 16 :
                           sectionIndex === 2 ? questionIndex + 25 :
                           questionIndex + 34}.
                        </span>
                        <div>
                          <p className="whitespace-pre-line">{question.text}</p>
                          {question.options && (
                            <div className="ml-4 mt-1 space-y-1">
                              {question.options.map((option, optionIndex) => (
                                <p key={optionIndex}>({String.fromCharCode(97 + optionIndex)}) {option}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {section.questions.length < 5 && (
                      <div className="text-center text-gray-500 py-4">
                        <p>... (Questions continue in similar format) ...</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

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
             onClick={handleDownloadPDF}
           >
             <DownloadIcon className="w-5 h-5" />
             <span className="font-text-16-medium font-[number:var(--text-16-medium-font-weight)] text-[#202939] text-[length:var(--text-16-medium-font-size)] tracking-[var(--text-16-medium-letter-spacing)] leading-[var(--text-16-medium-line-height)] [font-style:var(--text-16-medium-font-style)]">
               Download
             </span>
           </Button>
           
           <Button 
             className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-[linear-gradient(180deg,rgba(46,144,250,1)_0%,rgba(21,112,239,1)_100%)] border-[1.5px] border-[#84caff]"
             onClick={handleEditToggle}
           >
             <EditIcon className="w-5 h-5" />
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