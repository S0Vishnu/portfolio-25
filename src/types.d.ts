type Category = "web-project" | "art" | "render" | "comic" | "design" | "story";

interface Project {
  id: string;
  title: string;
  content: string;
  category: Category;   // fixed, one of the five values
  beta: boolean;
  thumbnail: string;
  status: string;
  featured?: boolean;   // optional, for home page display
  link?: string;       // optional, external link for web-project and design
}

interface Page {
  id: string;
  number: number | string;
}

interface Chapter {
  id: string;
  title: string;
  pages: Page[];
}

interface Comic extends Project {
  category: "comic";     // overrides to ensure comics must be category 'comic'
  chapters: Chapter[];
}

