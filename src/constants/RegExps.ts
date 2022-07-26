const gogl = new RegExp("^g |^google ", "gmi");
const wiki = new RegExp("^w |^wikipedia ", "gmi");
const thes = new RegExp("^t |^thesaurus ", "gmi");
const dict = new RegExp("^d |^dictionary ", "gmi");
const stck = new RegExp("^s |^stackoverflow |^stack overflow ", "gmi");
const twtr = new RegExp("^tw |^twitter ", "gmi");
const lnkd = new RegExp("^li |^linkedin ", "gmi");
const inst = new RegExp("^in |^instagram ", "gmi");

export { gogl, wiki, thes, dict, stck, twtr, lnkd, inst };
