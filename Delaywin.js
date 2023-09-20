/**
* @license StewartPrivateLicense-2.0.0
* Copyright (c) Aerell McKnight 2023
* Edited by Greenlio January 11th, 2023 @ 9:50 AM Central
*
* Resolves issue #223
*
* You may not reproduce or distribute any code inside this file without the licenser's permission.
* You may not copy, modify, steal, skid, or recreate any of the code inside this file.
* You may not under any circumstance republish any code from this file as your own.
* 
* ALL TERMS STATED IN THE LINK BELOW APPLY ASWELL
* https://github.com/Minesraft2/Blooket-Cheats/blob/main/LICENSE
*/

(async () => {
    let i = document.createElement('iframe');
    document.body.append(i);
    window.prompt = i.contentWindow.prompt.bind(window);
    i.remove();
    const { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
    setTimeout(() => {
        stateNode.setState({ progress: stateNode.state.goalAmount }, () => {
            const { state: { question } } = stateNode;
            try {
                [...document.querySelectorAll(`[class*="answerContainer"]`)][question.answers.map((x, i) => question.correctAnswers.includes(x) ? i : null).filter(x => x != null)[0]]?.click?.();
            } catch { }
        });
    }, parseInt(prompt('How long do you want it to be before you win? (in seconds)') * 1000));
})();
