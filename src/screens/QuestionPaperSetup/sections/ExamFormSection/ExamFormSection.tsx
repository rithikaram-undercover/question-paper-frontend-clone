import React, { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Checkbox } from "../../../../components/ui/checkbox";
import { CalendarIcon } from "lucide-react";

const difficultyLevels = [
  { id: "easy", label: "Easy", selected: true },
  { id: "medium", label: "Medium", selected: false },
  { id: "hard", label: "Hard", selected: false }
];

const subSubjects = [
  { id: "physics-chemistry", label: "Physics & Chemistry", selected: true },
  { id: "biology", label: "Biology", selected: false }
];

const questionTypes = [
  { id: "book-back", label: "Book Back", selected: true },
  { id: "book-inside", label: "Book Inside", selected: false }
];

const physicsChemistryUnits = [
  { id: "unit-1", number: "Unit 1", title: "Laws of Motion", selected: true },
  { id: "unit-3", number: "Unit 3", title: "Thermal Physics", selected: false },
  { id: "unit-5", number: "Unit 5", title: "Acoustics", selected: false },
  { id: "unit-7", number: "Unit 7", title: "Atoms and Molecules", selected: false },
  { id: "unit-9", number: "Unit 9", title: "Solutions", selected: false },
  { id: "unit-11", number: "Unit 11", title: "Carbon and its Compounds", selected: false }
];

const physicsChemistryUnitsColumn2 = [
  { id: "unit-2", number: "Unit 2", title: "Optics", selected: false },
  { id: "unit-4", number: "Unit 4", title: "Electricity", selected: false },
  { id: "unit-6", number: "Unit 6", title: "Nuclear Physics", selected: false },
  { id: "unit-8", number: "Unit 8", title: "Periodic Classification of Elements", selected: false },
  { id: "unit-10", number: "Unit 10", title: "Types of Chemical Reactions", selected: false }
];

const biologyUnitsColumn1 = [
  { id: "unit-12", number: "Unit 12", title: "Plant Anatomy and Plant Physiology", selected: false },
  { id: "unit-14", number: "Unit 14", title: "Transportation in Plants and Circulation in Animals", selected: false },
  { id: "unit-16", number: "Unit 16", title: "Plant and Animal Hormones", selected: false },
  { id: "unit-18", number: "Unit 18", title: "Genetics", selected: false },
  { id: "unit-20", number: "Unit 20", title: "Breeding and Biotechnology", selected: false },
  { id: "unit-22", number: "Unit 22", title: "Environmental Management", selected: false }
];

const biologyUnitsColumn2 = [
  { id: "unit-13", number: "Unit 13", title: "Structural Organisation of Animals", selected: false },
  { id: "unit-15", number: "Unit 15", title: "Nervous System", selected: false },
  { id: "unit-17", number: "Unit 17", title: "Reproduction in Plants and Animals", selected: false },
  { id: "unit-19", number: "Unit 19", title: "Origin and Evolution of Life", selected: false },
  { id: "unit-21", number: "Unit 21", title: "Health and Diseases", selected: false },
  { id: "unit-23", number: "Unit 23", title: "Visual Communication", selected: false }
];

export const ExamFormSection = (): JSX.Element => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [selectedSubSubjects, setSelectedSubSubjects] = useState(["physics-chemistry"]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState(["book-back"]);
  const [selectedUnits, setSelectedUnits] = useState(["unit-1"]);
  const [classSection, setClassSection] = useState("Class IX");
  const [examName, setExamName] = useState("");
  const [examYear, setExamYear] = useState("2025-2026");
  const [examDate, setExamDate] = useState("");

  const handleSubSubjectChange = (subjectId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubSubjects([...selectedSubSubjects, subjectId]);
    } else {
      setSelectedSubSubjects(selectedSubSubjects.filter(id => id !== subjectId));
    }
  };

  const handleQuestionTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedQuestionTypes([...selectedQuestionTypes, typeId]);
    } else {
      setSelectedQuestionTypes(selectedQuestionTypes.filter(id => id !== typeId));
    }
  };

  const handleUnitChange = (unitId: string, checked: boolean) => {
    if (checked) {
      setSelectedUnits([...selectedUnits, unitId]);
    } else {
      setSelectedUnits(selectedUnits.filter(id => id !== unitId));
    }
  };

  return (
    <section className="flex flex-col gap-6 p-4 w-full">
<div className="flex gap-4 w-full">
<div className="flex flex-col gap-2 flex-1">
<div className="flex flex-col gap-1 w-full">
<Label className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Class Sections
            </Label>
            <Input
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              placeholder="Type section here"
              className="h-12 border-[#cdd5df] rounded-lg"
            />
</div>
</div>
</div>
<div className="flex gap-4 w-full">
<div className="flex flex-col gap-2 flex-1">
<div className="flex flex-col gap-1 w-full">
<Label className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Examination Name
            </Label>
            <div className="flex gap-2">
              <Input
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="Type examination name here"
                className="h-12 border-[#cdd5df] rounded-lg flex-1"
              />
              <Input
                value={examYear}
                onChange={(e) => setExamYear(e.target.value)}
                placeholder="Academic Year"
                className="h-12 border-[#cdd5df] rounded-lg w-32"
              />
            </div>
</div>
</div>
</div>
<div className="flex flex-col gap-2 w-full">
<div className="flex flex-col gap-1 w-full">
<Label className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Date of examination
          </Label>
          <div className="relative">
            <Input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="h-12 border-[#cdd5df] rounded-lg pr-10"
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
</div>
</div>
<div className="flex flex-col gap-7 w-full">
<div className="flex flex-col gap-1.5 w-full">
<div className="flex items-center gap-1">
<Label className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Difficulty Level
            </Label>
<span className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#f04438] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
*
            </span>
</div>
<RadioGroup value={selectedDifficulty} onValueChange={setSelectedDifficulty} className="flex flex-wrap gap-2">
{difficultyLevels.map((level) => (
              <div key={level.id} className={`flex items-center gap-2 px-2 py-2 rounded-lg border ${selectedDifficulty === level.id ? 'bg-[#eef2f6] border-[#2e90fa] border-[1.5px]' : 'bg-[#eef2f6] border-[#cdd5df]'}`}>
<RadioGroupItem value={level.id} id={level.id} className={selectedDifficulty === level.id ? 'border-[#1570ef] bg-[#eff8ff]' : 'border-[#cdd5df] bg-white'} />
<Label htmlFor={level.id} className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
{level.label}
                </Label>
</div>
))}
          </RadioGroup>
</div>
<div className="flex flex-col gap-1.5 w-full">
<div className="flex items-center gap-1">
<Label className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Sub - Subject
            </Label>
<span className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#f04438] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
*
            </span>
</div>
<div className="flex flex-wrap gap-2">
{subSubjects.map((subject) => (
              <div key={subject.id} className={`flex items-center gap-2 px-2 py-2 rounded-lg border ${selectedSubSubjects.includes(subject.id) ? 'bg-[#eef2f6] border-[#2e90fa] border-[1.5px]' : 'bg-[#eef2f6] border-[#cdd5df]'}`}>
<Checkbox 
                  id={subject.id}
                  checked={selectedSubSubjects.includes(subject.id)}
                  onCheckedChange={(checked) => handleSubSubjectChange(subject.id, checked as boolean)}
                  className={selectedSubSubjects.includes(subject.id) ? 'bg-[#1570ef] border-[#1570ef]' : 'bg-white border-[#cdd5df]'}
                />
<Label htmlFor={subject.id} className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
{subject.label}
                </Label>
</div>
))}
          </div>
</div>
<div className="flex flex-col gap-1.5 w-full">
<div className="flex items-center gap-1">
<Label className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Question Type
            </Label>
<span className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#f04438] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
*
            </span>
</div>
<div className="flex flex-wrap gap-2">
{questionTypes.map((type) => (
              <div key={type.id} className={`flex items-center gap-2 px-2 py-2 rounded-lg border ${selectedQuestionTypes.includes(type.id) ? 'bg-[#eef2f6] border-[#2e90fa] border-[1.5px]' : 'bg-[#eef2f6] border-[#cdd5df]'}`}>
<Checkbox 
                  id={type.id}
                  checked={selectedQuestionTypes.includes(type.id)}
                  onCheckedChange={(checked) => handleQuestionTypeChange(type.id, checked as boolean)}
                  className={selectedQuestionTypes.includes(type.id) ? 'bg-[#1570ef] border-[#1570ef]' : 'bg-white border-[#cdd5df]'}
                />
<Label htmlFor={type.id} className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
{type.label}
                </Label>
</div>
))}
          </div>
</div>
<div className="flex flex-col gap-2 w-full">
<div className="flex items-center gap-1">
<Label className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Units
            </Label>
<span className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#f04438] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
*
            </span>
</div>
<div className="flex flex-col gap-4 w-full">
<div className="flex flex-col gap-1 w-full">
<h3 className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Physics & Chemistry
              </h3>
<div className="flex gap-2 w-full">
<div className="flex flex-col gap-2 flex-1">
{physicsChemistryUnits.map((unit) => (
                    <div key={unit.id} className={`flex gap-1.5 p-2 rounded-lg border w-full ${selectedUnits.includes(unit.id) ? 'bg-[#eef2f6] border-[#2e90fa] border-[1.5px]' : 'bg-slate-50 border-[#cdd5df]'}`}>
<div className="flex items-center gap-2 py-0.5">
<Checkbox 
                          id={unit.id}
                          checked={selectedUnits.includes(unit.id)}
                          onCheckedChange={(checked) => handleUnitChange(unit.id, checked as boolean)}
                          className={selectedUnits.includes(unit.id) ? 'bg-[#1570ef] border-[#1570ef]' : 'bg-white border-[#cdd5df]'}
                        />
</div>
<div className="flex flex-col gap-0.5 flex-1">
<Label htmlFor={unit.id} className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
{unit.number}
                        </Label>
<p className="font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-[#202939] text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
{unit.title}
                        </p>
</div>
</div>
))}
                </div>
<div className="flex flex-col gap-2 flex-1">
{physicsChemistryUnitsColumn2.map((unit) => (
                    <div key={unit.id} className={`flex gap-1.5 p-2 rounded-lg border w-full ${selectedUnits.includes(unit.id) ? 'bg-[#eef2f6] border-[#2e90fa] border-[1.5px]' : 'bg-slate-50 border-[#cdd5df]'}`}>
<div className="flex items-center gap-2 py-0.5">
<Checkbox 
                          id={unit.id}
                          checked={selectedUnits.includes(unit.id)}
                          onCheckedChange={(checked) => handleUnitChange(unit.id, checked as boolean)}
                          className={selectedUnits.includes(unit.id) ? 'bg-[#1570ef] border-[#1570ef]' : 'bg-white border-[#cdd5df]'}
                        />
</div>
<div className="flex flex-col gap-0.5 flex-1">
<Label htmlFor={unit.id} className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
{unit.number}
                        </Label>
<p className="font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-[#202939] text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
{unit.title}
                        </p>
</div>
</div>
))}
                </div>
</div>
</div>
<div className="flex flex-col gap-1 w-full">
<h3 className="font-text-14-semibold font-[number:var(--text-14-semibold-font-weight)] text-[#202939] text-[length:var(--text-14-semibold-font-size)] tracking-[var(--text-14-semibold-letter-spacing)] leading-[var(--text-14-semibold-line-height)] [font-style:var(--text-14-semibold-font-style)]">
Biology
              </h3>
<div className="flex gap-2 w-full">
<div className="flex flex-col gap-2 flex-1">
{biologyUnitsColumn1.map((unit) => (
                    <div key={unit.id} className={`flex gap-1.5 p-2 rounded-lg border w-full ${selectedUnits.includes(unit.id) ? 'bg-[#eef2f6] border-[#2e90fa] border-[1.5px]' : 'bg-slate-50 border-[#cdd5df]'}`}>
<div className="flex items-center gap-2 py-0.5">
<Checkbox 
                          id={unit.id}
                          checked={selectedUnits.includes(unit.id)}
                          onCheckedChange={(checked) => handleUnitChange(unit.id, checked as boolean)}
                          className={selectedUnits.includes(unit.id) ? 'bg-[#1570ef] border-[#1570ef]' : 'bg-white border-[#cdd5df]'}
                        />
</div>
<div className="flex flex-col gap-0.5 flex-1">
<Label htmlFor={unit.id} className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
{unit.number}
                        </Label>
<p className="font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-[#202939] text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
{unit.title}
                        </p>
</div>
</div>
))}
                </div>
<div className="flex flex-col gap-2 w-40">
{biologyUnitsColumn2.map((unit) => (
                    <div key={unit.id} className={`flex gap-1.5 p-2 rounded-lg border w-full ${selectedUnits.includes(unit.id) ? 'bg-[#eef2f6] border-[#2e90fa] border-[1.5px]' : 'bg-slate-50 border-[#cdd5df]'}`}>
<div className="flex items-center gap-2 py-0.5">
<Checkbox 
                          id={unit.id}
                          checked={selectedUnits.includes(unit.id)}
                          onCheckedChange={(checked) => handleUnitChange(unit.id, checked as boolean)}
                          className={selectedUnits.includes(unit.id) ? 'bg-[#1570ef] border-[#1570ef]' : 'bg-white border-[#cdd5df]'}
                        />
</div>
<div className="flex flex-col gap-0.5 flex-1">
<Label htmlFor={unit.id} className="font-text-14-medium font-[number:var(--text-14-medium-font-weight)] text-[#202939] text-[length:var(--text-14-medium-font-size)] tracking-[var(--text-14-medium-letter-spacing)] leading-[var(--text-14-medium-line-height)] [font-style:var(--text-14-medium-font-style)]">
{unit.number}
                        </Label>
<p className="font-text-14-regular font-[number:var(--text-14-regular-font-weight)] text-[#202939] text-[length:var(--text-14-regular-font-size)] tracking-[var(--text-14-regular-letter-spacing)] leading-[var(--text-14-regular-line-height)] [font-style:var(--text-14-regular-font-style)]">
{unit.title}
                        </p>
</div>
</div>
))}
                </div>
</div>
</div>
</div>
</div>
</div>
</section>
);
};