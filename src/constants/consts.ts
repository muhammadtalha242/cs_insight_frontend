export const ROUTE_HOME = '';
export const ROUTE_LOGIN = 'login';
export const ROUTE_REGISTER = 'register';
export const ROUTE_ACCOUNT = 'account';
export const ROUTE_PASSWORD = 'forgotpassword';
export const ROUTE_PAPERS = 'papers';
export const ROUTE_AUTHORS = 'authors' as const;
export const ROUTE_VENUES = 'venues' as const;
export const ROUTE_TYPES_OF_PAPER = 'typesOfPaper';
export const ROUTE_FIELDS_OF_STUDY = 'fieldsOfStudy';
export const ROUTE_PUBLISHERS = 'publishers';
export const ROUTE_CITATIONS = 'citations';
export const ROUTE_ACCESS_TYPES = 'accessTypes';
export const ROUTE_TOPICS = 'topics';

export type AUTOCOMPLETE_ROUTES =
  | typeof ROUTE_AUTHORS
  | typeof ROUTE_VENUES
  | typeof ROUTE_PUBLISHERS
  | typeof ROUTE_TOPICS
  | typeof ROUTE_FIELDS_OF_STUDY
  | typeof ROUTE_TYPES_OF_PAPER
  | typeof ROUTE_CITATIONS
  | typeof ROUTE_ACCESS_TYPES;

export const TYPES_OF_PAPER = [
  'article',
  'inproceedings',
  'book',
  'incollection',
  'proceedings',
  'phdthesis',
  'mastersthesis'
] as const;

export const FIELDS_OF_STUDY = [
  'Art',
  'Biology',
  'Business',
  'Chemistry',
  'Computer Science',
  'Economics',
  'Engineering',
  'Environmental Science',
  'Geography',
  'Geology',
  'History',
  'Materials Science',
  'Mathematics',
  'Medicine',
  'Philosophy',
  'Physics',
  'Political Science',
  'Psychology',
  'Sociology'
] as const;

export const ACCESS_TYPE_OPEN = 'Open';
export const ACCESS_TYPE_OTHER = 'Other';
export const ACCESS_TYPE = ['Open', 'Other'];

export const STORAGE_TOKEN = 'token';
export const DEBOUNCE_DELAY_AUTOCOMPLETE = 1000;
export const DEBOUNCE_DELAY_TEXTFIELD = 500;
export const DEBOUNCE_DELAY_K = 800;
export const PAGE_SIZE = 100;
export const GRID_DECIMAL_PLACES = 2;

export const NA = 'Others';

export const metrics = [
  { label: '#Citations', value: 'inCitationsCount' },
  { label: '#Papers', value: 'papersCount' }
] as const;

export const API_BASE_URL = 'http://localhost:8080' as const;
