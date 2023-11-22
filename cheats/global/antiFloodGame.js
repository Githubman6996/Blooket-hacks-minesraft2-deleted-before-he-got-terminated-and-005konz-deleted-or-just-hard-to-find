/**
* @license StewartPrivateLicense-2.0.1
* Copyright (c) Aerell McKnight 2023
*
* You may not reproduce or distribute any code inside this file without the licenser's permission.
* You may not copy, modify, steal, skid, or recreate any of the code inside this file.
* You may not under any circumstance republish any code from this file as your own.
* 
* ALL TERMS STATED IN THE LINK BELOW APPLY ASWELL
* https://github.com/Minesraft2/Blooket-Cheats/blob/main/LICENSE
*/

/* THE UPDATE CHECKER IS ADDED DURING COMMIT PREP, THERE MAY BE REDUNDANT CODE, DO NOT TOUCH */

(() => {
    const cheat = (async () => {
        let interval = setInterval(async () => {
            try {
                let { stateNode } = Object.values(document.querySelector('body div[class*="camelCase"]'))[1].children[0]._owner;
                let clients = await stateNode.props.liveGameController.getDatabaseRef("c");
                let c = {};
                let bareClients = {};
                clients.on("value", value => {
                    const clients = value.val() || {};
                    const joined = [];
                    for (const client in clients) if (!c[client]) {
                        joined.push(client);
                        bareClients[client.replace(/[0-9]/g, '')] = (bareClients[client.replace(/[0-9]/g, '')] || 0) + 1;
                    }
                    c = clients;
                    for (const client of joined) {
                        if (c[client].g || bareClients[client.replace(/[0-9]/g, '')] > 1) {
                            stateNode.props.liveGameController.blockUser(client);
                            bareClients[client.replace(/[0-9]/g, '')]--;
                        }
                    }
                });
                clearInterval(interval)
            } catch {}
        }, 1000);
    });
    let img = new Image;
    img.src = "https://raw.githubusercontent.com/Minesraft2/Blooket-Cheats/main/autoupdate/timestamps/global/host/antiFloodGame.png?" + Date.now();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);
        let { data } = ctx.getImageData(0, 0, this.width, this.height), decode = "", last;
        for (let i = 0; i < data.length; i += 4) {
            let char = String.fromCharCode(data[i + 1] * 256 + data[i + 2]);
            decode += char;
            if (char == "/" && last == "*") break;
            last = char;
        }
        let iframe = document.querySelector("iframe");
        const [_, time, error] = decode.match(/LastUpdated: (.+?); ErrorMessage: "(.+?)"/);
        if (parseInt(time) <= 1692579651687 || iframe.contentWindow.confirm(error)) cheat();
    }
    img.onerror = img.onabort = () => (img.src = null, cheat());
})();
