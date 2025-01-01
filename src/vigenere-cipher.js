const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(flag = true) {
    this.flag = flag;
  }

  createAlphabet() {
    const alphabetObj = {};

    // Создаем объект с буквами и их индексами для обоих регистров
    for (let i = 0; i < 26; i++) {
      const lowerChar = String.fromCharCode(97 + i);
      const upperChar = String.fromCharCode(65 + i);
      alphabetObj[lowerChar] = i;
      alphabetObj[upperChar] = i;
    }

    return alphabetObj;
  }

  createKeyFull(msgReg, keyReg) {
    let keyFull = "";
    for (let i = 0; i < msgReg.length; i++) {
      keyFull += keyReg[i % keyReg.length];
    }
    return keyFull;
  }

  createResult(msg = "a", key = "b", mode = "encrypt") {
    if (typeof msg !== "string" || typeof key !== "string") {
      throw new Error("Invalid input: both message and key must be strings");
    }

    const msgReg = msg.replace(/[^a-zA-Z]/g, "") || "a";
    const keyReg = key.replace(/[^a-zA-Z]/g, "") || "b";

    if (msgReg.length === 0 || keyReg.length === 0) {
      throw new Error("Message and key must contain at least one letter");
    }

    const alphabetObj = this.createAlphabet();

    let result = "";
    let letters = "";
    let lettersIdx = 0;

    let keyFull = this.createKeyFull(msgReg, keyReg);

    for (let i = 0; i < msgReg.length; i++) {
      const a = alphabetObj[msgReg[i]];
      const b = alphabetObj[keyFull[i]];
      let charCode;

      // Учитываем сдвиг в зависимости от режима
      if (mode === "encrypt") {
        charCode = 65 + ((a + b) % 26); // для шифрования
      } else {
        charCode = 65 + ((a - b + 26) % 26); // для расшифровки
      }

      // Добавляем символ в строку зашифрованных/расшифрованных букв
      letters += String.fromCharCode(charCode);
    }

    // Обрабатываем исходное сообщение с учётом букв и неалфавитных символов
    for (let i = 0; i < msg.length; i++) {
      const el = msg[i];
      if (!/[a-zA-Z]/.test(el)) {
        result += el;
      } else {
        result += letters[lettersIdx];
        lettersIdx++;
      }
    }

    // Если флаг false, переворачиваем строку
    return this.flag ? result : result.split("").reverse().join("");
  }

  encrypt(msg, key) {
    if (!msg || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.createResult(msg, key, "encrypt");
  }

  decrypt(msg, key) {
    if (!msg || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.createResult(msg, key, "decrypt");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
