import { CourseEntity } from '../entities';
import { UpdateCoursePayload } from '../ports/payloads';
import { CourseRepository } from '../ports/repositories';

export class UpdateCourseUseCase {
  constructor(private readonly repo: CourseRepository) {}

  async run(payload: UpdateCoursePayload): Promise<CourseEntity> {
    return this.repo.updateCourse(payload);
  }
}
