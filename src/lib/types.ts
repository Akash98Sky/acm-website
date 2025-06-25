export interface ResumeBasics {
  name: string;
  label: string;
  image: string;
  summary: string;
}

export interface Resume {
  basics: ResumeBasics;
  [key: string]: any;
}

export interface Publication {
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: number;
  url: string;
  doi?: string;
}
