const feet_to_centemeters = (feet, inches = 0) => {
  if (inches) {
    var new_feet = (feet + (inches / 12));
  } else {
    var new_feet = feet;
  }
  return (new_feet * 30.48);
}

export const CalorieCounter = (age, foot, inch, weight, gender, activeness) => {

  const cm = feet_to_centemeters(foot, inch);

  if (age != '' && cm != '' && weight != '') {
    weight = parseInt(weight);
    weight = Math.round(weight / 2.2046);
    if (gender === 'male') {
      fd = (10 * weight) + (6.25 * cm) - (5 * age) + 5; // male
    } else if (gender === 'female') {
      fd = (10 * weight) + (6.25 * cm) - (5 * age) - 161; // female
    }
    var cneed;
    switch (activeness) {
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
    const finalCaloriesNeeded = Math.floor(cneed);

    return finalCaloriesNeeded;
  }
}
//var new_test = count_calaries(42, 6, 1, 197, 'male', "3");
