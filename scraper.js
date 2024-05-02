const playwright = require('playwright');

async function scrapeListingPage(url) {
  // The scraping doesn't seem to work for gamehacking when headless is true.
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });

  // Grab all of the game links on the current listing page
  const gameLinks = await page.$$eval('a[href^="/game/"]', (links) =>
    links.map((link) => link.href)
  );

  //console.log(gameLinks);

  // Close the browser
  await context.close();
  await browser.close();

  // Return or process the extracted data
  return gameLinks;
}

async function downloadCheat(url) {
  // The scraping doesn't seem to work for gamehacking when headless is true.
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });

  // Change the format to FXPak Pro YAML
  await page.locator('a').filter({ hasText: 'BSNES 0 - 0.74 (.cht)' }).click();
  await page.locator('li').filter({ hasText: 'FXPak Pro 1.7 (.yml)' }).click();

  // Seems the ul items for formats aren't loaded until the list is clicked.
  // So open and close it.
  await page.locator('#filename_chosen a').click();
  await page.locator('#filename_chosen a').click();
  // Now grab the list of items so we can get the number of items to iterate over
  const liCounter = await page
    .locator('#filename_chosen ul.chosen-results li')
    .count();
  // Loop through each, clicking on the file name and triggering the download
  for (let i = 0; i < liCounter; i++) {
    await page.locator('#filename_chosen a').click();
    await page.locator('#filename_chosen ul.chosen-results li').nth(i).click();
    // Trigger the download
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    // And save it to the downloads folder
    await download.saveAs('./downloads/snes/' + download.suggestedFilename());
  }

  // Tidy everything up
  await context.close();
  await browser.close();
}

async function scrape() {
  try {
    gameLinks = await scrapeListingPage(
      'https://gamehacking.org/system/snes/all/0'
    );

    for (let i = 0; i < gameLinks.length; i++) {
      await downloadCheat(gameLinks[i]);
    }
  } catch (e) {
    console.log(e);
  }
}

scrape();
