function mousePressed() {
    if (paused) {
        if (detectPausedClick()) return;
    }
    else {
        if (detectPausedClick()) return;
        if (handleTopButtons()) return;
        if (handleSideButtons()) return;
        if (handleCreatureInteractions()) return;
        if (handlePlantInteractions()) return;
    }
}

// Spawn button interaction
function handleTopButtons() {
    if (isInsideButton(mouseX, mouseY, spawnCreatureButton)) {
        resetIcons();
        currentTool = "none";

        const pos = randomPointInArena();
        creatures.push(new Creature(pos.x, pos.y));
        spawnSfx.play();
        return true;
    } else if (isInsideButton(mouseX, mouseY, spawnPlantButton)) {
        resetIcons();
        currentTool = "none";
        const pos = randomPointInArena();
        plants.push(new Plant(pos.x, pos.y));
        spawnSfx.play();
        return true;
    }
    return false;
}

function handleSideButtons() {
    // Tool button interaction
    if (isInsideButton(mouseX, mouseY, swordButton)) {
        resetIcons();
        if (currentTool === "sword") {
            currentTool = "none";
        } else {
            swordButton.image = null;
            currentTool = "sword";
            swordSfx.play();
        }

        return true;
    } else if (isInsideButton(mouseX, mouseY, foodButton)) {
        resetIcons();
        if (currentTool === "food") {
            currentTool = "none";
        } else {
            foodButton.image = null;
            currentTool = "food";
            foodSfx.play();
        }
        return true;

    } else if (isInsideButton(mouseX, mouseY, waterButton)) {
        resetIcons();
        if (currentTool === "water") {
            currentTool = "none";
        } else {
            waterButton.image = null;
            currentTool = "water";
            waterSfx.play();
        }
        return true;
    }
    return false;
}

function handleCreatureInteractions() {
    if (currentTool === "food") {
        for (let creature of creatures) {
            if (creature.isClicked(mouseX, mouseY)) {
                if (creature.isAlive) {
                    creature.feed();
                    break;
                }
            }
        }
        return true;
    }
    else if (currentTool === "sword") {
        for (let creature of creatures) {
            if (creature.isClicked(mouseX, mouseY)) {
                if (creature.isAlive && creature.stage === "adult") {
                    creature.die();
                    break;
                }
            }
        }
        return true;
    }
    return false;
}

function handlePlantInteractions() {
    if (currentTool === "water") {
        for (let plant of plants) {
            if (plant.isAlive && plant.isClicked(mouseX, mouseY)) {
                plant.water();
                break;
            }
        }
        return true;
    }
    return false;
}

function resetIcons() {
    swordButton.image = swordIcon;
    foodButton.image = foodIcon;
    waterButton.image = waterIcon;
}

function detectPausedClick() {
    const d = dist(mouseX, mouseY, 50, 50);
    if (d < 25) {
        paused = !paused;
        spawnSfx.play();
        if (paused) {
            bgmusic.pause();
        } else {
            bgmusic.play();
        }
        return true;
    }
    return false;
}
