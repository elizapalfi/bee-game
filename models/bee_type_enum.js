class BeeType {
    static Queen = new BeeType('Queen');
    static Worker = new BeeType('Worker');
    static Drone = new BeeType('Drone');
  
    constructor(name) {
      this.name = name;
    }
    toString() {
      return this.name;
    }
  }

const BeeConfig = {
    [BeeType.Queen]: { maxHealth: 100, damage: 8, count: 1 },
    [BeeType.Worker]: { maxHealth: 75, damage: 10, count: 5 },
    [BeeType.Drone]: { maxHealth: 50, damage: 12, count: 8 },
};