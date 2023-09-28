export function genColor (seed: number) {
    let rand = Math.floor((Math.abs(Math.sin(seed) * 16777215)));
    let color = rand.toString(16);
    // pad any colors shorter than 6 characters with leading 0s
    while(color.length < 6) {
      color = '0' + color;
    }
  
    return color;
  }