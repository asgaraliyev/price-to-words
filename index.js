class PriceToWords {
  NS = {
    en: {
      major: "dollar",
      minor: "cent",
      words: [
        { value: 10000000, str: "Crore" },
        { value: 100000, str: "Lakh" },
        { value: 1000, str: "Thousand" },
        { value: 100, str: "Hundred" },
        { value: 90, str: "Ninety" },
        { value: 80, str: "Eighty" },
        { value: 70, str: "Seventy" },
        { value: 60, str: "Sixty" },
        { value: 50, str: "Fifty" },
        { value: 40, str: "Forty" },
        { value: 30, str: "Thirty" },
        { value: 20, str: "Twenty" },
        { value: 19, str: "Nineteen" },
        { value: 18, str: "Eighteen" },
        { value: 17, str: "Seventeen" },
        { value: 16, str: "Sixteen" },
        { value: 15, str: "Fifteen" },
        { value: 14, str: "Fourteen" },
        { value: 13, str: "Thirteen" },
        { value: 12, str: "Twelve" },
        { value: 11, str: "Eleven" },
        { value: 10, str: "Ten" },
        { value: 9, str: "Nine" },
        { value: 8, str: "Eight" },
        { value: 7, str: "Seven" },
        { value: 6, str: "Six" },
        { value: 5, str: "Five" },
        { value: 4, str: "Four" },
        { value: 3, str: "Three" },
        { value: 2, str: "Two" },
        { value: 1, str: "One" },
      ],
    },
    az: {
      major: "manat",
      minor: "qəpik",

      words: [
        { value: 10000000, str: "on milyon" },
        { value: 100000, str: "yüz min" },
        { value: 1000, str: "min" },
        { value: 100, str: "yüz" },
        { value: 90, str: "doxsan" },
        { value: 80, str: "səksən" },
        { value: 70, str: "yetmiş" },
        { value: 60, str: "altmış" },
        { value: 50, str: "əlli" },
        { value: 40, str: "qırx" },
        { value: 30, str: "otuz" },
        { value: 20, str: "iyirmi" },
        { value: 19, str: "on doqquz" },
        { value: 18, str: "on səkkiz" },
        { value: 17, str: "on yeddi" },
        { value: 16, str: "on altı" },
        { value: 15, str: "on beş" },
        { value: 14, str: "on dörd" },
        { value: 13, str: "on üç" },
        { value: 12, str: "on iki" },
        { value: 11, str: "on bir" },
        { value: 10, str: "on" },
        { value: 9, str: "doqquz" },
        { value: 8, str: "səkkiz" },
        { value: 7, str: "yeddi" },
        { value: 6, str: "altı" },
        { value: 5, str: "beş" },
        { value: 4, str: "dörd" },
        { value: 3, str: "üç" },
        { value: 2, str: "iki" },
        { value: 1, str: "bir" },
      ],
    },
  };
  constructor() {}
  add_lng({ lng, major, minor }) {
    if(!lng)throw new Error("lng not found")
    if(!major)throw new Error("major not found")
    if(!minor)throw new Error("minor not found")
    this.NS[lng].words = JSON.parse(JSON.stringify(words));
    this.NS[lng].major = major;
    this.NS[lng].minor = minor;
  }
  convertToWords({ number, lng }) {
    let NS = this.NS[lng].words;
    if (!NS) throw new Error(`therse is no such a lng:(${lng})`);
    var result = "";
    for (var n of NS) {
      if (number >= n.value) {
        if (number <= 99) {
          result += n.str;
          number -= n.value;
          if (number > 0) result += " ";
        } else {
          var t = Math.floor(number / n.value);
          // console.log(t);
          var d = number % n.value;
          if (d > 0) {
            return (
              this.convertToWords({
                number: t,
                lng,
              }) +
              " " +
              n.str +
              " " +
              this.convertToWords({
                number: d,
                lng,
              })
            );
          } else {
            return (
              this.convertToWords({
                number: t,
                lng,
              }) +
              " " +
              n.str
            );
          }
        }
      }
    }
    return result;
  }
  convertPriceToWords({ price, lng }) {
    const newPriceArr = `${price}`.split(".");
    if (newPriceArr.length === 1) {
      return `${this.convertToWords({
        number: newPriceArr[0],
        lng,
      })} ${this.NS[lng].major}`;
    } else if (newPriceArr.length === 2) {
      return `${this.convertToWords({
        number: newPriceArr[0],
        lng,
      })} ${this.NS[lng].major},${this.convertToWords({
        number: newPriceArr[1],
        lng,
      })} ${this.NS[lng].minor}`;
    }
  }
}
module.exports = PriceToWords;
