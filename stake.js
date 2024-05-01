async function staker()
{
    // Require puppeteer 

    const puppeteer = require('puppeteer-extra');

    const StealthPlugin = require('puppeteer-extra-plugin-stealth');

    puppeteer.use(StealthPlugin());

    const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

    puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

    const fs = require('fs').promises;



    var  page = [] , browser  , pages=[]  , page , cookies0 , cookies1 , cookies2 , chip = [] ,  
    clear = '[data-test="button-clear"]' , submit = '[data-test="bet-button"]' , 
    betencour = '[disabled=""]' , last = '.last-bet.svelte-1s7oc9n' , chipsel =[] , rand = []  , 
    betfini = '[data-test-action-enabled="true"]' ,  mises=[] , c =[] , chipsel=[] , montant = 0.00020000  ,
    num = 0 , num1 = 10001 , montant1 = 0 , long ; red = {table : '[data-test="red"]', num : [] } , 
    black = {table : '[data-test="black"]', num : [] }


    //definition des chip


    chip[0] = {table : '[data-test="chip-select-1e-8"]' , num : Math.pow(10 , -8)} ;

    chip[1] = {table : '[data-test="chip-select-1e-7"]' , num : Math.pow(10 , -7)} ;

    chip[2] = {table : '[data-test="chip-select-0.000001"]' , num : Math.pow(10 , -6)} ;

    chip[3] = {table : '[data-test="chip-select-0.00001"]' , num : Math.pow(10 , -5)} ;

    chip[4] = {table : '[data-test="chip-select-0.0001"]' , num : Math.pow(10 , -4)} ;

    chip[5] = {table : '[data-test="chip-select-0.001"]' , num : Math.pow(10 , -3)} ;

    chip[6] = {table : '[data-test="chip-select-0.01"]' , num : Math.pow(10 , -2)} ;

    chip[7] = {table : '[data-test="chip-select-0.1"]' , num : Math.pow(10 , -1)} ;

    chip[8] = {table : '[data-test="chip-select-1"]' , num : Math.pow(10 , 0)} ;

    chip[9] = {table : '[data-test="chip-select-10"]' , num : Math.pow(10 , 1)} ;


    console.log('chip ok');


    //declaration des carreaux

    for(i=0 ; i<37 ; i++)
    {
        c[i] = {table : '[data-test="number'+i+'"]', num : i } ;
    }

    console.log('carreaux ok' );     


    //definition de mises

    mises[1]={montant : montant * 18/19 , carr : red} ;
    mises[2]={montant : montant * 1/19  , carr : c[0]} ;
    mises[3]={montant : montant * 18/19 , carr : black} ;
    mises[4]={montant : montant * 1/19  , carr : c[0]} ;


    //lancer le navigateur

    browser = await puppeteer.launch(
    {
        ignoreHTTPSErrors: false,
        headless: false,
        args: 
        [ 
            `--no-sandbox`,
            '--disable-setuid-sandbox',
        ],
        
    });
            
    console.log("ouverture du navigateur...pour gambling");
        
        
    pages = await browser.pages();

    page = await pages[0];

/* 
    cookies1 = await fs.readFile('./cookies.json');
    cookies2 = JSON.parse(cookies1);
    await page.setCookie(...cookies2);
    console.log('cookies loaded');
*/
    
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36");
    
    await page.goto('https://stake.com/casino/games/roulette' , {waitUntil: "networkidle0",  timeout: 60000 ,});
    
    await page.waitForSelector(c[1].table , { timeout : 120000});


    await new Promise(r => setTimeout(r, 300000));
    cookies0 = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies0, null, 2));
    console.log('cookie saved');
       
/*

    async function bet()
    {      
        await new Promise((resolve, reject) => 
        {

            for(let i=1 ; i<5 ; i++)
            {
                //transformer montant en string
                montant1 = mises[i].montant * 100000000 ;

                montant1 = Math.trunc(montant1) ;

                montant1 = montant1.toString() ;

                console.log('montant en string pour mises'+i+' est egale ',montant1) ;


                //enregistre chaque string dans la table chipsel
                long = montant1.length ;

                for(let a=0 ; a<10 ; a++)
                {
                    if(a<9)
                    {
                        chipsel.push(montant1.charAt(long-1-(a*1)) * 1) ;
                    }

                    if(a=9)
                    {
                        chipsel.push(montant1.substr(0 , long-1-(a*1)) * 1) ;
                    }

                }

                //click on selected chip
                for (let b in chipsel)
                {
                    await page.waitForSelector(chip[b].table , { timeout : 120000});
                    await page.focus(chip[b].table);
                    await page.keyboard.type('\n');

                    for(let d=1 ; d<(chipsel[b]+1) ; d++)
                    {
                        await page.waitForSelector(mises[i].carr.table, { timeout : 120000});
                        await page.focus(mises[i].carr.table);
                        await page.keyboard.type('\n');
                    }
                }

                chipsel=[] ;
            }

            await page[i].waitForSelector(submit, { timeout : 120000});
            await page[i].focus(submit);
            await page[i].keyboard.type('\n');

            resolve() ;
        }) ;
    }


    async function gambling()
    {
        if(num < (num1-1))
        {
            //clear the table
            await page[i].waitForSelector(clear , { timeout : 120000});
            await page[i].focus(clear);
            await page[i].keyboard.type('\n');

            //palce the bets
            await bet() ;

            //wait for results
            await page.waitForSelector(betencour , { timeout : 120000});

            await page.waitForSelector(betfini , {timeout : 120000});
            
            await new Promise(r => setTimeout(r, 10000));
            
            await page.waitForSelector(last , { timeout : 120000});
            
            res = await page.$eval(last , (el) => el.textContent);
            
            res = res * 1 ;

            //recalculer les mise
            num2 = num1 - num ;

            surplus = surplus + (montant * ratio / num2) ;

            montant = montant + surplus ;

            mises[1]={montant : montant * 18/19 , carr : red} ;
            mises[2]={montant : montant * 1/19  , carr : c[0]} ;
            mises[3]={montant : montant * 18/19 , carr : black} ;
            mises[4]={montant : montant * 1/19  , carr : c[0]} ;

            num = num + 1 ;



            //relancer le gambling
            gambling() ;
        } 
    }              


        
    gambling() ;

*/

}

staker() ;
