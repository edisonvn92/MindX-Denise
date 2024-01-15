// Generate code from clean architecture template

import { CourseEntity } from '../entities';
import { CourseRepository } from '../ports/repositories';

export class FindAllCourseUseCase {
  constructor(private readonly repo: CourseRepository) {}

  async run(): Promise<CourseEntity[]> {
    return this.repo.getListCourse();
  }
}
