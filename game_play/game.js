class Game {
    constructor() {
        this.bees = [];
        this.playerName = null;
        this.log = null;
        this.initGame();
    }

    initGame() {
        this.loadGame();
        this.saveGame();
    }

    generateBees() {
        return Object.entries(BeeConfig).flatMap(([type, { maxHealth, damage, count }]) =>
            Array(count).fill().map(() => new Bee(generateUUID(), type, maxHealth, damage))
        );
    }

    getMaxHealth(type) {
        const healthValues = Object.fromEntries(
            Object.entries(BeeConfig).map(([beeType, config]) => [BeeType[beeType], config.maxHealth])
        );

        return healthValues[type] || 0;
    }

    getAliveBees() {
        return this.bees.filter(bee => bee.isAlive());
    }

    hitRandomBee() {
        let aliveBees = this.getAliveBees();
        if (aliveBees.length === 0) return null;

        let randomIndex = Math.floor(Math.random() * aliveBees.length);
        let bee = aliveBees[randomIndex];

        bee.hit();
        this.saveGame();

        let sameTypeBees = this.bees.filter(b => b.type === bee.type);
        let typeIndex = sameTypeBees.indexOf(bee) + 1;

        if (bee.type === BeeType.Queen.name && bee.health === 0) {
            this.bees.forEach(b => (b.health = 0));
            this.saveGame();
        }

        return { id: bee.id, type: bee.type, damage: bee.damage, index: typeIndex, isDead: bee.health === 0 };
    }

    isGameOver() {
        return this.getAliveBees().length === 0;
    }

    loadGame() {
        this.initializeBeeSwarm();
        this.initializeDamageStatus();
        this.initializePlayerName();

        fetchElementById(RESTART_BUTTON_ID).disabled = !this.isGameOver();
    }

    saveGame() {
        saveToStorage(PLAYER_NAME, this.playerName);
        saveToStorage(BEE_SWARM_STATUS, this.bees);
    }

    restart() {
        removeFromStorage(BEE_SWARM_STATUS);
        removeFromStorage(SWARM_DAMAGE_STATUS);
        this.initGame();
    }


    initializeBeeSwarm() {
        const data = loadFromStorage(BEE_SWARM_STATUS);
        if (data) {
            this.bees = data.map(bee => new Bee(bee.id, bee.type, bee.health, bee.damage, bee.wasHit));
        } else this.bees = this.generateBees();
    }

    initializeDamageStatus() {
        const stats = loadFromStorage(SWARM_DAMAGE_STATUS);

        if (stats) {
            this.log = document.getElementById(DAMAGE_STATUS_LOG_DOM_ELEMENT);
            this.log.innerHTML = "";
            let logs = stats ?? [];

            logs.forEach(action => {
                const entry = createElement(PARAGRAPH_DOM_ELEMENT);
                entry.textContent = action;
                this.log.appendChild(entry);
            });
        }
    }

    initializePlayerName() {
        const playerName = loadFromStorage(PLAYER_NAME);

        this.playerName = playerName ?? DEFAULT_PLAYER_NAME;
        const playerNameSpan = fetchElementById(PLAYER_NAME_SPAN_ID)
        const playerInput = fetchElementById(PLAYER_INPUT_ID);

        if (playerNameSpan && playerInput) {
            playerNameSpan.textContent = this.playerName;
            playerInput.value = this.playerName;
        }
    }
}