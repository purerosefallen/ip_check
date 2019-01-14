const duel_log = require("./duel_log.json");

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

var player_list = {};

for(var i in logs){
    const duel = logs[i];
    for(var j in duel.players){
        const player = duel.players[j];
        const player_info = get_name_and_ip(player);
        if(!player_list[player_info.ip])
            player_list[player_info.ip] = [];
        if(player_list[player_info.ip].indexOf(player_info.name) === -1)
            player_list[player_info.ip].push(player_info.name);
    }
}

//console.log(player_list);

var dup_players = [];

for(var ip in player_list) {
    const name_array = player_list[ip];
    if(name_array.length > 1) {
        dup_players.push({
            ip: ip,
            used_names: name_array,
        });
    }
}

console.log(JSON.stringify(dup_players, null, 2));
