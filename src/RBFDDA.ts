import Prototype from "./Prototype";

class RBFDDA {
  private classes: Array<any>;
  private prototypes: Array<Prototype>;
  private tetaMore: number;
  private tetaLess: number;

  constructor(
    points: Array<Array<number>>,
    classes: Array<any>,
    tetaMore: number = 0.4,
    tetaLess: number = 0.1
  ) {
    this.prototypes = [];
    this.classes = classes;
    points.map((item, index) =>
      this.prototypes.push(new Prototype(item, classes[index]))
    );
    this.tetaMore = tetaMore;
    this.tetaLess = tetaLess;
  }

  public training() {
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
            prototype.getData(),
            prototype.getClass()
          );

          if (ativacao != -1) {
            let p1: Prototype = this.prototypes[ativacao];
            p1.setWeight(p1.getWeight() + 1);
            this.prototypes[ativacao] = p1;
          } else {
            prototype.setWeight(1);
            if (this.nClass(prototype.getClass()).length > 0) {
              prototype.setWeight(
                this.center(prototype.getData(), prototype.getClass())
              );
            } else {
              prototype.setCenter(1000);
            }

            if (prototype.getM() === -1) {
              ms++;
              prototype.setM(ms);
            }
          }
        }
        this.prototypes[i] = prototype;

        for (let j = 0; j < this.prototypes.length; j++) {
          if (
            prototype.getClass() !== this.classes[j] &&
            this.prototypes[j].getM() !== -1
          ) {
            let current: number = Math.sqrt(
              (Math.pow(
                this.euclideanDistance(
                  prototype.getData(),
                  this.prototypes[j].getData()
                ),
                2
              ) /
                Math.log(this.tetaLess)) *
                -1
            );
            this.prototypes[j].setCenter(
              current < this.prototypes[j].getCenter()
                ? current
                : this.prototypes[j].getCenter()
            );
          }
        }
        i++;
      });
    } while (this.rbfs() != rbfold);
  }

  public classification(points: Array<number>): any {
    let value = Number.MIN_VALUE;
    let classResult = null;

    this.classes.map(classeValue => {
      const activation = this.activation(points, classeValue);
      if (activation > value) {
        value = activation;
        classResult = classeValue;
      }
    });

    return classResult;
  }

  private activation(x: Array<number>, classValue: any): number {
    for (let i = 0; i < this.fromClass(classValue).length; i++) {
      const prototype: Prototype = this.fromClass(classValue)[i];
      if (
        Math.exp(
          (Math.pow(this.euclideanDistance(x, prototype.getData()), 2) /
            Math.pow(prototype.getCenter(), 2)) *
            -1 *
            prototype.getWeight()
        ) >= this.tetaMore
      ) {
        return i;
      }
    }
    return -1;
  }

  private rbfs(): number {
    let j: number = 0;

    this.prototypes.map((item: Prototype) => {
      if (item.getM() !== -1) {
        j++;
      }
    });

    return -j;
  }

  private center(data: Array<number>, classValue: any): number {
    let result: number = Number.MAX_VALUE;

    this.nClass(classValue).map((prototype: any) => {
      const value: number = Math.sqrt(
        (Math.pow(this.euclideanDistance(prototype.data, data), 2) /
          Math.log(this.tetaLess)) *
          -1
      );

      if (value < result) result = value;
    });

    return result;
  }

  private nClass(classValue: any): Array<Prototype> {
    return this.prototypes.filter(
      (prototype: Prototype) =>
        prototype.getClass() !== classValue && prototype.getM() !== -1
    );
  }

  private fromClass(classValue: any): Array<Prototype> {
    return this.prototypes.filter(
      (prototype: Prototype) => prototype.getClass() === classValue
    );
  }

  private euclideanDistance(a1: Array<number>, a2: Array<number>) {
    let result: number = 0;
    for (let i = 0; i < a1.length; i++) {
      result += Math.pow(a1[i] - a2[i], 2);
    }
    return Math.sqrt(result);
  }
}

export default RBFDDA;
