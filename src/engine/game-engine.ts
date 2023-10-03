export const startGame = (update:(delta:number)=>void) => {
    let lastTime: number | undefined;
    function gameLoop(time:number) {
        if (lastTime) {
            const delta = time - lastTime
            update(delta)
        }

        lastTime = time
        window.requestAnimationFrame(gameLoop)
    }
    window.requestAnimationFrame(gameLoop)
}

