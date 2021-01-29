//META{"name":"Autouwu","displayName":"UwU","website":"oop","source":""}*//
class ReplacePair {
  constructor(re, str) {
    this.re = re;
    this.str = str;
  }
}

function isUpper(t) {
  return t === t.toUpperCase();
}

function casePreserveReplace(str, a, b) {
  return str
    .replace(a.toLowerCase(), b.toLowerCase())
    .replace(a.toUpperCase(), b.toUpperCase());
}
function thisCase(a, b) {
  return isUpper(a) ? b.toUpperCase() : b.toLowerCase();
}

function uwufier(text) {
  console.log(`original text:\n${text}`);
  const pairs = [
    new ReplacePair(/you/gi, m => thisCase(m, `u`)),
    new ReplacePair(/thanks/gi, m => thisCase(m, `tnx`)),
    new ReplacePair(/like/gi, m => thisCase(m, `lik`)),
    new ReplacePair(/ok/gi, m => thisCase(m, `oki`)),
    new ReplacePair(/because/gi, m => thisCase(m, `cuz`)),
    new ReplacePair(/(?<![a-zA-Z])cry(?![a-zA-Z])/gi, m =>
      thisCase(m, `cri ` + randomChoice([`;-;`, `😭`, `:c`])),
    ),
    new ReplacePair(
      /((?![aeiounwy])\w)([aeiou])(?!l)/gi,
      m => m[0] + (Math.random() > 0.5 ? thisCase(m[0], `w`) : ``) + m[1],
    ),
    new ReplacePair(/(?<=\w)[rl](?=\w)/gi, m => thisCase(m, `w`)),
    new ReplacePair(/is/gi, m =>
      casePreserveReplace(
        m,
        `s`,
        thisCase(m, `z`).repeat(Math.floor(1 + Math.random() * 3)),
      ),
    ),
    new ReplacePair(/a(nd)/gi, `$1`),
    new ReplacePair(/w+/gi, m => thisCase(m, `w`)),
    new ReplacePair(/(h)(i)/gi, `$1$2$2$2$2`),
    new ReplacePair(/([a-zA-Z?!~])\s+$/i, `$1$1$1`),
    new ReplacePair(/\s+$/i, ``),
  ];
  pairs.forEach(rp => {
    text = text.replace(rp.re, rp.str);
  });
  const emojiPatch = `🥰😍😘😻💌💘💝💖💗💓💞💕💟❣️❤️🧡💛💚💙💜`;
  const emojis = [];
  for (const ch of emojiPatch) {
    emojis.push(ch);
  }
  function buildWholesome() {
    let final = ``;
    for (
      let i = 0;
      i < Math.min(5, 1 + text.length / 5, Math.floor(Math.random() * 5));
      i++
    ) {
      final += randomChoice(emojis);
    }
    return final;
  }
  console.log(`output:\n${text}`);
  return (
    text.replace(/([.?!~]\s+|$)/g, () => ` ` + buildWholesome() + ` `) +
    (Math.random() > 0.3
      ? randomChoice([`uwu`, `owo`, `:3`, `xd`, `c:`, `^o^`])
      : ``)
  );
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
module.exports = uwufier;
