import { TakeQuizPayload } from '../ports/payloads';
import { StudentLessonRepository } from '../ports/repositories';

export class TakeQuizUseCase {
  constructor(private readonly repo: StudentLessonRepository) {}

  async run(payload: TakeQuizPayload) {
    this.repo.takeQuiz(payload);
  }
}
