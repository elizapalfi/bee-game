(function testGameClass() {
    console.log("Running Game class tests...");

    // Mock dependencies
    window.BeeType = { Queen: { name: "Queen" }, Worker: { name: "Worker" }, Drone: { name: "Drone" } };
    window.BeeConfig = {
        Queen: { maxHealth: 100, damage: 8, count: 1 },
        Worker: { maxHealth: 75, damage: 5, count: 5 },
        Drone: { maxHealth: 50, damage: 3, count: 8 }
    };
        
    // Initialize game instance
    let game = new Game();
    
    // Test game initialization
    console.assert(Array.isArray(game.bees), "Bees should be an array");
    console.assert(game.bees.length > 0, "Bees array should not be empty");
    
    // Test hitting a random bee
    let hitResult = game.hitRandomBee();
    console.assert(hitResult !== null, "hitRandomBee should return a bee object");
    console.assert(typeof hitResult.id === "string", "Hit result should have an ID");
    
    // Test getting alive bees
    let aliveBees = game.getAliveBees();
    console.assert(aliveBees.length > 0, "There should be alive bees");
    
    // Test game over scenario
    game.bees.forEach(bee => bee.health = 0);
    console.assert(game.isGameOver(), "Game should be over when all bees are dead");
    
    console.log("All tests completed.");
})();