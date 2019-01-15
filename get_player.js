const loadJSON = require("load-json-file").sync;

var log_path = "./duel_log.json";

const target_name = process.argv[2];
if (!target_name) { 
    console.log("Please enter player name!")
    return;
}

if(process.argv[3])
    log_path = process.argv[3];
const duel_log = loadJSON(log_path);
const logs = duel_log.duel_log;

function get_name_and_ip(player) {
    const match_result = player.name.match(/(.+) \(IP: (\d+\.\d+\.\d+\.\d+)\)/);
    if(!match_result)
        return null;
    const ret = {
        name: match_result[1],
        ip: match_result[2]
    };
    //console.log(ret);
    return ret;
}

var ret = [];
for (var duel of logs) { 
    for (var player of duel.players) { 
        const player_info = get_name_and_ip(player);
        if (player_info.name === target_name) {
            ret.push(duel);
        }
    }
}

console.log(JSON.stringify(ret, null, 2));
