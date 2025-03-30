class Bee {
    constructor(id, type, health, damage) {
        this.id = id;
        this.type = type;
        this.health = health;
        this.damage = damage;
        this.wasHit = false;
    }

    hit() {
        this.health = Math.max(0, this.health - this.damage);
        this.wasHit = true;
    }

    isAlive() {
        return this.health > 0;
    }
}
