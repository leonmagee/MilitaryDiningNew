cc(42, 'pounds', 6, 1, 185, 197, 'male', "3");

function cc(age, wtype, foot, inch, cm, weight, gender, activeness) {
  console.log('age', age);
  if (age != '' && cm != '' && weight != '') {
    if (wtype == "pounds") {
      weight = parseInt(weight);
      weight = Math.round(weight / 2.2046);
    }
    var loa = activeness; // degree of activeness
    if (gender === 'male') {
      fd = (10 * weight) + (6.25 * cm) - (5 * age) + 5; // male
    } else if (gender === 'female') {
      fd = (10 * weight) + (6.25 * cm) - (5 * age) - 161; // female
    }
    console.log('fd', fd);

    var cneed;
    var caltype = 'pounds';
    switch (loa) {
      case "1":
        cneed = fd * 1.2;
        break;
      case "2":
        cneed = fd * 1.375
        break;
      case "3":
        cneed = fd * 1.53;
        break;
      case "4":
        cneed = fd * 1.725;
        break;
      case "5":
        cneed = fd * 1.9;
        break;
    }
    console.log('cneed1', cneed);
    cneed = Math.floor(cneed);
    //cneed1=Math.floor(cneed*0.0353);
    fneed = Math.floor((cneed * 0.25) / 9);
    if (wtype == "pounds") {
      fneed = Math.floor(fneed * 0.0353);
      //fneed=fneed*0.0022 ;
    }
    pneed = Math.floor((cneed * 0.25) / 4);
    if (wtype == "pounds") {
      pneed = Math.floor(pneed * 0.0353);
    }
    crneed = Math.floor((cneed * 0.25) / 4);
    if (wtype == "pounds") {
      crneed = Math.floor(crneed * 0.0353);
    }
    aneed = Math.floor((cneed * 0.25) / 7);
    if (wtype == "pounds") {
      aneed = Math.floor(aneed * 0.0353);
    }

    console.log('final calories?', cneed);
    console.log('aneed', aneed);

    if (wtype == "pounds") {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      alh1 = aneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      alh1 = alh1.toFixed(3);

    }
    if (caltype == 'pounds') {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      alh1 = aneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      alh1 = alh1.toFixed(3);

    }
    if (caltype == 'kg') {
      fat2 = fneed / 1000;
      pro2 = pneed / 1000;
      car2 = crneed / 1000;
      alh2 = aneed / 1000;
      fat2 = fat2.toFixed(3);
      pro2 = pro2.toFixed(3);
      car2 = car2.toFixed(3);
      alh2 = alh2.toFixed(3);

    }
  } else {
    console.log('something not working?');
    //alert("Please fill your details properly!");
  }
}
