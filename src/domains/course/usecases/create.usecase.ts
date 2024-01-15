// Generate code from clean architecture template

import { CourseEntity } from '../entities';
import { CreateCoursePayload } from '../ports/payloads';
import { CourseRepository } from '../ports/repositories';

export class CreateCourseUseCase {
  constructor(private readonly repo: CourseRepository) {}

  async run(payload: CreateCoursePayload): Promise<CourseEntity> {
    return this.repo.createCourse(payload);
  }
}
