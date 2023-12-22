export type CourseInfo = {
  Status: number;
  flare: Flare;
};

interface Flare {
  name: string;
  status: number;
  children: Children[];
}

interface Children {
  id: number;
  status: number;
  name: string;
  children: Children2[];
}
interface Children2 {
  id: number;
  name: number;
  status: number;
  level: string;
  children: Children3[];
}
interface Children3 {
  id: number;
  name: number;
  status: number;
  level: string;
  children: Children4[];
}
interface Children4 {
  id: number;
  name: number;
  status: number;
  level: string;
  size: number;
}
