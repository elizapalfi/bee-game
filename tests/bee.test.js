(function testBeeClass() {
    console.log("Running Bee class tests...");
    
    // Create a test bee instance
    let bee = new Bee("test-id", "Worker", 75, 5);
    
    // Test initial properties
    console.assert(bee.id === "test-id", "Bee ID should be correctly assigned");
    console.assert(bee.type === "Worker", "Bee type should be correctly assigned");
    console.assert(bee.health === 75, "Bee health should be initialized correctly");
    console.assert(bee.damage === 5, "Bee damage should be initialized correctly");
    console.assert(bee.wasHit === false, "Bee should not be hit initially");
    
    // Test hit function
    bee.hit();
    console.assert(bee.health === 70, "Bee health should decrease by damage amount");
    console.assert(bee.wasHit === true, "Bee wasHit property should be true after hit");
    
    // Test isAlive function
    console.assert(bee.isAlive() === true, "Bee should be alive if health is above 0");
    
    // Test bee death scenario
    bee.health = 0;
    console.assert(bee.isAlive() === false, "Bee should be dead when health is 0");
    
    console.log("All Bee class tests completed.");
})();
