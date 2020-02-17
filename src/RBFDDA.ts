import Prototype from "./Prototype";

class RBFDDA {
  private classes: Array<any>;
  private prototypes: Array<Prototype>;
  private tetamais: number;
  private tetamenos: number;

  constructor(
    points: Array<Array<number>>,
    classes: Array<any>,
    tetamais: number = 0.4,
    tetamenos: number = 0.1
  ) {
    this.prototypes = [];
    this.classes = classes;
    points.map((item, index) =>
      this.prototypes.push(new Prototype(item, classes[index]))
    );
    this.tetamais = tetamais.valueOf();
    this.tetamenos = tetamenos.valueOf();
  }

  public run(): Array<Prototype> {
    let first: Boolean = true;
    let ms: number = 0;
    let rbfold: number = 0;

    do {
      rbfold = this.rbfs();
      let i: number = 0;
      for (let l = 0; l < this.prototypes.length; l++) {
        this.prototypes[l].setWeight(1);
      }

      this.prototypes.map((prototype: Prototype) => {
        if (first) {
          first = false;
          prototype.setWeight(1);
          prototype.setCenter(1000);
          ms++;
          prototype.setM(ms);
        } else {
          const ativacao: number = this.activation(
            prototype.data,
            prototype.classe
          );

          if (ativacao != -1) {
            let p1: Prototype = this.prototypes[ativacao];
            p1.setWeight(p1.peso + 1);
            this.prototypes[ativacao] = p1;
          } else {
            prototype.setWeight(1);
            if (this.nClass(prototype.classe).length > 0) {
              prototype.setWeight(
                this.center(prototype.data, prototype.classe)
              );
            } else {
              prototype.setCenter(1000);
            }

            if (prototype.m == -1) {
              ms++;
              prototype.setM(ms);
            }
          }
        }
        this.prototypes[i] = prototype;

        for (let j = 0; j < this.prototypes.length; j++) {
          if (
            prototype.classe !== this.classes[j] &&
            this.prototypes[j].m != -1
          ) {
            let current: number = Math.sqrt(
              (Math.pow(
                this.euclideanDistance(prototype.data, this.prototypes[j].data),
                2
              ) /
                Math.log(this.tetamenos)) *
                -1
            );
            this.prototypes[j].setCenter(
              current < this.prototypes[j].centro
                ? current
                : this.prototypes[j].centro
            );
          }
        }
        i++;
      });
    } while (this.rbfs() != rbfold);

    return this.prototypes.filter((pResult: Prototype) => pResult.m != -1);
  }

  activation(x: Array<number>, classValue: any): number {
    for (let i = 0; i < this.fromClass(classValue).length; i++) {
      const prototype: Prototype = this.fromClass(classValue)[i];
      if (
        Math.exp(
          (Math.pow(this.euclideanDistance(x, prototype.data), 2) /
            Math.pow(prototype.centro, 2)) *
            -1 *
            prototype.peso
        ) >= this.tetamais
      ) {
        return i;
      }
    }
    return -1;
  }

  rbfs(): number {
    let j: number = 0;

    this.prototypes.map((item: Prototype) => {
      if (item.m != -1) {
        j++;
      }
    });

    return -j;
  }

  center(data: Array<number>, classValue: any): number {
    let result: number = Number.MAX_VALUE;

    this.nClass(classValue).map((prototype: any) => {
      const value: number = Math.sqrt(
        (Math.pow(this.euclideanDistance(prototype.data, data), 2) /
          Math.log(this.tetamenos)) *
          -1
      );

      if (value < result) result = value;
    });

    return result;
  }

  nClass(classValue: any): Array<Prototype> {
    return this.prototypes.filter(
      (item: Prototype) => !item.classe === classValue && item.m != -1
    );
  }

  fromClass(classValue: any): Array<Prototype> {
    return this.prototypes.filter(
      (prototype: Prototype) => prototype.classe === classValue
    );
  }

  euclideanDistance(a1: Array<number>, a2: Array<number>) {
    let result: number = 0;
    for (let i = 0; i < a1.length; i++) {
      result += Math.pow(a1[i] - a2[i], 2);
    }
    return Math.sqrt(result);
  }
}

export default RBFDDA;
