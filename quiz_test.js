const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the HTML file in the same folder
  await page.goto('file:///Users/neha/Desktop/DESKTOP%20CLUTTER/Desktop%20-%20Neha%E2%80%99s%20MacBook%20Pro/Neha/Git/Tranquility/questionnaire.html');

  // Check if there are 5 questions
  const questionTabs = await page.$$('.nav-tabs .nav-link');
  if (questionTabs.length !== 5) {
    console.error('Expected 5 questions, but found ' + questionTabs.length);
  } else {
    console.log(`5 Questions Found. ✅`)

  }

  // Loop through each question
  for (let questionNumber = 1; questionNumber <= 5; questionNumber++) {
    const questionSelector = `#nav${questionNumber}`;
    const answerOptions = await page.$$(`${questionSelector} input[type="radio"]`);

    // Check if each question has 5 answer options
    if (answerOptions.length !== 5) {
      console.error(`Question ${questionNumber} does not have 5 answer options.`);
    } else {
        console.log(`Question ${questionNumber}  has 5 answer options. ✅`)
    }
  }

  // Close the browser
  await browser.close();
})();
