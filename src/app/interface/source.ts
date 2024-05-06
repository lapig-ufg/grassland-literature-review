export interface SmallSource {
    id: string,
    doi: string,
    title: string,
    keywords: string,
    ismed_first: boolean,
    cluster: number,
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
}


  
export interface SortOptions{
  active: string,
  direction: string,
}