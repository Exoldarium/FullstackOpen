interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: 'special'
}

export type CoursePart = CoursePartBackground | CoursePartGroup | CoursePartBasic | CoursePartRequirements;