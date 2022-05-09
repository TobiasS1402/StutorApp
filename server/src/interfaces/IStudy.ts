/**
 * Creates a Study object with the needed data
 */
export interface IStudy {
  _id?: number;
  name: string;
  courses?: Interfaces.Course[];
}

/**
 * DTO for Study
 */
export interface IStudyInputDTO {
  _id?: number;
  name: string;
}
