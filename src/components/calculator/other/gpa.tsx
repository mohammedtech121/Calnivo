"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  CalcCard,
  CalcButton,
  Field,
  ResultCard,
  SelectInput,
  TextInput,
} from "@/components/calculator/CalculatorShell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fmtNum, parseNum } from "@/lib/format";

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

const GRADES = Object.keys(GRADE_POINTS);

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

let nextId = 4;

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Calculus I", grade: "A", credits: "4" },
    { id: 2, name: "English 101", grade: "B+", credits: "3" },
    { id: 3, name: "Intro to CS", grade: "A-", credits: "3" },
  ]);
  const [scaleMax, setScaleMax] = useState<string>("4.0");

  const computed = useMemo(() => {
    return courses.map((c) => {
      const credits = parseNum(c.credits);
      const gp = GRADE_POINTS[c.grade] ?? 0;
      return { ...c, credits, gp, points: credits * gp };
    });
  }, [courses]);

  const totalCredits = computed.reduce((s, c) => s + c.credits, 0);
  const totalPoints = computed.reduce((s, c) => s + c.points, 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  const scaleNum = parseNum(scaleMax) || 4.0;
  const scaledGpa = scaleNum === 4.0 ? gpa : (gpa / 4.0) * scaleNum;

  function addCourse() {
    setCourses((prev) => [
      ...prev,
      { id: nextId++, name: "", grade: "A", credits: "3" },
    ]);
  }
  function removeCourse(id: number) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }
  function update(id: number, patch: Partial<Course>) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }

  return (
    <div className="space-y-6">
      <CalcCard title="Courses">
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 px-1 text-xs font-medium uppercase tracking-wide text-brand-muted">
            <div className="col-span-5 sm:col-span-6">Course name</div>
            <div className="col-span-3 sm:col-span-2">Grade</div>
            <div className="col-span-3 sm:col-span-3">Credits</div>
            <div className="col-span-1"></div>
          </div>

          {courses.map((c) => (
            <div key={c.id} className="grid grid-cols-12 gap-2">
              <div className="col-span-5 sm:col-span-6">
                <TextInput
                  value={c.name}
                  placeholder="Course name (optional)"
                  onChange={(e) => update(c.id, { name: e.target.value })}
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <SelectInput
                  value={c.grade}
                  onChange={(e) => update(c.id, { grade: e.target.value })}
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </SelectInput>
              </div>
              <div className="col-span-3 sm:col-span-3">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={c.credits}
                  onChange={(e) => update(c.id, { credits: e.target.value })}
                  className="tabular-nums"
                />
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <button
                  onClick={() => removeCourse(c.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand bg-white text-brand-muted hover:bg-accent/50 hover:text-red-600"
                  aria-label="Remove course"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <CalcButton variant="secondary" onClick={addCourse} className="px-3 py-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add course
            </span>
          </CalcButton>

          <div className="w-full sm:w-32">
            <Field label="GPA scale">
              <SelectInput
                value={scaleMax}
                onChange={(e) => setScaleMax(e.target.value)}
              >
                <option value="4.0">4.0</option>
                <option value="5.0">5.0</option>
                <option value="10.0">10.0</option>
              </SelectInput>
            </Field>
          </div>
        </div>
      </CalcCard>

      <CalcCard title="Results">
        <div className="grid gap-3 sm:grid-cols-3">
          <ResultCard
            label="GPA"
            value={fmtNum(scaledGpa, 2)}
            sub={`on a ${scaleNum.toFixed(1)} scale`}
          />
          <ResultCard
            label="Total grade points"
            value={fmtNum(totalPoints, 2)}
            sub={`${fmtNum(totalCredits, 1)} credits`}
            highlight={false}
          />
          <ResultCard
            label="Courses"
            value={String(courses.length)}
            sub={totalCredits > 0 ? `${fmtNum(totalPoints / totalCredits, 4)} pts/credit` : ""}
            highlight={false}
          />
        </div>
      </CalcCard>

      <CalcCard title="Course Breakdown">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Course</TableHead>
              <TableHead className="text-center">Grade</TableHead>
              <TableHead className="text-right tabular-nums">Credits</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead className="text-right tabular-nums">Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {computed.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium text-brand-ink">
                  {c.name || <span className="text-brand-muted italic">Untitled</span>}
                </TableCell>
                <TableCell className="text-center">{c.grade}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {fmtNum(c.credits, 1)}
                </TableCell>
                <TableCell className="text-center tabular-nums">
                  {fmtNum(c.gp, 1)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold">
                  {fmtNum(c.points, 2)}
                </TableCell>
              </TableRow>
            ))}
            {computed.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-brand-muted">
                  Add a course to begin.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CalcCard>
    </div>
  );
}
