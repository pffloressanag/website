// function([string1, string2],target id,[color1,color2])
 consoleText(['Coming Soon', 'Hello World'], 'text',['white','lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var con = document.getElementById('console');
  var letterCount = 1;
  var funnyCatFrequency = 5;
  var funnyCatCount = 0;
  var funnyCat = 'FUNNY CAT TYPING';
  var funnyCatColor = 'limegreen';
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])

  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        funnyCatCount += 1;
        if(funnyCatCount === funnyCatFrequency - 1){
          colors.unshift(funnyCatColor);
          words.unshift(funnyCat)
        }
        else{
          if(words[0] === funnyCat){
            colors.shift();
            words.shift();
            funnyCatCount = 0;
          }
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
        }
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 3000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 3000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)

  //blinking cursor effect
  window.setInterval(function() {
    symbol = "_"
    if(con.textContent === symbol)
    {
      con.textContent = "\u00A0" //character for white space
    }
    else
    {
      con.textContent = symbol
    }
  }, 400)
}