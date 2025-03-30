function buildSwarmUI(bee, maxHealth) {
    const healthPercentage = (bee.health / maxHealth) * 100;
    
    const color = healthPercentage > 50
        ? GREEN
        : healthPercentage <= 25
            ? RED
            : ORANGE;

    const beeImage = buildBeeImage(bee);
    const healthContainer = createElementWithClass(DIV_DOM_ELEMENT, HEALTH_CONTAINER_CLASS);
    const healthStats = buildHealthStats(bee, healthPercentage, color);

    healthContainer.innerHTML = "";
    healthContainer.appendChild(healthStats);
    healthContainer.appendChild(beeImage);

    if (bee.wasHit && bee.health > 0) {
        beeImage.classList.add(HIT_BEE_CLASS);
        setTimeout(() => {
            beeImage.classList.remove(HIT_BEE_CLASS);
            bee.wasHit = false;
        }, 500);
    }

    healthContainer.appendChild(beeImage);

    return healthContainer;
}

function buildBeeImage(bee) {
    const beeImage = createElementWithClass(IMG_DOM_ELEMENT, BEE_ICON_CLASS)
    beeImage.src = `assets/images/icon_${bee.type}.png`;
    beeImage.id = bee.id;
    beeImage.classList.add(bee.health <= 0 ? DEAD_BEE_CLASS : ALIVE_BEE_CLASS);

    return beeImage;
}

function buildHealthStats(bee, healthPercentage, color) {
    const healthStats = createElementWithClass(DIV_DOM_ELEMENT, HEALTH_STATS_CLASS);

    const healthText = createElement(PARAGRAPH_DOM_ELEMENT);
    healthText.textContent = `${bee.health}${HP}`;
    healthText.style.fontWeight = FONT_WEIGHT_BOLD;

    const healthBarContainer = createElementWithClass(DIV_DOM_ELEMENT, HEALTH_BAR_CONTAINER_CLASS);

    const healthBar = createElementWithClass(DIV_DOM_ELEMENT, HEALTH_BAR_CLASS);
    healthBar.style.width = `${healthPercentage}%`;
    healthBar.style.backgroundColor = color;

    healthBarContainer.appendChild(healthBar);
    healthStats.appendChild(healthText);
    healthStats.appendChild(healthBarContainer);

    return healthStats;
}
