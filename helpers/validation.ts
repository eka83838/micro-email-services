export function isEmptyObject(obj: any) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export function attributeValidation(text: any, type: String) {
    if (type === "text") {
        return text.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    }
    else if (type === "number") {
        return (isNaN(text)) ? null : text;
    }
    else if (type === "date") {
        return (!isNaN((new Date(text)).valueOf())) ? text : null;
    }
    else if (type === "percent") {
        var temp = text.replace("%", "");
        return (isNaN(temp)) ? null : temp / 100;
    }
    else {
        return text;
    }
}

export function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}
