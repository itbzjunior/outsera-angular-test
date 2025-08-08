export interface MovieResponse {
  id?: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}
export interface PageMovieQueryParams {
  page: number;
  size: number;
  winner?: boolean;
  year?: number|string;
}

export interface PageMovieResponse {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: MovieResponse[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  paged: boolean;
  pageSize: number;
  unpaged: boolean;
  offset: number;
  sort: Sort;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWithMultipleWinners[];
}

export interface StudioCountPerWin {
  name: string;
  winCount: number;
}

export interface StudiosWithWinCountResponse {
  studios: StudioCountPerWin[];
}

export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducerWinIntervalResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}