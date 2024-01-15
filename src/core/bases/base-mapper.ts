export abstract class BaseMapper<F, T> {
  abstract toTarget(from: F): T;

  abstract reserve(to: T): F;

  toTargetArr(fromArr: F[]): T[] {
    return fromArr.map((from) => this.toTarget(from));
  }

  reserveArr(toArr: T[]): F[] {
    return toArr.map((to) => this.reserve(to));
  }
}
