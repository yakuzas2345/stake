(async () =>
{	
	const readlineSync = require("readline-sync") ;
	
	const util = require('util') ;
	
	async function arret(a) 
	{
		await new Promise(function (resolve, reject) 
		{
			if (stop === 1) 
			{
				conv = readlineSync.question(" " + a + " - CONTINUE?");

				resolve();
			} 
			else 
			{
				resolve();
			}
		});
	}

	

	var arr = [] , perct1 = 0.9 , perct2 = 3 , longueur , somme = 0, stop = 1 , niv , nombre ,
	mise0 = 10 ,
	result0 = mise0 * perct1
	ajout0 = result0 / perct2 ,
	perte0 = mise0 * 2
	gain0 = 0 ;
	
	arr.push({nom : 'tab0' , tab : [{mise1 : mise0 , mise2 : mise0 , result : result0 , ajout : ajout0 , perte : perte0 , gain : gain0}]}) ;
			
	nombre = 1 ;
	
	while(1 === 1)
	{
		
	
		await new Promise(function (resolve, reject) 
		{
			longueur = arr.length
			
			for(let a = 0 ; a < longueur ; a++)
			{
				mise1 = arr[a].tab[(arr[a].tab.length - 1)].mise1 + arr[a].tab[(arr[a].tab.length - 1)].ajout ;
				
				mise2 = arr[a].tab[(arr[a].tab.length - 1)].mise1 + arr[a].tab[(arr[a].tab.length - 1)].ajout ;
				
				result = mise1 * perct1 ;
				
				ajout = result / perct2 ;
				
				perte = arr[a].tab[(arr[a].tab.length - 1)].perte + mise0 ;
				
				gain = mise1 + mise2 - perte ;
				
				arr[a].tab.push({mise1 : mise1 , mise2 : mise2 , result : result , ajout : ajout , perte : perte , gain : gain}) ;
				
				
				if(arr[a].tab.length > 2)
				{
					niv = ''+arr[a].tab.length - 2 ;
					
					arr.push({nom : ''+arr[a].nom+''+niv+'' , tab : [{mise1 : mise0 , mise2 : mise0 , result : result0 , ajout : ajout0 , perte : perte0 , gain : gain0}]}) ;
				}
			}	
		
			resolve() ;
		
		});	
		

		await new Promise(function (resolve, reject) 
		{
			for(let b in arr)
			{
				somme = somme + arr[b].tab[(arr[b].tab.length - 1)].gain ;
			}
			
			resolve() ;
		
		});	
		
		nombre = nombre + 1 ;

		console.log('arr.length =' , arr.length , 'nombre =' , nombre , 'somme = ' , somme , 'array = ' , arr) ;
		
		//console.log(util.inspect(arr, {showHidden: false, depth: null, colors: true})) ;
		
		somme = 0 ;
		
		await arret("ANALYSE");
	}
})() ;
	
	
	
	