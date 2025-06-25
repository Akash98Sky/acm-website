export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Award {
  awardee: string;
  details: string;
}

export interface BookChapter {
  title: string;
  details: string;
}

export interface Reference {
  name: string;
  details: string;
}

export interface ResumeBasics {
  name: string;
  label: string;
  image: string;
  summary: string;
  location: string;
}

export interface Resume {
  basics: ResumeBasics;
  education: Education[];
  interests: {
    title: string;
    description: string;
  };
  awards: Award[];
  references: Reference[];
  publications: {
    bookChapters: BookChapter[];
  };
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
  publishedIn?: string;
  image?: string;
  imageHint?: string;
}

export interface Project {
    title: string;
    description: string;
    image: string;
    imageHint: string;
    url: string;
}
