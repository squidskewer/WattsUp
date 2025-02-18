function calculateEnergy() {
    const points = [2, 3, 2, 3, 2, 3, 4, 2, 3, 3, 2, 4, 4, 3, 2];
    let totalPoints = 0;
    for (let i = 0; i < 15; i++) {
      const answer = document.querySelector(`input[name='q${i}']:checked`);
      if (answer && answer.value === 'yes') {
        totalPoints += points[i];
      }
    }
    let result = `Total Energy Consumption Points: ${totalPoints}<br>`;
    if (totalPoints >= 35) {
      result += "Low energy consumption. Great job! Keep it up!";
    } else if (totalPoints >= 20) {
      result += "Moderate energy consumption. Consider trying the things you said no to.";
    } else {
      result += "High energy consumption. Please consider using many of the strategies listed in the questions.";
    }
    document.getElementById('result').innerHTML = result;
  }
