import { CourseEntity } from '../entities';
import { ToggleCoursePayload } from '../ports/payloads';
import { CourseRepository } from '../ports/repositories';

export class ToggleCourseUseCase {
  constructor(private readonly repo: CourseRepository) {}

  async run(payload: ToggleCoursePayload): Promise<CourseEntity> {
    return this.repo.toggleCourse(payload);
  }
}
