export interface IStudy {
  _id?: number;
  name: string;
  courses?: Interfaces.Course[];
}

export interface IStudyInputDTO {
  _id?: number;
  name: string;
}
