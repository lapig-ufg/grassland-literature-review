export interface StatusSource {
  pages: number,
  total: number
}
export interface SmallSource {
    id: string,
    doi: string,
    title: string,
    keywords: string,
    ismed_first: boolean,
    cluster: number,
    cited_by_count: number,
    publication_date:Date,
    referenced_works_count: number,
    relevance_score: number,
    image: string
  }

export interface Source {
  id: string,
  doi: string,
  title: string,
  language: string,
  type_crossref: string,
  ismed: string,
  id_sourcer: string,
  abstract: string,
  keywords: string,
  ismed_first: boolean,
  image: string,
  cluster: number
  cited_by_count: number,
    publication_date:Date,
    referenced_works_count: number,
    relevance_score: number,
}


  
export interface SortOptions{
  active: string,
  direction: string,
}