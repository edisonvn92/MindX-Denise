import { EvaluateSupportPayload } from '../ports/payloads';
import { SupportRepository } from '../ports/repositories';

export class EvaluateSupportUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: EvaluateSupportPayload) {
    this.repo.evaluate(payload);
  }
}
