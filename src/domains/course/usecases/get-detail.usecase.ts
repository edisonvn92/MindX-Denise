import { CourseEntity } from '../entities';
import { CourseRepository } from '../ports/repositories';

export class GetDetailCourseUseCase {
  constructor(private readonly repo: CourseRepository) {}

  async run(id: string): Promise<CourseEntity> {
    return this.repo.getCourseDetail(id);
  }
}
