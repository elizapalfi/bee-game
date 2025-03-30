document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    updateUI();

    document.getElementById(EDIT_BUTTON_ID).addEventListener("click", () => togglePlayerNameEditing(true));

    document.getElementById(PLAYER_INPUT_ID).addEventListener("blur", function (event) {
        if (event.target.value.trim() === "") {
            event.target.focus();
        } else {
            togglePlayerNameEditing(false);
        }
    });

    document.getElementById(PLAYER_INPUT_ID).addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.target.blur();
        }
    });

    document.getElementById(HIT_BUTTON_ID).addEventListener("click", () => {
        fetchElementById(RESTART_BUTTON_ID).disabled = false;

        if (game.isGameOver()) return;

        let result = game.hitRandomBee();
        if (result) {
            const damageText = `Damage ${result.damage}${HP}!`;

            result.type === BeeType.Queen.name
                ? logAction(`${HIT_QUEEN} ${damageText}`)
                : logAction(`${result.type} no.${result.index} was hit. ${damageText}`);

            if (result.isDead) {
                result.type === BeeType.Queen.name
                    ? logAction(KILLED_QUEEN)
                    : logAction(`${result.type} no.${result.index} died!`);
            }
        }

        if (game.isGameOver()) {
            logAction(GAME_OVER);
            document.getElementById(HIT_BUTTON_ID).disabled = true;
        }

        updateUI();
    });

    document.getElementById(RESTART_BUTTON_ID).addEventListener("click", () => {
        game.restart();
        fetchElementById(HIT_BUTTON_ID).disabled = false;
        fetchElementById(RESTART_BUTTON_ID).disabled = true;
        logAction(GAME_RESTART);
        updateUI();
    });

    function updateUI() {
        game.isGameOver()
            ? document.getElementById(HIT_BUTTON_ID).disabled = true
            : document.getElementById(HIT_BUTTON_ID).disabled = false;

        const swarmInfo = fetchElementById(SWARM_INFO_CONTAINER);
        swarmInfo.innerHTML = "";

        const beesByType = game.bees.reduce((acc, bee) => {
            acc[bee.type] = acc[bee.type] || [];
            acc[bee.type].push(bee);
            return acc;
        }, {});

        Object.keys(beesByType).forEach(type => {
            const group = createElementWithClass(DIV_DOM_ELEMENT, BEE_GROUP_CLASS);

            const beeTypeTitle = createElement(H3_DOM_ELEMENT);
            beeTypeTitle.textContent = type;
            group.appendChild(beeTypeTitle);

            beesByType[type].forEach((bee, _) => {
                const healthContainer = buildSwarmUI(bee, game.getMaxHealth(bee.type));
                group.appendChild(healthContainer);
            });

            swarmInfo.appendChild(group);
        });
    }

    function logAction(action) {
        game.log = fetchElementById(DAMAGE_STATUS_LOG_DOM_ELEMENT);
        const entry = createElement(PARAGRAPH_DOM_ELEMENT);
        entry.textContent = action;
        game.log.prepend(entry);

        let logs = loadFromStorage(SWARM_DAMAGE_STATUS) || [];
        logs.unshift(action);
        saveToStorage(SWARM_DAMAGE_STATUS, logs);
    }

    function togglePlayerNameEditing(editMode) {
        const elements = {
            span: fetchElementById(PLAYER_NAME_SPAN_ID),
            spanWrapper: fetchElementById(PLAYER_NAME_SPAN_CONTAINER),
            input: fetchElementById(PLAYER_INPUT_ID),
            inputWrapper: fetchElementById(PLAYER_INPUT_CONTAINER)
        };

        const toggleVisibility = (elements, showInput) => {
            elements.span.style.display = showInput ? DISPLAY_NONE : DISPLAY_INLINE;
            elements.spanWrapper.style.display = showInput ? DISPLAY_NONE : DISPLAY_INLINE;
            elements.input.style.display = showInput ? DISPLAY_INLINE : DISPLAY_NONE;
            elements.inputWrapper.style.display = showInput ? DISPLAY_INLINE : DISPLAY_NONE;
        };

        if (editMode) {
            elements.input.value = elements.span.textContent;
            toggleVisibility(elements, true);
            elements.input.focus();
        } else {
            elements.span.textContent = elements.input.value;
            game.playerName = elements.input.value;
            toggleVisibility(elements, false);
            game.saveGame();
        }
    }
});
