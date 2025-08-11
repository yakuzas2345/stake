var base = 1000 , mont1 = 1000 , mont2 , sup1 , sup2 , sup3 , tot1 = 0 , tot2 = 0 , test = 0 , n = 0 , arr = [] ;

mont2 = mont1 / base ;



(async () => 
{
	while( n < 100 )
	{
		base2 = base + 5 ;
		
		sup2 = (mont2 * base2) - mont1 ;
		
		sup1 = sup2 / base2 ;
		
		arr.push({sup1 : sup1 , sup2 : sup2}) ;
		
		//console.log(base  ,  sup1 , sup2) ;
		
		base = base + 5 ;
		
		mont2 = mont1 / base ;
		
		//await new Promise(resolve => setTimeout(resolve, 5000));
		
		n = n + 1 ;
	}
	
	//console.log(arr) ;
	
	for(let i = (arr.length - 1) ; i > (-1) ; i--)
	{
		base2 = base - 5 ;
		
		sup3 = (arr[i].sup2 / base2) - (arr[i].sup1) ;
		
		arr[i].sup3 = sup3 ;	
		
		base = base - 5 ;
		
		tot1 = tot1 + arr[i].sup1 ;
		
		tot2 = tot2 + sup3 ;
	}
	
	mont2 = mont2 + tot1 ;
	
	test = mont2 * base ;
	
	tot2 = tot2 * base ;
	
	console.log(arr , base , mont1 , test , tot2 ) ;
	
})() ;


	