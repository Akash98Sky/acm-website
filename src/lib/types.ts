export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface BookChapter {
  title: string;
  details: string;
}

export interface PhdScholar {
  name: string;
  image?: string;
  thesisTitle: string;
}

export interface PhdAwardee extends PhdScholar {
  year: number;
}

export interface ResumeBasics {
  name: string;
  label: string;
  image: string;
  summary: string;
  location: string;
  email: string;
}

export interface Resume {
  basics: ResumeBasics;
  education: Education[];
  researchInterests: string[];
  guided: {
    scholars: PhdScholar[];
    awardees: PhdAwardee[];
  };
}

export interface Publication {
  title: string;
  authors: string[];
  year: number;
  url: string;
  doi?: string;
}

export interface ConferencePaper extends Publication {
  conference: string;
  category: string;
}

export interface JournalArticle extends Publication {
  journal: string;
}
