class Prototype {
  public m: number;
  public data: Array<number>;
  public peso: number;
  public centro: number;
  public classe: any;

  constructor(data: Array<number>, classe: any) {
    this.data = data;
    this.m = -1;
    this.peso = 1;
    this.centro = 0;
    this.classe = classe;
  }

  setWeight(weigth: number) {
    this.peso = weigth;
  }

  setCenter(center: number) {
    this.centro = center;
  }

  setM(m: number) {
    this.m = m;
  }
}

export default Prototype;
