function swap(json) {
    var ret = {};
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
}

const basesInt = {
    1: "met",
    2: "et",
    3: "prop",
    4: "but",
    5: "pent",
    6: "hex",
    7: "hept",
    8: "okt",
    9: "non",
    10: "dek",
    "-1": "ol",
};
const baseStr = swap(basesInt);
const numbersInt = {
    1: "mono",
    2: "di",
    3: "tri",
    4: "tetra",
    5: "penta",
    6: "hexa",
    7: "hepta",
    8: "okta",
    9: "nona",
    10: "deka",
};
const numbersStr = swap(numbersInt);
