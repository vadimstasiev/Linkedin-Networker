fs = require('fs');
const { config } = require('./linkedin-config');
const { download, uuidv4, get_url_extension, sleep } = require('./helpers');

const scrapingActions = [
    {
        url: 'https://www.linkedin.com/',
        async scraper(browser) {
            let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            // Navigate to the selected page
            await page.goto(this.url, { waitUntil: 'networkidle2' });

            // Email and password input and login
            const emailInputXPath = '//*[@id="session_key"]';
            const passwordInputXPath = '//*[@id="session_password"]';
            const signInXPath = '//button[@data-tracking-control-name="homepage-basic_signin-form_submit-button"]';
            await page.waitForXPath(emailInputXPath);
            await page.waitForXPath(passwordInputXPath);
            const [emailInputHandle] = await page.$x(emailInputXPath);
            const [passwordInputHandle] = await page.$x(passwordInputXPath);
            const [signInButtonHandle] = await page.$x(signInXPath);


            await page.evaluate(async (emailInput, passwordInput, email, password) => {
                emailInput.value = email;
                passwordInput.value = password
            }, emailInputHandle, passwordInputHandle, config.creds.email, config.creds.password);

            sleep(1);

            await Promise.all([
                signInButtonHandle.click(),
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
            ])

            console.log("Login Complete!");
            page.close();
        }
    },
    {
        url: config.target_profile,
        async scraper(browser) {
            let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            // Navigate to the url
            await page.goto(this.url, { waitUntil: 'networkidle2' });
            // find connections link
            const connectionsLinkXPath = '//span[contains(., "connections")]';
            await page.waitForXPath(connectionsLinkXPath);
            const [connectionsLinkHandle] = await page.$x(connectionsLinkXPath);

            await connectionsLinkHandle.click();

            sleep(2);

            let nextPage = true;
            while (nextPage) {
                await page.evaluate(() => {
                    setInterval(function () { window.scrollTo(0, document.body.scrollHeight); }, 100);
                });
                nextPage = await page.evaluate(async () => {
                    // if (typeof run !== "undefined") {
                    //     // means the page hasn't refreshed, so the code must have already ran
                    //     return false;
                    // }

                    sleep = (time) => {
                        return new Promise((resolve) => setTimeout(resolve, time));
                    }
                    await sleep(2000)
                    let connectBtns = [...document.querySelectorAll("span")].filter(a => a.textContent.trim() === "Connect".trim())
                    for (var i = 0; i < connectBtns.length; i++) {
                        await sleep(1000)
                        connectBtns[i].click()
                        console.log(connectBtns)
                        await sleep(1000)
                        let sendBtns = [...document.querySelectorAll("span")].filter(a => a.textContent.trim() === "Send".trim())
                        if (sendBtns[0]) {
                            sendBtns[0].click()
                            console.log('did it with', sendBtns[0])
                        }
                        // this should get rid of interfering pop ups
                        document.getElementsByTagName("BODY")[0].click();
                    }
                    return true;
                });

                const nextPageXPath = '//span[contains(., "Next")]';
                const [nextPageHandle] = await page.$x(nextPageXPath);

                try {
                    await nextPageHandle.click();

                } catch (error) { }

                console.log('say what, its done')
                page.waitForNavigation({ waitUntil: 'networkidle2' })
                // sleep(2000);
            }


        }
    }
]

module.exports = scrapingActions;