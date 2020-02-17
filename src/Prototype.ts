class Prototype {
  private m: number;
  private data: Array<number>;
  private weight: number;
  private center: number;
  private classValue: any;

  constructor(data: Array<number>, classe: any) {
    this.data = data;
    this.m = -1;
    this.weight = 1;
    this.center = 0;
    this.classValue = classe;
  }

  getClass(): any {
    return this.classValue;
  }

  getCenter(): number {
    return this.center;
  }

  getM(): number {
    return this.m;
  }

  getWeight(): number {
    return this.weight;
  }

  getData(): Array<number> {
    return this.data;
  }

  setWeight(weigth: number) {
    this.weight = weigth;
  }

  setCenter(center: number) {
    this.center = center;
  }

  setM(m: number) {
    this.m = m;
  }
}

export default Prototype;
