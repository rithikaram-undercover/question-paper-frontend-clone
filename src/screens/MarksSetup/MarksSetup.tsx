import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, GripVerticalIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuestionSection {
  id: string;
  section: string;
  type: string;
  questions: number;
  marks: number;
  totalMarks: number;
}

interface SortableSectionProps {
  section: QuestionSection;
  onSectionChange: (sectionId: string, field: keyof QuestionSection, value: number) => void;
}

const SortableSection: React.FC<SortableSectionProps> = ({ section, onSectionChange }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`border border-[#e3e8ef] rounded-lg ${isDragging ? 'shadow-lg' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            >
              <GripVerticalIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h3 className="font-text-14-bold font-[number:var(--text-14-bold-font-weight)] text-gray1000-black text-[length:var(--text-14-bold-font-size)] tracking-[var(--text-14-bold-letter-spacing)] leading-[var(--text-14-bold-line-height)] [font-style:var(--text-14-bold-font-style)]">
                {section.section}
              </h3>
              <p className="font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-gray-500 text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
                {section.type}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-text-16-bold font-[number:var(--text-16-bold-font-weight)] text-[#2e90fa] text-[length:var(--text-16-bold-font-size)] tracking-[var(--text-16-bold-letter-spacing)] leading-[var(--text-16-bold-line-height)] [font-style:var(--text-16-bold-font-style)]">
              {section.totalMarks} Marks
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
              Number of Questions
            </Label>
            <Input
              type="number"
              value={section.questions}
              onChange={(e) => onSectionChange(section.id, 'questions', parseInt(e.target.value) || 0)}
              className="h-12 border-[#cdd5df] rounded-lg"
              min="1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
              Marks per Question
            </Label>
            <Input
              type="number"
              value={section.marks}
              onChange={(e) => onSectionChange(section.id, 'marks', parseInt(e.target.value) || 0)}
              className="h-12 border-[#cdd5df] rounded-lg"
              min="1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const initialSections: QuestionSection[] = [
  {
    id: "section-1",
    section: "Section - I",
    type: "Choose the correct answer",
    questions: 15,
    marks: 1,
    totalMarks: 15
  },
  {
    id: "section-2", 
    section: "Section - II",
    type: "Answer any 6 out of 9 questions",
    questions: 6,
    marks: 2,
    totalMarks: 12
  },
  {
    id: "section-3",
    section: "Section - III", 
    type: "Answer any 6 out of 9 questions",
    questions: 6,
    marks: 3,
    totalMarks: 18
  },
  {
    id: "section-4",
    section: "Section - IV",
    type: "Answer all questions",
    questions: 5,
    marks: 5,
    totalMarks: 25
  }
];

export const MarksSetup = (): JSX.Element => {
  const navigate = useNavigate();
  const { className } = useParams<{ className: string }>();
  const [sections, setSections] = useState<QuestionSection[]>(initialSections);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const displayClassName = className 
    ? className.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Class 9';

  const totalMarks = sections.reduce((sum, section) => sum + section.totalMarks, 0);

  const handleGoBack = () => {
    navigate(`/question-paper-setup/${className}`);
  };

  const handleSectionChange = (sectionId: string, field: keyof QuestionSection, value: number) => {
    setSections(prevSections => 
      prevSections.map(section => {
        if (section.id === sectionId) {
          const updatedSection = { ...section, [field]: value };
          if (field === 'questions' || field === 'marks') {
            updatedSection.totalMarks = updatedSection.questions * updatedSection.marks;
          }
          return updatedSection;
        }
        return section;
      })
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((sections) => {
        const oldIndex = sections.findIndex((section) => section.id === active.id);
        const newIndex = sections.findIndex((section) => section.id === over.id);

        return arrayMove(sections, oldIndex, newIndex);
      });
    }
  };

  const handleGeneratePaper = () => {
    navigate(`/question-paper-preview/${className}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
          {displayClassName}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="font-text-16-bold font-[number:var(--text-16-bold-font-weight)] text-gray1000-black text-[length:var(--text-16-bold-font-size)] tracking-[var(--text-16-bold-letter-spacing)] leading-[var(--text-16-bold-line-height)] [font-style:var(--text-16-bold-font-style)] mb-2">
            Set Marks for Each Section
          </h2>
          <p className="font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-gray-500 text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
            Configure the number of questions and marks for each section
          </p>
        </div>

        {/* Sections Configuration */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={sections.map(section => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4 mb-6">
              {sections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  onSectionChange={handleSectionChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Total Marks Summary */}
        <Card className="border-2 border-[#2e90fa] bg-[#f5faff] rounded-lg mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-text-16-bold font-[number:var(--text-16-bold-font-weight)] text-gray1000-black text-[length:var(--text-16-bold-font-size)] tracking-[var(--text-16-bold-letter-spacing)] leading-[var(--text-16-bold-line-height)] [font-style:var(--text-16-bold-font-style)]">
                  Total Marks
                </h3>
                <p className="font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-gray-500 text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
                  Sum of all sections
                </p>
              </div>
              <div className="text-right">
                <div className="font-text-24-bold text-[#2e90fa] text-2xl font-bold">
                  {totalMarks}
                </div>
                <div className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-gray-500 text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
                  Total Marks
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer with Generate Button */}
      <footer className="flex flex-col w-full items-start bg-white border-t border-[#cdd5df] shadow-[0px_-4px_6px_-2px_#10182812,0px_-12px_16px_-4px_#1018281f]">
        <div className="flex flex-col items-center justify-center gap-2 p-4 w-full">
          <Button 
            className="flex min-h-12 items-center justify-center gap-2 px-5 py-2 w-full rounded-lg overflow-hidden border-[1.5px] border-solid border-[#84caff] bg-[linear-gradient(180deg,rgba(46,144,250,1)_0%,rgba(21,112,239,1)_100%)] h-auto"
            onClick={handleGeneratePaper}
          >
            <div className="font-[number:var(--text-16-semibold-font-weight)] text-white text-[length:var(--text-16-semibold-font-size)] leading-[var(--text-16-semibold-line-height)] whitespace-nowrap font-text-16-semibold tracking-[var(--text-16-semibold-letter-spacing)] [font-style:var(--text-16-semibold-font-style)]">
              Generate Question Paper
            </div>
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
};